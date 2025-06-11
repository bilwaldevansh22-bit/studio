
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMetaMask } from "@/hooks/use-metamask";
import { useToast } from "@/hooks/use-toast";
import { UserCircle2, Mail, Edit, LogOut, ShieldCheck, Bell } from "lucide-react";
import React, { useState } from "react";

export default function ProfilePage() {
  const { account, isConnected } = useMetaMask();
  const { toast } = useToast();

  // Mock user data - replace with actual data fetching
  const [user, setUser] = useState({
    name: "Satoshi Nakamoto", // Placeholder
    email: "satoshi@example.com", // Placeholder
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profile Updated", description: "Your changes have been saved (simulated)." });
    setIsEditing(false);
  };
  
  const handleLogout = () => {
     toast({ title: "Logged Out", description: "You have been successfully logged out (simulated)." });
     // Add actual logout logic here: clear session, redirect, etc.
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <UserCircle2 className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-headline font-bold">User Profile</h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Account Information</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-5 w-5" />
              <span className="sr-only">{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
            </Button>
          </div>
          <CardDescription>View and manage your personal details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={account ? `https://avatar.vercel.sh/${account}.png` : `https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="profileName" className="font-semibold">Full Name</Label>
                {isEditing ? (
                  <Input id="profileName" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="text-lg font-medium mt-1" />
                ) : (
                  <p className="text-lg font-medium">{user.name}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileEmail" className="font-semibold">Email Address</Label>
              {isEditing ? (
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input id="profileEmail" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className="pl-10"/>
                </div>
              ) : (
                 <div className="flex items-center">
                    <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                    <p>{user.email}</p>
                </div>
              )}
            </div>
            
            {isConnected && account && (
              <div className="space-y-2">
                <Label className="font-semibold">Connected Wallet</Label>
                <p className="text-sm text-muted-foreground break-all bg-muted p-3 rounded-md">{account}</p>
              </div>
            )}

            {isEditing && (
              <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Security & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600"/>
                <span>Two-Factor Authentication</span>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
           </div>
           <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary"/>
                <span>Notification Settings</span>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
           </div>
        </CardContent>
      </Card>
      
      <Separator />

      <div className="flex justify-end">
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
