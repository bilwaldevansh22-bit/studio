import Link from 'next/link';
import { Building2 } from 'lucide-react'; // Using Building2 as a more distinct real estate icon

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity duration-300">
      <Building2 className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="text-xl sm:text-2xl font-headline font-semibold">TokenEstate</span>
    </Link>
  );
};

export default Logo;