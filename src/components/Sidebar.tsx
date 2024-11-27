import { Container, ListGroup, Button, Navbar } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { FaComment, FaTrophy, FaSearch, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <Container
        fluid
        className="d-none d-md-flex flex-column"
        style={{
          width: "250px",
          minHeight: "calc(100vh - 40px)",
          backgroundColor: "#1f1f1f",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          marginRight: "20px",
        }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            className="d-flex align-items-center text-white"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "10px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <FaComment className="me-2" />
            Comentario Reciente
          </ListGroup.Item>
          <ListGroup.Item
            action
            className="d-flex align-items-center text-white"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "10px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <FaTrophy className="me-2" />
            Ranking
          </ListGroup.Item>
          <ListGroup.Item
            action
            className="d-flex align-items-center text-white"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "10px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <FaSearch className="me-2" />
            Buscar Profe
          </ListGroup.Item>
          <hr style={{ borderColor: "#444" }} />
          <ListGroup.Item
            action
            className="d-flex align-items-center text-white"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "10px 0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <FaUser className="me-2" />
            Cuenta
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="outline-danger"
          className="mt-4"
          onClick={handleLogOut}
          style={{
            fontWeight: "bold",
            borderRadius: "8px",
            borderColor: "#dc3545",
          }}
        >
          Cerrar sesión
        </Button>
      </Container>

      {/* Barra Inferior Responsive */}
      <Navbar
        fixed="bottom"
        className="d-flex d-md-none justify-content-around"
        style={{
          backgroundColor: "#1f1f1f",
          borderTop: "1px solid #333",
          height: "60px",
        }}
      >
        <Button variant="link" className="text-white">
          <FaComment size={24} />
        </Button>
        <Button variant="link" className="text-white">
          <FaTrophy size={24} />
        </Button>
        <Button variant="link" className="text-white">
          <FaSearch size={24} />
        </Button>
        <Button variant="link" className="text-white">
          <FaUser size={24} />
        </Button>
      </Navbar>
    </>
  );
};

export default Sidebar;
