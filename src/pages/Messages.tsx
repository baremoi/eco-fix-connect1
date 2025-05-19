
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Message, messagingService } from "@/services/messagingService";
import { Icons } from "@/components/ui/icons";
import { useParams } from "react-router-dom";
import ConversationList from "@/components/messaging/ConversationList";
import MessageThread from "@/components/messaging/MessageThread";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Messages() {
  const { user, profile } = useAuth();
  const { projectId, userId } = useParams();
  const [activeConversation, setActiveConversation] = useState<string | null>(userId || null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch messages for active conversation
  const fetchMessages = async () => {
    if (!user || !activeConversation) return;

    setIsLoading(true);
    try {
      const fetchedMessages = await messagingService.fetchMessages({
        conversationPartnerId: activeConversation,
        projectId: projectId,
      });
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeConversation) {
      fetchMessages();
    }
  }, [activeConversation, projectId]);

  // Subscribe to new messages
  useEffect(() => {
    if (!user) return;

    const unsubscribe = messagingService.subscribeToMessages(
      user.id,
      (newMessage) => {
        // If this message belongs to active conversation, add it to state
        if (newMessage.sender_id === activeConversation || 
            newMessage.project_id === projectId) {
          setMessages(prev => [newMessage, ...prev]);
        }
        toast.info("New message received");
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user, activeConversation, projectId]);

  const handleSendMessage = async (content: string) => {
    if (!user || !activeConversation || !content.trim()) return;

    try {
      await messagingService.sendMessage({
        sender_id: user.id,
        receiver_id: activeConversation,
        content,
        project_id: projectId,
      });
      // Optimistically update UI
      const newMessage: Message = {
        id: 'temp-' + Date.now(),
        sender_id: user.id,
        receiver_id: activeConversation,
        content,
        read: false,
        project_id: projectId,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [newMessage, ...prev]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Please sign in to access messages</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <ConversationList 
              activeConversationId={activeConversation}
              onSelectConversation={(id) => setActiveConversation(id)}
              projectId={projectId}
            />
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
          ) : activeConversation ? (
            <MessageThread
              messages={messages}
              currentUserId={user.id}
              onSendMessage={handleSendMessage}
              conversationUserId={activeConversation}
            />
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
