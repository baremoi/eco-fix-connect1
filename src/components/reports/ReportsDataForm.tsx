
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportsDataFormProps {
  period: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type ReportFormValues = {
  type: "environmental" | "performance" | "financial";
  co2Reduction: string;
  energySaved: string;
  waterSaved: string;
  clientSatisfaction: string;
  onTimeCompletion: string;
  repeatClients: string;
};

export function ReportsDataForm({ period, onSuccess, onCancel }: ReportsDataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReportFormValues>({
    defaultValues: {
      type: "environmental",
      co2Reduction: "",
      energySaved: "",
      waterSaved: "",
      clientSatisfaction: "",
      onTimeCompletion: "",
      repeatClients: "",
    },
  });

  const reportType = form.watch("type");
  
  const onSubmit = async (values: ReportFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would submit the data to your database
      // For now we're just simulating the submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Report data saved successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to save report data");
      console.error("Error saving report data", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {reportType === "environmental" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="co2Reduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CO2 Reduction (tons)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="energySaved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy Saved (kWh)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 45000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterSaved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Saved (L)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 120000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {reportType === "performance" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="clientSatisfaction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Satisfaction (out of 5)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 4.8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="onTimeCompletion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>On-time Completion (%)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 95" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatClients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat Clients (%)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 60" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {reportType === "financial" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Financial data is calculated automatically from your bookings and projects.</p>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save Report Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
