import { useState } from "react";
import { useCalendar } from "../../../../hooks/useCalendar";

interface Section {
  id: string;
  title: string;
}

interface AddTaskModalProps {
  onClose: () => void;
  onSave: (task: any) => void;
  sections: Section[];
}

export default function AddTaskModal({ onClose, onSave, sections }: AddTaskModalProps) {
  const today = new Date();
  const labelStyle = "block text-[16px] font-semibold text-[#393939] mb-1";

  const [title, setTitle] = useState(() => localStorage.getItem("task_draft_title") || "");
  const [category, setCategory] = useState(() => localStorage.getItem("task_draft_category") || (sections[0]?.title || ""));
  const [description, setDescription] = useState(() => localStorage.getItem("task_draft_description") || "");
  const [selectedDay, setSelectedDay] = useState<number>(() => Number(localStorage.getItem("task_draft_day")) || today.getDate());

  // Lógica del Calendario usando el Hook
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  
  // Usamos startOnMonday
  const { daysInMonth, firstDayIndex, diasSemana, nombreMes, month, year } = useCalendar(viewDate, false);

  const handleSaveDraft = () => {
    localStorage.setItem("task_draft_title", title);
    localStorage.setItem("task_draft_category", category);
    localStorage.setItem("task_draft_description", description);
    localStorage.setItem("task_draft_day", selectedDay.toString());
    onClose();
  };

  const clearDraft = () => {
    ["task_draft_title", "task_draft_category", "task_draft_description", "task_draft_day"].forEach(k => localStorage.removeItem(k));
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    const finalDate = `${selectedDay}/${month + 1}/${year.toString().slice(-2)}`;
    onSave({ title, category, description, dueDate: finalDate });
    clearDraft();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-[#FAF9F6] rounded-[32px] w-full max-w-[480px] p-8 relative animate-in fade-in zoom-in duration-300 shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-black transition-colors">✕</button>
        
        <h3 className="text-center text-[20px] font-bold text-[#393939] mb-6 font-lora">Nueva tarea</h3>

        <div className="space-y-4 font-glacial">
          <div>
            <label className={labelStyle}>Tipo de la tarea</label>
            <select 
              className="w-full bg-white border border-[#E0E0E0] rounded-xl p-3 outline-none focus:border-[#5D6778] cursor-pointer" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              {sections.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </div>

          <div>
            <label className={labelStyle}>Nombre de la tarea *</label>
            <input 
              type="text" 
              placeholder="Escribe el nombre" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#E0E0E0] rounded-xl p-3 outline-none focus:border-[#5D6778]" 
            />
          </div>
          {/* Calendario */}
          <div>
            <label className={labelStyle}>Fecha de vencimiento</label>
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-4">
              <div className="flex justify-between items-center mb-4 px-2">
                <button type="button" onClick={() => changeMonth(-1)} className="hover:bg-gray-100 rounded-full w-8 h-8 transition-colors">❮</button>
                <span className="font-bold text-[14px] capitalize">{nombreMes}</span>
                <button type="button" onClick={() => changeMonth(1)} className="hover:bg-gray-100 rounded-full w-8 h-8 transition-colors">❯</button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center">
                {diasSemana.map(d => (
                  <span key={d} className="text-[10px] font-bold text-[#3B4CB8]/40 mb-1">{d}</span>
                ))}
                
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8 w-8" />
                ))}

                {/* Días del mes */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                  
                  return (
                    <button 
                      key={day} 
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`h-8 w-8 rounded-full text-[12px] flex items-center justify-center mx-auto transition-all
                        ${selectedDay === day ? 'bg-[#393939] text-white font-bold' : 'hover:bg-gray-100 text-[#393939]'}
                        ${isToday && selectedDay !== day ? 'border border-[#3B4CB8] text-[#3B4CB8]' : ''}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className={labelStyle}>Descripción (opcional)</label>
            <textarea 
              placeholder="Notas de la tarea" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#E0E0E0] rounded-xl p-3 h-20 resize-none outline-none focus:border-[#5D6778]" 
            />
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={handleSaveDraft} 
              className="flex-1 border border-[#393939] rounded-full py-3 font-bold text-[#393939] hover:bg-gray-50 transition-colors"
            >
              Borrador
            </button>
            <button 
              type="button"
              disabled={!title.trim()}
              onClick={handleSave}
              className={`flex-1 rounded-full py-3 font-bold transition-all ${
                title.trim() ? 'bg-[#5D6778] text-white hover:brightness-110' : 'bg-[#D9D9D9] text-white cursor-not-allowed'
              }`}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}