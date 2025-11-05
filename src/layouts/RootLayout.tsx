import { Link, Outlet } from "react-router-dom";

const RootLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <nav className="bg-[#C5D0EC] p-4 shadow-md flex flex-col sm:flex-row sm:justify-around sm:items-center">
      <Link to="/" className="text-[#FDFD96] **font-lora** font-bold text-lg mb-2 sm:mb-0 hover:text-white transition duration-300">Inicio</Link>
      <Link to="/login" className="text-[#FDFD96] **font-lora** font-bold text-lg mb-2 sm:mb-0 hover:text-white transition duration-300">Login</Link>
      <Link to="/register" className="text-[#FDFD96] **font-lora** font-bold text-lg mb-2 sm:mb-0 hover:text-white transition duration-300">Registro</Link>
      <Link to="/onboarding" className="text-[#FDFD96] **font-lora** font-bold text-lg mb-2 sm:mb-0 hover:text-white transition duration-300">Incorporación</Link>
      <Link to="/dashboard" className="text-[#FDFD96] **font-lora** font-bold text-lg mb-2 sm:mb-0 hover:text-white transition duration-300">Dashboard</Link>
    </nav>
    <main className="bg-[#F7F6F1] p-4 grow">
      <Outlet /> 
    </main>
  </div>
);

export default RootLayout;