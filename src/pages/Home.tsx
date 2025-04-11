import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/properties/PropertyCard';
import { Search, Home as HomeIcon, User } from 'lucide-react';

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiService.getAllProperties();
        // Only show up to 3 properties on the homepage
        setFeaturedProperties(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-roommate-600 to-roommate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Find Your Perfect Roommate Match
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Connect with like-minded people and find the ideal living arrangement based on your preferences and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button size="lg" className="w-full sm:w-auto bg-white text-roommate-700 hover:bg-gray-100">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  <User className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of our recently listed properties from users looking for roommates
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No properties available at the moment.</p>
              <Link to="/properties/create">
                <Button>Be the first to list a property</Button>
              </Link>
            </div>
          )}

          {featuredProperties.length > 0 && (
            <div className="text-center mt-10">
              <Link to="/properties">
                <Button variant="outline">View All Properties</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              RoommateHub makes it easy to find your perfect roommate in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-roommate-100 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <User className="h-8 w-8 text-roommate-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your profile with your preferences, budget, and living habits.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-roommate-100 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <HomeIcon className="h-8 w-8 text-roommate-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">List or Browse</h3>
              <p className="text-gray-600">
                Create a property listing or browse available properties that match your criteria.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-roommate-100 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <Search className="h-8 w-8 text-roommate-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find Your Match</h3>
              <p className="text-gray-600">
                Use our advanced filters to find the perfect roommate based on location, budget, and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-roommate-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Find Your New Home?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of people who've already found their perfect roommate match through RoommateHub.
            </p>
            <Link to="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}