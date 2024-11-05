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
    if (!email) return setFirebaseError("Por favor ingrese su email");
    try {
      await resetPassword(email);
      navigate("/login");
      setFirebaseError("Correo de recuperación enviado");
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minWidth: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4" style={{ color: "#198754" }}>Restablecer Contraseña</h3>
          {firebaseError && <Alert message={firebaseError} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@tuinstitucion.edu"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row className="mt-4">
              <Col>
                <Button
                  type="submit"
                  variant="success"
                  disabled={isLoading}
                  className="w-100"
                  style={{ borderRadius: "8px" }}
                >
                  {isLoading ? "Cargando..." : "Aceptar"}
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/login" className="text-decoration-none">Ya tengo una cuenta</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
