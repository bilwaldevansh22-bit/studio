"use client";
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MOCK_PROPERTIES } from '@/lib/constants';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coins, Tag, MapPin, ArrowLeft, ShoppingCart, Share2, BarChart2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useEffect } from 'react';
import { useMetaMask } from '@/hooks/use-metamask';
import { ethers } from 'ethers';

// This is a placeholder for the actual price from an oracle
const ETH_TO_USD_RATE = 3000; 

export default function TokenDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { account, isConnected, isInstalled, connectWallet } = useMetaMask();

  const [property, setProperty] = useState<Property | null>(null);
  const [fractionsToBuy, setFractionsToBuy] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    setIsLoading(true);
    // In a real app, you'd fetch this from the blockchain or a backend
    const foundProperty = MOCK_PROPERTIES.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      toast({ title: "Error", description: "Property not found.", variant: "destructive" });
      router.push('/');
    }
    setIsLoading(false);
  }, [id, router, toast]);

  const handleBuyFractions = async () => {
    if (!isInstalled) {
      toast({ title: "MetaMask Not Found", description: "Please install MetaMask to proceed.", variant: "destructive" });
      return;
    }
    if (!isConnected) {
      await connectWallet();
      return;
    }
    if (!property) return;

    setIsBuying(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      
      const usdAmount = fractionsToBuy * property.pricePerFraction;
      const ethAmount = usdAmount / ETH_TO_USD_RATE;
      const amountToSend = ethers.parseEther(ethAmount.toString());

      // In a real app, this would be the address of your marketplace smart contract
      const recipientAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Vitalik Buterin's address for demo

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountToSend,
      });

      toast({ title: "Transaction Sent", description: `Transaction hash: ${tx.hash}. Waiting for confirmation...` });

      await tx.wait();

      // SIMULATION: Update local storage to reflect newly "owned" shares
      const existingShares = JSON.parse(localStorage.getItem('ownedShares') || '[]');
      const existingShareIndex = existingShares.findIndex((s: any) => s.id === property.id);

      if (existingShareIndex > -1) {
        existingShares[existingShareIndex].fractionsOwned += fractionsToBuy;
      } else {
        existingShares.push({ ...property, fractionsOwned: fractionsToBuy });
      }
      localStorage.setItem('ownedShares', JSON.stringify(existingShares));

      toast({
        title: "Purchase Successful!",
        description: `You have successfully purchased ${fractionsToBuy} fraction(s) of ${property.name}. View them in your profile.`,
      });
      
      // In a real app, you'd refetch property data here to show updated available fractions.
      // For this demo, we'll just optimistically update it.
      setProperty(prev => prev ? { ...prev, availableFractions: prev.availableFractions - fractionsToBuy } : null);

    } catch (error: any) {
      console.error("Transaction failed:", error);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error?.reason || error?.message || "An unknown error occurred.",
      });
    } finally {
      setIsBuying(false);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Property link has been copied to your clipboard.",
    });
  }

  const handleViewAnalytics = () => {
     toast({
      title: "Analytics Coming Soon!",
      description: "Detailed property analytics will be available in a future update.",
    });
  }


  if (isLoading || !property) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-pulse space-y-4 w-full max-w-5xl">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="h-96 bg-muted rounded-xl"></div>
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-12 bg-muted rounded-lg w-1/3 mt-4"></div>
        </div>
      </div>
    );
  }

  const fractionProgress = ((property.totalFractions - property.availableFractions) / property.totalFractions) * 100;
  const totalPrice = fractionsToBuy * property.pricePerFraction;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
      </Button>

      <Card className="overflow-hidden shadow-xl rounded-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-full min-h-[300px] md:min-h-[500px]">
            <Image
              src={property.imageUrl}
              alt={property.name}
              fill
              className="object-cover"
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
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-baseline">
                  <Label className="text-base font-semibold flex items-center"><Coins className="mr-2 h-5 w-5 text-primary"/>Price per Fraction:</Label>
                  <span className="text-2xl font-bold text-primary">${property.pricePerFraction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <Label className="font-medium flex items-center"><Tag className="mr-2 h-4 w-4 text-accent"/>Fractions Available:</Label>
                  <span className="font-semibold">{property.availableFractions.toLocaleString()} / {property.totalFractions.toLocaleString()}</span>
                </div>
                <div className="space-y-1">
                  <Progress value={fractionProgress} className="h-2" aria-label={`${fractionProgress.toFixed(0)}% sold`} />
                  <p className="text-sm text-muted-foreground text-right">{fractionProgress.toFixed(0)}% Sold</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label htmlFor="fractionsToBuy" className="text-base font-semibold">Number of Fractions to Buy:</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="fractionsToBuy"
                    type="number"
                    value={fractionsToBuy}
                    onChange={(e) => setFractionsToBuy(Math.max(1, Math.min(parseInt(e.target.value) || 1, property.availableFractions)))}
                    min="1"
                    max={property.availableFractions}
                    className="w-24 text-center"
                    disabled={property.availableFractions === 0}
                  />
                  <span className="text-lg font-semibold whitespace-nowrap">Total: ${totalPrice.toLocaleString()}</span>
                </div>
                 <p className="text-sm text-muted-foreground ml-1">~{(totalPrice / ETH_TO_USD_RATE).toFixed(4)} ETH</p>
              </div>
            </CardContent>

            <CardFooter className="p-4 bg-muted/30 border-t flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex-grow" 
                onClick={handleBuyFractions}
                disabled={isBuying || property.availableFractions === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {isBuying ? 'Processing...' : (property.availableFractions === 0 ? 'Sold Out' : (isConnected ? 'Buy Fractions' : 'Connect Wallet to Buy'))}
              </Button>
              <div className="w-full sm:w-auto flex gap-3">
                <Button size="lg" variant="outline" className="w-full" onClick={handleShare}>
                  <Share2 className="mr-2 h-5 w-5" /> Share
                </Button>
                 <Button size="lg" variant="outline" className="w-full" onClick={handleViewAnalytics}>
                  <BarChart2 className="mr-2 h-5 w-5" /> Analytics
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
