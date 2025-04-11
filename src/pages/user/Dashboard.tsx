import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { Property } from '@/types/property';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Plus, Settings, Users, Filter } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch user's properties
        const userPropertiesResponse = await apiService.getUserProperties();
        setMyProperties(userPropertiesResponse.data);
        
        // Fetch recent properties
        const allPropertiesResponse = await apiService.getAllProperties();
        setRecentProperties(allPropertiesResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.username}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Home className="mr-2 h-5 w-5 text-roommate-600" />
              My Properties
            </CardTitle>
            <CardDescription>
              Manage your property listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl mb-4">{myProperties.length}</div>
            <Link to="/my-properties">
              <Button variant="outline" className="w-full">View All</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-roommate-600" />
              Find Roommates
            </CardTitle>
            <CardDescription>
              Browse available listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/properties">
              <Button variant="outline" className="w-full mb-2">Browse Properties</Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter Properties
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Settings className="mr-2 h-5 w-5 text-roommate-600" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Update your profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/profile">
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Recent Properties</h2>
            <Link to="/properties/create">
              <Button size="sm" className="flex items-center gap-1">
                <Plus size={16} />
                Add New
              </Button>
            </Link>
          </div>

          {myProperties.length > 0 ? (
            <div className="space-y-4">
              {myProperties.slice(0, 3).map(property => (
                <Link to={`/properties/${property.id}`} key={property.id}>
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{property.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {property.location} · ${property.budget}/month
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              {myProperties.length > 3 && (
                <Link to="/my-properties" className="block text-center text-roommate-600 hover:text-roommate-800 font-medium mt-2">
                  View all {myProperties.length} properties
                </Link>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 mb-4">You haven't listed any properties yet.</p>
                <Link to="/properties/create">
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Create Your First Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
            <Link to="/properties">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {recentProperties.length > 0 ? (
            <div className="space-y-4">
              {recentProperties.map(property => (
                <Link to={`/properties/${property.id}`} key={property.id}>
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {property.location} · ${property.budget}/month · {property.preferredGender}
                        </p>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-1">
                          {property.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">No properties available at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
