'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Order, useStore } from '../lib/store'
import { toast } from 'react-toastify'

export function EditOrderModal({ order, onClose }: { order: Order | null; onClose: () => void }) {
  const updateOrder = useStore(state => state.updateOrder)

  const [customerName, setCustomerName] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('ожидание')
  const [date, setDate] = useState('')

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName)
      setAmount(order.amount.toString())
      setStatus(order.status)
      setDate(order.date)
    }
  }, [order])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!order) return

    updateOrder({
      ...order,
      customerName,
      amount: Number(amount),
      status: status as Order['status'],
      date,
    })

    toast.success('Заказ обновлён!')
    onClose()
  }

  return (
    <Transition show={!!order} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Редактировать заказ</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Клиент</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="mt-1 w-full rounded border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Сумма</label>
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
