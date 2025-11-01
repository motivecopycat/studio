
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, LogOut, Laptop, Smartphone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  phone: z.string().max(20, "Phone number is too long.").optional(),
  address: z.string().max(100, "Address is too long.").optional(),
  bio: z.string().max(200, "Bio must not be longer than 200 characters.").optional(),
});

const notificationsFormSchema = z.object({
    communication_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const loginHistory = [
    {
        device: "Mac - Apple iMac",
        icon: Laptop,
        location: "New York, USA",
        lastActive: "Last active 2 hours ago",
        isCurrent: true,
    },
    {
        device: "iPhone - iPhone 14 Pro",
        icon: Smartphone,
        location: "London, UK",
        lastActive: "Last active 1 day ago",
        isCurrent: false,
    },
    {
        device: "Windows - Dell XPS",
        icon: Laptop,
        location: "San Francisco, USA",
        lastActive: "Last active 3 days ago",
        isCurrent: false,
    },
];

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      phone: "",
      address: "",
      bio: "",
    },
    mode: "onChange",
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      communication_emails: false,
      marketing_emails: true,
      social_emails: true,
      security_emails: true,
    },
  });

  const handleNotificationsSubmit = notificationsForm.handleSubmit(data => {
    onNotificationsSubmit(data);
  });


  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  function onDeleteAccount() {
    toast({
        variant: "destructive",
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
    });
    logout();
  }

  const getInitials = (name: string | null) => {
    if (!name) return "";
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                  This is your public display name and email address.
              </CardDescription>
          </CardHeader>
          <CardContent>
             <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                            <AvatarFallback>
                            {user?.isGuest ? <UserIcon className="h-8 w-8" /> : getInitials(user?.displayName)}
                            </AvatarFallback>
                        </Avatar>
                         <div className="grid gap-1">
                            <p className="font-semibold">{user?.displayName}</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Your address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                              <Textarea placeholder="Tell us a little bit about yourself" {...field} />
                          </FormControl>
                           <FormDescription>
                              You can <span>@mention</span> other users and organizations.
                          </FormDescription>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                    <Button type="submit">Update profile</Button>
                </form>
            </Form>
          </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                  Manage your account's security settings.
              </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by enabling 2FA.
                </p>
                <div className="mt-4 flex items-center justify-between rounded-lg border p-4">
                    <label htmlFor="two-factor-auth" className="flex flex-col space-y-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <span>Enable Two-Factor Authentication</span>
                    </label>
                    <Switch id="two-factor-auth" />
                </div>
            </div>
             <div>
                <h3 className="text-lg font-medium">Login History</h3>
                <p className="text-sm text-muted-foreground">
                    Review recent logins to ensure your account's security.
                </p>
                <div className="mt-4 space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            {loginHistory.map((session, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <session.icon className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">{session.device}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {session.location} &bull; {session.lastActive}
                                            </p>
                                        </div>
                                    </div>
                                    {session.isCurrent ? (
                                        <span className="text-sm font-semibold text-green-600">Current Session</span>
                                    ) : (
                                        <Button variant="link" className="p-0 h-auto text-red-600 dark:text-blue-500 hover:text-red-700 dark:hover:text-blue-400">Log out</Button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Button variant="link" className="p-0 h-auto font-bold text-red-600 dark:text-blue-500 hover:text-red-700 dark:hover:text-blue-400">
                        Log out of all other sessions
                    </Button>
                </div>
            </div>
          </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                  Configure how you receive notifications.
              </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...notificationsForm}>
                <form onChange={handleNotificationsSubmit} className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <FormField
                        control={notificationsForm.control}
                        name="communication_emails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Communication emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about your account activity.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="marketing_emails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Marketing emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about new products, features, and special offers.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={notificationsForm.control}
                        name="social_emails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Social emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails for friend requests, follows, and other social interactions.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="security_emails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Security emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about your account security.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled
                                aria-readonly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Log out from your account or delete it permanently.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => logout()} variant="default">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDeleteAccount}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
