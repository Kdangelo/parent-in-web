import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Edit2 } from "lucide-react";
import { SUPPORT_NEEDS_BY_STAGE } from "../constants/onboarding";

const { PRE_LICENCIA, POST_LICENCIA, LICENCIA } = SUPPORT_NEEDS_BY_STAGE;

const experienceLevels = [
  "Novice",
  "Beginner",
  "Intermediate",
  "Knowledgeable",
  "Expert",
];

const defiUseCases = [
  "LP'ing",
  "Earning Yield",
  "Growing capital",
  "Rewards",
  "Vibes",
];

const cryptoAssets = [
  "BTC",
  "ETH",
  "SOL",
  "BNB",
  "XRP",
  "ADA",
  "DOGE",
  "AVAX",
  "DOT",
  "MATIC",
  "LINK",
  "UNI",
  "ATOM",
  "LTC",
  "APT",
  "ARB",
  "OP",
  "NEAR",
  "STX",
  "IMX",
];

const networks = [
  "Ethereum",
  "Base",
  "Arbitrum",
  "Optimism",
  "Polygon",
  "Solana",
  "BSC",
  "Avalanche",
  "Plasma",
  "Unichain",
];

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

function ChipButton({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      layout
      initial={false}
      animate={{
        backgroundColor: isSelected ? "#1e3a5f" : "rgba(39, 39, 42, 0.5)",
      }}
      whileHover={{
        backgroundColor: isSelected ? "#1e3a5f" : "rgba(39, 39, 42, 0.8)",
      }}
      whileTap={{
        backgroundColor: isSelected ? "#152943" : "rgba(39, 39, 42, 0.9)",
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
        backgroundColor: { duration: 0.1 },
      }}
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-base font-medium
        whitespace-nowrap overflow-hidden ring-1 ring-inset
        ${
          isSelected
            ? "text-blue-400 ring-[hsla(0,0%,100%,0.12)]"
            : "text-white ring-[hsla(0,0%,100%,0.06)]"
        }
      `}
    >
      <motion.div
        className="relative flex items-center"
        animate={{
          width: isSelected ? "auto" : "100%",
          paddingRight: isSelected ? "1.5rem" : "0",
        }}
        transition={{
          ease: [0.175, 0.885, 0.32, 1.275],
          duration: 0.3,
        }}
      >
        <span>{label}</span>
        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.5,
              }}
              className="absolute right-0"
            >
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

export default function StepSelector() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);

  const totalSteps = 5;

  const toggleUseCase = (useCase: string) => {
    setSelectedUseCases((prev) =>
      prev.includes(useCase)
        ? prev.filter((u) => u !== useCase)
        : [...prev, useCase]
    );
  };

  const toggleAsset = (asset: string) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  };

  const toggleNetwork = (network: string) => {
    setSelectedNetworks((prev) =>
      prev.includes(network)
        ? prev.filter((n) => n !== network)
        : [...prev, network]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", {
      experience: selectedExperience,
      useCases: selectedUseCases,
      assets: selectedAssets,
      networks: selectedNetworks,
    });
    alert("Preferences saved!");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedExperience !== "";
      case 2:
        return selectedUseCases.length > 0;
      case 3:
        return selectedAssets.length > 0;
      case 4:
        return selectedNetworks.length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F7F6F1] flex flex-col">
      {/* Barra de progreso arriba */}
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
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm text-center"
          >
            <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
              ¿Qué opción te describe mejor?
            </h1>

            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={() => setSelectedExperience("Madre")}
                className={`w-full px-6 py-3 rounded-xl font-medium transition-colors text-base sm:text-lg md:text-xl ${
                  selectedExperience === "Madre"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100"
                }`}
              >
                Madre
              </button>
              <button
                onClick={() => setSelectedExperience("Padre")}
                className={`w-full px-6 py-3 rounded-xl font-medium transition-colors text-base sm:text-lg md:text-xl ${
                  selectedExperience === "Padre"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100"
                }`}
              >
                Padre
              </button>
              <div className="mt-6 w-full flex justify-center">
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all text-base sm:text-lg md:text-xl ${
                    canProceed()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
