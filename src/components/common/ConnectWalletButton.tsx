"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMetaMask } from "@/hooks/use-metamask";
import { Wallet, LogOut, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ConnectWalletButton = () => {
  const { connectWallet, isConnected, account, error, isLoading, isInstalled } = useMetaMask();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Wallet Connection Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  const handleConnect = async () => {
    if (!isInstalled) {
       toast({
        title: "MetaMask Not Found",
        description: "Please install the MetaMask extension to connect your wallet.",
        variant: "destructive",
        action: (
          <Button variant="outline" size="sm" onClick={() => window.open('https://metamask.io/download.html', '_blank')}>
            Install MetaMask
          </Button>
        ),
      });
      return;
    }
    await connectWallet();
  };

  if (isLoading) {
    return <Button disabled variant="outline" className="animate-pulse w-36"><div className="h-4 w-24 bg-muted-foreground/30 rounded"></div></Button>;
  }

  if (isConnected && account) {
    const shortAccount = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://avatar.vercel.sh/${account}.png`} alt="User Avatar" />
              <AvatarFallback>{account.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {shortAccount}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Connected Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs break-all">
            {account}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { /* Implement disconnect logic if needed */ console.log("Disconnecting..."); toast({title: "Wallet Disconnected (Simulated)"}) }} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={handleConnect} variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
      <Wallet className="mr-2 h-5 w-5" />
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;