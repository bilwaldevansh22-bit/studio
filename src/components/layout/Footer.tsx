const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 mt-auto">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TokenEstate. All rights reserved.
        </p>
        <div className="text-xs text-muted-foreground mt-4 space-y-1">
           <p>
            Contact us: bilwal.devansh101@gmail.com | +91 99293 58681
          </p>
          <p>
            Disclaimer: This platform is for demonstration purposes only. All transactions are simulated.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
