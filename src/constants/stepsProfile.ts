import type { StepConfig } from "./types";


export const stepProfile: StepConfig[] = [
  {
    id: 1,
    title: "Fecha de nacimiento",
    description: "Ingrese su fecha de nacimiento",
    options: ["<input type=\"date\" id=\"birthdate\" name=\"birthdate\">"],
    type: "single",
  },
  {
    id: 2,
    title: "Género",
    description: "Seleccione su género",
    options: ["Masculino", "Femenino", "Prefiero no decirlo"],
    type: "single",
  },
  {
    id: 3,
    title: "País de residencia",
    description: "Ingrese su país de residencia",
    options: ["<input type=\"text\" id=\"country\" name=\"country\">"],
    type: "single",
  },
  {
    id: 4,
    title: "Ciudad de residencia",
    description: "Ingrese su ciudad de residencia",
    options: ["<input type=\"text\" id=\"city\" name=\"city\">"],
    type: "single",
  },
  {
    id: 5,
    title: "Celular de contacto",
    description: "Completar con código de áre",
    options: ["<input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"+54 9 11 1234 5678\">"],
    type: "single",
  },
  {
    id: 6,
    title: "¿Cómo te gustaría involucrarte con Parent in?",
    description: "Selecciona una opción",
    options: ["Soy madre, padre o persona gestante y quiero recibir acompañamiento", "Soy parte de una organización y quiero conocer la propuesta", "Soy profesional y quiero postularme a la red"],
    type: "single",
  }
]