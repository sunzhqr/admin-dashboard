'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useStore } from '../lib/store'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

export function AddOrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const customers = useStore(state => state.customers)
  const addOrder = useStore(state => state.addOrder)

  const [customerId, setCustomerId] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('ожидание')
  const [date, setDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const customer = customers.find(c => c.id === customerId)
    if (!customer) return toast.error('Выберите покупателя')

    addOrder({
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customer.name,
      amount: Number(amount),
      status: status as 'ожидание' | 'доставлен' | 'отменён',
      date,
    })

    toast.success('Заказ добавлен!')
    setCustomerId('')
    setAmount('')
    setStatus('ожидание')
    setDate('')
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
            <Dialog.Title className="text-lg font-bold mb-4">Создать заказ</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Покупатель</label>
                <select
                  value={customerId}
                  onChange={e => setCustomerId(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                >
                  <option value="">-- выберите --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Сумма заказа</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600">Статус</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  >
                    <option value="ожидание">в ожидании</option>
                    <option value="доставлен">доставлен</option>
                    <option value="отменён">отменён</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm text-gray-600">Дата</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
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
