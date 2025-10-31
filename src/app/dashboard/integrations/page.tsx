
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  AreaChart,
  Mail,
  MessageSquare,
  PlusCircle,
  Webhook,
  Copy,
  Trash2,
  Package2,
} from "lucide-react";
import * as React from "react";

interface Integration {
    name: string;
    description: string;
    icon: React.ReactNode;
    connected: boolean;
}

const initialIntegrations: Integration[] = [
  {
    name: "Google Analytics",
    description: "",
    icon: <AreaChart className="h-8 w-8" />,
    connected: false,
  },
  {
    name: "Slack",
    description: "",
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
    description: "",
    icon: <Webhook className="h-8 w-8" />,
    connected: false,
  },
];

interface ApiKey {
    id: string;
    name: string;
    key: string;
    createdAt: string;
}

const generateApiKey = () => `ks_${crypto.randomUUID().replace(/-/g, '')}`;

const ConnectAppDialog = ({ appName, onConnect, children }: { appName: string, onConnect: (apiKey: string) => void, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [apiKey, setApiKey] = React.useState('');
    const { toast } = useToast();

    const handleSubmit = () => {
        if (!apiKey.trim()) {
            toast({
                variant: "destructive",
                title: "API Key Required",
                description: "Please enter an API key to connect.",
            });
            return;
        }
        onConnect(apiKey);
        setIsOpen(false);
        setApiKey('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connect to {appName}</DialogTitle>
                    <DialogDescription>
                        Please enter your API key for {appName} to establish a connection.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="api-key" className="text-right">
                            API Key
                        </Label>
                        <Input
                            id="api-key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter your API key"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Connect</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function IntegrationsPage() {
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = React.useState("");
  const [generatedKey, setGeneratedKey] = React.useState<string | null>(null);
  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const [integrations, setIntegrations] = React.useState<Integration[]>(initialIntegrations);
  const [isRequestDialogOpen, setRequestDialogOpen] = React.useState(false);
  const [newAppName, setNewAppName] = React.useState("");
  const [newAppApiKey, setNewAppApiKey] = React.useState("");


  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please enter a name for the API key.",
        });
        return;
    }

    const newKey = generateApiKey();
    const newKeyObject: ApiKey = {
        id: `key_${apiKeys.length + 1}`,
        name: newKeyName,
        key: newKey,
        createdAt: new Date().toLocaleDateString(),
    };
    
    setApiKeys(prev => [newKeyObject, ...prev]);
    setGeneratedKey(newKey);
    setNewKeyName("");
  };
  
  const handleDeleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({
        title: "API Key Deleted",
        description: "The API key has been permanently deleted.",
    });
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
        title: "Copied!",
        description: "The API key has been copied to your clipboard.",
    });
  }

  const closeCreateDialog = () => {
    setCreateDialogOpen(false);
    setGeneratedKey(null);
    setNewKeyName("");
  }

  const handleConnect = (appName: string, apiKey: string) => {
    // Here you would typically validate the API key
    console.log(`Connecting ${appName} with key: ${apiKey}`);
    setIntegrations(integrations.map(app => 
      app.name === appName ? { ...app, connected: true } : app
    ));
    toast({
      title: "App Connected",
      description: `${appName} has been successfully connected.`,
    });
  };

  const handleDisconnect = (appName: string) => {
    setIntegrations(integrations.map(app => 
      app.name === appName ? { ...app, connected: false } : app
    ));
    toast({
      title: "App Disconnected",
      description: `${appName} has been disconnected.`,
    });
  };

  const handleManage = (appName: string) => {
    toast({
        title: `Managing ${appName}`,
        description: `You are now managing your ${appName} integration.`,
    });
  };

  const handleAddAppSubmit = () => {
      if (!newAppName.trim() || !newAppApiKey.trim()) {
          toast({
              variant: "destructive",
              title: "Error",
              description: "Please enter both an app name and an API key.",
          });
          return;
      }
      
      const newApp: Integration = {
          name: newAppName,
          description: "Custom integration.",
          icon: <Package2 className="h-8 w-8" />,
          connected: true,
      };

      setIntegrations(prev => [...prev, newApp]);

      toast({
          title: "App Added",
          description: `${newAppName} has been added and connected.`,
      });
      setNewAppName("");
      setNewAppApiKey("");
      setRequestDialogOpen(false);
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Apps Integration</h1>
        <p className="text-muted-foreground">
          Connect your favorite apps and manage your API keys.
        </p>
      </div>

       <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for custom integrations.
              </CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={isCreateDialogOpen ? closeCreateDialog : setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>Create new key</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{generatedKey ? "API Key Created" : "Create API Key"}</DialogTitle>
                  <DialogDescription>
                    {generatedKey 
                        ? "Please copy this key. You will not be able to see it again."
                        : "Give your new API key a descriptive name."
                    }
                  </DialogDescription>
                </DialogHeader>
                {generatedKey ? (
                    <div className="space-y-4">
                        <div className="relative">
                            <Input id="generated-key" value={generatedKey} readOnly />
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => handleCopyKey(generatedKey)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                         <p className="text-sm text-muted-foreground">
                            For security reasons, this key will not be shown again.
                            Store it in a safe place.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          className="col-span-3"
                          placeholder="e.g. My Custom App"
                        />
                      </div>
                    </div>
                )}
                <DialogFooter>
                  {generatedKey ? (
                    <Button onClick={closeCreateDialog}>Done</Button>
                  ) : (
                    <Button onClick={handleCreateKey}>Generate Key</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
            {apiKeys.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                    <p>No API keys created yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {apiKeys.map(apiKey => (
                        <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                           <div className="space-y-1">
                                <p className="font-medium">{apiKey.name}</p>
                                <p className="text-sm text-muted-foreground font-mono">
                                    {`${apiKey.key.substring(0, 11)}...${apiKey.key.substring(apiKey.key.length - 4)}`}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Created on {apiKey.createdAt}
                                </p>
                           </div>
                           <div className="flex items-center gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete the API key "{apiKey.name}". This action cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteKey(apiKey.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                           </div>
                        </div>
                    ))}
                </div>
            )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="rounded-lg bg-muted p-3 flex items-center justify-center">
                {integration.icon}
              </div>
              <div>
                <CardTitle>{integration.name}</CardTitle>
                <CardDescription className="mt-1">{integration.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              {integration.connected ? (
                <div className="w-full flex gap-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full">Disconnect</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Disconnect {integration.name}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to disconnect {integration.name}? Your data will no longer be synced.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDisconnect(integration.name)}>Disconnect</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              ) : (
                <ConnectAppDialog appName={integration.name} onConnect={(apiKey) => handleConnect(integration.name, apiKey)}>
                    <Button variant="outline" className="w-full">Connect</Button>
                </ConnectAppDialog>
              )}
            </CardFooter>
          </Card>
        ))}
         <Dialog open={isRequestDialogOpen} onOpenChange={setRequestDialogOpen}>
            <Card className="flex flex-col items-center justify-center border-2 border-dashed">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                    <PlusCircle className="h-6 w-6" />
                    Add Custom App
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                    Can't find an app? Add your own custom integration.
                    </p>
                </CardContent>
                <CardFooter>
                    <DialogTrigger asChild>
                        <Button variant="ghost">Add App</Button>
                    </DialogTrigger>
                </CardFooter>
            </Card>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Custom App</DialogTitle>
                    <DialogDescription>
                        Enter the details for your custom app integration.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="app-name" className="text-right">
                            App Name
                        </Label>
                        <Input
                            id="app-name"
                            value={newAppName}
                            onChange={(e) => setNewAppName(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g. My Custom App"
                        />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-app-api-key" className="text-right">
                            API Key
                        </Label>
                        <Input
                            id="new-app-api-key"
                            value={newAppApiKey}
                            onChange={(e) => setNewAppApiKey(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter the API key"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddAppSubmit}>Add and Connect</Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
    </div>
  );
}
