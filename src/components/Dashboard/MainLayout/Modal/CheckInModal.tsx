import { useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconArrowBack } from "../../../Icons/Icons";
import sadEmoji from "../../../../assets/sad-emoji.png";
import happyEmoji from "../../../../assets/happy-emoji.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;      
  categoryId: string; 
  onFinish: (score: number) => void;
}

export default function CheckInModal({ isOpen, onClose, title, categoryId, onFinish }: Props) {
  const [step, setStep] = useState(1);
  const [scores, setScores] = useState<{ [key: number]: number | null }>({ 1: null, 2: null });

  if (!isOpen) return null;

  const fullTitle = `${title} | Pre Licencia`; 
  const currentScore = scores[step];

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (scores[1] && scores[2]) {
      onFinish(Math.round((scores[1] + scores[2]) / 2));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
      
      <div className="bg-[#FCFAF6] rounded-[32px] w-full max-w-[700px] min-h-[478px] overflow-hidden shadow-xl flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full px-8 pt-8 flex justify-between items-center">
          <button onClick={() => step === 2 ? setStep(1) : onClose()} className="p-2 opacity-40 hover:opacity-100 transition-opacity">
            <IconArrowBack className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h3 className="text-[20px] font-bold text-[#393939] font-lora">{fullTitle}</h3>
            <span className="text-[14px] text-[#A3A3A3] block mt-1 font-glacial">{step}-2</span>
          </div>
          <button onClick={onClose} className="p-2 opacity-40 hover:opacity-100 transition-opacity">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="w-full mt-4 h-[3px] bg-transparent relative">
          <div 
            className={`absolute h-full transition-all duration-500 ease-in-out bg-gradient-to-r from-[#C2D0F0] to-[#8F9AB2] rounded-full ${step === 1 ? 'w-1/2' : 'w-full'}`}
          />
        </div>

        <div className="p-10 w-full flex flex-col items-center">
          <p className="text-[#393939] font-semibold text-[20px] text-center mb-10 px-4 font-glacial">
            {step === 1 
              ? `¿Cómo se siente hoy el ${categoryId.toLowerCase()} en esta etapa?` 
              : `¿Qué tan claro se siente el proceso previo a la licencia?`}
          </p>

          <div className="w-full max-w-[642px] h-[120px] bg-white border border-[#393939]/30 rounded-[10px] px-12 flex justify-between items-center relative mb-12 shadow-sm">

            <div className="absolute left-16 right-16 h-[1px] bg-[#393939]/20 z-0" />

            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative flex flex-col items-center justify-center z-10">
                <button
                  onClick={() => setScores({...scores, [step]: num})}
                  className={`w-[36px] h-[36px] rounded-full transition-all border-2 flex items-center justify-center
                    ${currentScore === num ? 'bg-[#E6C0D7] border-[#B89AAC] shadow-inner' : 'bg-white border-[#393939]'}`}
                >
                  {currentScore === num && <div className="w-full h-full rounded-full bg-[#E6C0D7]" />}
                </button>
                
                {num === 1 && (
                  <img 
                    src={sadEmoji} 
                    className="absolute w-7 h-7 top-[42px]" 
                    alt="sad" 
                  />
                )}
                {num === 5 && (
                  <img 
                    src={happyEmoji} 
                    className="absolute w-7 h-7 top-[42px]" 
                    alt="happy" 
                  />
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={!currentScore}
            style={{ lineHeight: '140%' }}
            className={`w-full max-w-[350px] h-[43px] rounded-[24px] font-semibold text-[18px] text-[#F9FAFD] transition-all flex items-center justify-center gap-2 font-glacial
              ${currentScore ? 'bg-[#595E6A] opacity-100 active:scale-[0.98]' : 'bg-[#595E6A]/30 cursor-not-allowed'}`}
          >
            {step === 1 ? 'Siguiente →' : 'Finalizar →'}
          </button>
        </div>
      </div>
    </div>
  );
}