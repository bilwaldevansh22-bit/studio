
"use client";

import React, { useState, useEffect } from 'react';
import type { OwnedShare } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Coins, PiggyBank, Repeat, Tag, Trash2, X } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"


export default function OwnedShares() {
  const [shares, setShares] = useState<OwnedShare[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // This component now checks for updates on mount and when window gets focus
    const loadShares = () => {
      try {
        const storedShares = localStorage.getItem('ownedShares');
        if (storedShares) {
          setShares(JSON.parse(storedShares));
        }
      } catch (error) {
        console.error("Failed to parse owned shares from localStorage", error);
        toast({
          variant: "destructive",
          title: "Error Loading Shares",
          description: "Could not load your property shares from this browser.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadShares();
    
    // Listen for window focus to update shares, as they might be bought in another tab
    window.addEventListener('focus', loadShares);
    
    return () => {
      window.removeEventListener('focus', loadShares);
    };
  }, [toast]);

  const handleResell = (share: OwnedShare, amount: number) => {
    // In a real app, this would trigger a smart contract function to list the shares for sale.
    toast({
      title: "Resell Initiated (Demo)",
      description: `Putting ${amount} fractions of ${share.name} up for sale.`,
    });
  };

  const handleRemove = (shareId: string) => {
    // This is for demo purposes to clear the localStorage state
    const updatedShares = shares.filter(s => s.id !== shareId);
    setShares(updatedShares);
    localStorage.setItem('ownedShares', JSON.stringify(updatedShares));
    toast({
      title: "Share Removed",
      description: "This share has been removed from your local portfolio (demo).",
    });
  }
  

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-muted rounded-lg animate-pulse"></div>
        <div className="h-24 bg-muted rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (shares.length === 0) {
    return (
      <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
        <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">No Shares Owned</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your portfolio is empty. Purchase property fractions to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {shares.map(share => (
        <Card key={share.id} className="shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <Image
              src={share.imageUrl}
              alt={share.name}
              width={100}
              height={100}
              className="rounded-md object-cover h-24 w-24"
            />
            <div className="flex-grow">
              <h4 className="font-semibold text-lg">{share.name}</h4>
              <p className="text-sm text-muted-foreground">{share.location}</p>
              <div className="flex items-center text-sm mt-2">
                <Tag className="h-4 w-4 mr-2 text-primary" />
                You own <strong className="mx-1">{share.fractionsOwned}</strong> fractions
              </div>
            </div>
            <div className="flex flex-col gap-2">
               <ResellDialog share={share} onResell={handleResell} />
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" title="Remove from local demo">
                      <Trash2 className="mr-2 h-4 w-4"/> Clear
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the item from your simulated portfolio on this device. This is a demo-only action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemove(share.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


interface ResellDialogProps {
  share: OwnedShare;
  onResell: (share: OwnedShare, amount: number) => void;
}

function ResellDialog({ share, onResell }: ResellDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(share.pricePerFraction);

  const handleConfirmResell = () => {
    onResell(share, amount);
    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Repeat className="mr-2 h-4 w-4" /> Resell
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resell Fractions of {share.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Set the number of fractions and the price per fraction you want to list on the marketplace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 my-4">
            <div className="space-y-2">
                <Label htmlFor="resell-amount">Fractions to Sell (You own {share.fractionsOwned})</Label>
                 <Input 
                    id="resell-amount" 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Math.max(1, Math.min(share.fractionsOwned, parseInt(e.target.value) || 1)))}
                    min="1"
                    max={share.fractionsOwned}
                  />
            </div>
             <div className="space-y-2">
                <Label htmlFor="resell-price">Price per Fraction ($)</Label>
                <div className="relative">
                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="resell-price" 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        min="0.01"
                        step="0.01"
                        className="pl-10"
                    />
                </div>
            </div>
        </div>
        <Separator />
        <div className="mt-2 text-center text-lg font-semibold">
            Total Potential Earnings: ${(amount * price).toLocaleString()}
        </div>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmResell}>Confirm & List</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
