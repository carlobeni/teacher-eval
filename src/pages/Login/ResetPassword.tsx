import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";

export function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [firebaseError, setFirebaseError] = useState<string>("");

  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email)
      return setFirebaseError("Por favor ingrese su correo electrónico.");
    try {
      await resetPassword(email);
      navigate("/login");
      setFirebaseError("Correo de recuperación enviado.");
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

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
          width: "90%",
          maxWidth: "500px",
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
            Restablecer Contraseña
          </h3>
          {firebaseError && (
            <Alert message={firebaseError} onClose={handleCloseAlert} />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-4">
              <Form.Label style={{ fontSize: "1.2rem", color: "#fff" }}>
                Correo Electrónico
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="pepe@fiuna.edu.py"
                value={email}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#262626",
                  color: "#fff",
                  border: "1px solid #333",
                }}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    fontSize: "1.1rem",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Cargando..." : "Aceptar"}
                </Button>
              </Col>
            </Row>
          </Form>
          <hr style={{ borderTop: "1px solid #fff", margin: "20px 0" }} />
          <div className="text-center">
            <Link
              to="/login"
              style={{
                color: "#6c757d",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Ya tengo una cuenta
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
