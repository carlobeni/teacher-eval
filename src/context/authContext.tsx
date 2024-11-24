import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../config/firebaseConfig";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
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

// Dominio permitido
const ALLOWED_DOMAIN = "@fiuna.edu.py";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si el correo pertenece al dominio permitido
  const isDomainAllowed = (email: string | null | undefined): boolean => {
    return email?.endsWith(ALLOWED_DOMAIN) || false;
  };

  // Función para registro de usuario
  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      if (!isDomainAllowed(email)) {
        const error = new Error(
          "Solo se permiten cuentas del dominio @fiuna.edu.py."
        );
        (error as any).code = "auth/invalid-domain"; // Código personalizado
        throw error;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential;
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use")
        throw new Error("La cuenta ya existe. Por favor, inicie sesión.");
      else if (error.code === "auth/weak-password")
        throw new Error(
          "La contraseña es muy corta. Debe tener al menos 6 caracteres."
        );
      else if (error.code === "auth/invalid-domain") throw error;
      else throw new Error(`Error desconocido: ${error.code}`);
    }
  };

  // Función para inicio de sesión con formulario
  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      if (!isDomainAllowed(email)) {
        const error = new Error(
          "Solo se permiten cuentas del dominio @fiuna.edu.py."
        );
        (error as any).code = "auth/invalid-domain"; // Código personalizado
        throw error;
      } else {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (
          signInMethods.includes("google.com") &&
          !signInMethods.includes("password")
        ) {
          const error = new Error(
            "Este correo está asociado únicamente con Google. Por favor, inicie sesión con Google o restablezca su contraseña."
          );
          (error as any).code = "auth/only-google-provide"; // Código personalizado
          throw error;
        }
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential;
      }
    } catch (error: any) {
      if (error.code === "auth/wrong-password")
        throw new Error(
          "La contraseña es incorrecta. Por favor, intente de nuevo."
        );
      else if (error.code === "auth/user-not-found")
        throw new Error("No se encontró ninguna cuenta con este correo.");
      else if (error.code === "auth/invalid-domain") throw error;
      else if (error.code === "auth/only-google-provide") throw error;
      else throw new Error(`Error desconocido: ${error.code}`);
    }
  };

  // Función para inicio de sesión con Google
  const loginWithGoogle = async (): Promise<UserCredential> => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleProvider);

      if (!isDomainAllowed(userCredential.user.email)) {
        await logOut();
        throw new Error("Solo se permiten cuentas del dominio @fiuna.edu.py.");
      }

      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        userCredential.user.email!
      );

      if (
        signInMethods.includes("password") &&
        !signInMethods.includes("google.com")
      ) {
        try {
          const googleCredential = GoogleAuthProvider.credential(
            userCredential.user.refreshToken
          );
          await userCredential.user.linkWithCredential(googleCredential);
        } catch (error: any) {
          if (error.code === "auth/credential-already-in-use") {
            console.log("La credencial ya está asociada a una cuenta.");
          } else {
            throw error;
          }
        }
      }

      return userCredential;
    } catch (error: any) {
      throw new Error(`Error desconocido: ${error.code}`);
    }
  };

  // Detectar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (!isDomainAllowed(currentUser.email)) {
          await logOut();
          alert("Solo se permiten cuentas del dominio @fiuna.edu.py.");
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // Función para cerrar sesión
  const logOut = async () => signOut(auth);

  // Función para restablecer contraseña
  const resetPassword = async (email: string): Promise<void> => {
    try {
      if (!isDomainAllowed(email)) {
        const error = new Error(
          "Solo se permiten cuentas del dominio @fiuna.edu.py."
        );
        (error as any).code = "auth/invalid-domain"; // Código personalizado
        throw error;
      }
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      if (error.code === "auth/invalid-domain") throw error;
      else throw new Error(`Error desconocido: ${error.code}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        isLoading,
        logOut,
        login,
        loginWithGoogle,
        user,
        resetPassword,
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
