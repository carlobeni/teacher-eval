import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { database } from "../config/firebaseConfig";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

const db = database; // Instancia de Firestore

const useFirebaseData = () => {
  const { user, isLoading } = useAuth();
  const [fbData, setFbData] = useState<any>({}); // Datos del documento
  const [comments, setComments] = useState<string[]>([]); // Array de comentarios
  const [professorName, setProfessorName] = useState<string>(""); // Nombre del profesor

  useEffect(() => {
    const fetchData = () => {
      if (user && !isLoading) {
        // Referencia al documento en Firestore
        const docRef = doc(db, "ListaDeProfesores", "Fs5u8LP4m6dTvjVlSv3w"); // ID estático o dinámico

        // Suscripción al documento
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setFbData(data);
            setComments(data.Comentarios || []); // Extraer comentarios, si existen
            setProfessorName(data.Nombre || ""); // Extraer nombre del profesor
          }
        });

        return () => unsubscribe(); // Cleanup al desmontar el componente
      }
    };

    fetchData();
  }, [user, isLoading]);

  // Función para añadir un nuevo comentario
  const addComment = async (newComment: string) => {
    if (user) {
      const docRef = doc(db, "ListaDeProfesores", "Fs5u8LP4m6dTvjVlSv3w"); // Ajustar ID si es dinámico
      try {
        await updateDoc(docRef, {
          Comentarios: arrayUnion(newComment), // Agrega el nuevo comentario al array
        });
        console.log("Comentario añadido con éxito");
      } catch (error) {
        console.error("Error al añadir comentario:", error);
      }
    }
  };

  return { fbData, comments, professorName, addComment };
};

export default useFirebaseData;
