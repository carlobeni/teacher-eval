import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { LoadingBox } from "../../components/LoadingBox";
import { FaGoogle } from "react-icons/fa";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [firebaseError, setFirebaseError] = useState<string>("");
  const { isLoading, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  if (isLoading) {
    return <LoadingBox loading={true} message="Aguarde un momento" />;
  }

  const handleCloseAlert = () => {
    setFirebaseError(""); // Esto "destruye" la alerta al quitar el mensaje
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <Card
        style={{
          width: "90%", // Responsive: usa el 90% del ancho
          maxWidth: "500px", // Límite para computadoras
          borderRadius: "10px",
          backgroundColor: "#1f1f1f",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Card.Body className="p-4">
          <h3
            className="text-center mb-4"
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}
          >
            Iniciar Sesión
          </h3>
          {firebaseError && (
            <Alert message={firebaseError} onClose={handleCloseAlert} />
          )}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={handleGoogleSignIn}
                  style={{
                    fontSize: "1.1rem",
                    color: "#fff",
                    borderColor: "#6c757d",
                    backgroundColor: "#1f1f1f",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc3545")
                  } // Fondo rojo al presionar
                  onMouseUp={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1f1f1f")
                  } // Vuelve al color original
                >
                  <FaGoogle style={{ marginRight: "10px" }} />
                  Continuar con Google
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
