"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertInterface {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const userStatusText: Record<ApiAlertInterface["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

// Indicate the color of user status PUBLIC OR ADMIN
const userStatusColor: Record<
  ApiAlertInterface["variant"],
  BadgeProps["variant"]
> = {
  public: "secondary",
  admin: "destructive",
};

export default function apiAlert({
  description,
  title,
  variant,
}: ApiAlertInterface) {
  function onCopy() {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied successfully");
  }

  return (
    <Alert>
      <AlertTitle className="flex items-center gap-x-2">
        <Server className="h-4 w-4" />
        {title}
        <Badge variant={userStatusColor[variant]}>
          {userStatusText[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="rounded bg-muted ml-[1.5rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
