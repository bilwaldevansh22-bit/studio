
"use client";
import { useState, useEffect, useCallback } from 'react';

// EIP-1193 provider interface
interface EIP1193Provider {
  request: (request: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, listener: (...args: any[]) => void) => void;
  removeListener: (event: string, listener: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EIP1193Provider;
  }
}

export interface MetaMaskState {
  isInstalled: boolean;
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export function useMetaMask(): MetaMaskState {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
      setError(null);
    } else {
      setAccount(null);
      setIsConnected(false);
      // You can uncomment the line below to provide a message when the wallet is locked or has no accounts.
      // setError('No accounts found. Please ensure your MetaMask wallet is unlocked.');
    }
  }, []);

  useEffect(() => {
    // This effect runs once on mount to check for MetaMask and existing connections.
    if (window.ethereum) {
      setIsInstalled(true);
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          handleAccountsChanged(accounts);
        })
        .catch((err: any) => {
          console.error('Error fetching initial accounts:', err);
          setError('An error occurred while checking for connected accounts.');
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Set up listener for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    } else {
      setIsInstalled(false);
      setIsLoading(false);
    }

    // Cleanup listener on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged]);

  const connectWallet = async () => {
    if (!isInstalled) {
      setError('MetaMask is not installed. Please install the extension to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const accounts = await window.ethereum!.request({ method: 'eth_requestAccounts' });
      handleAccountsChanged(accounts as string[]);
    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err);
      if (err.code === 4001) { // EIP-1193 user-rejection error
        setError('Connection request rejected. Please approve the connection in MetaMask.');
      } else {
        setError(err.message || 'Failed to connect wallet. Please try again.');
      }
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isInstalled, isConnected, account, connectWallet, error, isLoading };
}
