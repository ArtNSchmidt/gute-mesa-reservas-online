
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthState } from '@/types';
import { useAuthState } from '@/hooks/useAuthState';
import { handleLogin, handleLogout, createAdminUser } from '@/utils/auth';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: (redirectCallback?: () => void) => Promise<void>; // Modified to accept a redirect callback
  createAdmin: (email: string, password?: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authState = useAuthState();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await handleLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (redirectCallback?: () => void): Promise<void> => {
    try {
      const success = await handleLogout();
      if (success && redirectCallback) {
        redirectCallback();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Função para criar um novo administrador
  const createAdmin = async (email: string, password?: string): Promise<string | null> => {
    try {
      return await createAdminUser(email, password);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, createAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
