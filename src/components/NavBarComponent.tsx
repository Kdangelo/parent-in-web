import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

export default function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {isAuthenticated, logout} = useAuth();

  return (
    <nav className="bg-[#F7F6F1] p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Sección izquierda: Logo */}
        <div className="w-[166px] h-[46px] flex items-center justify-center">
          <img src={Logo} alt="Logo" className="h-full object-contain" />
        </div>

        {/* Sección central: Menú principal */}
        <div className="hidden sm:flex space-x-6">
          <Link to="/" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Inicio</Link>
          <Link to="/onboarding" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Incorporación</Link>
          <Link to="/dashboard" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Dashboard</Link>
        </div>

        {/* Sección derecha: Login/Register + Hamburguesa */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex space-x-4">
            { !isAuthenticated ?
                <>
                  <Link to="/login" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Login</Link>
                  <Link to="/register" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Registro</Link>
                </>
              :  
                <label className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300 cursor-pointer" onClick={logout}>Logout</label>
            }
          </div>

          {/* Botón hamburguesa */}
          <button
            className="sm:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-[#393939]" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-[#393939]" />
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col space-y-2">
          <Link to="/" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Inicio</Link>
          <Link to="/onboarding" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Incorporación</Link>
          <Link to="/dashboard" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Dashboard</Link>
           { !isAuthenticated ?
                <>
                  <Link to="/login" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Login</Link>
                  <Link to="/register" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Registro</Link>
                </>
              :  
                <label className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300 cursor-pointer">Logout</label>
            }
          {/* <Link to="/login" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Login</Link>
          <Link to="/register" className="text-[#393939] **font-lora** font-bold text-sm hover:text-[#C5D0EC] transition duration-300">Registro</Link> */}
        </div>
      )}
    </nav>
  );
}