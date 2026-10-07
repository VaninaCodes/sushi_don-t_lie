// Barra de navegación visible únicamente en rutas privadas con Logout

import { Link, useNavigate } from 'react-router';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Petición al backend para borrar la cookie JWT
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    } finally {
      // Limpiar sesión local y redirigir[cite: 18, 21]
      localStorage.removeItem('isLogged');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300">
        📝 Blog Personal
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">Inicio</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};