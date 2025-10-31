import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

type AuthContextShape = { user: User | null };

const AuthContext = createContext<AuthContextShape>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // auth can be null when Firebase is not configured or initialization failed.
    // Only subscribe when auth is available to avoid calling onAuthStateChanged(null, ...)
    if (!auth) {
      // In dev, helpful to know why auth-related features are not active
      // eslint-disable-next-line no-console
      console.warn('Auth is not initialized; skipping onAuthStateChanged subscription');
      return;
    }

    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
