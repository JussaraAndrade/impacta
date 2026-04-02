interface ProblematicComponentProps {
    shouldError?: boolean;
}

export function ProblematicComponent({ shouldError = false }: ProblematicComponentProps) {
    if (shouldError) {
        throw new Error("Este é um erro proposital para testar o ErrorBoundary!");
    }

    return (
        <div style={{ padding: "10px", backgroundColor: "#efe", borderRadius: "4px", margin: "10px 0" }}>
            <h3>✅ Componente funcionando normalmente</h3>
            <p>Nenhum erro foi lançado.</p>
        </div>
    );
}