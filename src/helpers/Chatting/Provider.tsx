import React, { useContext, useState } from 'react';

import auth from '@react-native-firebase/auth';

import { AuthContext } from './Context';

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        login: async (id: string, password: string) => {
          try {
            const email = `${id}@gmail.com`;
            if (password.length < 6) password += '%%';
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log('ERROR', e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log('ERROR', e);
          }
        },
        signUp: async (email: string, password: string) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log('ERROR', e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
