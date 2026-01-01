"use client";
import Link from 'next/link';
import Logo from '@/components/common/Logo';
import ConnectWalletButton from '@/components/common/ConnectWalletButton';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, PlusCircle, UserCircle2, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from 'react';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Button variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
    <Link href={href} onClick={onClick}>{children}</Link>
  </Button>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="mr-3 h-5 w-5" /> },
    { href: "/create-token", label: "Create Token", icon: <PlusCircle className="mr-3 h-5 w-5" /> },
    { href: "/profile", label: "Profile", icon: <UserCircle2 className="mr-3 h-5 w-5" /> },
    { href: "/settings", label: "Settings", icon: <Settings className="mr-3 h-5 w-5" /> },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
             <ConnectWalletButton />
          </div>
         
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
              <div className="flex h-full flex-col">
                <div className="p-4 flex justify-between items-center border-b">
                  <Logo />
                   <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  {navLinks.map(link => (
                    <Button key={link.href} variant="ghost" asChild className="justify-start text-base py-6" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href={link.href} className="flex items-center">
                        {link.icon} {link.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t">
                  <ConnectWalletButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
