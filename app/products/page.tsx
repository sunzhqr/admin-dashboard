'use client'

import { useState } from 'react'
import { useStore, Product } from '../../lib/store'
import { EditProductModal } from '../../components/EditProductModal'

export default function ProductsPage() {
  const products = useStore(state => state.products)
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Товары</h1>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100 text-sm text-left">
          <tr>
            <th className="p-3">Название</th>
            <th className="p-3">Цена</th>
            <th className="p-3">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.price.toLocaleString()} ₸</td>
              <td className="p-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setSelected(product)}
                >
                  Редактировать
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
