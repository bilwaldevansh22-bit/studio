
"use client";
import Link from 'next/link';
import Logo from '@/components/common/Logo';
import ConnectWalletButton from '@/components/common/ConnectWalletButton';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, PlusCircle, UserCircle2, Settings } from 'lucide-react'; // Added Settings
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import React from 'react';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Button variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
    <Link href={href} onClick={onClick}>{children}</Link>
  </Button>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { href: "/create-token", label: "Create Token", icon: <PlusCircle className="mr-2 h-4 w-4" /> },
    { href: "/profile", label: "Profile", icon: <UserCircle2 className="mr-2 h-4 w-4" /> },
    { href: "/settings", label: "Settings", icon: <Settings className="mr-2 h-4 w-4" /> }, // Added Settings link
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
             <ConnectWalletButton />
          </div>
         
          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <Logo />
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map(link => (
                    <Button key={link.href} variant="ghost" asChild className="justify-start text-base" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href={link.href} className="flex items-center">
                        {link.icon} {link.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
                <div className="pt-4 border-t border-border">
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
