import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { LoadingBox } from "../../components/LoadingBox";
import { Form, Button, Row, Col, Card, Container, Spinner } from "react-bootstrap";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [firebaseError, setFirebaseError] = useState<string>("");
  const { isLoading, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

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
    return (
      <LoadingBox
        loading={true}
        message="Aguarde un momento"
      />
    ); // Muestra la pantalla de carga
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minWidth: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4" style={{ color: "#198754" }}>Iniciar Sesión</h3>
          {firebaseError && <Alert message={firebaseError} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Institucional</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="nombre@tuinstitucion.edu"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row className="mt-4">
              <Col xs={12} className="mb-2">
                <Button type="submit" variant="success" className="w-100" disabled={isLoading}>
                  {isLoading ? <Spinner animation="border" size="sm" /> : "Iniciar sesión"}
                </Button>
              </Col>
              <Col xs={12}>
                <Button variant="outline-danger" className="w-100" onClick={handleGoogleSignIn}>
                  <i className="bi bi-google me-2"></i>
                  Continuar con Google
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/register" className="text-decoration-none">Crear una cuenta</Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/resetpassword" style={{ color: "#6f42c1" }} className="text-decoration-none">¿Olvidaste tu contraseña?</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
