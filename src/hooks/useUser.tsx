
import { useState } from 'react';
import { apiService } from '../services/apiService';
import { User } from '../types/user';
import { useAuth } from './useAuth';

export const useUser = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      await updateUserProfile(userData);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateProfile
  };
};
