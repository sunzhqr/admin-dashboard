'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useStore } from '../lib/store'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function AddProductModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const addProduct = useStore(state => state.addProduct)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProduct({
        id: uuidv4(),
        name,
        price: Number(price),
    })
    setName('')
    setPrice('')
    onClose()
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Добавить товар</Dialog.Title>

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
