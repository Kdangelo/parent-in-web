// OnboardingFlowEngine.tsx (Componente Único)
import React, { useState, useEffect } from "react";

import DynamicFieldRenderer from "./DynamicFieldRenderer"; // Componente hijo
import type { Answers, FlowDefinition } from "./types";

import { onboardingFlows } from "../../constants/onboardingFlows";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { submitOnboarding } from "../../services/onBoardingService";

const OnboardingFlowEngine: React.FC = () => {
  const { userTypeStore } = useAuth();

  const navigate = useNavigate();

  const [flow, setFlow] = useState<FlowDefinition | null>(null);

  const [answers, setAnswers] = useState<Answers>({});

  const [history, setHistory] = useState<string[]>(["1"]); // Para manejar el historial de pasos

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const currentStepId = history[history.length - 1];
  const currentStep = flow?.steps[currentStepId];

  // 1. Cargar el flujo al montar el componente
  useEffect(() => {
    if (!userTypeStore) return;

    if (currentStep?.nextStep === "final") {
      setAnswers({});
    }

    const fetchedFlow = onboardingFlows[userTypeStore];

    setFlow(fetchedFlow);

    if (fetchedFlow && Object.keys(fetchedFlow.steps).length > 0) {
      const firstStepId = Object.keys(fetchedFlow.steps).find(
        (id) => id !== "final",
      );
      setHistory([firstStepId || "1"]);
    }
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTypeStore]);

  // 2. Manejar el avance del paso
  const handleNext = async (currentAnswer: string) => {
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
      try {
        setLoading(true);
        await submitOnboarding(userTypeStore, newAnswers);
        setLoading(false);
      } catch (error) {
        //(setLoading(false);
        Swal.fire({
          title: "Error",
          text:
            error instanceof Error
              ? error.message
              : "Ha ocurrido un error inesperado.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      // alert(userTypeStore);
      // alert(
      //   "¡Onboarding completado! Gracias." +
      //     JSON.stringify(newAnswers)
      // );
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!flow || !currentStep) {
    // debería pegarle a algun endpoint para que de acuerdo al userType lleve un dashboard específico
    // userType: "parental" => "/dashboard-parental"
    // userType: "professional" => "/dashboard-professional"
    // userType: "corporate" => "/dashboard-corporate"

    Swal.fire({
      title: "¡Muchas gracias por completar tus datos!",
      icon: "info",
      html: `
      Tu dashboard está listo y personalizado
      según tu etapa
    `,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
      <i class="fa fa-thumbs-up"></i> Continuar!
    `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
      <i class="fa fa-thumbs-down"></i>
    `,
      cancelButtonAriaLabel: "Thumbs down",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard");
      }
    });
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
          {loading ? (
            <div className="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : // <div className="min-h-[200px] flex items-center justify-center">
          //   <span className="text-gray-600">Enviando tus respuestas...</span>
          // </div>
          null}
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
