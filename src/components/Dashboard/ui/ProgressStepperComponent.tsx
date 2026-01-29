import React from 'react';
import { Sprout, Baby, Briefcase } from 'lucide-react';

const ProgressStepperComponent: React.FC<{ currentStep?: number; progressPercentage?: number }> = ({ currentStep = 1, progressPercentage = 33 }) => {
  
  const stages = [
    { id: 1, label: 'Pre licencia', icon: <Sprout size={24} className="text-green-500" /> },
    { id: 2, label: 'Licencia', icon: <Baby size={24} /> },
    { id: 3, label: 'Post licencia', icon: <Briefcase size={24} /> },
  ];

  return (
    <div className="mt-6 w-[923px] h-[207px] bg-white rounded-[40px] shadow-lg flex flex-col items-center justify-between py-8 px-12 border border-gray-100">
      
      
      <h2 className="text-xl font-bold text-gray-900">
        Etapa {currentStep} de {stages.length}
      </h2>

      {/* Contenedor de Iconos y Etiquetas */}
      <div className="flex justify-between w-[781px] relative">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col items-center gap-2 z-10">
            {/* Círculo del Icono */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
              currentStep >= stage.id 
                ? 'border-slate-400 bg-white shadow-md' 
                : 'border-gray-100 bg-gray-50 opacity-40'
            }`}>
              {stage.icon}
            </div>
            {/* Texto de la Etapa */}
            <span className={`text-sm font-semibold transition-colors ${
              currentStep >= stage.id ? 'text-slate-500' : 'text-gray-300'
            }`}>
              {stage.label}
            </span>
          </div>
        ))}
      </div>

      {/* Barra de Progreso (Track) */}
      <div className="w-[781px] h-[15px] bg-slate-100 rounded-full overflow-hidden">
        {/* Progreso Real (Fill) */}
        <div 
          className="h-full bg-slate-400 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressStepperComponent;