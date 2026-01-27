import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarComponent from "../SidebarComponent";
import Footer from "../Footer";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F6F1] flex flex-col">
      <div className="flex flex-1 w-full relative">
        <SidebarComponent
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col min-w-0">
          <header className="relative w-full h-[140px] md:h-auto md:px-10 md:pt-10">
            <div className="absolute top-[62px] left-8 md:hidden">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="focus:outline-none"
              >
                <EllipsisVerticalIcon className="h-8 w-8 text-[#A5B1C2]" /> 
              </button>
            </div>
            <div 
              className="absolute md:relative md:top-0 md:left-0 flex flex-col justify-center"
              style={{
                width: '413px',
                height: '76px',
                top: '50px',
                left: '109px',
                opacity: 1
              }}
            >
              <span className="text-[#A3A3A3] text-[13px] md:text-[15px] font-medium leading-none">
                Te damos la bienvenida a Parent In
              </span>
              <h1 className="text-[32px] md:text-5xl font-bold text-[#393939] font-serif leading-tight">
                ¡Hola, Paola!
              </h1>
              <p className="text-[#A3A3A3] text-[13px] md:text-[15px] font-medium leading-none">
                Tu acompañamiento personalizado
              </p>
            </div>
          </header>
          <section className="px-6 mt-4 md:mt-0 pb-10 md:px-10">
            <Outlet />
          </section>
        </main>        
      </div>

      <div className="w-full bg-[#393939]">
        <Footer />
      </div>
    </div>
  );
}