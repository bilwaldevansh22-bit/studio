import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, MapPin, Tag } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const fractionProgress = ( (property.totalFractions - property.availableFractions) / property.totalFractions) * 100;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full rounded-xl group">
      <CardHeader className="p-0 relative">
        <Link href={`/token/${property.id}`} className="block aspect-[4/3] relative">
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={property.imageHint || "real estate"}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
          {property.propertyType}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={`/token/${property.id}`} className='block'>
            <CardTitle className="text-lg font-headline mb-1 leading-tight group-hover:text-primary transition-colors">{property.name}</CardTitle>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span>{property.location}</span>
        </div>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2 flex-grow">{property.description}</p>
        
        <div className="text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center"><Coins className="h-4 w-4 mr-1.5 text-primary"/>Price/Fraction:</span>
            <span className="font-semibold text-primary">${property.pricePerFraction.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center"><Tag className="h-4 w-4 mr-1.5 text-accent"/>Available:</span>
            <span className="font-semibold">{property.availableFractions.toLocaleString()} / {property.totalFractions.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <Progress value={fractionProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">{fractionProgress.toFixed(0)}% Sold</p>
        </div>

      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/token/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
