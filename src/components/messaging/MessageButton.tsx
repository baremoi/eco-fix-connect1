
import { Link } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface MessageButtonProps extends ButtonProps {
  userId?: string;
  projectId?: string;
  label?: string;
}

export function MessageButton({
  userId,
  projectId,
  label = "Message",
  ...props
}: MessageButtonProps) {
  // Build the URL based on available IDs
  const getUrl = () => {
    if (projectId) {
      return `/messages/project/${projectId}`;
    }
    if (userId) {
      return `/messages/user/${userId}`;
    }
    return '/messages';
  };

  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      {...props}
    >
      <Link to={getUrl()}>
        <Icons.message className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
