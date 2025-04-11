import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '@/services/apiService';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyFormProps {
  property?: Property;
  isEditing?: boolean;
}

export default function PropertyForm({ property, isEditing = false }: PropertyFormProps) {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: property?.title || '',
    description: property?.description || '',
    location: property?.location || '',
    budget: property?.budget || 0,
    preferredGender: property?.preferredGender || 'any',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredGender: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && property?.id) {
        await apiService.updateProperty(property.id, formData);
        toast.success('Property updated successfully');
      } else {
        await apiService.createProperty(formData);
        toast.success('Property created successfully');
      }
      navigate('/my-properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error(isEditing ? 'Failed to update property' : 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg w-full mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Property' : 'Create New Property'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter property title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your property"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter property location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Monthly Budget ($)</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              placeholder="Enter monthly budget"
              value={formData.budget?.toString() || ''}
              onChange={handleChange}
              min="0"
              step="50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredGender">Preferred Gender</Label>
            <Select
              value={formData.preferredGender}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="preferredGender">
                <SelectValue placeholder="Select preferred gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-b-0 border-r-0 rounded-full"></div>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </div>
              ) : isEditing ? 'Update Property' : 'Create Property'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}