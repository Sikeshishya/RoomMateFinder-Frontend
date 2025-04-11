import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '@/services/apiService';
import { Property } from '@/types/property';
import PropertyForm from '@/components/properties/PropertyForm';
import { useAuth } from '@/contexts/AuthContext';

export default function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPropertyById(id);
        setProperty(response.data);
        
        // Check if the current user is the owner
        if (user && response.data.userId !== user.username) {
          toast.error("You don't have permission to edit this property");
          navigate('/my-properties');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        toast.error('Failed to load property details');
        navigate('/my-properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
      </div>
    );
  }

  if (!property) {
    return null; // Should never reach here due to navigation in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Edit Property</h1>
      <PropertyForm property={property} isEditing={true} />
    </div>
  );
}
