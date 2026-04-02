import { useState } from 'react'
import type { FormEvent } from 'react'
import { clearCart, getCartItems, getCartTotalValue } from '../../shared/cart/cartBus'
import { Button } from '../../shared/ui/Button'
import { Panel } from '../../shared/ui/Panel'

type CheckoutData = {
  street: string
  district: string
  city: string
  postalCode: string
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default function CheckoutApp() {
  const [formData, setFormData] = useState<CheckoutData>({
    street: '',
    district: '',
    city: '',
    postalCode: '',
  })
  const [orderNumber, setOrderNumber] = useState<string>('')

  const items = getCartItems()
  const total = getCartTotalValue()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (items.length === 0) {
      return
    }

    clearCart()
    setOrderNumber(`PED-${Math.floor(Math.random() * 90000) + 10000}`)
  }

  if (orderNumber) {
    return (
      <Panel
        title="Pedido confirmado"
        subtitle="Squad Checkout: confirmacao da compra"
      >
        <div className="checkout__confirmation">
          <p>
            Pedido <strong>{orderNumber}</strong> confirmado para entrega em:
          </p>
          <p>
            {formData.street}, {formData.district}, {formData.city} - CEP{' '}
            {formData.postalCode}
          </p>
          <p>Total pago: {formatCurrency(total)}</p>
        </div>
      </Panel>
    )
  }

  return (
    <Panel
      title="Finalizacao da compra"
      subtitle="Squad Checkout: formulario de endereco e fechamento do pedido"
    >
      {items.length === 0 ? (
        <p className="checkout__empty">
          O carrinho esta vazio. Adicione itens antes de finalizar o checkout.
        </p>
      ) : (
        <form className="checkout__form" onSubmit={handleSubmit}>
          <label htmlFor="street">Rua e numero</label>
          <input
            id="street"
            required
            value={formData.street}
            onChange={(event) => {
              setFormData((prev) => ({ ...prev, street: event.target.value }))
            }}
          />

          <label htmlFor="district">Bairro</label>
          <input
            id="district"
            required
            value={formData.district}
            onChange={(event) => {
              setFormData((prev) => ({ ...prev, district: event.target.value }))
            }}
          />

          <label htmlFor="city">Cidade</label>
          <input
            id="city"
            required
            value={formData.city}
            onChange={(event) => {
              setFormData((prev) => ({ ...prev, city: event.target.value }))
            }}
          />

          <label htmlFor="postalCode">CEP</label>
          <input
            id="postalCode"
            required
            value={formData.postalCode}
            onChange={(event) => {
              setFormData((prev) => ({ ...prev, postalCode: event.target.value }))
            }}
          />

          <div className="checkout__summary">
            <p>Total do pedido</p>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <Button type="submit">Confirmar pedido</Button>
        </form>
      )}
    </Panel>
  )
}
