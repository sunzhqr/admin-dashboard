'use client'

import { useState } from 'react'
import { useStore, Customer } from '../../lib/store'
import { AddCustomerModal } from '../../components/AddCustomerModal'
import { EditCustomerModal } from '../../components/EditCustomerModal'
import { toast } from 'react-toastify'

export default function CustomersPage() {
  const customers = useStore(state => state.customers)
  const deleteCustomer = useStore(state => state.deleteCustomer)

  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [search, setSearch] = useState('')

  const filtered = customers.filter(c =>
    `${c.name} ${c.phone}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Покупатели</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Создать покупателя
        </button>
      </div>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по имени или телефону"
        className="px-3 py-2 border rounded text-sm w-full max-w-sm"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100 text-sm text-left">
          <tr>
            <th className="p-3">Имя</th>
            <th className="p-3">Телефон</th>
            <th className="p-3">Заказов</th>
            <th className="p-3">Последнее обращение</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="p-3 text-gray-400 italic">
                Ничего не найдено
              </td>
            </tr>
          )}
          {filtered.map(c => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.orders}</td>
              <td className="p-3">{c.lastContact}</td>
              <td className="p-3 space-x-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setEditing(c)}
                >
                  Редактировать
                </button>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => {
                    deleteCustomer(c.id)
                    toast.success('Покупатель удалён')
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddCustomerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EditCustomerModal customer={editing} onClose={() => setEditing(null)} />
    </div>
  )
}
