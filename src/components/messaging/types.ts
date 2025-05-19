
import { Message } from "@/services/messagingService";

export interface ProjectConversation {
  id: string;
  fullName: string;
  avatar?: string;
  role: string;
  lastMessageDate: string;
  projectId?: string;
}

export type { Message };
