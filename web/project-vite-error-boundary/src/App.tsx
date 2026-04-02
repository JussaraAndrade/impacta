import ErrorBoundary from './ErrorBoundary'
import { Counter } from './Counter'
import { useState } from 'react'

function App() {
  const [counterKey, setCounterKey] = useState(0)

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
    
      <section style={{ marginBottom: "30px" }}>
        <h2>Contador com Erro ao atingir 5</h2>
        <p>Clique em "Incrementar" até chegar a 5 para ver o ErrorBoundary em ação:</p>
        <ErrorBoundary reset={counterKey}>
          <Counter key={counterKey} />
        </ErrorBoundary>
        <button 
          onClick={() => setCounterKey(counterKey + 1)}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#229954"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#27ae60"}
        >
          ↻ Reiniciar Contador
        </button>
      </section>
    </div>
  )
}

export default App;