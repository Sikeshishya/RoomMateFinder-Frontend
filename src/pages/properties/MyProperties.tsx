
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '@/services/apiService';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/properties/PropertyCard';
import { Plus, AlertCircle } from 'lucide-react';

export default function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUserProperties();
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching my properties:', error);
      toast.error('Failed to load your properties');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">My Properties</h1>
        <Link to="/properties/create">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Add New Property
          </Button>
        </Link>
      </div>

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
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
          <p className="text-gray-500 mb-6">
            You haven't listed any properties yet. Create your first property listing now!
          </p>
          <Link to="/properties/create">
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              List Your First Property
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
