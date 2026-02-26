import { useState } from "react";
import { IconTrash } from "../../../Icons/Icons";

export const ModalEliminarCuenta = ({ isOpen, onClose }: any) => {
  const [confirmado, setConfirmado] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[#F9F9F7] rounded-[30px] shadow-2xl flex flex-col items-center justify-center p-6 md:p-10 
                      w-full max-w-[449px] md:max-w-[781px] h-auto min-h-[450px] md:h-[452px] animate-in fade-in zoom-in duration-300 overflow-y-auto">
        
        <div className="w-[80px] h-[80px] md:w-[95px] md:h-[95px] bg-[#FF00004D] rounded-full flex items-center justify-center mb-6 shrink-0">
          <IconTrash className="w-[40px] h-[40px] md:w-[51px] md:h-[51px] text-[#393939]" />
        </div>

        <h2 className="font-lora font-bold text-[22px] md:text-[24px] leading-[120%] tracking-[-0.02em] text-[#393939] mb-3 text-center">
          Estás por eliminar tu cuenta
        </h2>

        <p className="font-glacial font-normal text-[14px] md:text-[16px] leading-[140%] text-[#393939] text-center max-w-[629px] mb-8 px-2">
          La eliminación de tu cuenta es permanente y no se puede deshacer
        </p>

        <label className="flex items-center gap-2 mb-8 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={confirmado}
            onChange={(e) => setConfirmado(e.target.checked)}
            className="w-4 h-4 rounded border-[#3939394D] accent-[#767D8E]"
          />
          <span className="font-glacial text-[14px] text-[#393939]">Confirma la acción</span>
        </label>

        <div className="flex flex-col items-center gap-6 w-full">
          <button 
            disabled={!confirmado}
            className={`w-full max-w-[351px] h-[45px] rounded-[25px] font-glacial font-bold text-[16px] transition-all
              ${confirmado 
                ? "bg-[#FF00004D] text-[#393939] hover:bg-[#FF000066]" 
                : "bg-[#FF00001A] text-[#3939394D] cursor-not-allowed"
              }`}
          >
            Eliminar cuenta
          </button>
          
          <button 
            onClick={onClose}
            className="font-glacial font-bold text-[16px] text-[#393939] hover:underline"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};