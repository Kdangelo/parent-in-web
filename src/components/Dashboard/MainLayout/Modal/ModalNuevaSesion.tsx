import type { ReactNode } from "react";
import { IconArrowBack, IconClose, IconStar, ProgressBarHeader, IconClock, IconVirtual } from "../../../Icons/Icons";

interface Profesional {
  testimonio: ReactNode;
  id: number | string;
  nombre: string;
  profesion: string;
  foto: string;
  descripcion: string;
  rating: number;
  categoria: string;
}

interface ModalNuevaSesionProps {
  abierto: boolean;
  alCerrar: () => void;
  profesional: Profesional | null;
  onAgendarClick?: () => void; 
}

export default function ModalNuevaSesion({ abierto, alCerrar, profesional, onAgendarClick }: ModalNuevaSesionProps) {
  if (!abierto || !profesional) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 md:p-4">      
      <div className="bg-[#F9F9F7] rounded-[30px] md:rounded-[40px] shadow-2xl relative flex flex-col items-center overflow-hidden w-full max-w-[449px] h-[550px] md:max-w-[781px] md:h-[656px]">
       {/* HEADER */}
        <div className="w-full min-h-[60px] md:min-h-[70px] md:h-[78px] relative flex items-center justify-center px-4 shrink-0">
          <button 
            className="absolute left-4 md:left-[32px] flex items-center justify-center hover:opacity-60 transition-opacity z-[110]"
            onClick={alCerrar}
          >
            <IconArrowBack style={{ width: '19.46px', height: '18.95px', color: '#393939' }} />
          </button>

          <h2 className="font-bold text-[18px] md:text-[20px] text-[#393939] font-glacial">Nueva sesión</h2>

          <button 
            className="absolute right-4 md:right-[32px] w-[50px] h-[20px] flex items-center justify-center hover:opacity-60 transition-opacity z-[110]"
            onClick={alCerrar}
          >
            <IconClose className="text-[#393939]" />
          </button>

          <div className="absolute bottom-0 left-0 w-full h-[4px]"><ProgressBarHeader /></div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] mt-2 md:mt-[30px] p-6 md:p-10 flex flex-col shadow-sm border border-[#3939390D] w-[92%] md:w-[717px] h-[420px] md:h-[500px] mb-4 md:mb-8">
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
            <img 
              src={profesional.foto} 
              className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full object-cover border border-gray-100" 
              alt={profesional.nombre}
            />
            <div className="flex flex-col flex-1">
              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                <h3 className="font-lora font-semibold text-[16px] md:text-[22px] leading-[140%] text-[#393939]">{profesional.nombre}</h3>
                <div className="flex items-center gap-1.5 bg-[#F9F9F7] px-2 py-0.5 rounded-full">
                  <IconStar className="text-[#CACA78] w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[#CACA78] font-bold text-[14px] md:text-[16px]">{profesional.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="font-lora text-[14px] md:text-[18px] text-[#3939394D] mt-0.5">{profesional.profesion}</p>
              <p className="text-[#393939] font-glacial text-[13px] md:text-[16px] leading-[150%] italic mt-2 md:mt-4">"{profesional.descripcion}"</p>
            </div>
          </div>

          <div className="flex justify-around md:justify-between mt-4 md:mt-6 border-b border-[#3939391A] pb-3 md:pb-5">
            <div className="flex items-center gap-2">                  
              <IconClock className="w-4 h-4 text-[#3939394D]" />
              <span className="text-[#3939394D] font-bold text-[13px] md:text-[15px]">50 min</span>
            </div>
            <div className="flex items-center gap-2">
              <IconVirtual className="w-4 h-4 text-[#3939394D]" />
              <span className="text-[#3939394D] font-bold text-[13px] md:text-[15px]">Virtual</span>
            </div>
          </div>         

          {/* TESTIMONIOS */}
          <div className="hidden md:block mt-6 flex-grow">
            <div className="flex items-center justify-start gap-2 mb-3">
              <IconStar className="text-[#CACA78] w-3 h-3" />
              <span className="text-[#393939] font-bold text-[12px] uppercase tracking-wider font-glacial">Testimonios</span>
            </div>
            <div className="rounded-[20px] w-full bg-[#F7F6F1] p-5 flex items-center gap-4 border border-[#39393908]">
              <div className="w-12 h-12 bg-[#D9D9D9] rounded-full shrink-0"></div>
              <p className="font-lora italic text-[17px] text-[#393939] line-clamp-2">
                “{profesional.testimonio}”
              </p>            
            </div>
          </div>

          <div className="mt-auto flex justify-center pt-2">
            <button 
              onClick={onAgendarClick}
              className="bg-[#393939] text-white rounded-full w-full max-w-[320px] md:max-w-[350px] h-[48px] md:h-[54px] font-bold text-[16px] md:text-[18px] hover:bg-black transition-all shadow-md active:scale-95"
            >
              Agendar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}