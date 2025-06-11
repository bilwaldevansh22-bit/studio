"use client";

import React, { useState } from 'react';
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePropertyTypeChange = (propertyType: Property['propertyType']) => {
    setSelectedPropertyTypes(prev =>
      prev.includes(propertyType)
        ? prev.filter(pt => pt !== propertyType)
        : [...prev, propertyType]
    );
  };

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange as [number, number]);
  };
  
  const handleSortByChange = (value: string) => {
    setSortBy(value as FilterOptions['sortBy']);
  };

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      propertyType: selectedPropertyTypes.length > 0 ? selectedPropertyTypes : undefined,
      priceRange: priceRange[0] === 0 && priceRange[1] === 1000 ? undefined : priceRange,
      sortBy: sortBy as FilterOptions['sortBy'],
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPropertyTypes([]);
    setPriceRange([0, 1000]);
    setSortBy('date-desc');
    onFilterChange({ sortBy: 'date-desc' });
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <Label htmlFor="search-input" className="font-semibold mb-1 block">Search Properties</Label>
          <div className="flex">
            <Input
              id="search-input"
              type="text"
              placeholder="Enter keywords, location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="rounded-r-none focus:z-10"
            />
            <Button onClick={applyFilters} className="rounded-l-none">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="sort-by-select" className="font-semibold mb-1 block">Sort By</Label>
           <Select value={sortBy} onValueChange={handleSortByChange}>
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
        <AccordionItem value="advanced-filters">
          <AccordionTrigger>
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2"/>
              Advanced Filters
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="font-semibold mb-2 block">Property Type</Label>
                <div className="space-y-2">
                  {PROPERTY_TYPES.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedPropertyTypes.includes(type)}
                        onCheckedChange={() => handlePropertyTypeChange(type)}
                      />
                      <Label htmlFor={`type-${type}`} className="font-normal">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold mb-2 block">Price Range per Fraction ($)</Label>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceRangeChange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={resetFilters}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TokenFilters;