"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Tag, Home, DollarSign, Hash, Edit3, MapPin } from "lucide-react";
import React, { useState } from "react";
import type { Property } from "@/lib/types";
import { PROPERTY_TYPES } from "@/lib/constants";

export default function CreateNftForm() {
  const { toast } = useToast();
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState<Property['propertyType'] | ''>('');
  const [totalSupply, setTotalSupply] = useState('');
  const [pricePerFraction, setPricePerFraction] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFileName(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!propertyType) {
        toast({
            title: "Validation Error",
            description: "Please select a property type.",
            variant: "destructive",
        });
        return;
    }
    setIsSubmitting(true);
    // In a real app, this would call a smart contract function
    setTimeout(() => {
      toast({
        title: "NFT Creation Initiated (Demo)",
        description: `Creating NFT for ${propertyName}. This is a demo.`,
      });
      // Reset form
      setPropertyName('');
      setLocation('');
      setDescription('');
      setPropertyType('');
      setTotalSupply('');
      setPricePerFraction('');
      setImagePreview(null);
      setFileName(null);
      (event.target as HTMLFormElement).reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center">
          <Edit3 className="mr-3 h-7 w-7 text-primary" /> Tokenize Your Property
        </CardTitle>
        <CardDescription>Fill in the details below to create an NFT for your real estate.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="propertyName" className="font-semibold">Property Name</Label>
            <div className="relative mt-1.5">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="propertyName" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} placeholder="e.g., Sunny Vale Villa" required className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="font-semibold">Location</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 123 Main St, Anytown, USA" required className="pl-10" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="propertyType" className="font-semibold">Property Type</Label>
            <Select required value={propertyType} onValueChange={(value) => setPropertyType(value as Property['propertyType'])}>
              <SelectTrigger id="propertyType" className="mt-1.5">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map(type => (
                   <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="font-semibold">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A detailed and compelling description of the property..." required className="mt-1.5 min-h-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="totalSupply" className="font-semibold">Total Fractions (Supply)</Label>
              <div className="relative mt-1.5">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="totalSupply" type="number" value={totalSupply} onChange={(e) => setTotalSupply(e.target.value)} placeholder="e.g., 1000" required min="1" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="pricePerFraction" className="font-semibold">Price per Fraction (USD)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="pricePerFraction" type="number" value={pricePerFraction} onChange={(e) => setPricePerFraction(e.target.value)} placeholder="e.g., 150" required min="0.01" step="0.01" className="pl-10" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="propertyImage" className="font-semibold">Property Image</Label>
            <div className="mt-1.5 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-border hover:border-primary transition-colors">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Property preview" className="mx-auto h-32 w-auto rounded-md object-contain" />
                ) : (
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                )}
                <div className="flex text-sm text-muted-foreground items-center justify-center">
                  <Label
                    htmlFor="propertyImage"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring"
                  >
                    <span>Upload a file</span>
                    <Input id="propertyImage" name="propertyImage" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" required />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground">{fileName || "PNG, JPG, GIF up to 10MB"}</p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
            <Tag className="mr-2 h-5 w-5" /> 
            {isSubmitting ? 'Creating Token...' : 'Create NFT Token'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
          By creating an NFT, you agree to TokenEstate&apos;s Terms of Service. Blockchain transaction fees may apply.
        </p>
      </CardFooter>
    </Card>
  );
}
