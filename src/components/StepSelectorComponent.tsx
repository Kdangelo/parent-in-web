import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { StepConfig } from "../constants/types";

export default function StepSelectorComponent({stepsProp}: {stepsProp?: StepConfig[] }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const step = stepsProp?.find(s => s.id === currentStep); // || steps.find(s => s.id === currentStep);

  const handleSelect = (step: StepConfig, option: string) => {
    setAnswers((prev) => {
      const current = prev[step.id] || [];
      if( step.type === "single" ) {
        return { ...prev, [step.id]: [option] };
      }
      if( step.type === "multiple" ) {
        return current.includes(option)
          ? { ...prev, [step.id]: current.filter((o) => o !== option) }
          : { ...prev, [step.id]: [...current, option] };
      }
      return prev;
    })
  }


  const totalSteps = stepsProp?.length || 0;


  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Respuestas: ", answers);
    alert("Preferencias guardadas. ¡Gracias!");
  };

  const canProceed = () => {
    const selected = answers[step?.id || 0] || [];
    return selected.length > 0;
  };

  return (
    <div className="fixed inset-0 bg-[#F7F6F1] flex flex-col">
    
      <div className="w-full px-4 pt-4">
        <div className="w-full h-1 bg-[#393939] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C5D0EC]"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>

      {currentStep > 1 && (
        <div className="absolute top-16 left-4">
          <button
            onClick={handleBack}
            className="flex items-center w-12 h-12 border border-black gap-2 px-3 py-2 rounded-full text-black hover:bg-zinc-300 transition-all text-sm sm:text-base"
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
      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {step && (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm text-center"
            >
              <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
                {step.title}
              </h1>
              <p className="text-zinc-500 mb-6">{step.description}</p>

              {step.options && (
                <div className="flex flex-col gap-4 items-center">
                  {step.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleSelect(step, option)}
                      className={`px-6 py-3 rounded-xl font-medium transition-colors text-base sm:text-lg md:text-xl ${
                        (answers[step.id] || []).includes(option)
                          ? "bg-blue-500 text-white"
                          : "bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Botón siguiente / submit */}
              <div className="mt-6 flex justify-center">
                {currentStep < totalSteps ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className={`inline-flex px-6 py-3 rounded-xl font-medium transition-all text-base sm:text-lg md:text-xl ${
                      canProceed()
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                    }`}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="inline-flex px-6 py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all text-base sm:text-lg md:text-xl"
                  >
                    Submit
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
