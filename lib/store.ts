import { create } from 'zustand'

export type Product = {
  id: string
  name: string
  price: number
}

type Store = {
  products: Product[]
  addProduct: (product: Product) => void
}

export const useStore = create<Store>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  }))
}))
