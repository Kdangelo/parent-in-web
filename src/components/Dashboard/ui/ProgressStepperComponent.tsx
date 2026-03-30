import React from 'react';

// Importación de tus imágenes y componentes
import { Seedling } from '../../Icons/Icons'; 
import BabyIcon from '../../../assets/Baby.png';
import BriefcaseIcon from '../../../assets/Briefcase.png';

interface ProgressStepperProps {
  currentStep?: number;
  progressPercentage?: number; 
}

const ProgressStepperComponent: React.FC<ProgressStepperProps> = ({ 
  currentStep = 1, 
  progressPercentage 
}) => {
  
  const stages = [
    { id: 1, label: 'Pre licencia', icon: <Seedling className="w-8 h-8" /> },
    { id: 2, label: 'Licencia', icon: <img src={BabyIcon} alt="Licencia" className="w-8 h-8 object-contain" /> },
    { id: 3, label: 'Post licencia', icon: <img src={BriefcaseIcon} alt="Post licencia" className="w-8 h-8 object-contain" /> },
  ];

  const getWidth = () => {
    if (progressPercentage !== undefined) return `${progressPercentage}%`;
    if (currentStep === 1) return "10%";
    if (currentStep === 2) return "50%";
    return "100%";
  };

  return (
    <div className="w-full max-w-[923px] bg-white rounded-4xl shadow-sm flex flex-col items-center p-8 md:p-10 border border-[#3939390D] mx-auto">
      
      <h2 className="text-[14px] md:text-[16px] font-bold text-[#393939] font-glacial mb-10">
        Etapa {currentStep} de {stages.length}
      </h2>

      <div className="flex justify-between w-full max-w-[780px] relative mb-8">
        {stages.map((stage) => {
          const isActive = currentStep === stage.id; // Solo el actual brilla
          const isCompleted = currentStep > stage.id; // Los pasados ya están listos

          return (
            <div key={stage.id} className="flex flex-col items-center gap-4 z-10 flex-1">
              
              {/* Círculo del Icono: Ahora siempre visible */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border transition-all duration-500 ${
                isActive || isCompleted
                  ? 'border-[#3939391A] bg-white shadow-md scale-110' // Resalta el actual y completados
                  : 'border-[#3939390D] bg-[#F8F9FB]' // Los futuros se ven, pero más planos
              }`}>
                {/* QUITAMOS 'opacity-20' y 'opacity-40'. 
                   Ahora todos tienen opacity-100 para que se vean siempre.
                */}
                <div className={`transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-70 grayscale-[0.3]'
                }`}>
                  {stage.icon}
                </div>
              </div>

              {/* Etiqueta */}
              <span className={`text-[12px] md:text-[14px] font-bold font-glacial transition-colors ${
                isActive || isCompleted ? 'text-[#393939]' : 'text-[#3939394D]'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Barra de Progreso */}
      <div className="w-full max-w-[700px] h-3.5 bg-[#EEF2F6] rounded-full overflow-hidden shadow-inner relative">
        <div 
          className="h-full transition-all duration-1000 ease-in-out rounded-full"
          style={{ 
            width: getWidth(),
            background: 'linear-gradient(90deg, #C2D0F0 0%, #8F9AB2 100%)' 
          }}
        />
      </div>
    </div>
  );
};

export default ProgressStepperComponent;