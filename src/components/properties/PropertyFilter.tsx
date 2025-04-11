import { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertyFilter } from '@/types/property';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface PropertyFilterProps {
  onFilterChange: (filters: PropertyFilter) => void;
}

export default function PropertyFilterComponent({ onFilterChange }: PropertyFilterProps) {
  const [location, setLocation] = useState<string>('');
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [preferredGender, setPreferredGender] = useState<string>('');
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleApplyFilter = () => {
    const filters: PropertyFilter = {};
    
    if (location) filters.location = location;
    if (minBudget) filters.minBudget = parseInt(minBudget);
    if (maxBudget) filters.maxBudget = parseInt(maxBudget);
    if (preferredGender) filters.preferredGender = preferredGender;
    
    onFilterChange(filters);
    setIsFilterActive(true);
    setIsSheetOpen(false);
  };

  const handleResetFilter = () => {
    setLocation('');
    setMinBudget('');
    setMaxBudget('');
    setPreferredGender('');
    onFilterChange({});
    setIsFilterActive(false);
  };

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search by location..."
            className="pl-10 pr-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
          />
        </div>
        
        <div className="flex gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>
                  Narrow down your search with advanced filters
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Any location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minBudget">Min Budget</Label>
                    <Input
                      id="minBudget"
                      type="number"
                      placeholder="Min $"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBudget">Max Budget</Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      placeholder="Max $"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Preferred Gender</Label>
                  <Select
                    value={preferredGender}
                    onValueChange={(value) => setPreferredGender(value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Any gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any gender</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleResetFilter}>
                    Reset
                  </Button>
                  <Button onClick={handleApplyFilter}>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {isFilterActive && (
            <Button variant="ghost" onClick={handleResetFilter} className="flex items-center gap-1">
              <X size={18} />
              Clear Filters
            </Button>
          )}
          
          <Button onClick={handleApplyFilter} className="hidden lg:flex">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}