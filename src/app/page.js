import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <section className="w-full h-screen flex flex-col justify-between">

      <header className="w-full md:px-[10%] px-[5%]">
        <nav>
          <ul className="w-full flex justify-between">

            <li className="flex justify-center items-center">
              <Image src="/logo.gif" alt="Sphere Logo" width={72} height={16} />
              <span className="text-gray-400">Sphere</span>
            </li>

            <li className="flex justify-center items-center">
              <Link 
                href="/auth" 
                className="py-1 px-4 bg-black border-2 border-blue-900 rounded-lg font-semibold text-gray-400 hover:border-blue-800"
                >
                  Get Started
              </Link>
            </li>

          </ul>
        </nav>
      </header>

      <main className="w-full md:px-[10%] px-[5%] flex justify-center items-center">
        <span className="text-xl cursor-default hover:translate-x-5 transition-all">Page Main {'( Nothing to see here :)'}</span>
      </main>

      <footer className="w-full md:px-[10%] px-[5%] flex justify-center items-center">
        <span className="text-gray-400 py-2">Created with ❤️ by ALVA</span>
      </footer>

    </section>
  )
}
