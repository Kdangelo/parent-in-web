export const ModalGuardarDatos = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[#F9F9F7] rounded-[30px] p-8 w-full max-w-[320px] md:max-w-[450px] shadow-xl animate-in fade-in zoom-in duration-300">
        <h2 className="font-lora font-bold text-[20px] md:text-[22px] text-[#393939] text-center mb-3">
          ¿Guardar datos editados?
        </h2>
        
        <p className="font-glacial text-[14px] text-[#393939] text-center mb-8 leading-relaxed">
          Acepta para mantener los datos editados, cancela para mantener los mismos datos.
        </p>

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={onConfirm}
            className="w-full h-[48px] bg-[#393939] text-white rounded-full font-glacial font-semibold text-[16px] hover:bg-[#252525] transition-colors"
          >
            Confirmar
          </button>
          
          <button 
            onClick={onClose}
            className="font-glacial font-semibold text-[14px] text-[#393939] hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};