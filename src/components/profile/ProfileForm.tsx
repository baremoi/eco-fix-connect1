
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormProps {
  isEditing: boolean;
  defaultValues: {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
  };
  register: any;
  errors: any;
}

export function ProfileForm({ isEditing, defaultValues, register, errors }: ProfileFormProps) {
  return (
    <div className="flex-grow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          {isEditing ? (
            <>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message as string}</p>
              )}
            </>
          ) : (
            <p className="text-lg">{defaultValues.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          {isEditing ? (
            <>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message as string}</p>
              )}
            </>
          ) : (
            <p className="text-lg">{defaultValues.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          {isEditing ? (
            <>
              <Input
                id="phone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message as string}</p>
              )}
            </>
          ) : (
            <p className="text-lg">{defaultValues.phone || "Not provided"}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          {isEditing ? (
            <>
              <Input
                id="address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message as string}</p>
              )}
            </>
          ) : (
            <p className="text-lg">{defaultValues.address || "Not provided"}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        {isEditing ? (
          <>
            <Textarea
              id="bio"
              {...register("bio")}
              rows={4}
              placeholder="Tell us a little about yourself..."
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message as string}</p>
            )}
          </>
        ) : (
          <p className="text-lg whitespace-pre-wrap">
            {defaultValues.bio || "No bio provided yet."}
          </p>
        )}
      </div>
    </div>
  );
}
