import Link from 'next/link'; // Importa el componente Link para navegación interna
import NavLinks from '@/app/ui/dashboard/nav-links'; // Importa los enlaces de navegación personalizados
import AcmeLogo from '@/app/ui/acme-logo'; // Importa el logo de la aplicación
import { PowerIcon } from '@heroicons/react/24/outline'; // Importa el ícono de "salir"
import { signOut } from '@/auth'; // Importa la función para cerrar sesión
 
export default function SideNav() {
  return (
    // Contenedor principal del sidebar con estilos de padding y flexbox
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      // ...
      {/* Contenedor de los enlaces de navegación y el botón de cerrar sesión */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks /> {/* Renderiza los enlaces de navegación */}
        {/* Espacio visual solo visible en pantallas medianas o mayores */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {/* Formulario para cerrar sesión */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' }); // Llama a la función de cerrar sesión y redirige al inicio
          }}
        >
          {/* Botón de cerrar sesión con estilos y un ícono */}
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" /> {/* Ícono de "salir" */}
            <div className="hidden md:block">Sign Out</div> {/* Texto visible solo en pantallas medianas o mayores */}
          </button>
        </form>
      </div>
    </div>
  );
}