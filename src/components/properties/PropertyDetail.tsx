
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { MapPin, DollarSign, Users, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Property } from '../../types/property';
import { User } from '../../types/user';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface PropertyDetailProps {
  propertyId: string;
}

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [propertyOwner, setPropertyOwner] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPropertyById(propertyId);
        setProperty(response.data);
        
        // Fetch property owner details
        if (response.data.userId) {
          try {
            const ownerResponse = await apiService.getUserByUsername(response.data.userId);
            setPropertyOwner(ownerResponse.data);
          } catch (error) {
            console.error('Error fetching property owner:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast.error('Error loading property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleDelete = async () => {
    if (!property) return;
    
    try {
      await apiService.deleteProperty(property.id);
      toast.success('Property deleted successfully');
      navigate('/my-properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const isOwner = user && property && user.username === property.userId;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
        <p className="mb-8 text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/properties">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/properties" className="inline-flex items-center text-roommate-600 hover:text-roommate-800 font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              
              {isOwner && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/properties/edit/${property.id}`)}>
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  
                  {!deleteConfirm ? (
                    <Button variant="danger" size="sm" onClick={() => setDeleteConfirm(true)}>
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="danger" size="sm" onClick={handleDelete}>
                        Confirm Delete
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={20} className="mr-2 text-roommate-600" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign size={20} className="mr-2 text-roommate-600" />
                <span>${property.budget.toLocaleString()} / month</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users size={20} className="mr-2 text-roommate-600" />
                <span>
                  Preferred: {property.preferredGender === 'any' ? 'Any gender' : property.preferredGender}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              {propertyOwner ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Listed by</p>
                    <p className="font-medium">{propertyOwner.username}</p>
                  </div>
                  
                  {propertyOwner.email && (
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="font-medium">{propertyOwner.email}</p>
                    </div>
                  )}
                  
                  {propertyOwner.phoneNumber && (
                    <div>
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="font-medium">{propertyOwner.phoneNumber}</p>
                    </div>
                  )}
                  
                  <Button className="w-full mt-4">Contact Owner</Button>
                </div>
              ) : (
                <p className="text-gray-600">Loading owner information...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
