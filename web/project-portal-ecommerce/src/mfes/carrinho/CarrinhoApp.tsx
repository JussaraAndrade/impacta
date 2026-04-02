import { useEffect, useMemo, useState } from 'react'
import {
  clearCart,
  getCartItems,
  setItemQuantity,
  subscribeCart,
} from '../../shared/cart/cartBus'
import type { CartItem } from '../../shared/cart/types'
import { Button } from '../../shared/ui/Button'
import { Panel } from '../../shared/ui/Panel'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default function CarrinhoApp() {
  const [items, setItems] = useState<CartItem[]>(getCartItems())

  useEffect(() => {
    const unsubscribe = subscribeCart((nextItems) => {
      setItems(nextItems)
    })

    return unsubscribe
  }, [])

  const cartTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [items])

  return (
    <Panel
      title="Seu carrinho"
      subtitle="Squad Carrinho: itens, quantidades e calculo de total"
    >
      {items.length === 0 ? (
        <p className="cart__empty">Seu carrinho esta vazio. Adicione itens no catalogo.</p>
      ) : (
        <>
          <div className="cart__list">
            {items.map((item) => {
              return (
                <article key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="cart-item__content">
                    <h4>{item.name}</h4>
                    <p>{formatCurrency(item.price)} por unidade</p>
                  </div>

                  <div className="cart-item__quantity">
                    <label htmlFor={`qty-${item.id}`}>Qtd</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(event) => {
                        setItemQuantity(item.id, Number(event.target.value))
                      }}
                    />
                  </div>

                  <strong>{formatCurrency(item.price * item.quantity)}</strong>
                </article>
              )
            })}
          </div>

          <div className="cart__summary">
            <p>Total do carrinho</p>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>

          <Button variant="danger" onClick={clearCart}>
            Limpar carrinho
          </Button>
        </>
      )}
    </Panel>
  )
}
