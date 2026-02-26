import { useState } from "react";
import { IconPasswordHeader } from "../../../Icons/Icons";

export const ModalModificarPassword = ({ isOpen, onClose }: any) => {
  // Estado para controlar el checkbox y activar el botón
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmed) {
      // Aquí iría tu lógica de API para cambiar la contraseña
      console.log("Contraseña modificada con éxito");
      onClose(); // Cerramos el modal
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[#F9F9F7] rounded-[30px] p-6 md:p-10 w-full max-w-[500px] shadow-xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Header con Icono */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#C5D0EC] w-16 h-16 rounded-full flex items-center justify-center">
             <IconPasswordHeader className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="font-lora font-bold text-[22px] text-[#393939] text-center mb-6">
          Modificar contraseña
        </h2>

        {/* Formulario */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-glacial font-semibold text-[14px] text-[#393939]">Contraseña actual</label>
            <input 
              type="password" 
              placeholder="Escribe tu contraseña actual"
              className="w-full h-[48px] bg-white border border-[#3939391A] rounded-[12px] px-4 font-glacial text-[15px] outline-none focus:border-[#C5D0EC]"
            />
            <button className="text-right text-[12px] text-[#C5D0EC] hover:underline font-glacial">
              Recuperar contraseña
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-glacial font-semibold text-[14px] text-[#393939]">Nueva contraseña</label>
            <input 
              type="password" 
              placeholder="Escribe la nueva contraseña"
              className="w-full h-[48px] bg-white border border-[#3939391A] rounded-[12px] px-4 font-glacial text-[15px] outline-none focus:border-[#C5D0EC]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-glacial font-semibold text-[14px] text-[#393939]">Confirmar contraseña</label>
            <input 
              type="password" 
              placeholder="Escribe la nueva contraseña"
              className="w-full h-[48px] bg-white border border-[#3939391A] rounded-[12px] px-4 font-glacial text-[15px] outline-none focus:border-[#C5D0EC]"
            />
          </div>
        </div>

        {/* Checkbox de acción */}
        <div className="mt-6 flex items-start gap-3">
          <input 
            type="checkbox" 
            id="confirm-action" 
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#C5D0EC] cursor-pointer"
          />
          <label htmlFor="confirm-action" className="font-glacial text-[13px] text-[#39393999] cursor-pointer">
            Confirma la acción
          </label>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-between mt-8">
          <button 
            onClick={onClose}
            className="font-glacial font-semibold text-[16px] text-[#767D8E] hover:text-[#393939]"
          >
            Volver atrás
          </button>
          
          <button 
            onClick={handleConfirm}
            disabled={!confirmed}
            className={`px-8 h-[48px] rounded-full font-glacial font-semibold text-[16px] transition-all
              ${confirmed 
                ? "bg-[#C5D0EC] text-[#393939] hover:bg-[#b4c2e4] active:scale-95" 
                : "bg-[#D9DDE3] text-[#767D8E] cursor-not-allowed"
              }`}
          >
            Confirmar cambio
          </button>
        </div>
      </div>
    </div>
  );
};