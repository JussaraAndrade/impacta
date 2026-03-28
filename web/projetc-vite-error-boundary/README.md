# Projeto React Error Boundary

Um projeto educacional desenvolvido em React + TypeScript + Vite que demonstra o uso de **Error Boundary** para tratamento robusto de erros em componentes React.

## 📋 Sobre o Projeto

Este projeto é uma aplicação prática que mostra como implementar e utilizar Error Boundaries em uma aplicação React moderna. O objetivo é entender como capturar erros que ocorrem em componentes filhos e exibir uma interface de fallback amigável ao usuário.

## 🎯 Funcionalidades Principais

- **Error Boundary Component**: Componente de classe que captura erros em componentes filhos
- **Counter Component**: Componente que lança propositalmente um erro quando o contador atinge 5
- **Problematic Component**: Componente de exemplo que pode ser configurado para lançar erros
- **Tratamento de Erros**: Mensagens de erro formatadas e botão para resetar o estado

## 🛠️ Stack Tecnológico

- **React** 19.2.4
- **TypeScript** 5.9.3
- **Vite** 8.0.1
- **ESLint** com regras específicas para React
- **React Compiler** habilitado para otimizações automáticas

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                    # Componente principal
├── ErrorBoundary.tsx          # Error Boundary component (como capturar erros)
├── Counter.tsx                # Contador que lança erro a cada 5 cliques
├── ProblematicComponent.tsx   # Componente de teste com erro condicional
├── main.tsx                   # Ponto de entrada
└── index.css                  # Estilos globais
```

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento com HMR (Hot Module Replacement).

### Build
```bash
npm run build
```
Compila o projeto TypeScript e cria os arquivos para produção.

### Lint
```bash
npm run lint
```
Verifica o código com ESLint.

### Preview
```bash
npm run preview
```
Visualiza a build em um servidor local.

## 📚 Conceitos Principais

### Error Boundary
Um Error Boundary é um componente React que **captura erros** lançados por componentes filhos. Ele utiliza os métodos lifecycle:
- `getDerivedStateFromError()`: Atualiza o estado quando um erro é detectado
- `componentDidCatch()`: Log de erros para serviços de rastreamento

Exemplo de uso:
```tsx
<ErrorBoundary>
  <Counter />
</ErrorBoundary>
```

### Comportamento Atual
- O componente Counter incrementa de 0 a 4
- Ao atingir 5, lança um erro intencional
- O ErrorBoundary captura o erro e exibe uma mensagem amigável
- Botão "Resetar" permite restaurar o estado

## 🔧 Configurações Especiais

- **React Compiler**: Ativado para otimizações automáticas. Vejo a [documentação oficial](https://react.dev/learn/react-compiler) para detalhes.
- **Plugin Vite**: Usa [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) com [Oxc](https://oxc.rs)

## 📖 Recursos de Aprendizado

- [Documentação de Error Boundary - React](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Vite Documentation](https://vite.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)


// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
