'use client'

import { StatsCard } from '../../components/StatsCard'
import { QuickActionCard } from '../../components/QuickActionCard'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Главная</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Товары" value="128" />
        <StatsCard title="Заказы" value="43" />
        <StatsCard title="Баланс" value="243 500 ₸" />
        <StatsCard title="Важные действия" value="→" />
        <QuickActionCard
          title="Добавьте первый товар"
          description="Начните продавать — добавьте товары в каталог."
          buttonText="Добавить товар"
          onClick={() => alert('Открыть форму создания товара')}
        />
      </div>
      
    </div>
  )
}
