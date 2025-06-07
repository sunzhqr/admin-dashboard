'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { Product, useStore } from '../lib/store'
import { toast } from 'react-toastify'

type Props = {
  product: Product | null
  onClose: () => void
}

export function EditProductModal({ product, onClose }: Props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const updateProduct = useStore(state => state.updateProduct)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price.toString())
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return
    updateProduct({ ...product, name, price: Number(price) })
    toast.success('Товар обновлён!')
    onClose()
  }

  return (
    <Transition show={!!product} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Редактировать товар</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Название</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Цена (₸)</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:underline">
                  Отмена
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700">
                  Сохранить
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
