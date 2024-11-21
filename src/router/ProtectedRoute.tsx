import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { LoadingBox } from "../components/LoadingBox"; // Importa el componente LoadingBox

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingBox
        loading={true}
        message="Aguarde un momento"
      />
    ); // Muestra la pantalla de carga
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
