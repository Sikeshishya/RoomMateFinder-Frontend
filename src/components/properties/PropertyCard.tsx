import { Link } from 'react-router-dom';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, DollarSign, Users } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="h-full property-card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{property.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-roommate-600" />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign size={18} className="mr-2 text-roommate-600" />
            <span>${property.budget.toLocaleString()} / month</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-2 text-roommate-600" />
            <span>Preferred: {property.preferredGender === 'any' ? 'Any gender' : property.preferredGender}</span>
          </div>
          <p className="text-gray-700 mt-2 line-clamp-3">{property.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/properties/${property.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
