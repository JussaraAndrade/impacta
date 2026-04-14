# Copilot Search Wrapper

Aplicativo web em React com visual inspirado em buscador (estilo Google), funcionando como wrapper para conversa com API de IA no formato OpenAI-like, voltado para uso com GitHub Copilot.

## Funcionalidades

- Tela inicial estilo busca com campo unico de pergunta
- Conversa em formato chatbot inteligente
- Sugestoes rapidas de prompts
- Integracao por API configuravel via variaveis de ambiente
- Fallback em modo mock quando a API nao estiver configurada

## Configuracao da API

1. Copie `.env.example` para `.env`
2. Preencha:

- `VITE_COPILOT_API_URL`: URL do endpoint de chat
- `VITE_COPILOT_API_TOKEN`: token Bearer
- `VITE_COPILOT_MODEL`: modelo (padrao `gpt-4.1`)

Se nao configurar essas variaveis, o app responde em modo mock para facilitar o desenvolvimento da interface.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
