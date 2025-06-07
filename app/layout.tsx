import './globals.css'
import type { Metadata } from 'next'
import { Sidebar } from '../components/Sidebar'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

<ToastContainer position="top-right" autoClose={2000} />

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Seller dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </body>
    </html>
  )
}
