"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeletePeriod from "@/app/[Actions]/DeletePeriod";
import { useState } from "react";

interface DeleteButtonProps {
  recordId: string;
}

export default function DeleteButton({ recordId }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service record?")) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("recordId", recordId);
      await DeletePeriod(formData);
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
      className="ml-auto p-2 h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors group"
      title="Delete service record"
    >
      <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
    </Button>
  );
}
