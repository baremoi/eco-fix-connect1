import { useState, useRef, useEffect } from "react";
import { Message } from "@/components/messaging/types";
import { Icons } from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/lib/supabase";

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  conversationUserId: string;
  onSendMessage: (content: string) => void;
}

export default function MessageThread({
  messages,
  currentUserId,
  conversationUserId,
  onSendMessage
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const [partnerProfile, setPartnerProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch conversation partner profile
  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', conversationUserId)
        .single();
      
      if (data) {
        setPartnerProfile(data);
      }
    };
    
    if (conversationUserId) {
      fetchProfile();
    }
  }, [conversationUserId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={partnerProfile?.avatar_url || ''} />
            <AvatarFallback>
              {partnerProfile?.full_name?.substring(0, 2).toUpperCase() || '??'}
            </AvatarFallback>
          </Avatar>
          <span>{partnerProfile?.full_name || 'Loading...'}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
        <div ref={messagesEndRef} />
        {messages.map(message => {
          const isCurrentUser = message.sender_id === currentUserId;
          return (
            <div 
              key={message.id} 
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  isCurrentUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isCurrentUser 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
        
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] max-h-[120px]"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Icons.message className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
