'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Главная' },
  { href: '/products', label: 'Товары' },
  { href: '/orders', label: 'Заказы' },
  { href: '/customers', label: 'Покупатели' },
  { href: '/settings', label: 'Настройки' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Мой магазин</h2>
      <nav className="space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-3 py-2 rounded hover:bg-gray-100 ${
              pathname === href ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
