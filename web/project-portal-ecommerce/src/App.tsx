import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { getCartTotalItems, subscribeCart } from './shared/cart/cartBus'
import './App.css'

const MfeCatalogo = lazy(() => import('./mfes/catalogo/CatalogoApp'))
const MfeCarrinho = lazy(() => import('./mfes/carrinho/CarrinhoApp'))
const MfeCheckout = lazy(() => import('./mfes/checkout/CheckoutApp'))

function App() {
  const [totalItems, setTotalItems] = useState<number>(getCartTotalItems())
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = subscribeCart((items) => {
      const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
      setTotalItems(itemCount)
    })

    return unsubscribe
  }, [])

  const sectionTitleByPath: Record<string, string> = {
    '/catalogo': 'MFE Catalogo',
    '/carrinho': 'MFE Carrinho',
    '/checkout': 'MFE Checkout',
  }

  const sectionTitle =
    sectionTitleByPath[location.pathname] ?? 'Portal de E-commerce Interno'

  return (
    <div className="shell">
      <header className="shell__header">
        <div>
          <p className="shell__eyebrow">Shell</p>
          <h1>Portal ShopHub</h1>
          <p className="shell__subtitle">
            Roteamento global, layout compartilhado e carregamento dos
            microfrontends.
          </p>
        </div>

        <nav className="shell__nav" aria-label="Navegacao principal">
          <Link to="/catalogo" className="shell__link">
            Catalogo
          </Link>
          <Link to="/carrinho" className="shell__link">
            Carrinho
          </Link>
          <Link to="/checkout" className="shell__link">
            Checkout
          </Link>
          <Link
            to="/carrinho"
            className="shell__cart-chip"
            aria-label="Ir para carrinho"
          >
            Itens no carrinho: {totalItems}
          </Link>
        </nav>
      </header>

      <main className="shell__content">
        <section className="shell__pilares" aria-label="Pilares adotados">
          <h2>Pilares adotados</h2>
          <ul>
            <li>Comunicacao por eventos de dominio com contrato compartilhado.</li>
            <li>Componentizacao com uma base unica de UI reutilizavel.</li>
            <li>Roteamento centralizado no shell com carregamento lazy.</li>
          </ul>
        </section>

        <section className="shell__module" aria-live="polite">
          <header className="shell__module-header">
            <h2>{sectionTitle}</h2>
          </header>

          <Suspense
            fallback={
              <div className="shell__loading">Carregando microfrontend...</div>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/catalogo" replace />} />
              <Route path="/catalogo" element={<MfeCatalogo />} />
              <Route path="/carrinho" element={<MfeCarrinho />} />
              <Route path="/checkout" element={<MfeCheckout />} />
              <Route path="*" element={<Navigate to="/catalogo" replace />} />
            </Routes>
          </Suspense>
        </section>
      </main>

      <footer className="shell__footer">
        Base de componentes compartilhada + estado desacoplado por eventos.
      </footer>
    </div>
  )
}

export default App
