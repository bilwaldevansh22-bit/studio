"use client";

import ThemeToggle from "@/components/settings/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
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
import React, { useState, useEffect } from "react";

type FontSize = 'small' | 'medium' | 'large';

export default function SettingsPage() {
  const { toast } = useToast();
  
  // State for accessibility features
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  // Load settings from localStorage on initial render
  useEffect(() => {
    const storedContrast = localStorage.getItem('highContrast') === 'true';
    const storedMotion = localStorage.getItem('reduceMotion') === 'true';
    const storedFontSize = localStorage.getItem('fontSize') as FontSize || 'medium';

    setHighContrast(storedContrast);
    setReduceMotion(storedMotion);
    setFontSize(storedFontSize);

    document.documentElement.classList.toggle('high-contrast', storedContrast);
    document.documentElement.classList.toggle('reduce-motion', storedMotion);
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
    document.documentElement.classList.add(`font-${storedFontSize}`);
  }, []);

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Demo Action",
      description: `The "${featureName}" feature is for demonstration purposes.`,
    });
  };

  const handleHighContrastToggle = (checked: boolean) => {
    setHighContrast(checked);
    localStorage.setItem('highContrast', String(checked));
    document.documentElement.classList.toggle('high-contrast', checked);
    toast({
      title: `High Contrast ${checked ? 'Enabled' : 'Disabled'}`,
    });
  };

  const handleReduceMotionToggle = (checked: boolean) => {
    setReduceMotion(checked);
    localStorage.setItem('reduceMotion', String(checked));
    document.documentElement.classList.toggle('reduce-motion', checked);
     toast({
      title: `Reduce Motion ${checked ? 'Enabled' : 'Disabled'}`,
    });
  };

  const handleFontSizeChange = (value: FontSize) => {
    setFontSize(value);
    localStorage.setItem('fontSize', value);
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
    document.documentElement.classList.add(`font-${value}`);
     toast({
      title: `Font Size set to ${value}`,
    });
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center space-x-4">
          <SettingsIcon className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-headline font-bold">Settings</h1>
        </div>

        {/* Appearance Card */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center">
              <Palette className="h-6 w-6 mr-3 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between space-x-2 py-3">
              <Label htmlFor="theme-toggle-switch" className="font-medium">
                Dark Mode
                <p className="text-xs text-muted-foreground font-normal">
                  Toggle between light and dark themes.
                </p>
              </Label>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="shadow-lg rounded-xl">
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
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("2FA Management")}>Manage</Button>
             </div>
             <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                <div className="flex items-center gap-3">
                  <KeyRound className="h-5 w-5 text-muted-foreground"/>
                  <p className="text-sm font-medium">Change Password</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("Change Password")}>Change</Button>
             </div>
             <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-muted-foreground"/>
                  <p className="text-sm font-medium">Login History</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("Login History")}>View History</Button>
             </div>
          </CardContent>
        </Card>

        {/* Accessibility Card */}
        <Card className="shadow-lg rounded-xl">
            <CardHeader>
                <div className="flex items-center">
                <Accessibility className="h-6 w-6 mr-3 text-primary" />
                <CardTitle>Accessibility</CardTitle>
                </div>
                <CardDescription>Adjust settings for a better user experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="flex items-center gap-3 text-sm">
                        <FontSize className="h-5 w-5 text-muted-foreground" />
                        <span>Font Size</span>
                    </Label>
                    <Select value={fontSize} onValueChange={(value: FontSize) => handleFontSizeChange(value)}>
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
                    <Label htmlFor="high-contrast" className="flex items-center gap-3 text-sm">
                        <Contrast className="h-5 w-5 text-muted-foreground" />
                        <span>High Contrast Mode</span>
                    </Label>
                    <Switch
                        id="high-contrast"
                        checked={highContrast}
                        onCheckedChange={handleHighContrastToggle}
                        aria-label="Toggle high contrast mode"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="reduce-motion" className="flex items-center gap-3 text-sm">
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                        <span>Reduce Motion</span>
                    </Label>
                    <Switch
                        id="reduce-motion"
                        checked={reduceMotion}
                        onCheckedChange={handleReduceMotionToggle}
                        aria-label="Toggle reduce motion"
                    />
                </div>
            </CardContent>
        </Card>
      
      </div>
    </div>
  );
}
