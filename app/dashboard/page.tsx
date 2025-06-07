'use client'

import { useState } from 'react'
import { StatsCard } from '../../components/StatsCard'
import { QuickActionCard } from '../../components/QuickActionCard'
import { AddProductModal } from '../../components/AddProductModal'

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Главная</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Товары" value="128" />
        <StatsCard title="Заказы" value="43" />
        <StatsCard title="Баланс" value="243 500 ₸" />
        <QuickActionCard
          title="Добавьте первый товар"
          description="Начните продавать — добавьте товары в каталог."
          buttonText="Добавить товар"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
