
"use client";

import ThemeToggle from "@/components/settings/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Palette, ShieldCheck } from "lucide-react"; // Added Palette and ShieldCheck
import React from "react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <SettingsIcon className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
      </div>

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

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center">
            <ShieldCheck className="h-6 w-6 mr-3 text-primary" />
            <CardTitle>Essential Features</CardTitle>
          </div>
          <CardDescription>Manage other application settings here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              More settings and features will be available here soon.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              (Placeholder for other essential features)
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

    </div>
  );
}
