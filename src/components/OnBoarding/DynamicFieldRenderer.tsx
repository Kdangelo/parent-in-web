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
      selectedValue === "otro" ||
      selectedValue === "other" ||
      selectedValue === "otra" ||
      selectedValue === "other_needs" ||
      selectedValue === "OTHER";

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
    const otherOptionValue = "otra"; // Usamos 'other_needs' como ejemplo
    const isOtherSelected =
      newValues.includes(otherOptionValue) || newValues.includes("otra");

    if (isOtherSelected) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherText(""); // Limpia el texto libre si se deselecciona "Otro"
    }

    // 3. Actualizar el estado del componente
    setValue(newValues);
  };

  // Lógica para manejar el envío de la respuesta
  const handleSubmit = () => {
    const isMultiSelect = step.type === "multiselect";
    const isTextField = ["text", "date", "tel", "email"].includes(step.type);
    // Incluimos "otra" y "otras" para cubrir todos los casos en español
    const otherOptionValues = ["other", "otro", "other_needs", "otra", "otras"];

    let finalAnswer: any;
    let valueForGlobalStore: string | null = null;

    // --- 1. CONSOLIDACIÓN DE RESPUESTA ---

    if (isMultiSelect) {
      // Clonamos el array para no mutar el estado de React directamente
      finalAnswer = Array.isArray(value) ? [...value] : [];
      const isOtherSelected = finalAnswer.some((v: string) =>
        otherOptionValues.includes(v)
      );

      if (isOtherSelected) {
        // Quitamos los marcadores "otro/otra" y añadimos el texto libre
        finalAnswer = finalAnswer.filter(
          (v: string) => !otherOptionValues.includes(v)
        );
        if (otherText.trim()) {
          finalAnswer.push(otherText.trim());
        }
      }

      // Extracción para el Store Global (espera string)
      if (finalAnswer.length > 0) {
        valueForGlobalStore = finalAnswer[0] as string;
      }
    } else if (isTextField) {
      // Limpiamos espacios en blanco al inicio y al final
      finalAnswer = typeof value === "string" ? value.trim() : value;
      valueForGlobalStore = finalAnswer;
    } else {
      // Lógica para RADIO o SELECT simple
      finalAnswer = value;
      if (otherOptionValues.includes(value as string)) {
        finalAnswer = otherText.trim();
      }
      valueForGlobalStore = finalAnswer as string;
    }

    // --- 2. VALIDACIÓN REFORZADA ---

    // Chequeamos que no sea solo espacios en blanco si es string
    const hasContent =
      typeof finalAnswer === "string"
        ? finalAnswer.trim().length > 0
        : Array.isArray(finalAnswer)
        ? finalAnswer.length > 0
        : !!finalAnswer;

    // El botón es válido si hay contenido Y, si "Otro" está activo, el campo de texto tiene algo
    const isNextButtonEnabled =
      hasContent &&
      (!showOtherInput || (showOtherInput && otherText.trim().length > 0));

    // --- 3. EJECUCIÓN ---

    if (isNextButtonEnabled) {
      // Sincronización con el estado global antes de avanzar
      if (step.nextStep === "final" && valueForGlobalStore) {
        setUserTypeStore(valueForGlobalStore);
      }

      // Enviamos la respuesta limpia al Engine (Padre)
      onNext(finalAnswer);
    } else {
      // Considerar reemplazar este alert por un Toast o SweetAlert2 después
      alert(
        "Por favor, completa la respuesta correctamente antes de continuar."
      );
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

    case "text":
    case "date":
    case "tel":
    case "email":
      return (
        <div className="flex flex-col w-full animate-fadeIn">
          <div className="relative">
            <input
              type={step.type}
              value={value || ""} // Aseguramos que no sea undefined
              onChange={(e) => setValue(e.target.value)}
              placeholder={step.placeholder || "Escribe aquí..."} // Soporte para placeholder desde el JSON
              autoFocus // UX: enfocar automáticamente al cargar el paso
              className={`
            w-full p-4 text-lg bg-white border-2 rounded-xl transition-all duration-200 outline-none
            ${
              value
                ? "border-blue-500 ring-2 ring-blue-100"
                : "border-gray-200 focus:border-blue-400"
            }
          `}
            />

            {/* Feedback visual simple si el campo es obligatorio */}
            {step.validation?.required && !value && (
              <p className="mt-2 text-sm text-gray-400 text-center">
                Este campo es obligatorio
              </p>
            )}
          </div>

          {/* Botón Siguiente (Centrado) */}
          <div className="pt-10 flex justify-center">
            <button
              onClick={handleSubmit}
              // Validación: Deshabilitar si está vacío
              disabled={
                !value || (typeof value === "string" && value.trim() === "")
              }
              className={`
            py-4 px-14 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 transform active:scale-95
            ${
              !value || (typeof value === "string" && value.trim() === "")
                ? "bg-gray-300 cursor-not-allowed opacity-70"
                : "bg-gray-800 hover:bg-gray-900 hover:shadow-xl"
            }
          `}
            >
              Siguiente
            </button>
          </div>
        </div>
      );

    case "multiselect":
      return (
        <div className="flex flex-col space-y-4">
          {step.options?.map((option) => {
            const isActive = (value as string[]).includes(option.value);

            return (
              <button
                key={option.value}
                onClick={() => handleMultiselectChange(option.value)}
                className={`
                   w-full py-3 px-6 rounded-lg text-lg font-medium transition duration-150 ease-in-out
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
    default:
      return <p>Tipo de campo no soportado: {step.type}</p>;
  }
};

export default DynamicFieldRenderer;
