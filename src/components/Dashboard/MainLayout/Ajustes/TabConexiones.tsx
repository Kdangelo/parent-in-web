import { 
  IconBrandWhatsapp, 
  IconBrandGmail, 
  IconBrandGoogleCalendar, 
  //IconBrandTeams, 
  IconBrandLinkedin 
} from "../../../Icons/Icons";

export const TabConexiones = ({ styles }: { styles: any }) => {  
  const connections = [
    { id: 1, name: "WhatsApp", icon: <IconBrandWhatsapp className="w-8 h-8 text-[#25D366]" />, status: "connected" },
    { id: 2, name: "Gmail", icon: <IconBrandGmail className="w-8 h-8" />, status: "connected" },
    { id: 3, name: "Google Calendar", icon: <IconBrandGoogleCalendar className="w-8 h-8" />, status: "disconnected" },
    { id: 4, name: "LinkedIn", icon: <IconBrandLinkedin className="w-8 h-8" />, status: "disconnected" },
  ];

  return (
    <>
      <section>
        <h3 className={styles.sectionTitle}>Cuentas vinculadas</h3>
        <div className="bg-white rounded-3xl border border-[#3939391A] p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {connections.map((conn) => (
              <div 
                key={conn.id} 
                className={`flex flex-col items-center justify-center p-6 rounded-[20px] border transition-all ${
                  conn.status === "connected" 
                    ? "bg-[#F9F9F7] border-[#C5D0EC]" 
                    : "bg-[#F9F9F766] border-[#3939390D]"
                }`}
              >
                <div className="mb-4">{conn.icon}</div>
                <span className="font-glacial font-semibold text-[16px] mb-4 text-[#393939]">
                  {conn.name}
                </span>
                
                <button 
                  className={`h-8 w-full max-w-[120px] rounded-full font-glacial font-semibold text-[14px] transition-all ${
                    conn.status === "connected" 
                      ? "bg-[#7D8495] text-white hover:bg-[#393939]" 
                      : "bg-[#EBECEF] text-[#3939394D] hover:bg-[#DDE0E5]"
                  }`}
                >
                  {conn.status === "connected" ? "Desvincular" : "Vincular"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-col md:flex-row justify-end items-center gap-6 md:gap-10">
        <button className="font-glacial font-semibold text-[#767D8E] text-[16px] hover:text-[#393939]">
          Reestablecer
        </button>
        <button className="w-full md:w-60 h-[50px] bg-[#7D8495] text-white rounded-full font-glacial font-semibold text-[18px] shadow-sm hover:bg-[#6b7282] transition-all">
          Guardar
        </button>
      </div>
    </>
  );
};