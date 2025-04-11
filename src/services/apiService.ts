import axios from 'axios';

// Create a base axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080', // Your Spring Boot backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/login';
      }
      
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network Error:', error.request);
      return Promise.reject('Network error occurred');
    } else {
      // Something else caused an error
      console.error('Error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

// API service methods
export const apiService = {
  // Auth endpoints
  post: (url: string, data?: any) => api.post(url, data),
  get: (url: string) => api.get(url),
  put: (url: string, data: any) => api.put(url, data),
  delete: (url: string) => api.delete(url),

  // Properties specific methods
  getAllProperties: () => api.get('/api/properties/all'),
  getPropertyById: (id: string) => api.get(`/api/properties/${id}`),
  createProperty: (propertyData: any) => api.post('/api/properties/create', propertyData),
  updateProperty: (id: string, propertyData: any) => api.put(`/api/properties/update/${id}`, propertyData),
  deleteProperty: (id: string) => api.delete(`/api/properties/delete/${id}`),
  getUserProperties: () => api.get('/api/properties/user'),
  
  // Advanced filtering
  filterProperties: (params: any) => api.get('/api/properties/filter/advanced', { params }),
  
  // User management
  getAllUsers: () => api.get('/api/users/all'),
  getUserByUsername: (username: string) => api.get(`/api/users/${username}`),
  updateUser: (username: string, userData: any) => api.put(`/api/users/${username}`, userData),
  deleteUser: (username: string) => api.delete(`/api/users/${username}`)
};
