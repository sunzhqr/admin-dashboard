'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useStore } from '../lib/store'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

export function AddCustomerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const addCustomer = useStore(state => state.addCustomer)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState('1')
  const [lastContact, setLastContact] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addCustomer({
      id: uuidv4(),
      name,
      phone,
      orders: Number(orders),
      lastContact,
    })

    toast.success('Покупатель добавлен!')
    setName('')
    setPhone('')
    setOrders('1')
    setLastContact('')
    onClose()
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Создать покупателя</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600">Заказов</label>
                  <input
                    type="number"
                    min={0}
                    value={orders}
                    onChange={e => setOrders(e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-2 text-sm"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm text-gray-600">Последнее обращение</label>
                  <input
                    type="date"
                    value={lastContact}
                    onChange={e => setLastContact(e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700"
                >
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
