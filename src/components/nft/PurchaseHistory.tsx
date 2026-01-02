
"use client";

import React, { useState, useEffect } from 'react';
import type { Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function PurchaseHistory() {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadHistory = () => {
      try {
        const storedHistory = localStorage.getItem('purchaseHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Failed to parse purchase history from localStorage", error);
        toast({
          variant: "destructive",
          title: "Error Loading History",
          description: "Could not load your transaction history from this browser.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
    
    // Listen for focus to get updates from other tabs
    window.addEventListener('focus', loadHistory);
    return () => {
      window.removeEventListener('focus', loadHistory);
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-10 bg-muted rounded-lg animate-pulse"></div>
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
        <History className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">No Purchase History</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          You have not purchased any property fractions yet.
        </p>
      </div>
    );
  }

  return (
    <Card className="shadow-md">
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead className="text-center">Fractions</TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.propertyName}</TableCell>
                <TableCell className="text-center">
                    <Badge variant="secondary">{tx.fractionsBought}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono">${tx.totalCost.toLocaleString()}</TableCell>
                <TableCell className="text-right text-muted-foreground text-xs">
                  {format(parseISO(tx.date), 'dd MMM yyyy, h:mm a')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
