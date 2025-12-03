// DynamicFieldRenderer.tsx

import { useState } from "react";

const DynamicFieldRenderer = ({ step, onNext }) => {
  const [value, setValue] = useState<any>('');
  const [otherText, setOtherText] = useState(''); // Estado para el campo "Otro"
  const [showOtherInput, setShowOtherInput] = useState(false);

  // useEffect para resetear estados al cambiar de paso
  useEffect(() => {
    setValue('');
    setOtherText('');
    setShowOtherInput(false);
  }, [step.id]);

  // Lógica para manejar la selección de "select" o "radio" (Tus botones)
  const handleSelectChange = (selectedValue: string) => {
    setValue(selectedValue);

    // **Lógica clave para "Otro/Otros"**
    if (selectedValue === 'other') { // Asume que el value de la opción "Otro" es 'other'
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      // Opcional: Si el campo "other" debe ser incluido en la respuesta,
      // aquí podrías consolidar el valor si no es 'other'
    }
  };
  
  // Función para consolidar la respuesta antes de pasar a onNext
  const handleSubmit = () => {
    // 1. Realizar validación local (opcional, para UX rápida)
    // ...

    // 2. Consolidar la respuesta (manejo de "Otro")
    let finalAnswer = value;
    if (value === 'other' && otherText) {
        // Podrías enviar solo el texto libre, o un objeto que lo encapsule
        // Esto depende de cómo lo espera el Backend (ej: como un string)
        finalAnswer = otherText;
    }
    
    // Si es un multiselect, el value es un array, no necesita esta lógica de 'other'
    // si el backend puede manejar "otro" como una opción más en el array.

    onNext(finalAnswer);
  };


  // Renderizado dinámico basado en step.type
  switch (step.type) {
    case 'date': // Para datos de perfil (fecha de nacimiento)
    case 'text':
    case 'tel': // Para datos de perfil (teléfono)
      return (
        <>
          <input type={step.type} value={value} onChange={e => setValue(e.target.value)} />
          <button onClick={handleSubmit}>Siguiente</button>
        </>
      );

    case 'select': // Para preguntas con botones/selects
    case 'radio':
      return (
        <>
          {step.options?.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelectChange(option.value)}
              // Lógica de estilo para marcar el botón seleccionado
            >
              {option.label}
            </button>
          ))}
          {showOtherInput && (
            <input
              type="text"
              placeholder="Especifique otro..."
              value={otherText}
              onChange={e => setOtherText(e.target.value)}
            />
          )}
          <button onClick={handleSubmit} disabled={!value || (showOtherInput && !otherText)}>
            Siguiente
          </button>
        </>
      );

    // ... otros casos como 'multiselect', 'textarea'

    default:
      return <p>Tipo de campo no soportado: {step.type}</p>;
  }
};

export default DynamicFieldRenderer;