
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileAvatarProps {
  avatarUrl: string;
  userName: string;
  isEditing: boolean;
  onFileChange: (file: File) => void;
  avatarPreview?: string | null;
}

export function ProfileAvatar({ 
  avatarUrl, 
  userName, 
  isEditing, 
  onFileChange,
  avatarPreview: externalAvatarPreview = null
}: ProfileAvatarProps) {
  const [internalAvatarPreview, setInternalAvatarPreview] = useState<string | null>(null);
  const avatarPreview = externalAvatarPreview || internalAvatarPreview;
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview if we're managing state internally
      if (!externalAvatarPreview) {
        const reader = new FileReader();
        reader.onload = () => {
          setInternalAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      
      // Pass the file to the parent component
      if (typeof onFileChange === 'function') {
        onFileChange(file);
      }
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('');
  };

  return (
    <div className="flex flex-col items-center space-y-3 mb-6 md:mb-0">
      <Avatar className="h-24 w-24">
        <AvatarImage 
          src={avatarPreview || avatarUrl} 
          alt={userName} 
        />
        <AvatarFallback>
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>
      
      {isEditing && (
        <div className="flex flex-col items-center">
          <Label htmlFor="avatar" className="cursor-pointer text-sm text-primary">
            Change Photo
          </Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}
