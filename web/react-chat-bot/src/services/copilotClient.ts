type ApiMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type OpenAiLikeResponse = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

const API_URL = import.meta.env.VITE_COPILOT_API_URL
const API_TOKEN = import.meta.env.VITE_COPILOT_API_TOKEN
const MODEL = import.meta.env.VITE_COPILOT_MODEL ?? 'gpt-4.1'

const SYSTEM_PROMPT =
  'Voce e um assistente tecnico claro e objetivo, especializado em desenvolvimento de software.'

const makeMessages = (history: ChatMessage[], input: string): ApiMessage[] => {
  const fromHistory: ApiMessage[] = history.map((message) => ({
    role: message.role,
    content: message.content,
  }))

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...fromHistory,
    { role: 'user', content: input },
  ]
}

const mockResponse = async (input: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [
    'Modo mock ativo (sem configuracao de API).',
    `Pergunta: ${input}`,
    'Configure VITE_COPILOT_API_URL e VITE_COPILOT_API_TOKEN para usar a integracao real.',
  ].join('\n\n')
}

export const requestCopilot = async (
  input: string,
  history: ChatMessage[],
): Promise<string> => {
  if (!API_URL || !API_TOKEN) {
    return mockResponse(input)
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: makeMessages(history, input),
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    throw new Error(`Falha na API (${response.status})`)
  }

  const payload = (await response.json()) as OpenAiLikeResponse
  const content = payload.choices?.[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('Resposta da API vazia')
  }

  return content
}
