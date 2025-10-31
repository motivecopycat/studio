
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Mail,
  MessageSquare,
  PlusCircle,
  Webhook,
} from "lucide-react";
import * as React from "react";

const integrations = [
  {
    name: "Google Analytics",
    description:
      "Sync your affiliate link data with Google Analytics for deeper insights into traffic and user behavior.",
    icon: <AreaChart className="h-8 w-8" />,
    connected: false,
  },
  {
    name: "Slack",
    description:
      "Receive real-time notifications for important events, like new conversions or campaign milestones.",
    icon: <MessageSquare className="h-8 w-8" />,
    connected: true,
  },
  {
    name: "Mailchimp",
    description:
      "Add contacts from your affiliate conversions directly to your Mailchimp mailing lists.",
    icon: <Mail className="h-8 w-8" />,
    connected: false,
  },
  {
    name: "Zapier",
    description:
      "Connect KikaSite to thousands of other apps with Zapier. Automate workflows and move data seamlessly.",
    icon: <Webhook className="h-8 w-8" />,
    connected: false,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Apps Integration</h1>
        <p className="text-muted-foreground">
          Connect your favorite apps to automate your workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="rounded-lg bg-muted p-3 flex items-center justify-center">
                {integration.icon}
              </div>
              <div>
                <CardTitle>{integration.name}</CardTitle>
                <CardDescription className="mt-1">
                  {integration.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              {integration.connected ? (
                <Button variant="secondary" className="w-full">Manage</Button>
              ) : (
                <Button variant="outline" className="w-full">Connect</Button>
              )}
            </CardFooter>
          </Card>
        ))}
         <Card className="flex flex-col items-center justify-center border-2 border-dashed">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <PlusCircle className="h-6 w-6" />
              Suggest an App
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't see the app you're looking for? Let us know!
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">Request Integration</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
