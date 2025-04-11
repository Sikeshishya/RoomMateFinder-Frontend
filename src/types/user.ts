
export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    phoneNumber?: string;
    preferredLocation?: string;
    budget?: number;
    preferredGender?: string;
  }
  