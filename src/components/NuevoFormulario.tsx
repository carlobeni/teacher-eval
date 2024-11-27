import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth, createComentario } from "../config/firebaseConfig";
import { createReview } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0d47a1", // Deep blue
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "#0d47a1", // Deep blue
        },
      },
    },
  },
});

const NuevoFormulario: React.FC = ({ asignatura = "", pid = "" }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  // Initial state for form values
  const INITIAL_STATE = {
    puntuacion: 1,
    disponibilidad: 1,
    evaluacion: 1,
    conocimiento: 1,
    didactica: 1,
    comentario: "",
  };

  //Estados con tipos explícitos
  const [puntuacion, setPuntuacion] = useState<number>(
    INITIAL_STATE.puntuacion
  );
  const [disponibilidad, setDisponibilidad] = useState<number>(
    INITIAL_STATE.disponibilidad
  );
  const [evaluacion, setEvaluacion] = useState<number>(
    INITIAL_STATE.evaluacion
  );
  const [conocimiento, setConocimiento] = useState<number>(
    INITIAL_STATE.conocimiento
  );
  const [didactica, setDidactica] = useState<number>(INITIAL_STATE.didactica);
  const [comentario, setComentario] = useState<string>(
    INITIAL_STATE.comentario
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  // Reset form to initial state
  const resetForm = () => {
    setPuntuacion(INITIAL_STATE.puntuacion);
    setDisponibilidad(INITIAL_STATE.disponibilidad);
    setEvaluacion(INITIAL_STATE.evaluacion);
    setConocimiento(INITIAL_STATE.conocimiento);
    setDidactica(INITIAL_STATE.didactica);
    setComentario(INITIAL_STATE.comentario);
  };

  // Corrección de tipos para eventos de Slider
  const handleChangePuntuacion = (_e: Event, value: number | number[]) => {
    setPuntuacion(value as number);
  };

  const handleChangeDisponibilidad = (_e: Event, value: number | number[]) => {
    setDisponibilidad(value as number);
  };

  const handleChangeEvaluacion = (_e: Event, value: number | number[]) => {
    setEvaluacion(value as number);
  };

  const handleChangeConocimiento = (_e: Event, value: number | number[]) => {
    setConocimiento(value as number);
  };

  const handleChangeDidactica = (_e: Event, value: number | number[]) => {
    setDidactica(value as number);
  };

  const handleChangeComentario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComentario(e.target.value);
  };

  const handleSubmit = async () => {
    // Validación básica
    if (comentario.trim() === "") {
      alert("Por favor, ingrese un comentario");
      return;
    }

    const nuevoComentario = {
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL,
      pid,
      cid: uuidv4(),
      asignatura,
      comentario,
      createAt: new Date(),
    };
    await createComentario(nuevoComentario);

    // Crear el objeto puntaje como un map
    const nuevoReview = {
      createAt: new Date(),
      displayName: auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL,
      uid: auth.currentUser?.uid,
      pid,
      rid: uuidv4(),
      asignatura,
      puntaje: {
        puntualidad: puntuacion,
        disponibilidad: disponibilidad,
        evaluacion: evaluacion,
        conocimiento: conocimiento,
        didactica: didactica,
      },
    };
    await createReview(nuevoReview);

    // Resetear el formulario después de enviarlo
    resetForm();
    handleClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            width: "100%",
            maxWidth: 300,
            margin: "auto",
          }}
        >
          Nuevo Comentario
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              margin: "16px",
              maxWidth: "500px",
            },
          }}
        >
          <DialogTitle> </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <h4>Nuevo Comentario</h4>
                <h4>{user?.email}</h4>
              </Box>
              {[
                {
                  label: "Puntualidad",
                  value: puntuacion,
                  onChange: handleChangePuntuacion,
                },
                {
                  label: "Disponibilidad",
                  value: disponibilidad,
                  onChange: handleChangeDisponibilidad,
                },
                {
                  label: "Evaluación",
                  value: evaluacion,
                  onChange: handleChangeEvaluacion,
                },
                {
                  label: "Conocimiento",
                  value: conocimiento,
                  onChange: handleChangeConocimiento,
                },
                {
                  label: "Didáctica",
                  value: didactica,
                  onChange: handleChangeDidactica,
                },
              ].map(({ label, value, onChange }) => (
                <Box key={label} sx={{ width: "100%" }}>
                  {label}
                  <Slider
                    aria-label={label}
                    value={value}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    onChange={onChange}
                  />
                </Box>
              ))}
              <TextField
                label="Comentario"
                multiline
                rows={4}
                fullWidth
                value={comentario}
                onChange={handleChangeComentario}
                variant="outlined"
                required
                error={comentario.trim() === ""}
                helperText={
                  comentario.trim() === "" ? "El comentario es requerido" : ""
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default NuevoFormulario;
