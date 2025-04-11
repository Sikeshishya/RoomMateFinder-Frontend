
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { Property, PropertyFilter } from '@/types/property';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilterComponent from '@/components/properties/PropertyFilter';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilter>({});
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let response;
      
      // If there are any filters set, use the filter endpoint
      if (Object.keys(filters).length > 0) {
        response = await apiService.filterProperties(filters);
      } else {
        response = await apiService.getAllProperties();
      }
      
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: PropertyFilter) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Available Properties</h1>
        {isAuthenticated() && (
          <Link to="/properties/create">
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              List Property
            </Button>
          </Link>
        )}
      </div>

      <PropertyFilterComponent onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">No properties found</h3>
          <p className="text-gray-500 mb-6">
            {Object.keys(filters).length > 0
              ? "No properties match your current filters. Try adjusting your search criteria."
              : "There are no properties listed yet."}
          </p>
          {isAuthenticated() && (
            <Link to="/properties/create">
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                List Your Property
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}