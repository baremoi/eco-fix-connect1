
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function CheckboxItem({ checked, onCheckedChange, label, disabled }: CheckboxItemProps) {
  return (
    <div className="flex items-center space-x-2 py-1">
      <Checkbox 
        id={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
        checked={checked} 
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <Label 
        htmlFor={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
        className="cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
}

interface CheckboxListProps {
  children: React.ReactNode;
  className?: string;
}

export function CheckboxList({ children, className }: CheckboxListProps) {
  return (
    <div className={`space-y-1 ${className || ''}`}>
      {children}
    </div>
  );
}
