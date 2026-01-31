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
    <div className="flex flex-col py-6 md:py-10 px-4 md:px-0 bg-[#FCFAF6] min-h-screen">
      
      <div className="w-full lg:ml-[109px] max-w-full px-4 md:px-0">
        
        <div className="flex justify-between items-center w-full max-w-[923px] mt-6 md:mt-[40px] mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px]">Check In</h2>
            <p className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px]">Chequeo diario con recomendaciones útiles</p>
          </div>
          
          <div className="relative p-2 md:p-3 bg-white rounded-full shadow-sm cursor-pointer mr-2 md:mr-0">
            <IconBell className="text-[#393939] w-6 h-6 md:w-[27px] md:h-[29px]" />
            <div className="absolute top-1 md:top-2 right-1 md:right-2 w-[10px] md:w-[17px] h-[10px] md:h-[15px] bg-[#9FC47C] border-2 border-white rounded-full"></div>
          </div>
        </div>

        {/* Listado de Cards */}
        <div className="flex flex-col gap-5 w-full max-w-[923px]">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] w-full min-h-fit md:h-[199px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between border border-[#F0F0F0] hover:shadow-md transition-all gap-4 md:gap-0"
            >
              <div className="flex gap-4 md:gap-6 items-start h-full">
                <div className="mt-2 text-[#393939] flex-shrink-0">
                  <cat.icon className="w-6 h-6" />
                </div>
                
                <div className="flex flex-col justify-between h-full py-1">
                  <div>
                    <h3 className="font-lora font-bold text-[24px] md:text-[26px] text-[#393939] leading-tight mb-1">{cat.title}</h3>
                    <p className="font-glacial text-[14px] md:text-[15px] text-[#A3A3A3] max-w-full md:max-w-[550px]">{cat.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 text-[#A3A3A3]">
                    <IconTimer className="w-4 h-4 opacity-40" />
                    <span className="text-[14px] font-medium font-glacial">1 min</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveCategory(cat.id)}
                className="
                  /* Dimensiones y Forma Figma */
                  w-[137px] h-[40px] rounded-[15px] p-[10px] gap-[10px]
                  /* Colores */
                  bg-[#595E6A] text-[#F9FAFD]
                  /* Tipografía (Strong/Semi Bold/140%) */
                  font-glacial font-semibold text-[16px] leading-[140%] tracking-[0%]
                  /* Layout y Posicionamiento */
                  flex items-center justify-center self-end md:self-center 
                  mt-[100px] md:mt-0 md:mr-4
                  /* Interacción */
                  hover:bg-[#393939] transition-all whitespace-nowrap
                "
              >
                Comenzar 
                <span className="w-[12.98px] h-[12.64px] flex items-center justify-center ml-2 text-[#F9FAFD]">
                  →
                </span>
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