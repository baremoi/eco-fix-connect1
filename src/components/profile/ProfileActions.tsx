
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface ProfileActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onEdit: () => void;
}

export function ProfileActions({ isEditing, isLoading, onCancel, onEdit }: ProfileActionsProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      {isEditing ? (
        <>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : "Save Changes"}
          </Button>
        </>
      ) : (
        <Button onClick={onEdit}>
          <Icons.edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      )}
    </div>
  );
}
