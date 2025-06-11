
"use client";
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MOCK_PROPERTIES } from '@/lib/constants';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Completed import
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coins, Tag, MapPin, ArrowLeft, ShoppingCart, Share2, BarChart2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useEffect } from 'react'; // Added React and useEffect

export default function TokenDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [fractionsToBuy, setFractionsToBuy] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const id = params.id as string;

  useEffect(() => {
    setIsLoading(true);
    const foundProperty = MOCK_PROPERTIES.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      toast({ title: "Error", description: "Property not found.", variant: "destructive" });
      router.push('/'); // Redirect if property not found
    }
    setIsLoading(false);
  }, [id, router, toast]);

  if (isLoading || !property) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-72 bg-muted rounded-lg"></div>
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-10 bg-muted rounded w-1/3 mt-4"></div>
        </div>
      </div>
    );
  }

  const fractionProgress = ((property.totalFractions - property.availableFractions) / property.totalFractions) * 100;
  const totalPrice = fractionsToBuy * property.pricePerFraction;

  const handleBuyFractions = () => {
    // Placeholder for actual buy logic with MetaMask
    toast({
      title: "Purchase Initiated (Demo)",
      description: `Attempting to buy ${fractionsToBuy} fraction(s) of ${property.name}. This is a demo.`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative">
            <Image
              src={property.imageUrl}
              alt={property.name}
              width={800}
              height={600}
              className="w-full h-full object-cover min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
              data-ai-hint={property.imageHint || "real estate detail"}
            />
            <Badge variant="secondary" className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-sm py-1 px-3">
              {property.propertyType}
            </Badge>
          </div>

          <div className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-headline font-bold tracking-tight">{property.name}</CardTitle>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 flex-grow">
              <p className="text-foreground/80 leading-relaxed">{property.description}</p>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold flex items-center"><Coins className="mr-2 h-5 w-5 text-primary"/>Price per Fraction:</Label>
                  <span className="text-2xl font-bold text-primary">${property.pricePerFraction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="font-medium flex items-center"><Tag className="mr-2 h-4 w-4 text-accent"/>Fractions Available:</Label>
                  <span className="font-semibold">{property.availableFractions.toLocaleString()} / {property.totalFractions.toLocaleString()}</span>
                </div>
                <Progress value={fractionProgress} className="h-2.5 my-2" aria-label={`${fractionProgress.toFixed(0)}% sold`} />
                <p className="text-sm text-muted-foreground text-right">{fractionProgress.toFixed(0)}% Sold</p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label htmlFor="fractionsToBuy" className="text-base font-semibold">Number of Fractions to Buy:</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="fractionsToBuy"
                    type="number"
                    value={fractionsToBuy}
                    onChange={(e) => setFractionsToBuy(Math.max(1, Math.min(parseInt(e.target.value) || 1, property.availableFractions)))}
                    min="1"
                    max={property.availableFractions}
                    className="w-24 text-center"
                  />
                  <span className="text-lg font-semibold">Total: ${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 bg-muted/30 border-t flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex-grow bg-accent hover:bg-accent/90 text-accent-foreground" 
                onClick={handleBuyFractions}
                disabled={property.availableFractions === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> {property.availableFractions === 0 ? 'Sold Out' : 'Buy Fractions'}
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Share2 className="mr-2 h-5 w-5" /> Share
              </Button>
               <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <BarChart2 className="mr-2 h-5 w-5" /> View Analytics
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
