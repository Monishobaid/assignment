import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { CART_STORAGE } from '../keeper/hooks'
import { useProductStore } from './products'

export interface Purchase {
  productId: number
  quantity: number
}

export interface CartPreview {
  id: number
  image: string
  title: string
  quantity: number
  cost: number
}

export const useCartStore = defineStore('cart', () => {
    const helloword = CART_STORAGE;
    console.log(helloword);
  // State
  const contents = ref<Record<string, Purchase>>(
    JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {}
  )
  console.log('hello',contents);
  console.log("car storage",JSON.parse(localStorage.getItem(CART_STORAGE) as string));

  const count = computed(() => {
    return Object.keys(contents.value).reduce((acc, id) => {
      return acc + contents.value[id].quantity
    }, 0)
  })

  const total = computed(() => {
    const products = useProductStore()
    return Object.keys(contents.value).reduce((acc, id) => {
      return acc + products.items[id].price * contents.value[id].quantity
    }, 0)
  })

  const formattedCart = computed(() => {
    const products = useProductStore()

    if (!products.loaded) return []

    return Object.keys(contents.value).map((productId) => {
      const purchase = contents.value[productId]

      return {
        id: purchase.productId,
        image: products.items[purchase.productId].image,
        title: products.items[purchase.productId].title,
        quantity: purchase.quantity,
        cost:
          purchase.quantity * products.items[purchase.productId].price,
      }
    })
  })

  // Actions
  const add = (productId: number) => {
    if (contents.value[productId]) {
      contents.value[productId].quantity += 1
    } else {
      contents.value[productId] = {
        productId,
        quantity: 1,
      } as Purchase;
    }
  }

  const remove = (productId: number) => {
    if (!contents.value[productId]) {
      return
    }

    contents.value[productId].quantity -= 1

    if (contents.value[productId].quantity === 0) {
      delete contents.value[productId]
    }
  }

  // save contents to localStorage
  onMounted(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem(CART_STORAGE, JSON.stringify(contents.value))
    }

    saveToLocalStorage()

    return contents.value.saveToLocalStorage
  })

  // Return values to be used in setup()
  return {
    contents,
    count,
    total,
    formattedCart,
    add,
    remove,
  }
})
