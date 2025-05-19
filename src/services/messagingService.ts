
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

export type Message = Database['public']['Tables']['messages']['Row'];

export const messagingService = {
  /**
   * Send a message
   */
  async sendMessage({ sender_id, receiver_id, content, project_id }: {
    sender_id: string;
    receiver_id: string;
    content: string;
    project_id?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id,
          receiver_id,
          content,
          project_id
        })
        .select('*')
        .single();
      
      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Exception sending message:', error);
      throw error;
    }
  },

  /**
   * Fetch messages for a conversation
   */
  async fetchMessages({ conversationPartnerId, projectId }: {
    conversationPartnerId: string;
    projectId?: string;
  }) {
    try {
      let query = supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${conversationPartnerId},receiver_id.eq.${conversationPartnerId}`)
        .order('created_at', { ascending: false });

      // If project ID is provided, filter by project
      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching messages:', error);
      throw error;
    }
  },

  /**
   * Get all conversations for a user
   */
  async getConversations(userId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }
      
      // Process conversations to group by other party
      const conversationsMap = new Map();
      
      data.forEach((message: Message) => {
        const otherPartyId = message.sender_id === userId ? message.receiver_id : message.sender_id;
        const key = message.project_id ? `project_${message.project_id}` : `user_${otherPartyId}`;
        
        if (!conversationsMap.has(key) || new Date(message.created_at) > new Date(conversationsMap.get(key).created_at)) {
          conversationsMap.set(key, {
            ...message,
            otherPartyId,
            isProject: !!message.project_id
          });
        }
      });
      
      return Array.from(conversationsMap.values());
    } catch (error) {
      console.error('Exception fetching conversations:', error);
      throw error;
    }
  },

  /**
   * Mark a message as read
   */
  async markAsRead(messageId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .select()
        .single();
      
      if (error) {
        console.error('Error marking message as read:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Exception marking message as read:', error);
      throw error;
    }
  },

  /**
   * Subscribe to new messages
   */
  subscribeToMessages(userId: string, callback: (message: Message) => void) {
    return supabase
      .channel('messages-channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${userId}`
      }, (payload) => {
        const newMessage = payload.new as Message;
        callback(newMessage);
      })
      .subscribe();
  }
};
