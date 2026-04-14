import { FormEvent, useMemo, useState } from 'react'
import { requestCopilot } from './services/copilotClient.ts'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const hasConversation = useMemo(() => messages.length > 0, [messages])

  const sendPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanPrompt = prompt.trim()
    if (!cleanPrompt || isLoading) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: cleanPrompt,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setPrompt('')
    setIsLoading(true)

    try {
      const answer = await requestCopilot(cleanPrompt, messages)
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: answer,
      }
      setMessages((current) => [...current, assistantMessage])
    } catch (error) {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'Nao consegui falar com a API agora. Verifique VITE_COPILOT_API_URL e VITE_COPILOT_API_TOKEN.',
      }
      setMessages((current) => [...current, assistantMessage])
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickPrompts = [
    'Explique este repositorio em alto nivel',
    'Me ajude a criar um endpoint em Node.js',
    'Revise este codigo e aponte bugs',
    'Sugira testes unitarios para meu modulo',
  ]

  const applyQuickPrompt = (value: string) => {
    if (isLoading) {
      return
    }
    setPrompt(value)
  }

  return (
    <main className={hasConversation ? 'app app-chat' : 'app app-hero'}>
      <div className="orb orb-left" aria-hidden="true" />
      <div className="orb orb-right" aria-hidden="true" />

      <header className="brand">
        <span className="brand-mark">C</span>
        <span className="brand-text">Copilot Search</span>
      </header>

      <section className="content">
        {!hasConversation && (
          <>
            <div className="search-logo" aria-label="Copilot search logo">
              <span className="logo-b">C</span>
              <span className="logo-r">o</span>
              <span className="logo-y">p</span>
              <span className="logo-b">i</span>
              <span className="logo-g">l</span>
              <span className="logo-r">o</span>
              <span className="logo-y">t</span>
            </div>
            <h1 className="title">Pergunte como no Google. Resposta como Copilot.</h1>
            <p className="subtitle">
              Um wrapper web minimalista para conversar com a API do GitHub Copilot.
            </p>
          </>
        )}

        {hasConversation && (
          <div className="chat">
            {messages.map((message) => (
              <article
                key={message.id}
                className={
                  message.role === 'user' ? 'message message-user' : 'message message-assistant'
                }
              >
                <p>{message.content}</p>
              </article>
            ))}
            {isLoading && (
              <article className="message message-assistant">
                <p className="typing">Pensando...</p>
              </article>
            )}
          </div>
        )}

        {!hasConversation && (
          <div className="quick-prompts">
            {quickPrompts.map((item) => (
              <button key={item} type="button" onClick={() => applyQuickPrompt(item)}>
                {item}
              </button>
            ))}
          </div>
        )}

        <form className="prompt-form" onSubmit={sendPrompt}>
          <input
            type="text"
            placeholder="Pergunte qualquer coisa..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !prompt.trim()}>
            Enviar
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
