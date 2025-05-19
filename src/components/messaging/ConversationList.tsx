
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/components/ui/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProjectConversation } from "./types";

interface ConversationListProps {
  activeConversationId: string | null;
  onSelectConversation: (userId: string) => void;
  projectId?: string;
}

export default function ConversationList({
  activeConversationId,
  onSelectConversation,
  projectId
}: ConversationListProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState<ProjectConversation[]>([]);

  // Fetch conversations (either all or filtered by project)
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // If a project ID is provided, fetch all participants for that project
        // This is simplified for demo - in a real app you would need a more complex query
        if (projectId) {
          // Fetch project participants
          const { data: project } = await supabase
            .from('projects')
            .select('user_id')
            .eq('id', projectId)
            .single();
            
          if (project) {
            // Fetch the user profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', project.user_id)
              .single();
              
            if (profile && user.id !== profile.id) {
              setConversations([{
                id: profile.id,
                fullName: profile.full_name || 'Unknown',
                avatar: profile.avatar_url,
                role: profile.role,
                lastMessageDate: new Date().toISOString(),
                projectId
              }]);
            }
          }
        } else {
          // In a real application, you would query to find users you've messaged with before
          // For demo, we'll fetch all users with role "tradesperson" if current user is "user"
          // or all users with role "user" if current user is "tradesperson"
          const { data: currentProfile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          const targetRole = currentProfile?.role === 'user' ? 'tradesperson' : 'user';
          
          const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', targetRole);
            
          if (profiles) {
            const conversationsList = profiles.map(profile => ({
              id: profile.id,
              fullName: profile.full_name || 'Unknown',
              avatar: profile.avatar_url,
              role: profile.role,
              lastMessageDate: new Date().toISOString()
            }));
            setConversations(conversationsList);
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
  }, [user, projectId]);

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <Icons.spinner className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No conversations found</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`p-4 flex items-center space-x-3 hover:bg-muted cursor-pointer ${
            activeConversationId === conversation.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <Avatar>
            <AvatarImage src={conversation.avatar || ''} alt={conversation.fullName} />
            <AvatarFallback>
              {conversation.fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">{conversation.fullName}</p>
            <p className="text-sm text-muted-foreground capitalize">{conversation.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
