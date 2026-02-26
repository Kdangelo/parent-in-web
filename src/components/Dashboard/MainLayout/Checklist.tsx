import { useState, useMemo, useEffect } from "react";
import { 
  IconCheck,
  IconBell, 
  IconHourglass, 
  ProgressBar, 
  Seedling,
} from "../../Icons/Icons";
import AddTaskModal from "./Modal/AddTaskModal";
import taskDataRaw from "../../../../Jsons/tasksData.json";

interface RawTask {
    id: number;
    titulo: string;
    icono: string;
    seccion: string;
    descripcion: string;
    fase: string;
    aviso: string;
    cta?: string;
    link?: string;
    responsable?: string;
    apoyo_extra?: string;
}

interface Task extends RawTask {
    completed: boolean;
}

export default function Checklist() {
    const [tasks, setTasks] = useState<Task[]>(() => 
        (taskDataRaw as RawTask[])
            .filter(item => item.fase === "Pre licencia")
            .map(item => ({
                ...item,
                completed: false 
            }))
    );

    const faseName = useMemo(() => {
        return tasks.length > 0 ? tasks[0].fase : "Pre licencia";
    }, [tasks]);

    const [activeTrimester, setActiveTrimester] = useState("1° Trimestre");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => { setCurrentPage(1); }, [activeTrimester]);

    const uniqueSections = useMemo(() => {
        const sections = tasks.map(item => item.seccion);
        return Array.from(new Set(sections)).map((sec, index) => ({ 
            id: index.toString(), 
            title: sec 
        }));
    }, [tasks]);

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const { completedCount, totalTasks, progressPercentage } = useMemo(() => {
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        return { 
            completedCount: completed, 
            totalTasks: total, 
            progressPercentage: total > 0 ? (completed / total) * 100 : 0 
        };
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks
            .filter(t => t.aviso === activeTrimester)
            .sort((a, b) => Number(a.completed) - Number(b.completed));
    }, [tasks, activeTrimester]);

    const { currentTasks, totalPages } = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return {
            currentTasks: filteredTasks.slice(startIndex, startIndex + itemsPerPage),
            totalPages: Math.ceil(filteredTasks.length / itemsPerPage)
        };
    }, [filteredTasks, currentPage]);

    return (
        <div className="flex flex-col h-full max-w-[923px] font-sans text-[#393939] px-4 md:px-0">
            
            {/* Header */}
            <header className="flex justify-between items-start w-full mt-6 md:mt-0 mb-8">
                <div className="flex flex-col gap-1 pl-10 md:pl-0">
                    <h2 className="text-[#393939] font-lora font-semibold text-[28px] md:text-[32px] leading-tight">Checklist</h2>
                    <p className="text-[#A3A3A3] font-glacial text-[14px] md:text-[16px]">Tareas clave para cada etapa</p>
                </div>
                
                <div className="relative p-2 md:p-3 bg-white rounded-full shadow-sm cursor-pointer border border-[#F0F0F0] shrink-0">
                    <IconBell className="text-[#393939] w-6 h-6 md:w-[27px] md:h-[29px]" />
                    <div className="absolute top-1 md:top-2 right-1 md:right-2 w-[10px] md:w-[12px] h-[10px] md:h-[12px] bg-[#9FC47C] border-2 border-white rounded-full"></div>
                </div>
            </header>

            {/* Card de Progreso */}
            <section className="w-full min-h-[140px] bg-white rounded-[32px] flex items-center mb-8 shadow-[0px_4px_15px_rgba(143,154,178,0.15)] p-8 border border-gray-50">
                <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Seedling className="text-[#949CB1] w-[18px] h-[18px]" />
                                <span className="text-[#949CB1] font-glacial font-bold text-[16px] tracking-normal leading-[140%] capitalize">
                                    {faseName}
                                </span>
                            </div>
                            <span className="text-[16px] md:text-[24px] font-bold text-[#393939]">
                                {completedCount} de {totalTasks} tareas completadas
                            </span>
                        </div>
                        <span className="text-[#949CB1] font-bold text-xl">{Math.round(progressPercentage)}%</span>
                    </div>
                    <ProgressBar progress={progressPercentage} />
                </div>
            </section>
        
            {/* Filtros */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 w-full gap-4">
                <nav className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {["1° Trimestre", "2° Trimestre", "3° Trimestre"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTrimester(tab)}
                            className={`h-[43px] px-6 rounded-full border flex items-center justify-center shrink-0 transition-all text-[16px]
                                ${activeTrimester === tab 
                                    ? "bg-[#393939] border-[#393939] text-white shadow-sm" 
                                    : "bg-white border-[#393939]/20 text-[#393939]/60 hover:border-[#393939]/40"}`}
                        >
                            <IconHourglass className="w-3.5 h-3.5 mr-2" />
                            {tab}
                        </button>
                    ))}
                </nav>

                <button onClick={() => setIsModalOpen(true)} className="text-[#8F9AB2] font-bold text-[14px] flex items-center gap-2 hover:text-[#393939] transition-colors group">
                    <span className="text-xl font-light group-hover:scale-110 transition-transform">+</span> Agregar tarea
                </button>
            </div>

            {/* Listado de Tareas */}
            <div className="flex flex-col gap-4 w-full min-h-[400px]">
                {currentTasks.map((task) => (
                    <article 
                        key={task.id} 
                        className={`p-6 rounded-[24px] border-2 transition-all duration-300 bg-white ${
                            task.completed ? 'border-[#9FC47C] shadow-none' : 'border-transparent shadow-sm'
                        }`}
                    >
                        <div className="flex gap-4 md:gap-5">
                            <button onClick={() => toggleTask(task.id)} className="mt-1 shrink-0">
                                {task.completed ? (
                                    <div className="w-[30px] h-[30px] border-[3px] border-[#9FC47C] bg-transparent rounded-full flex items-center justify-center">
                                         <IconCheck className="w-4 h-4 text-[#9FC47C] stroke-[3px]" />
                                    </div>
                                ) : (
                                    <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-200 hover:border-[#9FC47C] transition-colors" />
                                )}
                            </button>
                                
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        {task.icono && (
                                            <div 
                                                className={`w-5 h-5 flex items-center justify-center [&_path]:transition-colors [&_svg]:w-full [&_svg]:h-full ${
                                                       task.completed ? '[&_path]:stroke-[#9FC47C]' : '[&_path]:stroke-[#949CB1]'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: task.icono }} 
                                             />
                                            )}
                                            
                                            <span className={`font-glacial font-bold text-[16px] leading-[140%] capitalize ${
                                                task.completed ? 'text-[#9FC47C]' : 'text-[#949CB1]'
                                            }`}>
                                                {task.seccion}
                                            </span>
                                    </div>

                                    {!task.completed && (
                                        <div className="bg-[#FBF6F9] text-[#393939] px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                                            <IconHourglass className="w-3 h-3" /> 7d
                                        </div>
                                    )}
                                </div>
                                    
                                    <h4 className={`text-lg md:text-[20px] font-bold leading-tight ${
                                        task.completed ? 'text-[#9FC47C] line-through opacity-80' : 'text-[#3D3D3D]'
                                    }`}>
                                        {task.titulo}
                                    </h4>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 w-full">
                    <div className="flex items-center bg-[#F4F7FF] rounded-full p-1.5 gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`flex items-center justify-center transition-all w-[80px] md:w-[100px] h-[40px] rounded-full text-[14px] font-semibold
                                    ${currentPage === page ? "bg-[#C5D0EC] text-[#393939] shadow-sm" : "text-[#A3A3A3] hover:text-[#393939]"}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isModalOpen && (
                <AddTaskModal
                    onClose={() => setIsModalOpen(false)}
                    sections={uniqueSections}
                    onSave={(newTask: any) => {
                        const addedTask: Task = { 
                            ...newTask, 
                            id: Date.now(), 
                            completed: false, 
                            fase: "Pre licencia", 
                            aviso: activeTrimester,
                            titulo: newTask.title || "Nueva Tarea",
                            seccion: newTask.category || "General",
                            descripcion: newTask.description || "",
                            cta: "Ver detalle"
                        };
                        setTasks(prev => [...prev, addedTask]);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}