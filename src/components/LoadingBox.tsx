import React from "react";
import { Spinner } from "react-bootstrap";

interface LoadingBoxProps {
  loading: boolean;
  message: string;
}

export function LoadingBox({ loading, message }: LoadingBoxProps) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro con transparencia
        zIndex: 1050, // Asegura que esté sobre todos los elementos
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          textAlign: "center",
          maxWidth: "90%", // Responsivo para pantallas pequeñas
          width: "400px",
        }}
      >
        <Spinner animation="border" role="status" style={{ marginBottom: "15px" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={{ fontSize: "18px", margin: 0 }}>{message}</p>
      </div>
    </div>
  );
}
