import { createContext } from 'react';

export interface IAuthContextValue {
  login: (email: string, pw: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, pw: string) => Promise<void>;
}
export const AuthContext = createContext({} as IAuthContextValue);
