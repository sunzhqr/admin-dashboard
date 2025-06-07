'use client'

import { useState } from 'react'
import { useStore, Product } from '../../lib/store'
import { EditProductModal } from '../../components/EditProductModal'
import { toast } from 'react-toastify'

export default function ProductsPage() {
  const products = useStore(state => state.products)
  const deleteProduct = useStore(state => state.deleteProduct)

  const [selected, setSelected] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const filtered = products.filter(p => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesPrice = maxPrice ? p.price <= Number(maxPrice) : true
    return matchesName && matchesPrice
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Товары</h1>

      {/* Фильтры */}
      <div className="flex gap-4">
        <input
          placeholder="Поиск по названию"
          className="px-3 py-2 border rounded text-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Макс. цена"
          className="px-3 py-2 border rounded text-sm"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Таблица */}
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100 text-sm text-left">
          <tr>
            <th className="p-3">Название</th>
            <th className="p-3">Цена</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={3} className="p-3 text-gray-400 italic">
                Ничего не найдено
              </td>
            </tr>
          )}
          {filtered.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.price.toLocaleString()} ₸</td>
              <td className="p-3 space-x-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setSelected(product)}
                >
                  Редактировать
                </button>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => {
                    deleteProduct(product.id)
                    toast.success('Товар удалён')
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
