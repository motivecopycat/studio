
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const plans: any = {
  Pro: {
    monthly: 29,
    annually: 290,
  },
};

function PaymentForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const plan = searchParams.get("plan") || "Pro";
    const cycle = searchParams.get("cycle") || "monthly";
    const amount = plans[plan] ? plans[plan][cycle] : 0;

    const handlePayment = () => {
        // In a real app, you would integrate a payment gateway like Stripe
        toast({
            title: "Payment Successful!",
            description: `You have successfully subscribed to the ${plan} plan.`,
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
                    <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
                    <p className="text-muted-foreground">
                    Complete your subscription to the {plan} plan.
                    </p>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Enter your card information to complete the purchase.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                     <div className="rounded-lg bg-muted p-4">
                        <div className="flex justify-between font-semibold">
                            <span>{plan} Plan ({cycle})</span>
                            <span>₹{amount}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>Tax (20%)</span>
                            <span>₹{(amount * 0.2).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                            <span>Total</span>
                            <span>₹{(amount * 1.2).toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handlePayment}>Pay ₹{(amount * 1.2).toFixed(2)}</Button>
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
