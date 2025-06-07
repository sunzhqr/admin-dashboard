'use client'

import { useStore } from '../../lib/store'

export default function ProductsPage() {
  const products = useStore(state => state.products)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Товары</h1>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100 text-sm text-left">
          <tr>
            <th className="p-3">Название</th>
            <th className="p-3">Цена</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.price.toLocaleString()} ₸</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
