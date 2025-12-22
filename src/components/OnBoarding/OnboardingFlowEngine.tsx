// OnboardingFlowEngine.tsx (Componente Único)
import React, { useState, useEffect, use } from "react";

import DynamicFieldRenderer from "./DynamicFieldRenderer"; // Componente hijo
import type { Answers, FlowDefinition } from "./types";

import { onboardingFlows } from "../../constants/onboardingFlows";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OnboardingFlowEngine: React.FC = () => {
  const { userTypeStore } = useAuth();

  const navigate = useNavigate();

  const [flow, setFlow] = useState<FlowDefinition | null>(null);

  const [answers, setAnswers] = useState<Answers>({});

  const [history, setHistory] = useState<string[]>(["1"]); // Para manejar el historial de pasos
  const currentStepId = history[history.length - 1];
  const currentStep = flow?.steps[currentStepId];

  // 1. Cargar el flujo al montar el componente
  useEffect(() => {
    if (!userTypeStore) return;

    if(currentStep?.nextStep === 'final') {
      setAnswers({});
    }

    const fetchedFlow = onboardingFlows[userTypeStore];

    setFlow(fetchedFlow);

    if (fetchedFlow && Object.keys(fetchedFlow.steps).length > 0) {
      const firstStepId = Object.keys(fetchedFlow.steps).find(
        (id) => id !== "final"
      );
      setHistory([firstStepId || "1"]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTypeStore]);

  // 2. Manejar el avance del paso
  const handleNext = (currentAnswer: string) => {
    if (!currentStep) return;

    // Acumular la respuesta
    const newAnswers = { ...answers, [currentStep.saveTo]: currentAnswer };
    setAnswers(newAnswers);

    // Lógica clave de navegación de grafo
    let nextId: string | undefined | null = undefined;

    if (currentStep.nextStepByAnswer) {
      // Bifurcación: usa la respuesta para decidir el siguiente paso
      nextId = currentStep.nextStepByAnswer[currentAnswer];
    }
    // Lógica lineal o de fallback
    if (!nextId) {
      nextId = currentStep.nextStep;
    }

    if (nextId === "final") {
      // Enviar a POST /api/onboarding/complete
      // submitOnboarding(userType, newAnswers);
      console.log(newAnswers);

      alert(
        "¡Onboarding completado! Gracias." +
          JSON.stringify(newAnswers)
      );
    } else if (nextId) {
      setHistory((prevHistory) => [...prevHistory, nextId]); // Actualizar el historial
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory((prevHistory) => prevHistory.slice(0, -1)); // Volver al paso anterior
    }
  };

  const allSteps = flow
    ? Object.keys(flow.steps).filter((id) => id !== "final")
    : [];
  const stepIndex = allSteps.indexOf(currentStepId);
  const progress = flow
    ? Math.round(((stepIndex + 1) / allSteps.length) * 100)
    : 0;

  const isBackButtonVisible = history.length > 1; //solo si hay pasos previos

  if (!flow || !currentStep) {
    // debería pegarle a algun endpoint para que de acuerdo al userType lleve un dashboard específico
    // userType: "parental" => "/dashboard-parental"
    // userType: "professional" => "/dashboard-professional"
    // userType: "corporate" => "/dashboard-corporate"
    
  //   Swal.fire({
  //     title: "¡Muchas gracias por completar tus datos!",
  //     icon: "info",
  //     html: `
  //   Tu dashboard está listo y personalizado
  //   según tu etapa
  // `,
  //     showCloseButton: false,
  //     showCancelButton: false,
  //     focusConfirm: false,
  //     confirmButtonText: `
  //   <i class="fa fa-thumbs-up"></i> Continuar!
  // `,
  //     confirmButtonAriaLabel: "Thumbs up, great!",
  //     cancelButtonText: `
  //   <i class="fa fa-thumbs-down"></i>
  // `,
  //     cancelButtonAriaLabel: "Thumbs down",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate("/dashboard");
  //     }
  //   }
  // );
    navigate("/dashboard");
  }

  // 3. Renderizar el motor
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Barra de Navegación y Progreso (Arriba) */}
      <div className="w-full p-4  bg-gray-50 ">
        <div className="flex items-center">
          {/* Barra de Progreso */}
          <div className="flex-1 h-2 bg-[#393939] rounded-full">
            <div
              className="h-full bg-[#C5D0EC] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Botón de Retroceso Condicional */}
      {isBackButtonVisible && (
        <div className="absolute top-16 left-4">
          <button
            onClick={handleBack}
            className="flex items-center w-12 h-12 border border-black gap-2 px-3 py-2 rounded-full text-black hover:bg-zinc-300 transition-all text-sm sm:text-base"
            aria-label="Volver al paso anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Contenido Principal (Centrado) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Título de la pregunta (Centrado) */}
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8 text-gray-800">
            {currentStep?.question}
          </h2>

          {/* Renderer Dinámico */}
          {currentStep && (
            <DynamicFieldRenderer
              step={currentStep}
              onNext={handleNext}
              // Pasar el estado de respuestas actuales para pre-cargar si es necesario
              initialValue={answers[currentStepId]}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default OnboardingFlowEngine;
