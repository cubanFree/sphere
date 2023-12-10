import { Inter } from 'next/font/google'
import '@/app/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sphere',
  description: 'Sphere App',
  icons: {
    icon: '/logo.gif',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' text-gray-300'}>{children}</body>
    </html>
  )
}
