import NuevoFormulario from "../../components/NuevoFormulario";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/authContext";

function Home() {
  const { user } = useAuth();
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <h1>Bienvenido a Opiniones de Profesores {user?.displayName}</h1>
        <NuevoFormulario />
      </div>
    </div>
  );
}

export default Home;
