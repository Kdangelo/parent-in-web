import type { StepConfig } from "./types";

export const stepsUser: StepConfig[] = [
  {
    id: 1,
    title: "¿Qué opción te describe mejor?",
    description: "Selecciona una opción",
    options: ["Madre", "Padre", "Otro"],
    type: "single",
  },
  {
    id: 2,
    title: "¿Qué tipo de familia te describe mejor?",
    description: "Selecciona tipo de familia",
    options: ["Padre-Madre", "Madre-Madre", "Padre-Padre", "Madre", "Padre", "Otro"],
    type: "single",
  },
  {
    id: 3,
    title: "¿Cuantos hijos/as tienes hoy?",
    description: "Selecciona la opción que corresponda",
    options: ["0", "1", "2", "3", "4 o más"],
    type: "single",
  },
  {
    id: 4,
    title: "Situación Laboral Actual",
    description: "Selecciona la opción que corresponda",
    options: ["Trabajo full time", "Trabajo part time", "Estoy buscando trabajo", "Estoy en pausa laboral", "Otra"],
    type: "single",
  },
  {
    id: 5,
    title: "Tipo de organización",
    description: "Selecciona la opción que mejor describa tu organización",
    options: ["Startup", "Pequeña o mediana empresa (11 a 200 personas)", "Gran empresa (201 a 1000 personas)", "Multinacional (+1000 personas)", "Sector público / ONG / Fundación", "Trabajo por mi cuenta", "Otra"],
    type: "single",
  },
  {
    id: 6,
    title: "Rol o posición actual (o última ocupada)",
    description: "Selecciona la opción que mejor describa tu rol",
    options:["Analista / Especialista", "Coordinación / Supervisión", "Jefatura / Liderazgo", "Genrecia media", "Alta dirección C-Level", "Trabajo por mi cuenta", "Otra"],
    type: "single"
  },
]