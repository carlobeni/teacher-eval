import { FaExclamationTriangle } from "react-icons/fa"; // Icono de advertencia
import { Button } from "react-bootstrap"; // Para el botón de cerrar

interface AlertProps {
  title?: string; // Título, por defecto es "Error"
  message: string; // Mensaje de la alerta
  onClose: () => void; // Función para cerrar la alerta
}

export function Alert({ title = "Error", message, onClose }: AlertProps) {
  // Se destruye el componente cuando se hace clic en la X

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        backgroundColor: "#f8d47f", // Amarillo de alerta
        color: "#212529", // Color del texto
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        animation: "fadeIn 0.5s ease-out",
        width: "auto",
        maxWidth: "90%",
      }}
    >
      <FaExclamationTriangle
        style={{ marginRight: "10px", fontSize: "24px" }}
      />
      <div>
        <strong style={{ display: "block", fontSize: "1.1rem" }}>
          {title}
        </strong>
        <span>{message}</span>
      </div>
      <Button
        variant="link"
        onClick={onClose} // Llamamos a la función para cerrar
        style={{
          marginLeft: "auto",
          color: "#212529",
          fontSize: "20px",
          background: "transparent",
          border: "none",
        }}
      >
        ×
      </Button>
    </div>
  );
}
