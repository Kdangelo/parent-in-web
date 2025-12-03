// Define los tipos de campos disponibles
type FieldType = "date" | "select" | "multiselect" | "text" | "number" | "checkbox";

// Define la estructura de un paso del flujo
type StepDefinition = {
  id: string;
  type: FieldType;
  question: string;
  options?: { value: string; label: string }[];
  //validation: ValidationRules;
  nextStep?: string | null;
  nextStepByAnswer?: Record<string, string>; // Lógica de bifurcación
  saveTo: string;
  // Propiedad para el campo "otro"
  hasOtherField?: boolean; // Propiedad custom para manejar el 'otro'
  otherFieldId?: string;
};

// El JSON completo del flujo
export type FlowDefinition = {
  userType: string;
  steps: Record<string, StepDefinition>;
};

// Respuestas acumuladas
export type Answers = Record<string, any>;