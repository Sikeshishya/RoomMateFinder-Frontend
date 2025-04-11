import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phoneNumber: '',
    preferredLocation: '',
    budget: '',
    preferredGender: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        phoneNumber: user.phoneNumber || '',
        preferredLocation: user.preferredLocation || '',
        budget: user.budget ? user.budget.toString() : '',
        preferredGender: user.preferredGender || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferredGender: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const userData = {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        preferredLocation: formData.preferredLocation,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        preferredGender: formData.preferredGender,
        // Only include password fields if changing password
        ...(formData.newPassword && {
          password: formData.newPassword
        })
      };
      
      await updateUserProfile(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Password & Security</TabsTrigger>
            <TabsTrigger value="preferences">Roommate Preferences</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={user.username}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-sm text-gray-500">Username cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    
                    {!isEditing ? (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="w-full">
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    
                    {!isEditing ? (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Change Password
                      </Button>
                    ) : (
                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="w-full">
                          {loading ? "Saving..." : "Update Password"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Roommate Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLocation">Preferred Location</Label>
                      <Input
                        id="preferredLocation"
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                        placeholder="E.g., Downtown, East Side, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Monthly Budget ($)</Label>
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                        placeholder="Enter your monthly budget"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredGender">Preferred Gender</Label>
                      <Select
                        value={formData.preferredGender}
                        onValueChange={handleSelectChange}
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="preferredGender" className={!isEditing ? "bg-gray-50" : ""}>
                          <SelectValue placeholder="Select preferred gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No preference</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="any">Any</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {!isEditing ? (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Edit Preferences
                      </Button>
                    ) : (
                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="w-full">
                          {loading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  );
}
