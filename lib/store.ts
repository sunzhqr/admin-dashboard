import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Customer = {
  id: string
  name: string
  phone: string
  orders: number
  lastContact: string
}

export type Product = {
  id: string
  name: string
  price: number
}

export type Order = {
  id: string
  customerName: string
  status: 'ожидание' | 'доставлен' | 'отменён'
  amount: number
  date: string
}


type Store = {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  updateCustomer: (customer: Customer) => void
  deleteCustomer: (id: string) => void
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrder: (order: Order) => void
  deleteOrder: (id: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updated.id ? updated : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
        customers: [],
      addCustomer: (customer) =>
        set((state) => ({
          customers: [...state.customers, customer],
        })),
      updateCustomer: (updated) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === updated.id ? updated : c
          ),
        })),  
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
        })),
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
      updateOrder: (updated) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === updated.id ? updated : o
          ),
        })),
      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        })),
    }),
    {
      name: 'product-store',
    }
  )
)
