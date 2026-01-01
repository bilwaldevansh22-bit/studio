"use client";
import React, { useState, useMemo, useEffect } from 'react';
import PropertyCard from '@/components/nft/PropertyCard';
import TokenFilters from '@/components/nft/TokenFilters';
import { MOCK_PROPERTIES } from '@/lib/constants';
import type { Property, FilterOptions } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [allProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [filters, setFilters] = useState<FilterOptions>({ sortBy: 'date-desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);


  const filteredProperties = useMemo(() => {
    let properties = [...allProperties];

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      properties = properties.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      properties = properties.filter(p => filters.propertyType!.includes(p.propertyType));
    }

    if (filters.priceRange) {
      properties = properties.filter(
        p => p.pricePerFraction >= filters.priceRange![0] && p.pricePerFraction <= filters.priceRange![1]
      );
    }
    
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          properties.sort((a, b) => a.pricePerFraction - b.pricePerFraction);
          break;
        case 'price-desc':
          properties.sort((a, b) => b.pricePerFraction - a.pricePerFraction);
          break;
        case 'date-asc':
          properties.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
          break;
        case 'date-desc':
        default:
          properties.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
          break;
      }
    }

    return properties;
  }, [allProperties, filters]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters: FilterOptions) => {
    setIsLoading(true);
    setFilters(newFilters);
    setCurrentPage(1); 
    setTimeout(() => setIsLoading(false), 500); 
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-12 flex justify-center items-center space-x-2">
        {pageNumbers.map(number => (
          <Button
            key={number}
            variant={currentPage === number ? 'default' : 'outline'}
            onClick={() => setCurrentPage(number)}
            className="w-10 h-10"
          >
            {number}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 via-background to-accent/10 rounded-xl shadow-inner">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Discover Your Next Real Estate Investment
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Explore tokenized properties, buy fractions, and build your decentralized real estate portfolio.
        </p>
      </section>

      <TokenFilters onFilterChange={handleFilterChange} initialFilters={filters} />
      
      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <div key={index} className="bg-card p-4 rounded-xl shadow-md animate-pulse">
              <div className="h-48 bg-muted rounded-lg mb-4"></div>
              <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-muted rounded mb-4"></div>
              <div className="h-10 w-full bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : paginatedProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.map((property, index) => (
              <div key={property.id} style={{ animationDelay: `${index * 0.05}s` }} className="animate-fade-in">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
          {renderPagination()}
        </>
      ) : (
        <div className="text-center py-16 bg-card rounded-xl shadow-md border">
          <SearchX className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-headline font-semibold text-foreground">No Properties Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or check back later for new listings.
          </p>
        </div>
      )}
    </div>
  );
}