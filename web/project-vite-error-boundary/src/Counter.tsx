import { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);

    if (count === 5) {
        throw new Error("🚨 Contador atingiu 5! Limite de cliques excedido!");
    }

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <div style={{ 
            padding: "20px", 
            backgroundColor: "#f0f8ff", 
            borderRadius: "8px", 
            textAlign: "center",
            border: "2px solid #4a90e2"
        }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#4a90e2", marginBottom: "20px" }}>
                {count}
            </div>
            
            <p style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
                Clique no botão para incrementar. A cada clique você verá o número aumentar.
            </p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                    onClick={handleIncrement}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#4a90e2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2e5c8a"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4a90e2"}
                >
                    ➕ Incrementar
                </button>

                <button
                    onClick={handleReset}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#888",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#555"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#888"}
                >
                    🔄 Resetar
                </button>
            </div>

            <p style={{ fontSize: "12px", color: "#e74c3c", marginTop: "20px", fontWeight: "bold" }}>
                ⚠️ Cuidado: Ao atingir a contagem 5, um erro será lançado!
            </p>
        </div>
    );
}