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