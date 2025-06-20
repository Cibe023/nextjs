import AcmeLogo from '@/app/ui/acme-logo'; // Importa el logo de la app
import { ArrowRightIcon } from '@heroicons/react/24/outline'; // Importa el ícono de flecha
import Link from 'next/link'; // Importa el componente Link para navegación interna
import styles from '@/app/ui/home.module.css'; // Importa estilos CSS locales
import { lusitana } from '@/app/ui/fonts'; // Importa una fuente personalizada
import Image from 'next/image'; // Importa el componente de imágenes optimizadas

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Fondo decorativo */}
      <div className={styles.shape} />

      {/* Encabezado con fondo azul y logo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
         <AcmeLogo />
      </div>

      {/* Contenedor principal dividido en dos columnas en desktop */}
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        {/* Columna izquierda: bienvenida y botón de login */}
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* Triángulo decorativo */}
          <div
            className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
          />
          {/* Mensaje de bienvenida */}
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          {/* Botón para ir a la página de login */}
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        {/* Columna derecha: imágenes de ejemplo del dashboard */}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Imagen para escritorio */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {/* Imagen para móvil */}
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
