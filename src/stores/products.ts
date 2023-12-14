import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const fakeStoreUrl = 'https://fakestoreapi.com'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}


export const useProductStore = defineStore('products', () => {
  const items = ref<Record<string, Product>>({})
  const ids = ref<number[]>([])

  const list = computed(() => ids.value.map((id) => items.value[id]))

  const loaded = computed(() => ids.value.length > 0)

  const fetchAll = async () => {
    if (loaded.value) return

    const res = await fetch(`${fakeStoreUrl}/products`)
    const data: Product[] = await res.json()

    ids.value = data.map((product) => {
      items.value[product.id] = product
      return product.id
    })
  }

  return { items, ids, list, loaded, fetchAll }
})
