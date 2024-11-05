import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firebaseError, setFirebaseError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading } = useAuth();
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minWidth: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4" style={{ color: "#198754" }}>Registro</h3>
          {firebaseError && <Alert message={firebaseError} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Institucional</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="text@fiuna.edu.py"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <Button variant="outline-secondary" onClick={toggleShowPassword}>
                  {showPassword ? <i className="bi bi-eye-slash" /> : <i className="bi bi-eye" />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmación de contraseña"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button variant="outline-secondary" onClick={toggleShowPassword}>
                  {showPassword ? <i className="bi bi-eye-slash" /> : <i className="bi bi-eye" />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              disabled={isLoading}
              className="mt-4 w-100"
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/login" className="text-decoration-none">Ya tengo una cuenta</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
