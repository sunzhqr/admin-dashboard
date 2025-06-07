'use client'

import { useState } from 'react'
import { useStore, Order } from '../../lib/store'
import { AddOrderModal } from '../../components/AddOrderModal'
import { EditOrderModal } from '../../components/EditOrderModal'
import { toast } from 'react-toastify'

const statusColor = {
  ожидание: 'bg-yellow-100 text-yellow-800',
  доставлен: 'bg-green-100 text-green-800',
  отменён: 'bg-red-100 text-red-800',
}

export default function OrdersPage() {
  const orders = useStore(state => state.orders)
  const deleteOrder = useStore(state => state.deleteOrder)

  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<Order | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Заказы</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Создать заказ
        </button>
      </div>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100 text-sm text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Клиент</th>
            <th className="p-3">Статус</th>
            <th className="p-3">Сумма</th>
            <th className="p-3">Дата</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="p-3 text-gray-400 italic">
                Нет заказов
              </td>
            </tr>
          )}
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3 font-mono">{o.id}</td>
              <td className="p-3">{o.customerName}</td>
              <td className="p-3">
                <span className={`text-xs px-2 py-1 rounded ${statusColor[o.status]}`}>
                  {o.status}
                </span>
              </td>
              <td className="p-3">{o.amount.toLocaleString()} ₸</td>
              <td className="p-3">{o.date}</td>
              <td className="p-3 space-x-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setEditing(o)}
                >
                  Редактировать
                </button>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => {
                    deleteOrder(o.id)
                    toast.success('Заказ удалён')
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EditOrderModal order={editing} onClose={() => setEditing(null)} />
    </div>
  )
}
