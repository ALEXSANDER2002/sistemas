'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatFeedback from './ChatFeedback'
import stringSimilarity from 'string-similarity'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatResponse {
  keywords: string[]
  response: string
}

const responses: ChatResponse[] = [
  {
    keywords: ['senha', 'trocar senha', 'alterar senha', 'recuperar senha', 'esqueci senha', 'redefinir'],
    response: '🔑 Alteração de Senha Institucional\n\n1️⃣ Acesse: senha.unifesspa.edu.br\n2️⃣ Digite seu usuário (mesmo do e-mail)\n3️⃣ Siga as instruções para redefinição\n\n❓ Precisa de ajuda?\nAbra um chamado em helpdesk.unifesspa.edu.br'
  },
  {
    keywords: ['email', 'e-mail', 'correio', 'outlook', 'webmail'],
    response: '📧 E-mail Institucional\n\n1️⃣ Acesse: outlook.office.com\n2️⃣ Use seu email completo (@unifesspa.edu.br)\n3️⃣ Digite sua senha institucional\n\n❗ Problemas com email?\nAbra um chamado em helpdesk.unifesspa.edu.br'
  },
  {
    keywords: ['wifi', 'internet', 'rede', 'wireless', 'eduroam', 'conexão'],
    response: '📶 Conexão WiFi (Eduroam)\n\n1️⃣ Selecione a rede "eduroam"\n2️⃣ Digite seu email completo (@unifesspa.edu.br)\n3️⃣ Use sua senha institucional\n\n⚙️ Configurações:\n• Método: PEAP\n• Autenticação: MSCHAPv2\n\n❓ Dificuldades?\nAcesse: ctic.unifesspa.edu.br/wifi'
  },
  {
    keywords: ['chamado', 'ticket', 'suporte', 'ajuda', 'problema', 'solicitar'],
    response: '🎫 Abertura de Chamados\n\n1️⃣ Acesse: helpdesk.unifesspa.edu.br\n2️⃣ Faça login com suas credenciais\n3️⃣ Clique em "Novo Chamado"\n4️⃣ Selecione o tipo de serviço\n5️⃣ Descreva seu problema\n\n📋 Acompanhe seus chamados na mesma plataforma'
  },
  {
    keywords: ['sigaa', 'sistema', 'academico', 'login', 'acesso'],
    response: '🎓 Acesso ao SIGAA\n\n1️⃣ Acesse: sigaa.unifesspa.edu.br\n2️⃣ Use seu usuário e senha institucional\n\n❗ Problemas de acesso?\n• Verifique se sua senha está correta\n• Tente recuperar em senha.unifesspa.edu.br\n• Se persistir, abra um chamado'
  },
  {
    keywords: ['vpn', 'acesso remoto', 'conexão remota'],
    response: '🔒 VPN Unifesspa\n\n1️⃣ Baixe o cliente OpenVPN\n2️⃣ Solicite acesso via helpdesk.unifesspa.edu.br\n3️⃣ Configure usando as instruções fornecidas\n\n📚 Mais informações:\nctic.unifesspa.edu.br/vpn'
  },
  {
    keywords: ['software', 'programa', 'aplicativo', 'instalação'],
    response: '💻 Instalação de Software\n\n1️⃣ Abra um chamado em helpdesk.unifesspa.edu.br\n2️⃣ Selecione "Instalação de Software"\n3️⃣ Informe o nome e justificativa\n\n⚠️ Observação:\nA instalação depende da disponibilidade de licença e compatibilidade'
  },
  {
    keywords: ['horário', 'atendimento', 'ctic', 'contato'],
    response: '⏰ Horário de Atendimento\nSegunda a Sexta: 8h às 12h e 14h às 18h\n\n📞 Contatos:\n• 💻 Helpdesk: helpdesk.unifesspa.edu.br\n• 📧 Email: ctic@unifesspa.edu.br\n• ☎️ Telefone: (94) XXXX-XXXX'
  }
]

// Função para remover acentos
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function findBestResponse(message: string): string {
  const normalizedMessage = removeAccents(message.toLowerCase())
  const messageWords = normalizedMessage.split(/\s+/)
  
  let bestMatch = {
    response: '❓ Não entendi sua pergunta.\n\nPosso ajudar com:\n• 🔑 Senha institucional\n• 📧 Email institucional\n• 📶 Rede WiFi (Eduroam)\n• 🎫 Abertura de chamados\n• 🎓 SIGAA\n• 🔒 VPN\n• 💻 Instalação de software\n• ⏰ Horário de atendimento\n\n🔍 Ou abra um chamado em:\nhelpdesk.unifesspa.edu.br',
    score: 0
  }

  // Verificar saudações
  if (normalizedMessage.match(/^(oi|ola|eai|hello|hi|boa|bom|dia|tarde|noite)/)) {
    return '👋 Olá! Sou o assistente virtual do CTIC Unifesspa.\n\nPosso ajudar com:\n• 🔑 Senha institucional\n• 📧 Email institucional\n• 📶 Rede WiFi (Eduroam)\n• 🎫 Abertura de chamados\n• 🎓 SIGAA\n• 🔒 VPN\n• 💻 Instalação de software\n\n❓ Como posso ajudar você hoje?'
  }

  // Verificar agradecimentos
  if (normalizedMessage.match(/(obrigado|obrigada|valeu|thanks|thank|agradecido|agradecida)/)) {
    return '😊 De nada! Estou aqui para ajudar.\n\n❓ Precisa de mais informações?\nNão hesite em perguntar!\n\n🎫 Para problemas específicos:\nhelpdesk.unifesspa.edu.br'
  }

  // Verificar despedidas
  if (normalizedMessage.match(/(tchau|adeus|ate|bye|goodbye)/)) {
    return '👋 Até mais!\n\n🎫 Lembre-se: você pode abrir um chamado a qualquer momento em:\nhelpdesk.unifesspa.edu.br\n\n😊 Tenha um ótimo dia!'
  }

  responses.forEach(item => {
    const normalizedKeywords = item.keywords.map(k => removeAccents(k.toLowerCase()))
    
    // Verificar correspondência exata
    if (normalizedKeywords.some(keyword => normalizedMessage.includes(keyword))) {
      if (bestMatch.score < 1) {
        bestMatch = {
          response: item.response,
          score: 1
        }
      }
    }

    // Verificar similaridade entre palavras
    messageWords.forEach(word => {
      if (word.length > 2) { // Ignorar palavras muito curtas
        const similarities = normalizedKeywords.map(keyword => 
          stringSimilarity.compareTwoStrings(word, keyword)
        )
        const maxSimilarity = Math.max(...similarities)
        
        if (maxSimilarity > bestMatch.score) {
          bestMatch = {
            response: item.response,
            score: maxSimilarity
          }
        }
      }
    })
  })

  return bestMatch.score >= 0.7 ? bestMatch.response : bestMatch.response
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true)
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          content: '👋 Olá! Sou o assistente virtual do CTIC Unifesspa.\n\nPosso ajudar com:\n• 🔑 Senha institucional\n• 📧 Email institucional\n• 📶 Rede WiFi (Eduroam)\n• 🎫 Abertura de chamados\n• 🎓 SIGAA\n• 🔒 VPN\n• 💻 Instalação de software\n\n❓ Como posso ajudar você hoje?',
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages([welcomeMessage])
        setIsLoading(false)
      }, 1500)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    // Encontrar a melhor resposta para a mensagem do usuário
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: findBestResponse(input),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleClose = () => {
    if (messages.length > 1) {
      setShowFeedback(true)
    } else {
      setIsOpen(false)
      setMessages([])
    }
  }

  const handleCloseFeedback = () => {
    setShowFeedback(false)
    setIsOpen(false)
    setMessages([])
  }

  const handleSkipFeedback = () => {
    setShowFeedback(false)
    setIsOpen(false)
    setMessages([])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        showFeedback ? (
          <ChatFeedback onClose={handleCloseFeedback} onSkip={handleSkipFeedback} />
        ) : (
          <Card className="w-[400px] h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
            <div className="bg-[#0066FF] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <i className="fas fa-headset text-[#0066FF]"></i>
                </div>
                <span className="font-semibold text-white">Suporte CTIC</span>
              </div>
              <div className="flex gap-2">
                <button className="text-white hover:text-gray-200">
                  <i className="fas fa-chevron-down"></i>
                </button>
                <button 
                  onClick={handleClose}
                  className="text-white hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4 bg-gray-50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-[#0066FF] text-white'
                        : 'bg-white shadow-sm'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white shadow-sm rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="p-4 bg-white border-t flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-[#0066FF] hover:bg-[#0052CC]"
              >
                Enviar
              </Button>
            </div>
          </Card>
        )
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-[#0066FF] hover:bg-[#0052CC] transition-colors shadow-lg"
        >
          <i className="fas fa-comments text-2xl text-white"></i>
        </Button>
      )}
    </div>
  )
} 