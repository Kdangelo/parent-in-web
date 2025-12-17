import React, { useEffect, useState } from "react";
import type { StepDefinition } from "./types";
import { useAuth } from "../../hooks/useAuth";

interface DynamicFieldRendererProps {
  step: StepDefinition;
  onNext: (value: any) => void;
  initialValue?: any;
}

const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({
  step,
  onNext,
  initialValue,
}) => {
  const [value, setValue] = useState<any>(initialValue || ""); // Estado para el valor del campo
  const [otherText, setOtherText] = useState(""); // Estado para el campo "Otro"
  const [showOtherInput, setShowOtherInput] = useState(false);

  const { setUserTypeStore } = useAuth();

  // useEffect para resetear estados al cambiar de paso
  useEffect(() => {
    setOtherText("");
    setShowOtherInput(false);

    //Determinar el valor inicial correcto basado en el tipo
    let initial: any = initialValue;

    if (step.type === "multiselect") {
      // Si no hay initialValue o no es un array, inicializamos con [].
      initial = Array.isArray(initialValue) ? initialValue : [];
    } else if (step.type === "radio" || step.type === "select") {
      initial = initialValue || "";
    }

    setValue(initial);

  }, [step.id, initialValue, step.type]);

  // Lógica para manejar la selección de "select" o "radio" (Tus botones)
  const handleSelectChange = (selectedValue: string) => {
    setValue(selectedValue);

    // Asumimos que el JSON usa el 'value' "otro" o "other" para esta opción
    const isOtherSelected =
      selectedValue === "otro" || selectedValue === "other" || selectedValue === "otra";

    // **Lógica clave para "Otro/Otros"**
    if (isOtherSelected) {
      // Asume que el value de la opción "Otro" es 'other'
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherText(""); // Limpiar el texto de "Otro" si no está seleccionado
    }
  };

  const handleMultiselectChange = (selectedValue: string) => {
    // Aseguramos que `value` sea tratado como un array de strings.
    // Si es null o no está inicializado, lo tratamos como un array vacío.
    const currentValues: string[] = Array.isArray(value) ? value : [];

    const isSelected = currentValues.includes(selectedValue);
    let newValues: string[];

    // 1. Lógica de Toggle (Alternancia de selección)
    if (isSelected) {
      // Deseleccionar: filtramos el valor para sacarlo del array
      newValues = currentValues.filter((v) => v !== selectedValue);
    } else {
      // Seleccionar: añadimos el nuevo valor al array
      newValues = [...currentValues, selectedValue];
    }

    // 2. Lógica Condicional para la Opción "Otro/Otros"
    // Asumimos que el value de la opción "Otro" en tu JSON es 'otro' o 'other_needs'
    const otherOptionValue = "other_needs"; // Usamos 'other_needs' como ejemplo
    const isOtherSelected =
      newValues.includes(otherOptionValue) || newValues.includes("otro");

    if (isOtherSelected) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherText(""); // Limpia el texto libre si se deselecciona "Otro"
    }

    // 3. Actualizar el estado del componente
    setValue(newValues);
  };

  // Función para consolidar la respuesta antes de pasar a onNext
  const handleSubmit = () => {
    
    const isMultiSelect = step.type === "multiselect";
    const otherOptionValues = ["other", "otro", "other_needs", "otra"];

    let finalAnswer: any; // Puede ser string o string[]
    let valueForGlobalStore: string | null = null; // Variable para el estado global

    // --- CONSOLIDACIÓN DE RESPUESTA (PASO CLAVE) ---

    if (isMultiSelect) {
        //Para MULTISELECT: finalAnswer es un array
        finalAnswer = Array.isArray(value) ? [...value] : []; 
        const isOtherSelected = finalAnswer.some((v: string) => otherOptionValues.includes(v));

        if (isOtherSelected) {
            finalAnswer = finalAnswer.filter((v: string) => !otherOptionValues.includes(v));
            if (otherText.trim()) {
                finalAnswer.push(otherText.trim());
            }
        }
        
        // LÓGICA PARA EL ESTADO GLOBAL
        // Si el estado global SÓLO quiere un string, asumimos que toma el primer valor del array.
        if (finalAnswer.length > 0) {
            valueForGlobalStore = finalAnswer[0] as string; 
        }

    } else {
        // Para SINGLE SELECT / RADIO / TEXT: finalAnswer es un string
        finalAnswer = value;

        if (otherOptionValues.includes(value as string)) {
            finalAnswer = otherText.trim();
        }
        
        // El valor para el estado global es simplemente la respuesta final
        valueForGlobalStore = finalAnswer as string;
    }

    const isValidSelection = isMultiSelect ? finalAnswer.length > 0 : !!finalAnswer;
    
    const isNextButtonEnabled = 
        isValidSelection && 
        (!showOtherInput || (showOtherInput && otherText.trim()));

   
    // --- LÓGICA DE ESTADO GLOBAL Y NAVEGACIÓN ---

    if (isNextButtonEnabled) {
        
        // Usamos la variable específica para el estado global
        if (step.nextStep === "final" && valueForGlobalStore) {
            // Se ejecuta solo si es un paso final Y si se ha extraído un valor (string)
            // Esto asegura que `setUserTypeStore` solo reciba un string.
            setUserTypeStore(valueForGlobalStore);
        }

        // Pasamos SIEMPRE la respuesta COMPLETA (array o string) al componente padre
        // para que se guarde correctamente en el objeto `answers` para el backend.
        onNext(finalAnswer); 
        return;
    } else {
        alert("Debe completar la respuesta o especificar la opción 'Otro'.");
    }
};
  
  // ... (dentro de DynamicFieldRenderer, en el switch)

  switch (step.type) {
    case "select":
    case "radio":
      return (
        <div className="flex flex-col space-y-4">
          {/* Botones de Opción */}
          {step.options?.map((option) => {
            // Estilo específico para la opción "Otro" si la quieres destacar
            //const isOtherOption = option.value === 'otro' || option.value === 'other';

            // Determinar si este botón está activo (seleccionado)
            const isActive = value === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelectChange(option.value)}
                className={`
                  w-full py-3 px-6 rounded-lg text-lg font-medium transition duration-150 ease-in-out
                  ${
                    isActive
                      ? // Estilo Activo: Azul fuerte, texto blanco
                        "bg-blue-600 text-white shadow-lg border-blue-600"
                      : // Estilo Inactivo: Blanco, borde gris, texto oscuro
                        "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}

          {/* Cuadro de Texto "Otro" Condicional */}
          {showOtherInput && (
            <input
              type="text"
              placeholder="Especifique cuál es su opción..."
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              // Estilo del input: Margen superior para separarlo de los botones
              className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
            />
          )}

          {/* Botón Siguiente (Centrado) */}
          <div className="pt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              // Habilitación: debe haber un valor seleccionado Y si se muestra el campo "Otro", debe tener texto
              disabled={!value || (showOtherInput && !otherText.trim())}
              className={`
                py-3 px-12 rounded-full text-white font-semibold shadow-md transition duration-200
                ${
                  !value || (showOtherInput && !otherText.trim())
                    ? // Estilo Deshabilitado (Gris claro, cursor no permitido)
                      "bg-gray-400 cursor-not-allowed"
                    : // Estilo Habilitado (Gris oscuro, como en la imagen de ejemplo)
                      "bg-gray-600 hover:bg-gray-700"
                }
              `}
            >
              Siguiente
            </button>
          </div>
        </div>
      );

    case "date":
    case "text":
    case "tel":
      return (
        <>
          <input
            type={step.type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // Estilo: input grande y centrado
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="pt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!value}
              className={`
                            py-3 px-12 rounded-full text-white font-semibold shadow-md transition duration-200
                            ${
                              !value
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gray-600 hover:bg-gray-700"
                            }
                        `}
            >
              Siguiente
            </button>
          </div>
        </>
      );

    case "multiselect":
      return (
        <div className="flex flex-col space-y-4">
          {/* Aquí va el mapeo de opciones para los botones de multiselect. 
                  Usa `handleMultiselectChange` para alternar la selección.
                */}
          {step.options?.map((option) => {
            const isActive = (value as string[]).includes(option.value);

            return (
              <button
                key={option.value}
                onClick={() => handleMultiselectChange(option.value)}
                className={`
                            ${
                              isActive
                                ? "bg-blue-600 text-white shadow-lg border-blue-600"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }
                        `}
              >
                {option.label}
              </button>
            );
          })}
          {showOtherInput && (
            <input
              type="text"
              placeholder="Especifique cuál es su opción..."
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              // Estilo del input: Margen superior para separarlo de los botones
              className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
            />
          )}
          {/* Botón Siguiente */}
          <div className="pt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              // La validación ahora debe revisar si `value` (que es un array) tiene elementos
              disabled={!value || (value as string[]).length === 0}
              // ... (Clases de Tailwind CSS)
            >
              Siguiente
            </button>
          </div>
        </div>
      );
    default:
      return <p>Tipo de campo no soportado: {step.type}</p>;
  }
};

export default DynamicFieldRenderer;
