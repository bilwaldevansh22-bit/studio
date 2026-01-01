
"use client";

import ThemeToggle from "@/components/settings/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Palette, 
  ShieldAlert, 
  Accessibility, 
  KeyRound, 
  History, 
  Contrast, 
  CaseSensitive as FontSize, 
  EyeOff, 
  ShieldCheck 
} from "lucide-react";
import React, { useState } from "react";

export default function SettingsPage() {
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <SettingsIcon className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
      </div>

      {/* Appearance Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center">
            <Palette className="h-6 w-6 mr-3 text-primary" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2 py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">
                Toggle between light and dark themes.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center">
            <ShieldAlert className="h-6 w-6 mr-3 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-600"/>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
           </div>
           <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
              <div className="flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-muted-foreground"/>
                <p className="text-sm font-medium">Change Password</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
           </div>
           <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
              <div className="flex items-center gap-3">
                <History className="h-5 w-5 text-muted-foreground"/>
                <p className="text-sm font-medium">Login History</p>
              </div>
              <Button variant="outline" size="sm">View History</Button>
           </div>
        </CardContent>
      </Card>

      {/* Accessibility Card */}
      <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center">
            <Accessibility className="h-6 w-6 mr-3 text-primary" />
            <CardTitle>Accessibility</CardTitle>
            </div>
            <CardDescription>Adjust settings for a better user experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="flex items-center gap-3 font-normal text-sm">
                    <FontSize className="h-5 w-5 text-muted-foreground" />
                    <span>Font Size</span>
                </Label>
                <Select defaultValue="medium">
                    <SelectTrigger id="font-size" className="w-[120px]">
                        <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Default</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="flex items-center gap-3 font-normal text-sm">
                    <Contrast className="h-5 w-5 text-muted-foreground" />
                    <span>High Contrast Mode</span>
                </Label>
                <Switch
                    id="high-contrast"
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                    aria-label="Toggle high contrast mode"
                />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion" className="flex items-center gap-3 font-normal text-sm">
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                    <span>Reduce Motion</span>
                </Label>
                <Switch
                    id="reduce-motion"
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                    aria-label="Toggle reduce motion"
                />
            </div>
        </CardContent>
      </Card>
      
      <Separator />

    </div>
  );
}
