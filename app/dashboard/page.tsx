'use client'

import { useStore } from '../../lib/store'
import { QuickActionCard } from '../../components/QuickActionCard'
import { StatsCard } from '../../components/StatsCard'
import { useState } from 'react'
import { AddProductModal } from '../../components/AddProductModal'

export default function DashboardPage() {
  const products = useStore(state => state.products)
  const orders = useStore(state => state.orders)
  const settings = useStore(state => state.settings)

  const [open, setOpen] = useState(false)

  const activeOrders = orders.filter(o => o.status === 'ожидание')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Главная</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Товары" value={products.length} />
        <StatsCard title="Заказы в ожидании" value={activeOrders.length} />
        <StatsCard title="Баланс" value="243 500 ₸" />
        <StatsCard title="Доставка" value={settings.deliveryEnabled ? 'Включена' : 'Отключена'} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard
          title="Добавить товар"
          description="Создайте новый товар для каталога."
          buttonText="Создать"
          onClick={() => setOpen(true)}
        />
        <QuickActionCard
          title="Настроить магазин"
          description="Редактируйте логотип, название и интеграции."
          buttonText="Перейти"
          onClick={() => window.location.href = '/settings'}
        />
      </div>

      <AddProductModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}