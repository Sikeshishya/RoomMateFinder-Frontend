export interface Property {
    id: string;
    title: string;
    description: string;
    location: string;
    budget: number;
    preferredGender: string;
    userId: string;
  }
  
  export interface PropertyFilter {
    location?: string;
    minBudget?: number;
    maxBudget?: number;
    preferredGender?: string;
  }