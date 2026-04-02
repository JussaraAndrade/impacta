import { useMemo, useState } from 'react'
import { addToCart } from '../../shared/cart/cartBus'
import type { Product } from '../../shared/cart/types'
import { Button } from '../../shared/ui/Button'
import { Panel } from '../../shared/ui/Panel'
import { catalogProducts } from './products'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default function CatalogoApp() {
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    if (!normalized) {
      return catalogProducts
    }

    return catalogProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized)
      )
    })
  }, [search])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  return (
    <Panel
      title="Catalogo de produtos"
      subtitle="Squad Catalogo: gestao de produtos e acao de compra"
    >
      <div className="catalog__toolbar">
        <label htmlFor="catalog-search">Buscar</label>
        <input
          id="catalog-search"
          type="search"
          value={search}
          placeholder="Busque por notebook, monitor, webcam..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="catalog__grid">
        {filteredProducts.map((product) => {
          return (
            <article key={product.id} className="product-card">
              <img src={product.image} alt={product.name} loading="lazy" />
              <div className="product-card__body">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <strong>{formatCurrency(product.price)}</strong>
                <Button onClick={() => handleAddToCart(product)}>
                  Adicionar ao carrinho
                </Button>
              </div>
            </article>
          )
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="catalog__empty">Nenhum produto encontrado para a busca.</p>
      ) : null}
    </Panel>
  )
}
