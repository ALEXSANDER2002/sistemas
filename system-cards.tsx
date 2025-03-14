/**
 * Sistema de Cards para UNIFESSPA
 *
 * Este componente implementa uma interface de cards para os sistemas institucionais
 * da Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA), seguindo o Design
 * System do gov.br e implementando recursos completos de acessibilidade.
 *
 * Recursos de acessibilidade:
 * - Alto contraste
 * - Ajuste de tamanho de fonte
 * - Navegação por teclado
 * - Compatibilidade com leitores de tela
 * - Links de pular conteúdo
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AccessibilityMenu } from "@/components/accessibility-menu"

// Definição da interface para os dados dos sistemas
interface SystemCard {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export default function SystemCards() {
  // =========================================================================
  // DADOS DOS SISTEMAS
  // =========================================================================
  const systems: SystemCard[] = [
    {
      id: "atena",
      title: "ATENA",
      description: "Sistema de gestão de conhecimento e informações acadêmicas",
      icon: "fas fa-graduation-cap",
      color: "#2670E8",
    },
    {
      id: "avaliacao",
      title: "Avaliação de Desempenho",
      description: "Plataforma para avaliação e acompanhamento de desempenho profissional",
      icon: "fas fa-chart-line",
      color: "#1351B4",
    },
    {
      id: "coc",
      title: "COC",
      description: "Sistema de controle e organização de conteúdos",
      icon: "fas fa-folder",
      color: "#2670E8",
    },
    {
      id: "sae",
      title: "SAE",
      description: "Sistema de Acompanhamento Educacional",
      icon: "fas fa-users",
      color: "#1351B4",
    },
    {
      id: "sisplad",
      title: "Sisplad",
      description: "Sistema de Planejamento e Desenvolvimento",
      icon: "fas fa-tasks",
      color: "#2670E8",
    },
    {
      id: "sisprol",
      title: "Sisprol",
      description: "Sistema de Projetos e Logística",
      icon: "fas fa-project-diagram",
      color: "#1351B4",
    },
    {
      id: "udocs",
      title: "Udocs",
      description: "Gerenciamento e organização de documentos unificados",
      icon: "fas fa-file-alt",
      color: "#2670E8",
    },
  ]

  // =========================================================================
  // ESTADOS DO COMPONENTE
  // =========================================================================
  const [searchTerm, setSearchTerm] = useState("")
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [announceMessage, setAnnounceMessage] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  // Filtra os sistemas com base no termo de busca
  const filteredSystems = systems.filter(
    (system) =>
      system.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // =========================================================================
  // FUNÇÕES DE ACESSIBILIDADE
  // =========================================================================

  /**
   * Aumenta o tamanho da fonte até um limite máximo
   * e anuncia a mudança para leitores de tela
   */
  const increaseFontSize = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 2
      setFontSize(newSize)
      setAnnounceMessage(`Tamanho da fonte aumentado para ${newSize} pixels`)

      // Salvar preferência no localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("fontSize", newSize.toString())
      }
    } else {
      setAnnounceMessage("Tamanho máximo da fonte atingido")
    }
  }

  /**
   * Diminui o tamanho da fonte até um limite mínimo
   * e anuncia a mudança para leitores de tela
   */
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      const newSize = fontSize - 2
      setFontSize(newSize)
      setAnnounceMessage(`Tamanho da fonte diminuído para ${newSize} pixels`)

      // Salvar preferência no localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("fontSize", newSize.toString())
      }
    } else {
      setAnnounceMessage("Tamanho mínimo da fonte atingido")
    }
  }

  /**
   * Alterna o modo de alto contraste e salva a preferência
   * Aplica a classe diretamente ao elemento HTML para afetar todo o site
   */
  const toggleHighContrast = () => {
    const newContrastState = !highContrast
    setHighContrast(newContrastState)

    // Aplicar diretamente ao elemento HTML
    if (typeof window !== "undefined") {
      if (newContrastState) {
        document.documentElement.classList.add("high-contrast")
        document.body.classList.add("high-contrast")
      } else {
        document.documentElement.classList.remove("high-contrast")
        document.body.classList.remove("high-contrast")
      }

      // Salvar preferência no localStorage
      localStorage.setItem("highContrast", newContrastState.toString())
    }

    setAnnounceMessage(newContrastState ? "Modo de alto contraste ativado" : "Modo de alto contraste desativado")
  }

  /**
   * Toggles dark mode and saves the preference
   * Applies the 'dark' class to the document element
   */
  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode
    setDarkMode(newDarkModeState)

    // Apply directly to the HTML element
    if (typeof window !== "undefined") {
      if (newDarkModeState) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      // Save preference to localStorage
      localStorage.setItem("darkMode", newDarkModeState.toString())
    }

    setAnnounceMessage(newDarkModeState ? "Modo escuro ativado" : "Modo escuro desativado")
  }

  // =========================================================================
  // EFEITOS (LIFECYCLE HOOKS)
  // =========================================================================

  /**
   * Efeito para carregar preferências salvas do usuário
   * Executa apenas uma vez na montagem do componente
   */
  useEffect(() => {
    // Carregar preferência de contraste do localStorage
    if (typeof window !== "undefined") {
      // Carregar preferência de alto contraste
      const savedContrast = localStorage.getItem("highContrast")
      if (savedContrast === "true") {
        setHighContrast(true)
        document.documentElement.classList.add("high-contrast")
        document.body.classList.add("high-contrast")
      }

      // Carregar preferência de modo escuro
      const savedDarkMode = localStorage.getItem("darkMode")
      if (savedDarkMode === "true") {
        setDarkMode(true)
        document.documentElement.classList.add("dark")
      }

      // Carregar preferência de tamanho de fonte
      const savedFontSize = localStorage.getItem("fontSize")
      if (savedFontSize) {
        setFontSize(Number.parseInt(savedFontSize, 10))
      }
    }
  }, [])

  /**
   * Efeito para aplicar o tamanho da fonte ao elemento HTML
   * Executa sempre que o tamanho da fonte mudar
   */
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  /**
   * Efeito para configurar atalhos de teclado para acessibilidade
   * Configura os event listeners e faz a limpeza ao desmontar
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + 1: Ir para o conteúdo
      if (e.altKey && e.key === "1") {
        e.preventDefault()
        document.getElementById("main-content")?.focus()
        setAnnounceMessage("Navegado para o conteúdo principal")
      }
      // Alt + 2: Ir para o menu
      else if (e.altKey && e.key === "2") {
        e.preventDefault()
        document.getElementById("accessibility-menu")?.focus()
        setAnnounceMessage("Navegado para o menu de acessibilidade")
      }
      // Alt + 3: Ir para a busca
      else if (e.altKey && e.key === "3") {
        e.preventDefault()
        document.getElementById("search-systems")?.focus()
        setAnnounceMessage("Navegado para a busca")
      }
      // Alt + 4: Alto contraste
      else if (e.altKey && e.key === "4") {
        e.preventDefault()
        toggleHighContrast()
      }
      // Alt + 5: Modo escuro
      else if (e.altKey && e.key === "5") {
        e.preventDefault()
        toggleDarkMode()
      }
      // Alt + +: Aumentar fonte
      else if (e.altKey && e.key === "+") {
        e.preventDefault()
        increaseFontSize()
      }
      // Alt + -: Diminuir fonte
      else if (e.altKey && e.key === "-") {
        e.preventDefault()
        decreaseFontSize()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [fontSize, highContrast, darkMode])

  // =========================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // =========================================================================
  return (
    <>
      {/* Anúncios para leitores de tela */}
      <div 
        role="status" 
        aria-live="polite" 
        className="sr-only"
        id="screen-reader-announcer"
      >
        {announceMessage}
      </div>

      {/* Indicador visual de anúncio (visível apenas quando há um anúncio) */}
      {announceMessage && (
        <div 
          className="fixed bottom-4 right-4 bg-[#071D41] text-white py-2 px-4 rounded-md shadow-lg z-50 max-w-xs animate-fade-in-out"
          aria-hidden="true"
        >
          <div className="flex items-center">
            <i className="fas fa-info-circle mr-2" aria-hidden="true"></i>
            <span>{announceMessage}</span>
          </div>
        </div>
      )}

      {/* Links de pular conteúdo */}
      <div className="skip-links">
        <a href="#main-content" className="skip-link bg-[#071D41] text-white py-2 px-4 absolute -top-20 left-4 z-50 focus:top-4 transition-all duration-200 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-2">
          Pular para o conteúdo principal
        </a>
        <a href="#accessibility-menu" className="skip-link bg-[#071D41] text-white py-2 px-4 absolute -top-20 left-4 z-50 focus:top-16 transition-all duration-200 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-2">
          Pular para o menu de acessibilidade
        </a>
        <a href="#search-systems" className="skip-link bg-[#071D41] text-white py-2 px-4 absolute -top-20 left-4 z-50 focus:top-28 transition-all duration-200 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-2">
          Pular para a busca
        </a>
      </div>

      <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
        {/* Barra de acessibilidade */}
        <div className="bg-[#071D41] text-white py-1.5 border-b border-[#1351B4]/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <AccessibilityMenu onAnnounce={(message) => setAnnounceMessage(message)} />
              </div>
              <div className="hidden md:block text-xs text-white/70">
                <span>
                  Teclas de atalho: Alt + 1 (conteúdo), Alt + 2 (menu), Alt + 3 (busca), Alt + 4 (contraste), Alt + 5 (modo escuro)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cabeçalho */}
        <header>
          {/* Barra azul escura com logo e nome da instituição */}
          <div className="bg-gradient-to-r from-[#071D41] to-[#0B2B5B] text-white">
            <div className="container mx-auto py-3 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src="/unifesspa.jpg" 
                    alt="Logo UNIFESSPA" 
                    className="h-10 w-auto rounded-sm shadow-sm" 
                  />
                  <div className="border-l border-white/20 pl-3">
                    <div className="text-xs font-medium text-white/80">UNIFESSPA</div>
                    <div className="font-bold text-sm md:text-base">Universidade Federal do Sul e Sudeste do Pará</div>
                  </div>
                </div>
                <div className="hidden md:flex items-center">
                  <span className="text-sm font-bold px-3 py-1 bg-white/10 rounded-sm">gov.br</span>
                </div>
              </div>
            </div>
          </div>
          {/* Barra azul clara com título */}
          <div className="bg-[#2670E8] shadow-sm">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center">
                <i className="fas fa-th-large text-white/80 mr-2 text-xl" aria-hidden="true"></i>
                <h1 className="text-xl font-bold text-white">Sistemas Institucionais</h1>
                <div className="ml-auto hidden sm:flex items-center bg-white/10 rounded-sm px-3 py-1">
                  <span className="text-xs text-white/80">Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <nav aria-label="Trilha de navegação">
              <ol className="flex items-center text-sm">
                <li>
                  <Link href="/" className="flex items-center text-[#1351B4] hover:text-[#2670E8] transition-colors">
                    <i className="fas fa-home mr-1" aria-hidden="true"></i>
                    <span>Página Inicial</span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-chevron-right text-gray-400 mx-2 text-xs" aria-hidden="true"></i>
                  <span className="font-medium text-gray-700" aria-current="page">
                    Sistemas Institucionais
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Conteúdo principal */}
        <main id="main-content" className="container mx-auto py-8 px-4 flex-grow" tabIndex={-1}>
          {/* Bloco de informações */}
          <div className="bg-white p-6 mb-8 border-l-4 border-[#FFCD07] shadow-sm rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:flex-1">
                <h2 className="text-xl font-bold text-[#071D41] mb-2 flex items-center">
                  <i className="fas fa-info-circle text-[#1351B4] mr-2" aria-hidden="true"></i>
                  Sistemas UNIFESSPA
                </h2>
                <p className="text-gray-600">
                  Acesse os sistemas institucionais da Universidade Federal do Sul e Sudeste do Pará. 
                  Utilize a barra de pesquisa para encontrar rapidamente o sistema desejado.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <i className="fas fa-shield-alt mr-1 text-xs" aria-hidden="true"></i> Acesso Seguro
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i className="fas fa-universal-access mr-1 text-xs" aria-hidden="true"></i> Acessibilidade
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <i className="fas fa-mobile-alt mr-1 text-xs" aria-hidden="true"></i> Responsivo
                  </span>
                </div>
              </div>
              <div className="hidden md:block md:ml-6 md:pl-6 md:border-l border-gray-200">
                <div className="flex items-center justify-center bg-gray-50 p-4 rounded-sm">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#1351B4]">{systems.length}</div>
                    <div className="text-sm text-gray-500">Sistemas disponíveis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área de busca e cards dos sistemas */}
          <div className="bg-white p-6 mb-8 shadow-sm rounded-sm">
            {/* Campo de busca */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <i className="fas fa-search text-[#1351B4] mr-2" aria-hidden="true"></i>
                Pesquisar sistemas
              </h2>
              <div className="relative max-w-lg mx-auto">
                <div className="relative flex items-center">
                  <input
                    id="search-systems"
                    type="text"
                    placeholder="Digite o nome do sistema..."
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:border-[#2670E8] shadow-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setAnnounceMessage(e.target.value ? `Buscando por ${e.target.value}` : "Campo de busca limpo")
                    }}
                  />
                  <div className="absolute right-3 flex items-center">
                    {searchTerm && (
                      <button 
                        onClick={() => {
                          setSearchTerm("")
                          setAnnounceMessage("Pesquisa limpa, mostrando todos os sistemas")
                          document.getElementById("search-systems")?.focus()
                        }}
                        className="text-gray-400 hover:text-gray-600 mr-2"
                        aria-label="Limpar pesquisa"
                      >
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                      </button>
                    )}
                    <i className="fas fa-search text-[#1351B4]" aria-hidden="true"></i>
                  </div>
                </div>
                {searchTerm && (
                  <div className="mt-2 text-sm text-gray-500">
                    <span>
                      {filteredSystems.length === 0 
                        ? "Nenhum sistema encontrado" 
                        : filteredSystems.length === 1 
                          ? "1 sistema encontrado" 
                          : `${filteredSystems.length} sistemas encontrados`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Grid de cards dos sistemas */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              role="region"
              aria-label="Lista de sistemas"
            >
              {filteredSystems.length === 0 ? (
                <div className="col-span-full text-center py-10 bg-gray-50 rounded-sm border border-gray-200" role="status">
                  <i className="fas fa-search text-gray-400 text-3xl mb-3" aria-hidden="true"></i>
                  <p className="text-gray-600">Nenhum sistema encontrado com o termo "{searchTerm}"</p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setAnnounceMessage("Pesquisa limpa, mostrando todos os sistemas")
                    }}
                    className="mt-4 text-[#1351B4] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:ring-offset-2 rounded-sm px-2 py-1"
                  >
                    Limpar pesquisa
                  </button>
                </div>
              ) : (
                filteredSystems.map((system) => (
                  <div
                    key={system.id}
                    className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:border-[#2670E8]/30 transition-all duration-300 flex flex-col group"
                    aria-labelledby={`system-title-${system.id}`}
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-white rounded-md mr-3 shadow-sm group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: system.color }}
                        aria-hidden="true"
                      >
                        <i className={system.icon} style={{ fontSize: "1.5rem" }}></i>
                      </div>
                      <h3 id={`system-title-${system.id}`} className="font-bold text-[#071D41] group-hover:text-[#1351B4] transition-colors">
                        {system.title}
                      </h3>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <p className="text-sm text-gray-600 mb-5 flex-grow">{system.description}</p>
                      <Link
                        href={`/sistema/${system.id}`}
                        className="block w-full py-2.5 px-4 bg-[#1351B4] hover:bg-[#071D41] text-white text-center font-bold transition-all rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:ring-offset-2 flex items-center justify-center group-hover:shadow-md"
                        aria-label={`Acessar ${system.title}`}
                      >
                        <span>Acessar</span>
                        <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Rodapé */}
        <footer className="bg-[#071D41] text-white mt-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Grid de informações do rodapé */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Coluna 1: Informações da instituição */}
              <div>
                <h2 className="text-base font-bold mb-2">UNIFESSPA</h2>
                <p className="text-xs text-gray-300">Universidade Federal do Sul e Sudeste do Pará</p>
                <address className="text-xs text-gray-300 not-italic">
                  Folha 31, Quadra 07, Lote Especial, s/n - Nova Marabá, Marabá - PA
                </address>
              </div>

              {/* Coluna 2: Links úteis */}
              <div>
                <h2 className="text-base font-bold mb-2">Links Úteis</h2>
                <nav aria-label="Links úteis no rodapé">
                  <ul className="grid grid-cols-2 gap-1">
                    <li>
                      <a
                        href="#"
                        className="text-xs text-gray-300 hover:text-white hover:underline flex items-center transition-colors"
                      >
                        <i className="fas fa-external-link-alt mr-1 text-[0.6rem]" aria-hidden="true"></i>
                        Portal da UNIFESSPA
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-xs text-gray-300 hover:text-white hover:underline flex items-center transition-colors"
                      >
                        <i className="fas fa-headset mr-1 text-[0.6rem]" aria-hidden="true"></i>
                        Ouvidoria
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-xs text-gray-300 hover:text-white hover:underline flex items-center transition-colors"
                      >
                        <i className="fas fa-chart-pie mr-1 text-[0.6rem]" aria-hidden="true"></i>
                        Transparência
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-xs text-gray-300 hover:text-white hover:underline flex items-center transition-colors"
                      >
                        <i className="fas fa-envelope mr-1 text-[0.6rem]" aria-hidden="true"></i>
                        Contato
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Coluna 3: Redes sociais */}
              <div>
                <h2 className="text-base font-bold mb-2">Redes Sociais</h2>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f text-sm" aria-hidden="true"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram text-sm" aria-hidden="true"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter text-sm" aria-hidden="true"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube text-sm" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Área de copyright */}
            <div className="border-t border-white/10 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-2 md:mb-0">
                <img src="/unifesspa.jpg" alt="Logo UNIFESSPA" className="h-8" />
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs">© {new Date().getFullYear()} UNIFESSPA - Todos os direitos reservados</p>
                <p className="text-xs text-gray-300">Desenvolvido de acordo com o Design System do gov.br</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}