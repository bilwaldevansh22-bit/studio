
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Facebook, Mail, Phone, KeyRound, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignInForm() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Sign In Attempted",
      description: "This platform uses wallet-based authentication. Please connect your wallet to sign in.",
    });
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login Not Available`,
      description: `This DApp uses wallet-based authentication. Connect your wallet to proceed.`,
    });
  };
  
  const handleLinkClick = (feature: string) => {
     toast({
      title: "Feature Not Applicable",
      description: `${feature} is not available in a wallet-based authentication system.`,
    });
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
        <CardDescription>Sign in to access your TokenEstate account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" required className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-5 w-5" /> Sign In
          </Button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
            <Chrome className="mr-2 h-5 w-5" /> Google
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin('Facebook')}>
            <Facebook className="mr-2 h-5 w-5" /> Facebook
          </Button>
        </div>
         <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Phone Number')}>
                <Phone className="mr-2 h-5 w-5" /> Sign in with Phone
            </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 pt-4">
        <Button variant="link" size="sm" onClick={() => handleLinkClick('Password reset')}>Forgot your password?</Button>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" asChild size="sm" className="p-0 h-auto">
            <Link href="/">
              Sign Up
            </Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
