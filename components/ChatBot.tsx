'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatFeedback from './ChatFeedback'
import stringSimilarity from 'string-similarity'
import { MessageSquare, X, Send, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  steps?: string[]
  currentStep?: number
}

interface ChatResponse {
  keywords: string[]
  response: string
}

const responses: ChatResponse[] = [
  {
    keywords: ['senha', 'trocar senha', 'alterar senha', 'recuperar senha', 'esqueci senha', 'redefinir'],
    response: `🔐 Alteração de Senha Institucional

📋 Passo a Passo:

1️⃣ Acesse o portal de senhas:
<a href="https://senha.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">senha.unifesspa.edu.br</a>

2️⃣ Digite seu usuário institucional:
(mesmo do e-mail @unifesspa.edu.br)

3️⃣ Siga as instruções para redefinição:
• Receba o código de verificação
• Crie uma nova senha
• Confirme a alteração

⚠️ Importante:
• A senha deve ter no mínimo 8 caracteres
• Use letras, números e caracteres especiais
• Não use informações pessoais

❓ Precisa de ajuda?
Abra um chamado em: <a href="https://helpdesk.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">helpdesk.unifesspa.edu.br</a>`
  },
  {
    keywords: ['email', 'e-mail', 'correio', 'outlook', 'webmail'],
    response: `📧 E-mail Institucional

📋 Como Acessar:

1️⃣ Acesse o Outlook:
<a href="https://outlook.office.com" target="_blank" style="color: #0066FF; text-decoration: underline;">outlook.office.com</a>

2️⃣ Use suas credenciais:
• Email: seu.usuario@unifesspa.edu.br
• Senha: sua senha institucional

⚙️ Configurações Recomendadas:
• Outlook Web App (OWA)
• Outlook Desktop
• Aplicativo móvel

⚠️ Dicas de Segurança:
• Não compartilhe suas credenciais
• Use autenticação em dois fatores
• Mantenha seu e-mail organizado

❗ Problemas com email?
Abra um chamado em: <a href="https://helpdesk.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">helpdesk.unifesspa.edu.br</a>`
  },
  {
    keywords: ['wifi', 'internet', 'rede', 'wireless', 'eduroam', 'conexão'],
    response: `📶 Rede WiFi Institucional (Eduroam)

📋 Como Conectar:

1️⃣ Selecione a rede:
• Nome: eduroam
• Segurança: WPA2-Enterprise

2️⃣ Credenciais:
• Usuário: seu.email@unifesspa.edu.br
• Senha: sua senha institucional

⚙️ Configurações Técnicas:
• Método de autenticação: PEAP
• Autenticação interna: MSCHAPv2
• Sem certificado (CA)

📍 Locais com Cobertura:
• Todos os campi da Unifesspa
• Áreas comuns e salas de aula
• Bibliotecas

❓ Dificuldades?
Acesse: <a href="https://ctic.unifesspa.edu.br/wifi" target="_blank" style="color: #0066FF; text-decoration: underline;">ctic.unifesspa.edu.br/wifi</a>`
  },
  {
    keywords: ['chamado', 'ticket', 'suporte', 'ajuda', 'problema', 'solicitar'],
    response: `🎫 Sistema de Chamados

📋 Como Abrir um Chamado:

1️⃣ Acesse o Helpdesk:
<a href="https://helpdesk.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">helpdesk.unifesspa.edu.br</a>

2️⃣ Faça login com suas credenciais institucionais

3️⃣ Clique em "Novo Chamado"

4️⃣ Preencha as informações:
• Categoria do serviço
• Descrição detalhada
• Prioridade
• Anexos (se necessário)

📊 Acompanhamento:
• Verifique o status do chamado
• Receba notificações por email
• Interaja com o técnico responsável

⏱️ Tempo de Resposta:
• Urgente: 4 horas
• Alta: 8 horas
• Normal: 24 horas
• Baixa: 48 horas`
  },
  {
    keywords: ['sigaa', 'sistema', 'academico', 'login', 'acesso', 'primeiro acesso', 'discente', 'aluno', 'matricula'],
    response: `🎓 Primeiro Acesso ao SIGAA - Discente

📋 Passo a Passo:

1️⃣ Acesse o SIGAA:
<a href="https://sigaa.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">sigaa.unifesspa.edu.br</a>

2️⃣ Clique em "Primeiro Acesso"

3️⃣ Selecione "Discente"

4️⃣ Preencha os dados solicitados:
• Número da matrícula
• CPF
• Data de nascimento

5️⃣ Crie uma senha forte:
• Mínimo 8 caracteres
• Letras e números
• Caracteres especiais

6️⃣ Confirme seu e-mail:
• Verifique sua caixa de entrada
• Clique no link de confirmação

📸 Passo a Passo Visual:

<div style="display: flex; flex-direction: column; gap: 20px; margin: 15px 0;">
  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin: 0 0 10px 0; color: #0066FF; font-size: 16px;">1. Tela Inicial</h3>
    <img src="/800px-Cadastro_Aluno-1.png" alt="Tela Inicial" style="width: 100%; max-width: 600px; height: auto; border-radius: 4px;" />
  </div>

  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin: 0 0 10px 0; color: #0066FF; font-size: 16px;">2. Tela de Cadastro</h3>
    <img src="/800px-Tela_Cadastro_Aluno-1.png" alt="Tela de Cadastro" style="width: 100%; max-width: 600px; height: auto; border-radius: 4px;" />
  </div>

  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin: 0 0 10px 0; color: #0066FF; font-size: 16px;">3. Tela Final</h3>
    <img src="/800px-Tela_final_SIGAA_Cadastro-1.png" alt="Tela Final" style="width: 100%; max-width: 600px; height: auto; border-radius: 4px;" />
  </div>
</div>

❓ Dificuldades?
Acesse: <a href="https://helpdesk.unifesspa.edu.br/wiki-unifesspa/primeiro-acesso-discente-2/" target="_blank" style="color: #0066FF; text-decoration: underline;">helpdesk.unifesspa.edu.br/wiki-unifesspa/primeiro-acesso-discente-2/</a>`
  },
  {
    keywords: ['vpn', 'acesso remoto', 'conexão remota'],
    response: `🔒 VPN Unifesspa

📋 Como Configurar:

1️⃣ Baixe o cliente OpenVPN:
• Versão compatível com seu sistema
• Instale seguindo as instruções

2️⃣ Solicite acesso:
• Acesse o Helpdesk
• Abra um chamado para VPN
• Aguarde a aprovação

3️⃣ Configure a conexão:
• Use as credenciais fornecidas
• Importe o arquivo de configuração
• Conecte-se à rede

⚠️ Requisitos:
• Conexão estável com internet
• Sistema operacional atualizado
• Antivírus configurado

📚 Mais informações:
<a href="https://ctic.unifesspa.edu.br/vpn" target="_blank" style="color: #0066FF; text-decoration: underline;">ctic.unifesspa.edu.br/vpn</a>`
  },
  {
    keywords: ['software', 'programa', 'aplicativo', 'instalação'],
    response: `💻 Instalação de Software

📋 Como Solicitar:

1️⃣ Acesse o Helpdesk:
<a href="https://helpdesk.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">helpdesk.unifesspa.edu.br</a>

2️⃣ Abra um chamado:
• Categoria: Instalação de Software
• Descreva o software necessário
• Informe a justificativa

3️⃣ Aguarde a análise:
• Verificação de licenças
• Compatibilidade do sistema
• Disponibilidade de instalação

⚠️ Observações:
• Softwares com licença institucional
• Compatibilidade com sistemas da Unifesspa
• Necessidade comprovada de uso

⏱️ Prazo de Atendimento:
• Normal: 48 horas úteis
• Urgente: 24 horas úteis`
  },
  {
    keywords: ['horário', 'atendimento', 'ctic', 'contato'],
    response: `⏰ Horário de Atendimento

📅 Dias e Horários:
• Segunda a Sexta-feira
• Manhã: 8h às 12h
• Tarde: 14h às 18h

📞 Canais de Atendimento:

💻 Helpdesk Online:
<a href="https://helpdesk.unifesspa.edu.br" target="_blank" style="color: #0066FF; text-decoration: underline;">helpdesk.unifesspa.edu.br</a>

📧 E-mail:
<a href="mailto:ctic@unifesspa.edu.br" style="color: #0066FF; text-decoration: underline;">ctic@unifesspa.edu.br</a>

☎️ Telefone:
(94) XXXX-XXXX

📍 Localização:
Centro de Tecnologia da Informação e Comunicação
Campus Universitário de Marabá

⚠️ Em caso de urgência:
• Fora do horário comercial
• Problemas críticos
• Emergências técnicas`
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
    response: `❓ Não entendi sua pergunta.

Posso ajudar com:
• 🔑 Senha institucional
• 📧 Email institucional
• 📶 Rede WiFi (Eduroam)
• 🎫 Abertura de chamados
• 🎓 SIGAA
• 🔒 VPN
• 💻 Instalação de software
• ⏰ Horário de atendimento

🔍 Ou abra um chamado em:
helpdesk.unifesspa.edu.br`,
    score: 0
  }

  // Verificar saudações
  if (normalizedMessage.match(/^(oi|ola|eai|hello|hi|boa|bom|dia|tarde|noite)/)) {
    return `👋 Olá! Sou o assistente virtual do CTIC Unifesspa.

Posso ajudar com:
• 🔑 Senha institucional
• 📧 Email institucional
• 📶 Rede WiFi (Eduroam)
• 🎫 Abertura de chamados
• 🎓 SIGAA
• 🔒 VPN
• 💻 Instalação de software

❓ Como posso ajudar você hoje?`
  }

  // Verificar agradecimentos
  if (normalizedMessage.match(/(obrigado|obrigada|valeu|thanks|thank|agradecido|agradecida)/)) {
    return `😊 De nada! Estou aqui para ajudar.

❓ Precisa de mais informações?
Não hesite em perguntar!

🎫 Para problemas específicos:
helpdesk.unifesspa.edu.br`
  }

  // Verificar despedidas
  if (normalizedMessage.match(/(tchau|adeus|ate|bye|goodbye)/)) {
    return `👋 Até mais!

🎫 Lembre-se: você pode abrir um chamado a qualquer momento em:
helpdesk.unifesspa.edu.br

😊 Tenha um ótimo dia!`
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

const styles = `
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = getBotResponse(input)
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNextStep = (messageIndex: number) => {
    setMessages(prev => {
      const newMessages = [...prev]
      const message = newMessages[messageIndex]
      if (message.steps && message.currentStep !== undefined) {
        message.currentStep = Math.min(message.currentStep + 1, message.steps.length - 1)
      }
      return newMessages
    })
  }

  const handlePrevStep = (messageIndex: number) => {
    setMessages(prev => {
      const newMessages = [...prev]
      const message = newMessages[messageIndex]
      if (message.steps && message.currentStep !== undefined) {
        message.currentStep = Math.max(message.currentStep - 1, 0)
      }
      return newMessages
    })
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

  const getBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes('sigaa') || lowerInput.includes('primeiro acesso')) {
      return {
        id: (Date.now() + 1).toString(),
        content: 'Vou te ajudar com o primeiro acesso ao SIGAA!',
        sender: 'bot',
        timestamp: new Date(),
        steps: [
          '1️⃣ Acesse o SIGAA através do link: https://sigaa.unifesspa.edu.br/sigaa/verTelaLogin.do',
          '2️⃣ Na tela de login, clique em "Primeiro Acesso"',
          '3️⃣ Preencha seus dados pessoais no formulário de cadastro',
          '4️⃣ Após o cadastro, você receberá um e-mail de confirmação',
          '5️⃣ Siga as instruções do e-mail para ativar sua conta',
          '6️⃣ Faça login com seu CPF e senha cadastrados'
        ],
        currentStep: 0
      }
    }

    if (lowerInput.includes('suap') || lowerInput.includes('acesso')) {
      return {
        id: (Date.now() + 1).toString(),
        content: 'Vou te ajudar com o acesso ao SUAP!',
        sender: 'bot',
        timestamp: new Date(),
        steps: [
          '1️⃣ Acesse o SUAP através do link: https://suap.unifesspa.edu.br',
          '2️⃣ Clique em "Primeiro Acesso"',
          '3️⃣ Digite seu CPF e clique em "Enviar"',
          '4️⃣ Siga as instruções enviadas para seu e-mail',
          '5️⃣ Crie uma senha forte',
          '6️⃣ Faça login com seu CPF e senha'
        ],
        currentStep: 0
      }
    }

    return {
      id: (Date.now() + 1).toString(),
      content: 'Desculpe, não entendi sua pergunta. Você pode perguntar sobre:\n- Primeiro acesso ao SIGAA\n- Primeiro acesso ao SUAP\n- Outros sistemas institucionais',
      sender: 'bot',
      timestamp: new Date()
    }
  }

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

  useEffect(() => {
    // Adiciona os estilos ao head do documento
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Cleanup
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-50 md:bottom-4 md:right-4">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-[#0066FF] hover:bg-[#0052CC] transition-all duration-300 shadow-lg mx-4 mb-4 md:m-0 ml-auto hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] group relative overflow-hidden"
        >
          <i className="fas fa-comments text-xl md:text-2xl text-white transition-transform duration-300 group-hover:rotate-12 relative z-10"></i>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#4D9AFF] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient"></div>
        </Button>
      )}

      {isOpen && !showFeedback && (
        <Card className="w-full h-[calc(100vh-4rem)] md:w-[700px] md:h-[calc(100vh-8rem)] max-h-[1000px] flex flex-col shadow-lg md:rounded-lg overflow-hidden">
          <div className="bg-[#0066FF] px-4 py-3 md:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-headset text-[#0066FF]"></i>
              </div>
              <span className="font-semibold text-white">Suporte CTIC</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleClose}
                className="text-white hover:text-gray-200 p-2"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-3 md:p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`mb-3 md:mb-4 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[95%] md:max-w-[98%] rounded-lg p-2.5 md:p-3 text-[0.9375rem] md:text-base ${
                    message.sender === 'user'
                      ? 'bg-[#0066FF] text-white'
                      : 'bg-white shadow-sm'
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words leading-relaxed py-0.5">{line}</div>
                  ))}
                  {message.steps && message.currentStep !== undefined && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-700 mb-2">
                        {message.steps[message.currentStep]}
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handlePrevStep(index)}
                          disabled={message.currentStep === 0}
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="text-xs text-gray-500">
                          {message.currentStep + 1}/{message.steps.length}
                        </span>
                        <button
                          onClick={() => handleNextStep(index)}
                          disabled={message.currentStep === message.steps.length - 1}
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3 md:mb-4">
                <div className="bg-white shadow-sm rounded-lg p-2.5 md:p-3">
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

          <div className="p-3 md:p-4 bg-white border-t flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 text-[0.9375rem] md:text-base"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-[#0066FF] hover:bg-[#0052CC] px-3 md:px-4"
            >
              <span className="hidden md:inline">Enviar</span>
              <i className="fas fa-paper-plane md:hidden"></i>
            </Button>
          </div>
        </Card>
      )}

      {showFeedback && (
        <ChatFeedback onClose={handleCloseFeedback} onSkip={handleSkipFeedback} />
      )}
    </div>
  )
} 