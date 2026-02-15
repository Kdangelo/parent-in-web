import { IconCancelSesion } from "../../../Icons/Icons";

interface Props {
  abierto: boolean;
  alCerrar: () => void;
  alConfirmar: () => void;
}

export default function ModalConfirmarCancelacion({ abierto, alCerrar, alConfirmar }: Props) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
        <div className="bg-[#F7F6F1] md:bg-[#F9F9F7] rounded-[40px] w-full max-w-[449px] h-[661px] md:max-w-[622px] md:h-auto p-6 md:p-10 flex flex-col items-center text-center justify-center shadow-2xl animate-in zoom-in-95 duration-300 overflow-y-auto">
            <div className="w-[100px] h-[100px] bg-[#FF78784D] rounded-full flex items-center justify-center mb-8 shrink-0">
                <IconCancelSesion style={{ width: '40px', height: '40px', color: '#393939' }} />
            </div>

            <h3 className="font-lora font-bold text-[22px] md:text-[24px] text-[#393939] mb-4">
                Estás por cancelar tu reserva
            </h3>

            <div className="space-y-4 mb-10 text-[#393939] font-glacial text-[15px] md:text-[16px] leading-[140%] px-2">
                <p>Sabemos que a veces los planes cambian. Puedes reprogramar o cancelar según lo necesites.</p>
                <p>Para reprogramar: cancela esta reserva y vuelve a agendar una nueva. Para cancelar: confirma a continuación.</p>
                <p className="font-bold">Importante: Las cancelaciones deben realizarse con al menos 24 horas de anticipación; de lo contrario, la sesión se dará por realizada.</p>
            </div>

            <div className="flex flex-col gap-4 w-full items-center">
            <button 
                onClick={alConfirmar} 
                className="bg-[#393939] text-white rounded-full w-full max-w-[320px] h-[50px] font-bold text-[16px] hover:bg-black transition-colors"
            >
                Cancelar reserva
            </button>
            <button 
                onClick={alCerrar} 
                className="text-[#393939] font-bold text-[16px] hover:underline font-glacial"
            >
                Volver atrás
            </button>
            </div>
        </div>
    </div>
  );
}