import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { LoadingBox } from "../../components/LoadingBox";
import { FaGoogle } from "react-icons/fa";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Container,
  Spinner,
} from "react-bootstrap";

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
            <Form.Group controlId="formEmail" className="mb-4">
              <Form.Label style={{ fontSize: "1.2rem", color: "#fff" }}>
                Correo Institucional
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="pepe@fiuna.edu.py"
                value={user.email}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#262626",
                  color: "#fff",
                  border: "1px solid #333",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label style={{ fontSize: "1.2rem", color: "#fff" }}>
                Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={user.password}
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
              <Col xs={12} className="mb-3">
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
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </Col>
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
          <hr style={{ borderTop: "1px solid #fff", margin: "20px 0" }} />
          <div className="text-center">
            <Link
              to="/register"
              style={{
                color: "#6c757d",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Crear una cuenta
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link
              to="/resetpassword"
              style={{
                color: "#6f42c1",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
