import { Link, Outlet } from "react-router-dom";

const RootLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-100 font-sans">
    <nav className="bg-white shadow-xl p-4 flex justify-center space-x-8 border-b-4 border-blue-500">
      <Link to="/" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">🏠 Inicio</Link>
      <Link to="/users" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">👥 Usuarios</Link>
      <Link to="/products" className="text-blue-600 hover:text-blue-800 font-bold text-lg transition duration-150">📦 Productos</Link>
    </nav>
    <main className="container mx-auto p-8 bg-white shadow-2xl mt-8 rounded-lg">
      <Outlet /> 
    </main>
  </div>
);

export default RootLayout;