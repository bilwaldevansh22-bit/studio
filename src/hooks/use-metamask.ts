"use client";
import { useState, useEffect, useCallback } from 'react';

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
      // setError('No accounts found. Please ensure your MetaMask wallet is unlocked and has accounts.');
    }
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setIsInstalled(true);
      // Check initial connection status
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          handleAccountsChanged(accounts);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.error('Error fetching accounts:', err);
          setError(err.message || 'Could not fetch accounts.');
          setIsLoading(false);
        });

      window.ethereum.on('accountsChanged', handleAccountsChanged);
    } else {
      setIsInstalled(false);
      setIsLoading(false);
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged]);

  const connectWallet = async () => {
    setError(null);
    setIsLoading(true);
    if (!isInstalled || typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install it to continue.');
      // Suggestion: window.open('https://metamask.io/download.html', '_blank');
      setIsLoading(false);
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      handleAccountsChanged(accounts as string[]);
    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err);
      if (err.code === 4001) { // User rejected request
        setError('Connection request rejected. Please try again.');
      } else {
        setError(err.message || 'Failed to connect wallet.');
      }
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isInstalled, isConnected, account, connectWallet, error, isLoading };
}