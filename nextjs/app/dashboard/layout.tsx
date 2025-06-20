import SideNav from '@/app/ui/dashboard/sidenav'; // Importa el componente de la barra lateral
 
export default function Layout({ children }: { children: React.ReactNode }) {
  // Componente de layout para las páginas dentro de /dashboard
  return (
    // Contenedor principal con flexbox, ocupa toda la pantalla
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Barra lateral: ocupa todo el ancho en móvil y 64px en desktop */}
      <div className="w-full flex-none md:w-64">
        <SideNav /> {/* Renderiza la barra lateral */}
      </div>
      {/* Contenido principal: crece para ocupar el espacio restante */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children} {/* Renderiza el contenido de la página */}
      </div>
    </div>
  );
}

