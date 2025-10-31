
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


const plans = [
  {
    name: "Starter",
    price: {
      monthly: 0,
      annually: 0,
    },
    description: "For individuals starting out",
    features: [
      "100 links per month",
      "Basic analytics",
      "Email support",
      "1 integration",
    ],
    cta: "Current Plan",
    current: true,
  },
  {
    name: "Pro",
    price: {
      monthly: 29,
      annually: 290,
    },
    description: "For professionals and small teams",
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Priority email support",
      "10 integrations",
      "API access",
    ],
    cta: "Upgrade",
    current: false,
  },
  {
    name: "Enterprise",
    price: {
      monthly: null,
      annually: null,
    },
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SAML/SSO",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
    current: false,
  },
];

const billingHistory = [
  {
    date: "2024-05-01",
    plan: "Starter",
    amount: "₹0.00",
    status: "Paid",
    invoiceId: "INV-20240501",
  },
  {
    date: "2024-04-01",
    plan: "Starter",
    amount: "₹0.00",
    status: "Paid",
    invoiceId: "INV-20240401",
  },
  {
    date: "2024-03-01",
    plan: "Starter",
    amount: "₹0.00",
    status: "Paid",
    invoiceId: "INV-20240301",
  },
];

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );
  const { toast } = useToast();

  const handleCancelSubscription = () => {
    toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been successfully cancelled.",
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your billing and subscription details.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Label htmlFor="billing-cycle" className={billingCycle === 'monthly' ? 'text-primary font-semibold' : ''}>Monthly</Label>
        <Switch
          id="billing-cycle"
          checked={billingCycle === "annually"}
          onCheckedChange={(checked) =>
            setBillingCycle(checked ? "annually" : "monthly")
          }
        />
        <Label htmlFor="billing-cycle" className={billingCycle === 'annually' ? 'text-primary font-semibold' : ''}>
            Annually <Badge variant="secondary" className="ml-2">Save 2 months</Badge>
        </Label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.current ? "border-primary" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
              <div className="text-4xl font-bold">
                {plan.price.monthly === null ? (
                  "Custom"
                ) : (
                  `₹${
                    billingCycle === "monthly"
                      ? plan.price.monthly
                      : plan.price.annually
                  }`
                )}
                <span className="text-sm font-normal text-muted-foreground">
                  {plan.price.monthly !== 0 && plan.price.monthly !== null &&
                    (billingCycle === "monthly" ? "/month" : "/year")}
                </span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={plan.current}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your are currently on the Starter plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center">
                <span>Renews on:</span>
                <span className="font-semibold">June 1, 2024</span>
             </div>
             <div className="flex justify-between items-center">
                <span>Price:</span>
                <span className="font-semibold">₹0.00/month</span>
             </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full">Update Payment Method</Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Cancel Subscription</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will cancel your subscription. You will lose access to Pro features at the end of your billing period.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Go Back</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelSubscription}>
                            Confirm Cancellation
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View and download your past invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((invoice) => (
                  <TableRow key={invoice.invoiceId}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === 'Paid' ? 'default' : 'destructive'}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
