
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
  ShieldCheck,
  Server
} from "lucide-react";
import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import Image from "next/image";

type FontSize = 'small' | 'medium' | 'large';

export default function SettingsPage() {
  const { toast } = useToast();
  
  // State for accessibility features
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [is2faEnabled, setIs2faEnabled] = useState(false);


  // Load settings from localStorage on initial render
  useEffect(() => {
    const storedContrast = localStorage.getItem('highContrast') === 'true';
    const storedMotion = localStorage.getItem('reduceMotion') === 'true';
    const storedFontSize = localStorage.getItem('fontSize') as FontSize || 'medium';
    const stored2fa = localStorage.getItem('is2faEnabled') === 'true';

    setHighContrast(storedContrast);
    setReduceMotion(storedMotion);
    setFontSize(storedFontSize);
    setIs2faEnabled(stored2fa);

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
  
  const handleToggle2FA = () => {
    const newState = !is2faEnabled;
    setIs2faEnabled(newState);
    localStorage.setItem('is2faEnabled', String(newState));
    toast({
        title: `Two-Factor Authentication ${newState ? 'Enabled' : 'Disabled'}`,
        description: "This is a demo and your account is not more or less secure."
    });
  }


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
              <Label htmlFor="theme-toggle-switch" className="font-medium flex flex-col gap-1">
                Dark Mode
                <span className="text-xs text-muted-foreground font-normal">
                  Toggle between light and dark themes.
                </span>
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
                  <ShieldCheck className={`h-5 w-5 ${is2faEnabled ? 'text-green-600' : 'text-muted-foreground'}`}/>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                </div>
                <TwoFactorAuthDialog isEnabled={is2faEnabled} onToggle={handleToggle2FA} />
             </div>
             <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-muted-foreground"/>
                  <p className="text-sm font-medium">Manage Connected Sessions</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("Manage Sessions")}>Manage</Button>
             </div>
             <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-muted-foreground"/>
                  <p className="text-sm font-medium">Login History</p>
                </div>
                <LoginHistoryDialog />
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
                    <Label htmlFor="font-size-select" className="flex items-center gap-3 text-sm">
                        <FontSize className="h-5 w-5 text-muted-foreground" />
                        <span>Font Size</span>
                    </Label>
                    <Select value={fontSize} onValueChange={(value: FontSize) => handleFontSizeChange(value)}>
                        <SelectTrigger id="font-size-select" className="w-[120px]">
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


// Demo Dialog for 2FA
function TwoFactorAuthDialog({ isEnabled, onToggle }: { isEnabled: boolean, onToggle: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onToggle();
    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">{isEnabled ? 'Disable' : 'Enable'}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{isEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication?</AlertDialogTitle>
        </AlertDialogHeader>
        {isEnabled ? (
           <AlertDialogDescription>
            Disabling 2FA will reduce your account's security. Are you sure you want to proceed?
          </AlertDialogDescription>
        ) : (
          <div>
            <AlertDialogDescription className="mb-4">
              Scan the QR code with your authenticator app (e.g., Google Authenticator) and enter the code below to enable 2FA. This is a demonstration.
            </AlertDialogDescription>
            <div className="flex justify-center p-4 bg-white rounded-lg">
               <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/TokenEstate:satoshi@example.com?secret=JBSWY3DPEHPK3PXP&issuer=TokenEstate" width={150} height={150} alt="Demo QR Code" />
            </div>
            <div className="mt-4">
              <Label htmlFor="2fa-code">Verification Code</Label>
              <Input id="2fa-code" placeholder="123456" className="mt-1" />
            </div>
          </div>
        )}
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {isEnabled ? 'Confirm Disable' : 'Confirm Enable'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Demo Dialog for Login History
function LoginHistoryDialog() {
  const mockHistory = [
    { id: 1, device: 'Chrome on macOS', location: 'New York, USA', time: '2 hours ago' },
    { id: 2, device: 'Mobile App on iOS', location: 'London, UK', time: '1 day ago' },
    { id: 3, device: 'Firefox on Windows', location: 'Tokyo, Japan', time: '3 days ago' },
  ]
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">View History</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recent Login Activity</AlertDialogTitle>
          <AlertDialogDescription>
            Here is a list of recent sign-ins to your account. This is for demonstration purposes only.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3 mt-2">
          {mockHistory.map(item => (
            <div key={item.id} className="text-sm p-3 bg-secondary/50 rounded-md">
              <p className="font-semibold">{item.device}</p>
              <p className="text-muted-foreground">{item.location} - <span className="italic">{item.time}</span></p>
            </div>
          ))}
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
