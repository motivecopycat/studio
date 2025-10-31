
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Icons } from "@/components/icons";

const plans: any = {
  Pro: {
    monthly: 29,
    annually: 290,
  },
  Starter: {
      monthly: 0,
      annually: 0,
  }
};

function PaymentForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const isUpdate = searchParams.get("update") === 'true';
    const plan = isUpdate ? 'Starter' : searchParams.get("plan") || "Pro";
    const cycle = isUpdate ? 'monthly' : searchParams.get("cycle") || "monthly";
    const amount = plans[plan] ? plans[plan][cycle] : 0;

    const handlePayment = (method: string) => {
        // In a real app, you would integrate a payment gateway like Stripe
        toast({
            title: isUpdate ? "Payment Method Updated" : "Payment Successful!",
            description: isUpdate ? `Your payment details have been saved.` : `You have successfully subscribed to the ${plan} plan using ${method}.`,
        });
        router.push("/dashboard/subscription");
    };
    
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isUpdate ? "Update Payment Method" : "Payment"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isUpdate ? "Update your saved card details." : `Complete your subscription to the ${plan} plan.`}
                    </p>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Choose a payment method to complete the purchase.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                            <TabsTrigger value="upi">UPI</TabsTrigger>
                            <TabsTrigger value="gpay">Google Pay</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="pt-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry Date</Label>
                                        <Input id="expiry" placeholder="MM / YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="CVC" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="upi" className="pt-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="upi-id">UPI ID</Label>
                                    <Input id="upi-id" placeholder="yourname@bank" />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="gpay" className="pt-6 flex justify-center">
                           <Button variant="outline" className="h-14 text-lg" onClick={() => handlePayment('Google Pay')}>
                             <Icons.google className="mr-2 h-6 w-6" />
                             Pay with Google Pay
                           </Button>
                        </TabsContent>
                    </Tabs>

                    {!isUpdate && (
                        <div className="rounded-lg bg-muted p-4 mt-6">
                            <div className="flex justify-between font-semibold">
                                <span>{plan} Plan ({cycle})</span>
                                <span>₹{amount}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                                <span>Total</span>
                                <span>₹{amount.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                     <Tabs defaultValue="card" className="w-full">
                        <TabsContent value="card">
                           <Button className="w-full" onClick={() => handlePayment('Card')}>
                                {isUpdate ? "Update Card" : `Pay ₹${amount.toFixed(2)}`}
                            </Button>
                        </TabsContent>
                         <TabsContent value="upi">
                           <Button className="w-full" onClick={() => handlePayment('UPI')}>
                                {isUpdate ? "Update UPI" : `Pay ₹${amount.toFixed(2)} with UPI`}
                            </Button>
                        </TabsContent>
                     </Tabs>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentForm />
        </Suspense>
    );
}
