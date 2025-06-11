import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, MapPin, Tag } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const fractionProgress = ( (property.totalFractions - property.availableFractions) / property.totalFractions) * 100;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full animate-fade-in group">
      <CardHeader className="p-0 relative">
        <Link href={`/token/${property.id}`} className="block">
          <Image
            src={property.imageUrl}
            alt={property.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={property.imageHint || "real estate"}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
          {property.propertyType}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/token/${property.id}`}>
            <CardTitle className="text-lg font-headline mb-1 leading-tight group-hover:text-primary transition-colors">{property.name}</CardTitle>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{property.location}</span>
        </div>
        <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{property.description}</p>
        
        <div className="text-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center"><Coins className="h-4 w-4 mr-1.5 text-primary"/>Price/Fraction:</span>
            <span className="font-semibold text-primary">${property.pricePerFraction}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center"><Tag className="h-4 w-4 mr-1.5 text-accent"/>Available:</span>
            <span className="font-semibold">{property.availableFractions} / {property.totalFractions}</span>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-1.5 mt-3 mb-1">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${fractionProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground text-right">{fractionProgress.toFixed(0)}% Sold</p>

      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/token/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;