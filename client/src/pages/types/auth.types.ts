export type RegisterInputFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputFields = Pick<RegisterInputFields, 'email' | 'password'>;
export type User = Pick<RegisterInputFields, 'email' | 'name'> & {
  id: string;
};
export type AuthState = {
  isAuthenticated: boolean;
  user?: User | null;
  token?: string;
};
