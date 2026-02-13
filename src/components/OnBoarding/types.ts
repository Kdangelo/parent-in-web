// Define los tipos de campos disponibles
type FieldType = "date" | "select" | "multiselect" | "text" | "number" | "checkbox" | "radio" | "tel" | "email";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage?: string;
}

// Define la estructura de un paso del flujo
export type StepDefinition = {
  id: string;
  type: FieldType;
  question: string;
  options?: { value: string; label: string }[];
  nextStep?: string | null;
  nextStepByAnswer?: Record<string, string>; // Lógica de bifurcación
  saveTo: string;
  // Propiedad para el campo "otro"
  hasOtherField?: boolean; // Propiedad custom para manejar el 'otro'
  otherFieldId?: string;
  placeholder?: string;
  validation?: ValidationRules;
};

// El JSON completo del flujo
export type FlowDefinition = {
  userType: string;
  steps: Record<string, StepDefinition>;
};

// Respuestas acumuladas
export type Answers = Record<string, any>;