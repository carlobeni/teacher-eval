import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NuevoFormulario: React.FC = () => {
  const { user } = useAuth();

  // Estados con tipos explícitos
  const [puntuacion, setPuntuacion] = useState<number>(1);
  const [disponibilidad, setDisponibilidad] = useState<number>(1);
  const [evaluacion, setEvaluacion] = useState<number>(1);
  const [conocimiento, setConocimiento] = useState<number>(1);
  const [didactica, setDidactica] = useState<number>(1);
  const [comentario, setComentario] = useState<string>("");

  // Funciones con tipos explícitos para los eventos
  const handleChangePuntuacion = (e: Event, value: number | number[]) => {
    setPuntuacion(value as number);
  };

  const handleChangeDisponibilidad = (e: Event, value: number | number[]) => {
    setDisponibilidad(value as number);
  };

  const handleChangeEvaluacion = (e: Event, value: number | number[]) => {
    setEvaluacion(value as number);
  };

  const handleChangeConocimiento = (e: Event, value: number | number[]) => {
    setConocimiento(value as number);
  };

  const handleChangeDidactica = (e: Event, value: number | number[]) => {
    setDidactica(value as number);
  };

  const handleChangeComentario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComentario(e.target.value);
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-3">
        <h1>Nuevo Comentario {user?.displayName}</h1>
        <h4>Alumno: {user?.displayName}</h4>
        <h4>Profesor: Ing. Migue Lezcano</h4>
        <Box sx={{ width: 300 }}>
          Puntualidad
          <Slider
            aria-label="Puntualidad"
            value={puntuacion}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            onChange={handleChangePuntuacion}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          Disponibilidad
          <Slider
            aria-label="Disponibilidad"
            value={disponibilidad}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            onChange={handleChangeDisponibilidad}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          Evaluación
          <Slider
            aria-label="Evaluación"
            value={evaluacion}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            onChange={handleChangeEvaluacion}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          Conocimiento
          <Slider
            aria-label="Conocimiento"
            value={conocimiento}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            onChange={handleChangeConocimiento}
          />
        </Box>
        <Box sx={{ width: 300 }}>
          Didáctica
          <Slider
            aria-label="Didáctica"
            value={didactica}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            onChange={handleChangeDidactica}
          />
        </Box>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Comentario"
              multiline
              rows={4}
              value={comentario}
              onChange={handleChangeComentario}
            />
          </div>
        </Box>
        <Button
          onClick={() => {
            alert("Formulario enviado");
          }}
          variant="contained"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default NuevoFormulario;
