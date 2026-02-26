import { useState } from "react";
import { ModalGuardarDatos } from "../../../../components/Dashboard/MainLayout/Modal/ModalGuardarDatos";

export const TabNotificaciones = ({ styles }: { styles: any }) => {
  const initialCheckboxes = {
    sesiones: true,
    coaches: false,
    tareas: true,
    recordatorios: true,
    respuestas: true,
    reacciones: false,
    mensajes: true,
    nuevoContenido: true,
    modificaciones: false,
    whatsapp: false,
    gmail: true,
  };

  const [generalNotify, setGeneralNotify] = useState("Activadas");
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleReset = () => {
    setGeneralNotify("Activadas");
    setCheckboxes(initialCheckboxes);
  };

  const handleSave = () => {
    setIsSaveModalOpen(true);
  };

  const toggleCheckbox = (key: keyof typeof initialCheckboxes) => {
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { title: "Coaching", items: [{ label: "Próximas sesiones", key: "sesiones" }, { label: "Nuevos coaches según etapa", key: "coaches" }] },
    { title: "Checklist", items: [{ label: "Tareas próximas", key: "tareas" }, { label: "Recordatorios de etapa", key: "recordatorios" }] },
    { title: "Comunidad", items: [{ label: "Respuestas", key: "respuestas" }, { label: "Reacciones", key: "reacciones" }, { label: "Mensajes directos", key: "mensajes" }] },
    { title: "Recursos", items: [{ label: "Nuevo contenido", key: "nuevoContenido" }, { label: "Modificaciones en contenido", key: "modificaciones" }] },
    { title: "Notificaciones en apps vinculadas", items: [{ label: "WhatsApp", key: "whatsapp" }, { label: "G-Mail", key: "gmail" }] },
  ];

  const CustomRadio = ({ label, selected, onClick }: any) => (
    <label className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all ${selected ? "border-[#C5D0EC]" : "border-[#3939391A]"}`}>
        {selected && <div className="w-[12px] h-[12px] bg-[#C5D0EC] rounded-full" />}
      </div>
      <span className={`text-[15px] font-glacial ${selected ? "text-[#393939]" : "text-[#3939394D]"}`}>{label}</span>
    </label>
  );

  const CheckboxItem = ({ label, stateKey }: { label: string, stateKey: keyof typeof initialCheckboxes }) => (
    <div 
      className="flex items-center justify-between w-full max-w-[320px] cursor-pointer group"
      onClick={() => toggleCheckbox(stateKey)}
    >
      <span className={`text-[15px] font-glacial transition-colors ${checkboxes[stateKey] ? "text-[#393939]" : "text-[#3939394D]"}`}>
        {label}
      </span>
      <div className={`w-5 h-5 rounded-[4px] border transition-all ${checkboxes[stateKey] ? "bg-[#C5D0EC] border-[#C5D0EC]" : "bg-white border-[#3939391A]"}`} />
    </div>
  );

  return (
    <>
      <section>
        <h3 className={styles.sectionTitle}>Notificaciones</h3>
        <div className="bg-white rounded-[24px] border border-[#3939391A] p-8 shadow-sm flex flex-col gap-10">
          
          {/* Selectores de Filtro */}
          <div>
            <label className={styles.label}>Notificaciones generales</label>
            <div className="flex gap-8 mt-2">
              <CustomRadio label="Notificaciones activadas" selected={generalNotify === "Activadas"} onClick={() => setGeneralNotify("Activadas")} />
              <CustomRadio label="Notificaciones desactivadas" selected={generalNotify === "Desactivadas"} onClick={() => setGeneralNotify("Desactivadas")} />
            </div>
          </div>

          {/* Grilla con Lógica de Filtro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
            {sections.map((section) => {
            
              const itemsToShow = generalNotify === "Desactivadas" 
                ? section.items.filter(item => !checkboxes[item.key as keyof typeof initialCheckboxes])
                : section.items;

              if (itemsToShow.length === 0) return null;

              return (
                <div key={section.title} className="flex flex-col gap-4 animate-in fade-in duration-300">
                  <label className={styles.label}>{section.title}</label>
                  {itemsToShow.map(item => (
                    <CheckboxItem key={item.key} label={item.label} stateKey={item.key as keyof typeof initialCheckboxes} />
                  ))}
                </div>
              );
            })}
          </div>

          {generalNotify === "Desactivadas" && sections.every(s => s.items.every(i => checkboxes[i.key as keyof typeof initialCheckboxes])) && (
            <div className="py-10 text-center border border-dashed border-[#3939391A] rounded-[24px]">
              <p className="font-glacial text-[#3939394D]">No tienes notificaciones desactivadas actualmente.</p>
            </div>
          )}
        </div>
      </section>

      {/* Botones de Acción */}
      <div className="mt-12 flex flex-col md:flex-row justify-end items-center gap-6 md:gap-10">
        <button 
          onClick={handleReset} 
          className="font-glacial font-semibold text-[#767D8E] text-[16px] hover:text-[#393939] transition-colors"
        >
          Reestablecer
        </button>
        <button 
          onClick={handleSave} 
          className="w-full md:w-[240px] h-[50px] bg-[#7D8495] text-white rounded-full font-glacial font-semibold text-[18px] shadow-sm hover:bg-[#6b7282] transition-all active:scale-95"
        >
          Guardar
        </button>
      </div>

      <ModalGuardarDatos 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
        onConfirm={() => setIsSaveModalOpen(false)} 
      />
    </>
  );
};