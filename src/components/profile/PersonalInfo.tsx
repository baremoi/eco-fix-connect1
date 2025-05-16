
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProfileAvatar } from "@/components/shared/ProfileAvatar";
import { ProfileForm } from "@/components/shared/ProfileForm";
import { ProfileActions } from "./ProfileActions";
import { useProfileForm } from "./useProfileForm";

interface PersonalInfoProps {
  profileData: any;
  authProfile: any;
}

export function PersonalInfo({ profileData, authProfile }: PersonalInfoProps) {
  const {
    isEditing,
    setIsEditing,
    isUploading,
    defaultProfile,
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    handleFileChange
  } = useProfileForm({ profileData, authProfile });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and profile photo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <ProfileAvatar 
              avatarUrl={defaultProfile.avatar_url}
              userName={defaultProfile.name}
              isEditing={isEditing}
              onFileChange={handleFileChange}
            />
            
            <div className="w-full">
              <ProfileForm
                isEditing={isEditing}
                defaultValues={defaultProfile}
                register={register}
                errors={errors}
              />
              
              <ProfileActions
                isEditing={isEditing}
                isLoading={isUploading}
                onCancel={handleCancel}
                onEdit={() => setIsEditing(true)}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
