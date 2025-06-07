import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
  id: string
  name: string
  price: number
}

type Store = {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
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
    }),
    {
      name: 'product-store',
    }
  )
)
