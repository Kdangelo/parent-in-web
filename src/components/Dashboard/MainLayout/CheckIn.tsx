import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconTrabajo, IconHogar, IconBienestar, IconTimer, IconBell } from "../../Icons/Icons"; 
import CheckInModal from './Modal/CheckInModal';
import ResultModal from './Modal/ResultModal';

const categories = [
  { id: 'trabajo', title: 'Trabajo', icon: IconTrabajo, desc: 'Registra cómo vives hoy el trabajo, para detectar necesidades de ajuste y apoyo.' },
  { id: 'hogar', title: 'Hogar', icon: IconHogar, desc: 'Registra qué tan sostenible es la organización del hogar para detectar oportunidades de apoyo.' },
  { id: 'bienestar', title: 'Bienestar', icon: IconBienestar, desc: 'Registra tu estado emocional y físico, para cuidar la energía y prevenir sobrecarga.' },
];

export default function CheckIn() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const activeCatData = categories.find(c => c.id === activeCategory);

  return (
    <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0">
      
      <div className="w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center w-full mt-6 md:mt-2 mb-8">
          <div className="flex flex-col gap-1 pl-10 md:pl-0">
            <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px] leading-tight">Check In</h2>
            <p className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px]">Chequeo diario con recomendaciones útiles</p>
          </div>
          
          <div className="relative p-3 bg-white rounded-full shadow-sm cursor-pointer border border-[#F0F0F0] hover:bg-gray-50 transition-colors">
            <IconBell className="text-[#393939] w-6 h-6" />
            <div className="absolute top-2.5 right-2.5 w-[10px] h-[10px] bg-[#9FC47C] border-2 border-white rounded-full"></div>
          </div>
        </div>

        {/* Listado de Cards */}
        <div className="flex flex-col gap-4 w-full">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white p-6 md:p-10 rounded-[32px] w-full border border-[#F5F5F5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between hover:border-[#E8E8E8] transition-all duration-300 gap-6"
            >
              <div className="flex gap-6 items-start w-full md:w-auto">
                <div className="mt-1.5 p-3 bg-[#F9FAFD] rounded-2xl text-[#393939] flex-shrink-0">
                  <cat.icon className="w-7 h-7" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="font-lora font-bold text-[24px] md:text-[28px] text-[#393939] leading-none">
                    {cat.title}
                  </h3>
                  <p className="font-glacial text-[15px] md:text-[16px] text-[#8E8E8E] leading-relaxed max-w-[500px]">
                    {cat.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2 text-[#A3A3A3]">
                    <IconTimer className="w-4 h-4" />
                    <span className="text-[13px] font-semibold font-glacial tracking-wide">1 min</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setActiveCategory(cat.id)}
                className="w-full md:w-[150px] h-[48px] rounded-[18px] bg-[#595E6A] text-white font-glacial font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#393939] transform active:scale-95 transition-all shadow-sm"
              >
                Comenzar 
                <span className="text-xl leading-none">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCategory && (
          <CheckInModal 
            isOpen={true}
            onClose={() => setActiveCategory(null)}
            categoryId={activeCategory}
            title={activeCatData?.title || ''}
            onFinish={(score) => {
              setActiveCategory(null);
              setFinalScore(score);
            }}
          />
        )}
        {finalScore !== null && (
          <ResultModal score={finalScore} onClose={() => setFinalScore(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}