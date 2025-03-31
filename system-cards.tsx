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

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { useHighContrast } from "@/components/HighContrastContext"
import Fuse from 'fuse.js'

// Definição da interface para os dados dos sistemas
interface SystemCard {
  id: string
  title: string
  description: string
  icon: string
  color: string
  detailedInfo?: string
  features?: string[]
  lastUpdate?: string
  contato?: {
    telefone?: string
    email?: string
    horario?: string
  }
}

// Palavras-chave relacionadas para cada sistema
const palavrasRelacionadasSistemas = {
  atena: ['acadêmico', 'matricula', 'notas', 'histórico', 'disciplinas', 'professor', 'aluno', 'curso', 'graduação'],
  avaliacao: ['desempenho', 'servidor', 'avaliação', 'metas', 'objetivos', 'feedback', 'desenvolvimento', 'progresso'],
  coc: ['documentos', 'conteúdo', 'arquivos', 'organização', 'repositório', 'pasta', 'compartilhamento'],
  sae: ['educacional', 'acompanhamento', 'aluno', 'estudante', 'frequência', 'desempenho', 'pedagógico', 'ensino'],
  sisplad: ['planejamento', 'desenvolvimento', 'projetos', 'estratégia', 'indicadores', 'metas', 'gestão'],
  sisprol: ['projetos', 'logística', 'recursos', 'cronograma', 'operações', 'gerenciamento', 'controle'],
  udocs: ['documentos', 'arquivo', 'gestão', 'organização', 'repositório', 'digitalização', 'processos']
};

// Palavras-chave por categorias
const palavrasCategoria = {
  sistema: ['sistema', 'plataforma', 'ferramenta', 'software', 'aplicativo', 'tecnologia', 'digital'],
  gestao: ['gestão', 'gerenciamento', 'administração', 'controle', 'supervisão', 'monitoramento'],
  documentos: ['documentos', 'arquivos', 'registro', 'formulário', 'repositório', 'digitalização'],
  atendimento: ['atendimento', 'suporte', 'ajuda', 'assistência', 'apoio', 'serviço', 'contato', 'central', 'ouvidoria', 'helpdesk']
};

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
      detailedInfo: "O ATENA é um sistema completo para gestão acadêmica que integra informações de alunos, professores e disciplinas em uma única plataforma.",
      features: ["Gestão de matrículas", "Controle de notas", "Histórico acadêmico", "Planos de ensino"],
      lastUpdate: "15/03/2023"
    },
    {
      id: "avaliacao",
      title: "Avaliação de Desempenho",
      description: "Plataforma para avaliação e acompanhamento de desempenho profissional",
      icon: "fas fa-chart-line",
      color: "#1351B4",
      detailedInfo: "Sistema para avaliação periódica de servidores, permitindo feedback contínuo e acompanhamento de metas e objetivos.",
      features: ["Avaliações 360°", "Definição de metas", "Relatórios de desempenho", "Planos de desenvolvimento"],
      lastUpdate: "22/01/2023"
    },
    {
      id: "coc",
      title: "COC",
      description: "Sistema de controle e organização de conteúdos",
      icon: "fas fa-folder",
      color: "#2670E8",
      detailedInfo: "Plataforma para gerenciamento e organização de conteúdos institucionais, facilitando o acesso e compartilhamento de informações.",
      features: ["Repositório de documentos", "Controle de versões", "Compartilhamento seguro", "Busca avançada"],
      lastUpdate: "10/02/2023"
    },
    {
      id: "sae",
      title: "SAE",
      description: "Sistema de Acompanhamento Educacional",
      icon: "fas fa-users",
      color: "#1351B4",
      detailedInfo: "Ferramenta para acompanhamento do progresso educacional dos estudantes, permitindo intervenções pedagógicas personalizadas.",
      features: ["Monitoramento de frequência", "Acompanhamento de desempenho", "Intervenções pedagógicas", "Comunicação com responsáveis"],
      lastUpdate: "05/04/2023"
    },
    {
      id: "sisplad",
      title: "Sisplad",
      description: "Sistema de Planejamento e Desenvolvimento",
      icon: "fas fa-tasks",
      color: "#2670E8",
      detailedInfo: "Plataforma para planejamento estratégico e acompanhamento de projetos de desenvolvimento institucional.",
      features: ["Planejamento estratégico", "Gestão de projetos", "Indicadores de desempenho", "Relatórios gerenciais"],
      lastUpdate: "18/12/2022"
    },
    {
      id: "sisprol",
      title: "Sisprol",
      description: "Sistema de Projetos e Logística",
      icon: "fas fa-project-diagram",
      color: "#1351B4",
      detailedInfo: "Sistema integrado para gerenciamento de projetos e operações logísticas da instituição.",
      features: ["Gestão de projetos", "Controle logístico", "Alocação de recursos", "Cronogramas integrados"],
      lastUpdate: "30/01/2023"
    },
    {
      id: "udocs",
      title: "Udocs",
      description: "Gerenciamento e organização de documentos unificados",
      icon: "fas fa-file-alt",
      color: "#2670E8",
      detailedInfo: "Sistema centralizado para gerenciamento de documentos institucionais, com recursos avançados de busca e categorização.",
      features: ["Repositório centralizado", "Controle de acesso", "Versionamento de documentos", "Fluxos de aprovação"],
      lastUpdate: "25/03/2023"
    },
    {
      id: "atendimento-ctic",
      title: "Atendimento CTIC",
      description: "Suporte e atendimento para questões de tecnologia e inovação",
      icon: "fas fa-laptop-code",
      color: "#1351B4",
      detailedInfo: "Central de atendimento especializada em tecnologia e inovação, oferecendo suporte para sistemas, infraestrutura e recursos tecnológicos.",
      features: ["Suporte a sistemas", "Infraestrutura de TI", "Recursos tecnológicos", "Treinamentos em TI"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7100",
        email: "ctic@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-crca",
      title: "Atendimento CRCA",
      description: "Suporte para questões de recursos humanos e administrativas",
      icon: "fas fa-users-cog",
      color: "#2670E8",
      detailedInfo: "Central de atendimento para questões relacionadas a recursos humanos, administrativas e carreiras.",
      features: ["Folha de pagamento", "Férias e licenças", "Benefícios", "Documentação RH"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7102",
        email: "crca@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 17h"
      }
    },
    {
      id: "atendimento-progep",
      title: "Atendimento PROGEP",
      description: "Suporte para gestão de pessoas e desenvolvimento",
      icon: "fas fa-user-tie",
      color: "#1351B4",
      detailedInfo: "Central de atendimento especializada em gestão de pessoas, desenvolvimento organizacional e capacitação.",
      features: ["Desenvolvimento organizacional", "Capacitação", "Gestão de pessoas", "Programas de desenvolvimento"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7103",
        email: "progep@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-sinfra",
      title: "Atendimento SINFRA",
      description: "Suporte para infraestrutura e manutenção",
      icon: "fas fa-building",
      color: "#2670E8",
      detailedInfo: "Central de atendimento para questões de infraestrutura, manutenção e obras da instituição.",
      features: ["Manutenção predial", "Obras", "Infraestrutura", "Serviços gerais"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7104",
        email: "sinfra@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-proeg",
      title: "Atendimento PROEG",
      description: "Suporte para ensino de graduação",
      icon: "fas fa-graduation-cap",
      color: "#1351B4",
      detailedInfo: "Central de atendimento especializada em questões relacionadas ao ensino de graduação.",
      features: ["Matrículas", "Histórico acadêmico", "Grade curricular", "Programas de ensino"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7105",
        email: "proeg@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-propit",
      title: "Atendimento PROPIT",
      description: "Suporte para pesquisa e inovação tecnológica",
      icon: "fas fa-flask",
      color: "#2670E8",
      detailedInfo: "Central de atendimento para questões relacionadas à pesquisa e inovação tecnológica.",
      features: ["Projetos de pesquisa", "Inovação tecnológica", "Bolsas de pesquisa", "Publicações"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7106",
        email: "propit@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-proex",
      title: "Atendimento PROEX",
      description: "Suporte para extensão universitária",
      icon: "fas fa-hands-helping",
      color: "#1351B4",
      detailedInfo: "Central de atendimento especializada em extensão universitária e projetos sociais.",
      features: ["Projetos de extensão", "Ações sociais", "Eventos", "Parcerias comunitárias"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7107",
        email: "proex@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-proad",
      title: "Atendimento PROAD",
      description: "Suporte para administração acadêmica",
      icon: "fas fa-university",
      color: "#2670E8",
      detailedInfo: "Central de atendimento para questões administrativas e acadêmicas.",
      features: ["Gestão acadêmica", "Processos administrativos", "Documentação acadêmica", "Serviços acadêmicos"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7108",
        email: "proad@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    },
    {
      id: "atendimento-naia",
      title: "Atendimento NAIA",
      description: "Suporte para assuntos estudantis",
      icon: "fas fa-user-graduate",
      color: "#1351B4",
      detailedInfo: "Central de atendimento especializada em assuntos estudantis e apoio ao discente.",
      features: ["Assistência estudantil", "Apoio ao discente", "Programas estudantis", "Serviços ao estudante"],
      lastUpdate: "01/04/2023",
      contato: {
        telefone: "(94) 2101-7109",
        email: "naia@unifesspa.edu.br",
        horario: "Segunda a Sexta: 08h às 18h"
      }
    }
  ]

  // =========================================================================
  // ESTADOS DO COMPONENTE
  // =========================================================================
  const [searchTerm, setSearchTerm] = useState("sistema")
  const { highContrast, toggleHighContrast } = useHighContrast()
  const [fontSize, setFontSize] = useState(16)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [announceMessage, setAnnounceMessage] = useState("")

  // Configuração do Fuse.js para busca com tolerância a erros
  const fuseOptions = {
    includeScore: true,
    threshold: 0.4, // Tolerância a erros (0 = correspondência exata, 1 = correspondência muito flexível)
    keys: [
      { name: 'title', weight: 2 }, // Peso maior para o título
      { name: 'description', weight: 1.5 }, // Peso médio para descrição
      'detailedInfo', 
      'features'
    ],
    ignoreLocation: true,
    useExtendedSearch: true
  };

  // Criar instância do Fuse.js uma vez na montagem ou quando systems mudar
  const fuse = useMemo(() => new Fuse(systems, fuseOptions), [systems]);

  // Função para alternar a expansão de um card
  const toggleCardExpansion = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null)
      setAnnounceMessage(`Fechando informações de ${systems.find(sys => sys.id === id)?.title || ''}`)
    } else {
      setExpandedCard(id)
      setAnnounceMessage(`Mostrando informações de ${systems.find(sys => sys.id === id)?.title || ''}`)
    }
  }
  
  // Verifica se um card está expandido
  const isCardExpanded = (id: string) => expandedCard === id

  // Fecha o modal ao clicar fora dele ou ao pressionar ESC
  const closeExpandedCard = () => {
    if (expandedCard) {
      setAnnounceMessage(`Fechando informações de ${systems.find(sys => sys.id === expandedCard)?.title || ''}`)
      setExpandedCard(null)
    }
  }

  // Função para verificar se um termo está relacionado a um sistema
  const verificarTermoRelacionado = (termo: string, systemId: string) => {
    const termoLower = termo.toLowerCase();
    
    // Verificar nas palavras-chave específicas do sistema
    const palavras = palavrasRelacionadasSistemas[systemId as keyof typeof palavrasRelacionadasSistemas] || [];
    const matchPalavras = palavras.some(palavra => 
      palavra.toLowerCase().includes(termoLower) || 
      termoLower.includes(palavra.toLowerCase())
    );
    
    // Verificar nas palavras-chave por categoria
    const matchCategoria = Object.entries(palavrasCategoria).some(([categoria, palavras]) => {
      // Se o termo for uma categoria específica (como "atendimento"), verificamos se o sistema tem relação
      if (categoria === termoLower) {
        const system = systems.find(s => s.id === systemId);
        if (!system) return false;
        
        // Verificar se o sistema tem alguma palavra da categoria no título ou descrição
        return palavras.some(palavra => 
          system.title.toLowerCase().includes(palavra) || 
          system.description.toLowerCase().includes(palavra) ||
          (system.detailedInfo && system.detailedInfo.toLowerCase().includes(palavra)) ||
          (system.features && system.features.some(feature => feature.toLowerCase().includes(palavra)))
        );
      }
      
      // Se for outra busca, verificamos nas palavras da categoria
      return palavras.some(palavra => 
        palavra.toLowerCase() === termoLower || 
        palavra.toLowerCase().includes(termoLower) || 
        termoLower.includes(palavra.toLowerCase())
      );
    });
    
    return matchPalavras || matchCategoria;
  };

  // Filtrar sistemas com base no termo de busca usando Fuse.js
  const filteredSystems = useMemo(() => {
    if (!searchTerm) return systems; // Mostrar todos os sistemas, incluindo os de atendimento
    
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    // Se o termo de busca for vazio após o trim, ou for "todos", mostrar todos os sistemas
    if (searchTermLower.length === 0 || searchTermLower === "todos") return systems;
    
    // Se o termo de busca for "atendimento", retorne apenas os cards de atendimento
    if (searchTermLower === "atendimento") {
      return systems.filter(system => system.id.startsWith('atendimento-'));
    }
    
    // Realizar busca com Fuse.js apenas nos sistemas não-atendimento
    const sistemasNaoAtendimento = systems.filter(system => !system.id.startsWith('atendimento-'));
    const fuse = new Fuse(sistemasNaoAtendimento, fuseOptions);
    const fuseResults = fuse.search(searchTermLower);
    
    // Se não encontrarmos resultados com Fuse, tente verificar termos relacionados
    if (fuseResults.length === 0) {
      return sistemasNaoAtendimento.filter(system => {
        return Object.entries(palavrasCategoria).some(([categoria, palavras]) => {
          if (categoria === searchTermLower) {
            return palavras.some(palavra => 
              system.title.toLowerCase().includes(palavra) || 
              system.description.toLowerCase().includes(palavra) ||
              (system.detailedInfo && system.detailedInfo.toLowerCase().includes(palavra)) ||
              (system.features && system.features.some(feature => feature.toLowerCase().includes(palavra)))
            );
          }
          
          return palavras.some(palavra => 
            (palavra.toLowerCase() === searchTermLower || 
            palavra.toLowerCase().includes(searchTermLower) || 
            searchTermLower.includes(palavra.toLowerCase())) &&
            (system.title.toLowerCase().includes(palavra) || 
            system.description.toLowerCase().includes(palavra) ||
            (system.detailedInfo && system.detailedInfo.toLowerCase().includes(palavra)) ||
            (system.features && system.features.some(feature => feature.toLowerCase().includes(palavra))))
          );
        }) || verificarTermoRelacionado(searchTermLower, system.id);
      });
    }
    
    // Processar resultados do Fuse (converta para array de sistemas)
    return fuseResults.map(result => result.item);
  }, [searchTerm, systems]);

  // Verificar se um card corresponde exatamente ao termo de busca (para destaque)
  const isExactMatch = (system: SystemCard) => {
    if (!searchTerm) return false;
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    // Usando fuse para obter uma pontuação
    const searchResult = fuse.search(searchTermLower).find(result => result.item.id === system.id);
    
    // Se a pontuação for muito baixa (alta correspondência), considere como correspondência exata
    if (searchResult && searchResult.score !== undefined && searchResult.score < 0.2) {
      return true;
    }
    
    // Mantém a verificação original como fallback
    return system.title.toLowerCase() === searchTermLower || 
           system.title.toLowerCase().startsWith(searchTermLower + ' ');
  }

  // =========================================================================
  // EFEITOS (LIFECYCLE HOOKS)
  // =========================================================================

  /**
   * Efeito para anunciar o filtro inicial quando o componente é carregado
   */
  useEffect(() => {
    setAnnounceMessage("Filtrando por sistemas")
  }, [])

  /**
   * Efeito para carregar preferências salvas do usuário
   * Executa apenas uma vez na montagem do componente
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Carregar preferência de tamanho de fonte
      const savedFontSize = localStorage.getItem("fontSize")
      if (savedFontSize) {
        const size = Number.parseInt(savedFontSize, 10)
        setFontSize(size)
        document.documentElement.style.fontSize = `${size}px`
      }

      // Carregar preferência de alto contraste
      const savedHighContrast = localStorage.getItem("highContrast")
      if (savedHighContrast === "true") {
        toggleHighContrast()
      }
    }
  }, [])

  /**
   * Efeito para configurar atalhos de teclado para acessibilidade
   * Configura os event listeners e faz a limpeza ao desmontar
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Verificar se Alt está pressionado
      if (e.altKey) {
        switch (e.key) {
          case "1": // Alt + 1: Pular para o conteúdo principal
        e.preventDefault()
        document.getElementById("main-content")?.focus()
            setAnnounceMessage("Navegando para o conteúdo principal")
            break
          case "2": // Alt + 2: Pular para o menu de acessibilidade
        e.preventDefault()
        document.getElementById("accessibility-menu")?.focus()
            setAnnounceMessage("Navegando para o menu de acessibilidade")
            break
          case "3": // Alt + 3: Pular para a busca
        e.preventDefault()
        document.getElementById("search-systems")?.focus()
            setAnnounceMessage("Navegando para o campo de busca")
            break
          case "4": // Alt + 4: Alternar alto contraste
        e.preventDefault()
        toggleHighContrast()
            break
          // Removendo o caso Alt + 5 para modo escuro
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [fontSize, highContrast])

  /**
   * Efeito para fechar o card expandido ao pressionar a tecla ESC
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedCard) {
        closeExpandedCard()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedCard])

  // Atualizar o documento quando as preferências mudarem
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.fontSize = `${fontSize}px`
    }
  }, [fontSize])

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
      <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:z-50 focus-within:top-0 focus-within:left-0 focus-within:w-full focus-within:bg-[#071D41] focus-within:text-white focus-within:p-4">
        <div className="container mx-auto flex gap-4 justify-center">
          <a 
            href="#main-content" 
            className="bg-white text-[#071D41] px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-white"
          >
          Pular para o conteúdo principal
        </a>
          <a 
            href="#search-systems" 
            className="bg-white text-[#071D41] px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-white"
          >
            Pular para a pesquisa
          </a>
        </div>
      </div>

      <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
        {/* Barra de acessibilidade */}
        <div className="bg-[#071D41] text-white py-2 border-b border-[#1351B4]/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="relative group" id="accessibility-menu">
                  <button 
                    className="flex items-center gap-2 bg-[#1351B4] hover:bg-[#2670E8] transition-colors px-3 py-1.5 rounded-md text-sm font-medium"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => {
                      const menu = document.getElementById('accessibility-dropdown');
                      if (menu) {
                        const isHidden = menu.classList.contains('hidden');
                        menu.classList.toggle('hidden', !isHidden);
                        menu.classList.toggle('flex', isHidden);
                        menu.setAttribute('aria-hidden', (!isHidden).toString());
                      }
                    }}
                  >
                    <i className="fas fa-universal-access text-base" aria-hidden="true"></i>
                    <span>Acessibilidade</span>
                    <i className="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                  </button>
                  
                  <div 
                    id="accessibility-dropdown"
                    className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 hidden flex-col p-3 border border-gray-200"
                    aria-hidden="true"
                    role="menu"
                  >
                    <div className="border-b border-gray-200 pb-2 mb-2">
                      <h3 className="text-[#071D41] font-bold text-sm mb-1">Ajustes de visualização</h3>
                      <p className="text-gray-600 text-xs mb-2">Personalize a aparência do site para melhor visualização</p>
              </div>
                    
                    <div className="flex flex-col gap-3">
                      {/* Contraste */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#1351B4]/10 p-1.5 rounded-full">
                            <i className="fas fa-adjust text-[#1351B4] text-sm" aria-hidden="true"></i>
              </div>
                          <div>
                            <span className="text-gray-700 text-sm font-medium">Alto Contraste</span>
                            <p className="text-gray-500 text-xs">Melhora a visualização</p>
                          </div>
                        </div>
                        <button 
                          onClick={toggleHighContrast}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1351B4] focus:ring-offset-2 ${highContrast ? 'bg-[#1351B4]' : 'bg-gray-200'}`}
                          role="switch"
                          aria-checked={highContrast}
                        >
                          <span className="sr-only">Ativar alto contraste</span>
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                      </div>
                      
                      {/* Tamanho da fonte */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#1351B4]/10 p-1.5 rounded-full">
                            <i className="fas fa-text-height text-[#1351B4] text-sm" aria-hidden="true"></i>
                          </div>
                          <div>
                            <span className="text-gray-700 text-sm font-medium">Tamanho da Fonte</span>
                            <p className="text-gray-500 text-xs">Atual: {fontSize}px</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => {
                              if (fontSize > 12) {
                                const newSize = fontSize - 2
                                setFontSize(newSize)
                                setAnnounceMessage(`Tamanho da fonte diminuído para ${newSize} pixels`)
                              } else {
                                setAnnounceMessage("Tamanho mínimo da fonte atingido")
                              }
                            }}
                            className="bg-gray-100 hover:bg-gray-200 transition-colors w-7 h-7 rounded-full flex items-center justify-center text-gray-700"
                            aria-label="Diminuir tamanho da fonte"
                          >
                            <i className="fas fa-minus text-xs" aria-hidden="true"></i>
                          </button>
                          <button 
                            onClick={() => {
                              if (fontSize < 24) {
                                const newSize = fontSize + 2
                                setFontSize(newSize)
                                setAnnounceMessage(`Tamanho da fonte aumentado para ${newSize} pixels`)
                              } else {
                                setAnnounceMessage("Tamanho máximo da fonte atingido")
                              }
                            }}
                            className="bg-gray-100 hover:bg-gray-200 transition-colors w-7 h-7 rounded-full flex items-center justify-center text-gray-700"
                            aria-label="Aumentar tamanho da fonte"
                          >
                            <i className="fas fa-plus text-xs" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      
                      {/* VLibras */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#1351B4]/10 p-1.5 rounded-full">
                            <i className="fas fa-sign-language text-[#1351B4] text-sm" aria-hidden="true"></i>
                          </div>
                          <div>
                            <span className="text-gray-700 text-sm font-medium">VLibras</span>
                            <p className="text-gray-500 text-xs">Tradutor de Libras</p>
                          </div>
                        </div>
                        <a 
                          href="https://www.gov.br/governodigital/pt-br/vlibras" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1351B4] hover:underline text-xs font-medium"
                        >
                          Acessar <i className="fas fa-external-link-alt ml-1 text-[0.6rem]" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-3 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs">Atalhos de teclado:</span>
                        <div className="flex gap-2">
                          <span className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">Alt+1</span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">Alt+2</span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">Alt+3</span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">Alt+4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-5 border-r border-white/20 hidden md:block"></div>
                
                <div className="hidden md:flex items-center gap-2">
                  <a 
                    href="#main-content" 
                    className="text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1 bg-white/10 hover:bg-white/15 px-2 py-1 rounded"
                  >
                    <i className="fas fa-arrow-down text-[0.6rem]" aria-hidden="true"></i>
                    <span>Ir para conteúdo</span>
                  </a>
                  <a 
                    href="#search-systems" 
                    className="text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1 bg-white/10 hover:bg-white/15 px-2 py-1 rounded"
                  >
                    <i className="fas fa-search text-[0.6rem]" aria-hidden="true"></i>
                    <span>Ir para busca</span>
                  </a>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-4 text-xs text-white/80">
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  <i className="fas fa-question-circle" aria-hidden="true"></i>
                  <span>Ajuda</span>
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  <i className="fas fa-headset" aria-hidden="true"></i>
                  <span>Suporte</span>
                </a>
                <div className="bg-white/10 px-3 py-1 rounded text-white/90">
                  <span>Teclas de atalho: Alt + 1 (conteúdo), Alt + 2 (menu), Alt + 3 (busca), Alt + 4 (contraste)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cabeçalho */}
        <header className="sticky top-0 z-30 shadow-md">
          {/* Barra azul escura com logo e nome da instituição */}
          <div className="bg-gradient-to-r from-[#071D41] to-[#0B2B5B] text-white">
            <div className="container mx-auto py-4 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                  <img 
                    src="/unifesspa.jpg" 
                    alt="Logo UNIFESSPA" 
                      className="h-12 w-auto rounded-sm shadow-md group-hover:shadow-lg transition-all duration-300" 
                  />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-sm transition-opacity duration-300"></div>
                  </div>
                  <div className="border-l-2 border-[#2670E8]/40 pl-4">
                    <div className="text-xs font-medium text-white/80 tracking-wider">UNIFESSPA</div>
                    <div className="font-bold text-sm md:text-base tracking-wide">Universidade Federal do Sul e Sudeste do Pará</div>
                    <div className="hidden md:block text-xs text-white/60 mt-0.5">Sistemas Institucionais</div>
                </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-3">
                    <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-1">
                     
                    </a>
                    <div className="h-5 border-r border-white/20"></div>
              </div>
                  <div className="flex items-center bg-white/10 hover:bg-white/15 transition-colors rounded-md px-3 py-1.5 gov-br-logo">
                    <span className="text-sm font-bold mr-1">gov</span>
                    <span className="text-sm font-bold text-yellow-400">.br</span>
            </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumbs com design melhorado */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <nav aria-label="Trilha de navegação" className="flex items-center justify-between">
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
              
              <div className="hidden md:flex items-center gap-2">
                <button className="text-xs text-gray-600 hover:text-[#1351B4] transition-colors flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">
                  
                  
                </button>
                <button className="text-xs text-gray-600 hover:text-[#1351B4] transition-colors flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">
                  
                  
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Banner principal */}
        
          
        

        {/* Conteúdo principal */}
        <main id="main-content" className="container mx-auto py-0 px-4 flex-grow" tabIndex={-1}>
          {/* Bloco de informações */}
          <div className="bg-white p-6 mb-8 border-l-4 border-[#FFCD07] shadow-sm rounded-md">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:flex-1">
                <h2 className="text-xl font-bold text-[#071D41] mb-3 flex items-center">
                  <i className="fas fa-info-circle text-[#1351B4] mr-2" aria-hidden="true"></i>
                  Como utilizar os Sistemas
                </h2>
                <p className="text-gray-600 mb-3">
                  Utilize a barra de pesquisa para encontrar rapidamente o sistema desejado.
                  Clique nos cards para expandir e ver mais informações sobre cada sistema.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-md">
                    <i className="fas fa-search mr-2" aria-hidden="true"></i>
                    <span className="text-sm">Busque por nome ou funcionalidade</span>
                  </div>
                  <div className="flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-md">
                    <i className="fas fa-mouse-pointer mr-2" aria-hidden="true"></i>
                    <span className="text-sm">Clique para expandir detalhes</span>
                  </div>
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-md">
                    <i className="fas fa-arrow-right mr-2" aria-hidden="true"></i>
                    <span className="text-sm">Acesse o sistema desejado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área de busca e cards dos sistemas */}
          <div className="bg-white p-6 mb-8 shadow-sm rounded-md">
            {/* Campo de busca */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-700 flex items-center mb-3 md:mb-0">
                  <div className="bg-[#1351B4]/10 p-2 rounded-full mr-3">
                    <i className="fas fa-search text-[#1351B4]" aria-hidden="true"></i>
                  </div>
                  <span>Pesquisar sistemas</span>
              </h2>
                
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 hidden md:block">
                    <i className="fas fa-filter mr-1" aria-hidden="true"></i>
                    <span>Filtros rápidos:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => {
                        setSearchTerm("todos")
                        setAnnounceMessage("Mostrando todos os sistemas")
                        document.getElementById("search-systems")?.focus()
                      }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${!searchTerm || searchTerm.toLowerCase() === "todos" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
                    >
                      Todos ({systems.length})
                    </button>
                    <button 
                      onClick={() => {
                        setSearchTerm("sistema")
                        setAnnounceMessage("Filtrando por sistemas")
                        document.getElementById("search-systems")?.focus()
                      }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${searchTerm === "sistema" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
                    >
                      <i className="fas fa-cogs mr-1" aria-hidden="true"></i> Sistemas
                    </button>
                    <button 
                      onClick={() => {
                        setSearchTerm("gestão")
                        setAnnounceMessage("Filtrando por gestão")
                        document.getElementById("search-systems")?.focus()
                      }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center ${searchTerm === "gestão" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
                    >
                      <i className="fas fa-cogs mr-1" aria-hidden="true"></i> Gestão
                    </button>
                    <button 
                      onClick={() => {
                        setSearchTerm("documentos")
                        setAnnounceMessage("Filtrando por documentos")
                        document.getElementById("search-systems")?.focus()
                      }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center ${searchTerm === "documentos" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
                    >
                      <i className="fas fa-cogs mr-1" aria-hidden="true"></i> Documentos
                    </button>
                    <button 
                      onClick={() => {
                        setSearchTerm("atendimento")
                        setAnnounceMessage("Filtrando por atendimentos")
                        document.getElementById("search-systems")?.focus()
                      }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${searchTerm === "atendimento" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
                    >
                      <i className="fas fa-headset mr-1" aria-hidden="true"></i> Atendimentos
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative max-w-3xl mx-auto">
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </div>
                  <input
                    id="search-systems"
                    type="text"
                    placeholder="Digite o nome do sistema ou funcionalidade que você procura..."
                    className="w-full pl-11 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:border-[#2670E8] shadow-md transition-all"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setAnnounceMessage(e.target.value ? `Buscando por ${e.target.value}` : "Campo de busca limpo")
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchTerm("todos")
                        setAnnounceMessage("Pesquisa limpa, mostrando todos os sistemas")
                      }
                    }}
                  />
                    {searchTerm && (
                      <button 
                        onClick={() => {
                          setSearchTerm("todos")
                          setAnnounceMessage("Pesquisa limpa, mostrando todos os sistemas")
                          document.getElementById("search-systems")?.focus()
                        }}
                      className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center"
                        aria-label="Limpar pesquisa"
                      >
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
                
                {searchTerm && (
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <span className={`${filteredSystems.length === 0 ? 'text-red-500' : 'text-[#1351B4]'} font-medium`}>
                      {filteredSystems.length === 0 
                        ? "Nenhum sistema encontrado" 
                        : filteredSystems.length === 1 
                          ? "1 sistema encontrado" 
                          : `${filteredSystems.length} sistemas encontrados`}
                    </span>
                      {filteredSystems.length > 0 && (
                        <span className="text-gray-500 ml-1">para "{searchTerm}"</span>
                      )}
                    </div>
                    
                    {filteredSystems.length === 0 && (
                      <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                        <span>Sugestões: </span>
                        {["sistema", "gestão", "documentos", "acadêmico", "planejamento"].map((term, index) => (
                          <React.Fragment key={term}>
                            {index > 0 && <span className="mx-1">•</span>}
                            <button 
                              onClick={() => {
                                setSearchTerm(term)
                                setAnnounceMessage(`Buscando por ${term}`)
                              }}
                              className="text-[#1351B4] hover:underline"
                            >
                              {term}
                            </button>
                          </React.Fragment>
                        ))}
                  </div>
                )}
                  </div>
                )}
                
                {/* Dicas de pesquisa */}
                <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-700 flex items-start">
                  <i className="fas fa-lightbulb text-yellow-500 mt-0.5 mr-2" aria-hidden="true"></i>
                  <div>
                    <strong>Dicas de pesquisa:</strong>
                    <ul className="mt-1 ml-4 list-disc text-xs">
                      <li>Use múltiplas palavras para refinar sua busca (ex: "sistema acadêmico")</li>
                      <li>A busca considera nome, descrição e funcionalidades dos sistemas</li>
                      <li>A busca é inteligente e encontra resultados mesmo com erros de digitação</li>
                      <li>Pressione ESC para limpar a pesquisa rapidamente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de cards dos sistemas */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
              role="region"
              aria-label="Lista de sistemas"
            >
              {filteredSystems.length === 0 ? (
                <div className="col-span-full text-center py-10 bg-gray-50 rounded-sm border border-gray-200" role="status">
                  <i className="fas fa-search text-gray-400 text-3xl mb-3" aria-hidden="true"></i>
                  <p className="text-gray-600">Nenhum sistema encontrado com o termo "{searchTerm}"</p>
                  <button
                    onClick={() => {
                      setSearchTerm("todos")
                      setAnnounceMessage("Pesquisa limpa, mostrando todos os sistemas")
                    }}
                    className="mt-4 text-[#1351B4] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:ring-offset-2 rounded-sm px-2 py-1"
                  >
                    Limpar pesquisa
                  </button>
                </div>
              ) : (
                <>
                  {filteredSystems.map((system) => (
                    <div
                      key={system.id}
                      className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative h-full ${
                        isExactMatch(system) ? 'border-[#2670E8] ring-2 ring-[#2670E8]/20' : 'hover:border-[#2670E8]'
                      }`}
                      aria-labelledby={`system-title-${system.id}`}
                    >
                      {/* Indicador de sistema com gradiente e animação */}
                      <div 
                        className="absolute top-0 left-0 w-2 h-full group-hover:w-3 transition-all duration-300" 
                        style={{ 
                          background: `linear-gradient(to bottom, ${system.color}, ${system.color}99)` 
                        }}
                      ></div>
                      
                      {/* Cabeçalho do card com ícone e título */}
                      <div 
                        className="p-5 border-b border-gray-100 flex items-center justify-between cursor-pointer relative pl-6 hover:bg-gray-50/50 transition-colors"
                        style={{ minHeight: "6rem" }}
                        onClick={() => toggleCardExpansion(system.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleCardExpansion(system.id)
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-expanded={isCardExpanded(system.id)}
                        aria-controls={`card-content-${system.id}`}
                      >
                        <div className="flex items-center">
                          <div
                            className="w-12 h-12 flex items-center justify-center text-white rounded-lg mr-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                            style={{ 
                              background: `linear-gradient(135deg, ${system.color}, ${system.color}DD)`,
                              boxShadow: `0 4px 10px ${system.color}33`
                            }}
                          aria-hidden="true"
                        >
                          <i className={system.icon} style={{ fontSize: "1.5rem" }}></i>
                        </div>
                          <div>
                            <h3 
                              id={`system-title-${system.id}`} 
                              className="font-bold text-[#071D41] group-hover:text-[#1351B4] transition-colors"
                            >
                          {system.title}
                        </h3>
                            <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                        </div>
                          </div>
                        </div>
                        <div 
                          className="text-gray-500 bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#1351B4]/10 group-hover:text-[#1351B4] shadow-sm"
                        >
                          <i className="fas fa-chevron-down text-sm" aria-hidden="true"></i>
                        </div>
                      </div>
                      
                      {/* Descrição e botão de acesso */}
                      <div className="p-5 flex-grow flex flex-col justify-between relative pl-6" style={{ minHeight: "12rem" }}>
                        <div>
                          <div className="bg-gray-50 p-3 rounded-md mb-3">
                            <p className="text-sm text-gray-600 leading-relaxed">{system.description}</p>
                          </div>
                          
                          {/* Informações de contato para cards de atendimento */}
                          {system.id.startsWith('atendimento-') && system.contato && (
                            <div className="bg-blue-50 p-3 rounded-md">
                              <h4 className="text-sm font-semibold text-blue-800 mb-2">Informações de Contato:</h4>
                              <div className="space-y-2">
                                {system.contato.telefone && (
                                  <div className="flex items-center text-sm">
                                    <i className="fas fa-phone text-blue-600 w-5" aria-hidden="true"></i>
                                    <span className="text-gray-700">{system.contato.telefone}</span>
                                  </div>
                                )}
                                {system.contato.email && (
                                  <div className="flex items-center text-sm">
                                    <i className="fas fa-envelope text-blue-600 w-5" aria-hidden="true"></i>
                                    <span className="text-gray-700">{system.contato.email}</span>
                                  </div>
                                )}
                                {system.contato.horario && (
                                  <div className="flex items-center text-sm">
                                    <i className="fas fa-clock text-blue-600 w-5" aria-hidden="true"></i>
                                    <span className="text-gray-700">{system.contato.horario}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 pt-2">
                        <Link
                          href={`/sistema/${system.id}`}
                            className="block w-full py-3 px-4 bg-gradient-to-r from-[#1351B4] to-[#2670E8] hover:from-[#071D41] hover:to-[#1351B4] text-white text-center font-bold transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:ring-offset-2 flex items-center justify-center group-hover:shadow-md"
                            style={{ 
                              boxShadow: `0 2px 8px ${system.color}33`,
                              height: "3rem"
                            }}
                          aria-label={`Acessar ${system.title}`}
                        >
                            <span>Acessar Sistema</span>
                          <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
                        </Link>
                        </div>
                        
                        {/* Indicador de status ou tags */}
                        <div className="absolute top-2 right-2 flex space-x-1">
                          {system.id === "atena" && (
                            <span className="">
                              
                           
                            </span>
                          )}
                          {system.lastUpdate && new Date(system.lastUpdate.split('/').reverse().join('-')) > new Date(Date.now() - 30*24*60*60*1000) && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                              <i className="fas fa-sync-alt text-[0.6rem] mr-1" aria-hidden="true"></i>
                              Recente
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Rodapé */}
        <footer className="bg-[#071D41] text-white mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              {/* Logo e informações institucionais */}
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-4">
                  <img src="/unifesspa.jpg" alt="Logo UNIFESSPA" className="h-10 w-auto mr-3" />
              <div>
                    <h2 className="font-bold text-base">UNIFESSPA</h2>
                <p className="text-xs text-gray-300">Universidade Federal do Sul e Sudeste do Pará</p>
                  </div>
                </div>
                <address className="text-xs text-gray-300 not-italic mb-4 max-w-xs">
                  Folha 31, Quadra 07, Lote Especial, s/n<br />
                  Nova Marabá, Marabá - PA, 68507-590
                </address>
              </div>

              {/* Links rápidos */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
              <div>
                  <h3 className="text-sm font-semibold mb-3 text-gray-100">Institucional</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                        Portal UNIFESSPA
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                        Transparência
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                        Ouvidoria
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-gray-100">Suporte</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                        Central de Ajuda
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                        Tutoriais
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                        Contato
                      </a>
                    </li>
                  </ul>
              </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-gray-100">Redes Sociais</h3>
                  <div className="flex space-x-2">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                      <i className="fab fa-facebook-f text-sm"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                      <i className="fab fa-instagram text-sm"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                      <i className="fab fa-twitter text-sm"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                      <i className="fab fa-youtube text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-white/10 my-6"></div>

            {/* Área de copyright e conformidade */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-gray-400 mb-2 md:mb-0">
                © {new Date().getFullYear()} UNIFESSPA - Todos os direitos reservados
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </a>
                <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Acessibilidade
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal para detalhes expandidos do card */}
      {expandedCard && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
            onClick={closeExpandedCard}
            aria-hidden="true"
          ></div>
          
          {systems.filter(s => s.id === expandedCard).map(system => (
            <div 
              key={system.id}
              id={`card-content-${system.id}`}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-[90%] bg-white rounded-xl shadow-2xl z-50 transition-all"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${system.id}`}
            >
              <div className="relative">
                {/* Barra colorida no topo */}
                <div 
                  className="h-2 w-full rounded-t-xl"
                  style={{ 
                    background: `linear-gradient(to right, ${system.color}, ${system.color}99)` 
                  }}
                ></div>
                
                {/* Botão de fechar */}
                <button 
                  onClick={closeExpandedCard}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Fechar detalhes"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
                
                {/* Cabeçalho */}
                <div className="p-6 flex items-start gap-4 border-b border-gray-100">
                  <div
                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-white rounded-lg shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${system.color}, ${system.color}DD)`,
                      boxShadow: `0 4px 10px ${system.color}33`
                    }}
                  >
                    <i className={system.icon} style={{ fontSize: "2rem" }}></i>
                  </div>
                  
                  <div>
                    <h2 
                      id={`modal-title-${system.id}`}
                      className="text-xl font-bold text-[#071D41]"
                    >
                      {system.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{system.description}</p>
                    
                    {system.lastUpdate && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <i className="fas fa-clock mr-1 text-[0.7rem]" aria-hidden="true"></i>
                        Última atualização: {system.lastUpdate}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Conteúdo */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Detalhes do sistema */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#071D41] mb-3 flex items-center">
                      <div className="bg-[#1351B4]/10 p-1.5 rounded-full mr-2">
                        <i className="fas fa-info-circle text-[#1351B4] text-sm" aria-hidden="true"></i>
                      </div>
                      Detalhes do Sistema
                    </h3>
                    <div className="pl-8">
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                        <p className="text-gray-700 leading-relaxed">{system.detailedInfo}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Funcionalidades */}
                  {system.features && system.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#071D41] mb-3 flex items-center">
                        <div className="bg-[#1351B4]/10 p-1.5 rounded-full mr-2">
                          <i className="fas fa-list text-[#1351B4] text-sm" aria-hidden="true"></i>
                        </div>
                        Principais Funcionalidades
                      </h3>
                      <div className="pl-8">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {system.features.map((feature, index) => (
                            <li 
                              key={index} 
                              className="flex items-start bg-white p-3 rounded-md shadow-sm border border-gray-100 hover:border-[#1351B4]/30 hover:shadow-md transition-all duration-200"
                            >
                              <div 
                                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5"
                                style={{ 
                                  background: `linear-gradient(135deg, ${system.color}, ${system.color}DD)`,
                                  boxShadow: `0 2px 4px ${system.color}33`
                                }}
                              >
                                <i className="fas fa-check text-white text-xs" aria-hidden="true"></i>
                              </div>
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Rodapé */}
                <div className="border-t border-gray-100 p-4 flex justify-end">
                  <Link
                    href={`/sistema/${system.id}`}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#1351B4] to-[#2670E8] hover:from-[#071D41] hover:to-[#1351B4] text-white font-bold transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-[#2670E8] focus:ring-offset-2 flex items-center justify-center"
                    aria-label={`Acessar ${system.title}`}
                  >
                    <span>Acessar Sistema</span>
                    <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}
