"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, RefreshCw } from 'lucide-react';
import type { FilterOptions, Property } from '@/lib/types';
import { PROPERTY_TYPES } from '@/lib/constants';

interface TokenFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const TokenFilters: React.FC<TokenFiltersProps> = ({ onFilterChange, initialFilters = {} }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<Property['propertyType'][]>(initialFilters.propertyType || []);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [0, 1000]);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'date-desc');
  
  useEffect(() => {
    // Automatically apply filters when sortBy changes
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);


  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      propertyType: selectedPropertyTypes.length > 0 ? selectedPropertyTypes : undefined,
      priceRange: priceRange[0] === 0 && priceRange[1] === 1000 ? undefined : priceRange,
      sortBy: sortBy as FilterOptions['sortBy'],
    });
  };
  
  const handleSearchOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  }

  const handlePropertyTypeChange = (propertyType: Property['propertyType']) => {
    const newTypes = selectedPropertyTypes.includes(propertyType)
        ? selectedPropertyTypes.filter(pt => pt !== propertyType)
        : [...selectedPropertyTypes, propertyType];
    setSelectedPropertyTypes(newTypes);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPropertyTypes([]);
    setPriceRange([0, 1000]);
    setSortBy('date-desc');
    onFilterChange({ sortBy: 'date-desc' });
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-xl shadow-md border">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2 lg:col-span-3">
          <Label htmlFor="search-input" className="font-semibold mb-1.5 block">Search Properties</Label>
          <div className="flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-input"
                type="text"
                placeholder="Search by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchOnEnter}
                className="pl-10 rounded-r-none focus:z-10"
              />
            </div>
            <Button onClick={applyFilters} className="rounded-l-none" aria-label="Search">
              Search
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="sort-by-select" className="font-semibold mb-1.5 block">Sort By</Label>
           <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by-select">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="advanced-filters" className="border-b-0">
          <AccordionTrigger>
            <div className="flex items-center text-sm font-medium">
              <Filter className="h-4 w-4 mr-2"/>
              Advanced Filters
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <Label className="font-semibold mb-3 block">Property Type</Label>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {PROPERTY_TYPES.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedPropertyTypes.includes(type)}
                        onCheckedChange={() => handlePropertyTypeChange(type)}
                      />
                      <Label htmlFor={`type-${type}`} className="font-normal text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold mb-2 block">Price Range per Fraction</Label>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1] === 1000 ? '1000+' : priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button onClick={applyFilters} className="w-full sm:w-auto">Apply Filters</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TokenFilters;
