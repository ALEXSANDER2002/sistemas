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
    <img src="/800px-Tela_Cadastro_Aluno-1.png" alt="Tela Inicial" style="width: 100%; max-width: 600px; height: auto; border-radius: 4px;" />
  </div>

  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="margin: 0 0 10px 0; color: #0066FF; font-size: 16px;">2. Tela de Cadastro</h3>
    <img src="/800px-Tela_Cadastro_Aluno-2.png" alt="Tela de Cadastro" style="width: 100%; max-width: 600px; height: auto; border-radius: 4px;" />
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
    <div className="fixed bottom-0 right-0 z-50 md:bottom-4 md:right-4">
      {isOpen ? (
        showFeedback ? (
          <ChatFeedback onClose={handleCloseFeedback} onSkip={handleSkipFeedback} />
        ) : (
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
              {messages.map(message => (
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
                    {message.sender === 'bot' && message.content.includes('<img') ? (
                      <div dangerouslySetInnerHTML={{ __html: message.content }} className="space-y-4" />
                    ) : (
                      message.content.split('\n').map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words leading-relaxed py-0.5">{line}</div>
                      ))
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
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
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
        )
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-[#0066FF] hover:bg-[#0052CC] transition-colors shadow-lg mx-4 mb-4 md:m-0 ml-auto"
        >
          <i className="fas fa-comments text-xl md:text-2xl text-white"></i>
        </Button>
      )}
    </div>
  )
} 