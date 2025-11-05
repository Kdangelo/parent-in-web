import { Link, Outlet } from "react-router-dom";

const RootLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-100 font-sans">
    <nav className="bg-white shadow-xl p-4 flex justify-center space-x-8 border-b-4 border-blue-500">
      <Link to="/" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">Inicio</Link>
      <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">Login</Link>
      <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">Registro</Link>
      <Link to="/onboarding" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">Incorporación</Link>
      <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">Dashboard</Link>
    </nav>
    <main className="container mx-auto p-8 bg-white shadow-2xl mt-8 rounded-lg">
      <Outlet /> 
    </main>
  </div>
);

export default RootLayout;