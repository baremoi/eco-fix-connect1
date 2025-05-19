
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageInsert = Database['public']['Tables']['messages']['Insert'];

interface FetchMessagesParams {
  conversationPartnerId?: string;
  projectId?: string;
  limit?: number;
}

export const messagingService = {
  // Send a new message
  async sendMessage(message: MessageInsert): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }
    
    return data;
  },
  
  // Fetch messages for a conversation
  async fetchMessages({ conversationPartnerId, projectId, limit = 50 }: FetchMessagesParams): Promise<Message[]> {
    const currentUser = (await supabase.auth.getUser()).data.user;
    
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    // Filter by project if provided
    if (projectId) {
      query = query.eq('project_id', projectId);
    }
    
    // Filter by conversation partner if provided
    if (conversationPartnerId) {
      query = query.or(
        `sender_id.eq.${conversationPartnerId},receiver_id.eq.${conversationPartnerId}`
      ).and(
        `sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`
      );
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Mark messages as read
  async markAsRead(messageIds: string[]): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .in('id', messageIds);
    
    if (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },
  
  // Subscribe to new messages
  subscribeToMessages(
    userId: string, 
    callback: (message: Message) => void
  ): () => void {
    const channel = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => callback(payload.new as Message)
      )
      .subscribe();
    
    // Return unsubscribe function
    return () => {
      supabase.removeChannel(channel);
    };
  }
};
