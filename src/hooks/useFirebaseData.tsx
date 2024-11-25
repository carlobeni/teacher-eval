import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { database } from "../config/firebaseConfig";
import { ref, onValue } from "firebase/database";

const db = database;

const useFirebaseData = () => {
  const { user, isLoading } = useAuth();
  const [fbData, setFbData] = useState({});
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const fetchData = () => {
      if (user && !isLoading) {
        // Obtener referencia a la ubicación de la base de datos del usuario
        const databaseRef = ref(db, `/UsersData/${user.uid}`);
        onValue(databaseRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFbData(data);

            // Asumiendo que en tu base de datos tienes un campo 'timestamp' que contiene la marca de tiempo en milisegundos
            const timestamp = parseInt(data.timestamp);
            if (!isNaN(timestamp)) {
              const date = new Date(timestamp * 1000); // Multiplica por 1000 para convertir de milisegundos a segundos
              const day = date.toLocaleDateString("es-PY");
              const time = date.toLocaleTimeString("es-PY");
              const formattedDate = `${day}  -  ${time}hs`;
              setLastUpdated(formattedDate);
            }
          }
        });
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Puedes realizar acciones de limpieza aquí si es necesario
    };
  }, [user, isLoading]);

  return { fbData, lastUpdated };
};

export default useFirebaseData;
