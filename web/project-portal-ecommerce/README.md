# Portal Interno de E-commerce com Microfrontends

Este projeto implementa um portal simples de e-commerce interno com arquitetura de microfrontends em React + Vite.

## Alunos

- Adriano de Oliveira Agostinho
- Jussara de Jesus Andrade

## Estrutura do projeto

- `shell`: layout global, roteamento e carregamento lazy dos MFEs.
- `mfe-catalogo`: grid de produtos com acao de adicionar ao carrinho.
- `mfe-carrinho`: listagem de itens, quantidades e total.
- `mfe-checkout`: formulario de endereco e confirmacao do pedido.

## Tres pilares adotados

### 1) Camada de comunicacao

Escolha: barramento de eventos de dominio com `CustomEvent` + persistencia em `localStorage`.

Justificativa:
- Desacopla os MFEs: nenhum microfrontend depende diretamente da implementacao de outro.
- Facilita evolucao por squads: cada equipe escuta/publica eventos no contrato compartilhado.
- Mantem estado resiliente entre refreshes pelo `localStorage`.

Contrato principal:
- Evento: `portal:cart-updated`
- API compartilhada: `addToCart`, `setItemQuantity`, `clearCart`, `subscribeCart`, `getCartItems`, `getCartTotalValue`.

### 2) Camada de componentizacao

Escolha: biblioteca de UI compartilhada local em `src/shared/ui`.

Justificativa:
- Garante consistencia visual entre MFEs sem duplicar componentes.
- Permite evolucao incremental da design base com baixo acoplamento.
- Facilita reuso de componentes base (`Panel`, `Button`) por squads diferentes.

### 3) Camada de roteamento

Escolha: roteamento centralizado no shell com `react-router-dom` e carregamento lazy dos MFEs (`React.lazy`).

Justificativa:
- O shell controla navegacao global e fallback de rotas.
- Os MFEs podem ser carregados sob demanda, reduzindo impacto inicial.
- Mantem uma experiencia unica de navegacao para o usuario final.

## Arquitetura de pastas

```txt
src/
  App.tsx                      # Shell
  shared/
    cart/
      cartBus.ts               # Comunicacao entre MFEs
      types.ts                 # Contratos compartilhados
    ui/
      Button.tsx               # Componente base
      Panel.tsx                # Componente base
  mfes/
    catalogo/
      CatalogoApp.tsx
      products.ts
    carrinho/
      CarrinhoApp.tsx
    checkout/
      CheckoutApp.tsx
```

## Como executar

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
```
