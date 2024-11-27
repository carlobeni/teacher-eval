import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NuevoFormulario from "../../components/NuevoFormulario";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/authContext";

function Home() {
  const { user } = useAuth();

  return (
    <Container
      fluid
      className="d-flex flex-column flex-md-row gap-1"
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#e0e0e0",
        padding: "5px",
      }}
    >
      <Sidebar />
      <Container
        as={Card}
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#1f1f1f",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Card.Body className="gap-1 d-flex flex-column">
          <h1
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Bienvenido a Opiniones de Profesores, {user?.displayName}
          </h1>
          <NuevoFormulario />
        </Card.Body>
      </Container>
    </Container>
  );
}

export default Home;
