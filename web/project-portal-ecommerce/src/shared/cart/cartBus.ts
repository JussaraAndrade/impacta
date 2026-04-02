import type { CartItem, Product } from './types'

const CART_STORAGE_KEY = 'portal.cart.v1'
const CART_EVENT = 'portal:cart-updated'

function readCartStorage(): CartItem[] {
  const rawValue = localStorage.getItem(CART_STORAGE_KEY)
  if (!rawValue) {
    return []
  }

  try {
    const parsed = JSON.parse(rawValue) as CartItem[]
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed
  } catch {
    return []
  }
}

function writeCartStorage(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

function notifyCartUpdated(items: CartItem[]): void {
  window.dispatchEvent(new CustomEvent<CartItem[]>(CART_EVENT, { detail: items }))
}

export function getCartItems(): CartItem[] {
  return readCartStorage()
}

export function getCartTotalItems(): number {
  return readCartStorage().reduce((acc, item) => acc + item.quantity, 0)
}

export function getCartTotalValue(): number {
  return readCartStorage().reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  )
}

export function addToCart(product: Product, quantity = 1): void {
  const currentItems = readCartStorage()
  const existingItem = currentItems.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    currentItems.push({ ...product, quantity })
  }

  writeCartStorage(currentItems)
  notifyCartUpdated(currentItems)
}

export function setItemQuantity(itemId: string, quantity: number): void {
  const sanitizedQuantity = Math.max(0, Math.floor(quantity))
  const currentItems = readCartStorage()

  const updatedItems = currentItems
    .map((item) => {
      if (item.id !== itemId) {
        return item
      }
      return {
        ...item,
        quantity: sanitizedQuantity,
      }
    })
    .filter((item) => item.quantity > 0)

  writeCartStorage(updatedItems)
  notifyCartUpdated(updatedItems)
}

export function clearCart(): void {
  writeCartStorage([])
  notifyCartUpdated([])
}

export function subscribeCart(listener: (items: CartItem[]) => void): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<CartItem[]>
    listener(customEvent.detail)
  }

  window.addEventListener(CART_EVENT, handler)
  return () => window.removeEventListener(CART_EVENT, handler)
}
