// OnboardingFlowEngine.tsx (Componente Único)
import React, { useState, useEffect } from 'react';
import DynamicFieldRenderer from './DynamicFieldRenderer'; // Componente hijo
import type { Answers, FlowDefinition } from './types';

const OnboardingFlowEngine = ({ userType }) => {
  const [flow, setFlow] = useState<FlowDefinition | null>(null);
  const [currentStepId, setCurrentStepId] = useState('1');
  const [answers, setAnswers] = useState<Answers>({});

  // 1. Cargar el flujo al montar el componente
  useEffect(() => {
    // Aquí llamarías a fetchFlow(userType)
    // Usando un ejemplo hardcodeado para ilustrar
    const fetchedFlow = getFlowFromBackend(userType);
    setFlow(fetchedFlow);
    if (fetchedFlow && Object.keys(fetchedFlow.steps).length > 0) {
      setCurrentStepId(Object.keys(fetchedFlow.steps)[0]);
    }
  }, [userType]);

  const currentStep = flow?.steps[currentStepId];

  // 2. Manejar el avance del paso
  const handleNext = (currentAnswer: any) => {
    if (!currentStep) return;

    // Acumular la respuesta
    const newAnswers = { ...answers, [currentStep.id]: currentAnswer };
    setAnswers(newAnswers);

    // Lógica clave de navegación de grafo
    let nextId: string | undefined;
    if (currentStep.nextStepByAnswer) {
      // Bifurcación: usa la respuesta para decidir el siguiente paso
      nextId = currentStep.nextStepByAnswer[currentAnswer];
    }
    // Lógica lineal o de fallback
    if (!nextId) {
      nextId = currentStep.nextStep;
    }

    if (nextId === 'final') {
      // Enviar a POST /api/onboarding/complete
      submitOnboarding(userType, newAnswers);
    } else if (nextId) {
      setCurrentStepId(nextId); // Avanzar al siguiente paso
    }
  };

  if (!flow || !currentStep) {
    return <div>Cargando flujo...</div>;
  }

  // 3. Renderizar el motor
  return (
    <div>
      <h2>{currentStep.question}</h2>
      <DynamicFieldRenderer
        step={currentStep}
        onNext={handleNext}
      />
    </div>
  );
};

export default OnboardingFlowEngine;