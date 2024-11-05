import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../config/firebaseConfig"
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from "firebase/auth";


interface AuthContextType {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  isLoading: boolean;
  logOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  user: User | null;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para registro de usuario
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then();
  };

  // Función para inicio de sesión con formulario
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then();
  };

  // Función para inicio de sesión con Google
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider).then();
  };

  // Detectar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // Función para cerrar sesión
  const logOut = () => signOut(auth);

  // Función para restablecer contraseña
  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        isLoading,
        logOut,
        login,
        loginWithGoogle,
        user,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
