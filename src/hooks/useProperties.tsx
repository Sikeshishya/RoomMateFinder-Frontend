
import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Property, PropertyFilter } from '../types/property';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAllProperties();
      setProperties(response.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getUserProperties();
      setProperties(response.data);
    } catch (err) {
      console.error('Error fetching user properties:', err);
      setError('Failed to fetch your properties');
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = async (filters: PropertyFilter) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.filterProperties(filters);
      setProperties(response.data);
    } catch (err) {
      console.error('Error filtering properties:', err);
      setError('Failed to filter properties');
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    loading,
    error,
    fetchAllProperties,
    fetchUserProperties,
    filterProperties
  };
};
