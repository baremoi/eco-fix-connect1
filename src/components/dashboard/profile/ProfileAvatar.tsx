
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileAvatarProps {
  avatarUrl: string;
  avatarPreview: string | null;
  userName: string;
  isEditing: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatar = ({ 
  avatarUrl, 
  avatarPreview, 
  userName, 
  isEditing, 
  onFileChange 
}: ProfileAvatarProps) => {
  return (
    <div className="flex flex-col items-center space-y-3 mb-6 md:mb-0">
      <Avatar className="h-24 w-24">
        <AvatarImage 
          src={avatarPreview || avatarUrl} 
          alt={userName} 
        />
        <AvatarFallback>
          {userName.split(' ').map(n => n[0]).join('')}
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
            onChange={onFileChange}
          />
        </div>
      )}
    </div>
  );
};
