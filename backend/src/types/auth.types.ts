export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  plan_type: string;
  status: boolean;
  created_at: Date;
}

export interface RegisterBody {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}