import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los íconos de ojo
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firebaseError, setFirebaseError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado independiente para confirmación
  const { signUp, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFirebaseError("");

    if (user.password !== user.confirmPassword) {
      setFirebaseError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await signUp(user.email, user.password);
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Cambia el estado de confirmación
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
            Registro
          </h3>
          {firebaseError && (
            <Alert message={firebaseError} onClose={handleCloseAlert} />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
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

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label style={{ fontSize: "1.2rem", color: "#fff" }}>
                Contraseña
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
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
                <Button
                  variant="outline-light"
                  onClick={toggleShowPassword}
                  style={{ border: "none" }} // Eliminar borde al hacer click
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Ojo como icono */}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label style={{ fontSize: "1.2rem", color: "#fff" }}>
                Confirmar Contraseña
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmación de contraseña"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "#262626",
                    color: "#fff",
                    border: "1px solid #333",
                  }}
                />
                <Button
                  variant="outline-light"
                  onClick={toggleShowConfirmPassword}
                  style={{ border: "none" }} // Eliminar borde al hacer click
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Ojo como icono */}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mt-4"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                fontSize: "1.1rem",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>

            <Button
              className="w-100 mt-3"
              onClick={handleGoogleSignIn}
              style={{
                backgroundColor: "#1f1f1f",
                color: "#fff",
                borderColor: "#6c757d",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc3545")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.backgroundColor = "#1f1f1f")
              }
            >
              <FaGoogle style={{ marginRight: "10px" }} />
              Continuar con Google
            </Button>
          </Form>
          <div className="text-center mt-3">
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
