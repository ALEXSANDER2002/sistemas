'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

// Palavras-chave relacionadas para cada setor
const palavrasRelacionadas = {
  ctic: ['computador', 'internet', 'wifi', 'sistema', 'email', 'rede', 'impressora', 'tecnologia', 'suporte', 'senha'],
  crca: ['matrícula', 'histórico', 'diploma', 'documentos', 'declaração', 'notas', 'aproveitamento', 'curso', 'disciplinas'],
  progep: ['servidor', 'contracheque', 'férias', 'ponto', 'frequência', 'capacitação', 'concurso', 'folha', 'pagamento'],
  sinfra: ['manutenção', 'obra', 'reforma', 'estrutura', 'prédio', 'sala', 'limpeza', 'segurança', 'equipamentos'],
  proeg: ['graduação', 'curso', 'aula', 'professor', 'disciplina', 'grade', 'horário', 'monitoria', 'estágio', 'ensino'],
  propit: ['pesquisa', 'projeto', 'bolsa', 'iniciação', 'científica', 'laboratório', 'mestrado', 'doutorado'],
  proex: ['extensão', 'cultura', 'evento', 'projeto', 'comunidade', 'curso', 'oficina', 'workshop'],
  proad: ['administração', 'compras', 'licitação', 'contrato', 'patrimônio', 'almoxarifado', 'orçamento', 'administrativo'],
  naia: ['acessibilidade', 'inclusão', 'adaptação', 'deficiência', 'apoio', 'assistência', 'intérprete']
};

// Palavras-chave adicionais para tipos específicos de atendimento
const palavrasAdicionais = {
  academico: ['graduação', 'curso', 'matrícula', 'histórico', 'diploma', 'documentos', 'declaração', 'notas'],
  administrativo: ['administração', 'servidor', 'contrato', 'patrimônio', 'almoxarifado', 'orçamento', 'compras'],
  ensino: ['graduação', 'aula', 'professor', 'disciplina', 'grade', 'horário', 'monitoria', 'estágio', 'educação', 'aprendizagem'],
  suporte: ['computador', 'internet', 'wifi', 'sistema', 'email', 'rede', 'impressora', 'tecnologia', 'manutenção']
};

const atendimentos = [
  {
    id: 'ctic',
    titulo: 'Atendimento CTIC',
    descricao: 'Suporte técnico e serviços de TI',
    icon: 'fas fa-laptop-code',
    cor: '#1351B4',
    horario: '08h às 20h',
    local: 'Prédio Administrativo',
    contato: '(94) 2101-7120',
    email: 'ctic@unifesspa.edu.br'
  },
  {
    id: 'crca',
    titulo: 'Atendimento CRCA',
    descricao: 'Registro e controle acadêmico',
    icon: 'fas fa-graduation-cap',
    cor: '#2670E8',
    horario: '08h às 18h',
    local: 'Unidade I',
    contato: '(94) 2101-7130',
    email: 'crca@unifesspa.edu.br'
  },
  {
    id: 'progep',
    titulo: 'Atendimento PROGEP',
    descricao: 'Gestão de pessoas',
    icon: 'fas fa-users',
    cor: '#1351B4',
    horario: '08h às 18h',
    local: 'Prédio Administrativo',
    contato: '(94) 2101-7140',
    email: 'progep@unifesspa.edu.br'
  },
  {
    id: 'sinfra',
    titulo: 'Atendimento Sinfra',
    descricao: 'Infraestrutura e serviços',
    icon: 'fas fa-building',
    cor: '#2670E8',
    horario: '08h às 18h',
    local: 'Unidade II',
    contato: '(94) 2101-7150',
    email: 'sinfra@unifesspa.edu.br'
  },
  {
    id: 'proeg',
    titulo: 'Atendimento PROEG',
    descricao: 'Ensino e graduação',
    icon: 'fas fa-book',
    cor: '#1351B4',
    horario: '08h às 18h',
    local: 'Unidade III',
    contato: '(94) 2101-7160',
    email: 'proeg@unifesspa.edu.br'
  },
  {
    id: 'propit',
    titulo: 'Atendimento PROPIT',
    descricao: 'Pesquisa e inovação',
    icon: 'fas fa-microscope',
    cor: '#2670E8',
    horario: '08h às 18h',
    local: 'Unidade I',
    contato: '(94) 2101-7170',
    email: 'propit@unifesspa.edu.br'
  },
  {
    id: 'proex',
    titulo: 'Atendimento PROEX',
    descricao: 'Extensão e cultura',
    icon: 'fas fa-hands-helping',
    cor: '#1351B4',
    horario: '08h às 18h',
    local: 'Unidade II',
    contato: '(94) 2101-7180',
    email: 'proex@unifesspa.edu.br'
  },
  {
    id: 'proad',
    titulo: 'Atendimento PROAD',
    descricao: 'Administração',
    icon: 'fas fa-cogs',
    cor: '#2670E8',
    horario: '08h às 18h',
    local: 'Prédio Administrativo',
    contato: '(94) 2101-7190',
    email: 'proad@unifesspa.edu.br'
  },
  {
    id: 'naia',
    titulo: 'Atendimento NAIA',
    descricao: 'Acessibilidade e inclusão',
    icon: 'fas fa-universal-access',
    cor: '#1351B4',
    horario: '08h às 18h',
    local: 'Unidade I',
    contato: '(94) 2101-7200',
    email: 'naia@unifesspa.edu.br'
  }
];

export default function Atendimentos() {
  const [termoBusca, setTermoBusca] = useState('');
  const [announceMessage, setAnnounceMessage] = useState('');

  // Configuração do Fuse.js para busca com tolerância a erros
  const fuseOptions = {
    includeScore: true,
    threshold: 0.4, // Tolerância a erros (0 = correspondência exata, 1 = correspondência muito flexível)
    keys: [
      { name: 'titulo', weight: 2 }, // Peso maior para o título
      { name: 'descricao', weight: 1.5 }, // Peso médio para descrição
      'id',
      'email',
      'contato',
      'local'
    ],
    ignoreLocation: true,
    useExtendedSearch: true
  };

  // Criar instância do Fuse.js
  const fuse = useMemo(() => new Fuse(atendimentos, fuseOptions), []);

  // Função para verificar se um termo está relacionado a um atendimento
  const verificarTermoRelacionado = (termo: string, atendimentoId: string) => {
    const termoLower = termo.toLowerCase();
    
    // Verificar nas palavras-chave específicas do setor
    const palavras = palavrasRelacionadas[atendimentoId as keyof typeof palavrasRelacionadas] || [];
    
    // Verificar palavras-chave de categorias (para termos como "acadêmico", "administrativo", etc.)
    const termosCategoria = Object.keys(palavrasAdicionais);
    const categoriasRelacionadas = termosCategoria.filter(categoria => {
      return categoria === termoLower || 
             palavrasAdicionais[categoria as keyof typeof palavrasAdicionais].some(palavra => 
               palavra.toLowerCase().includes(termoLower) || 
               termoLower.includes(palavra.toLowerCase())
             );
    });
    
    // Verificar se o atendimento está relacionado a alguma categoria encontrada
    const relacionadoCategoria = categoriasRelacionadas.some(categoria => {
      const atendimentosCategoria = atendimentos.filter(a => {
        return palavrasAdicionais[categoria as keyof typeof palavrasAdicionais].some(palavra => 
          a.titulo.toLowerCase().includes(palavra.toLowerCase()) || 
          a.descricao.toLowerCase().includes(palavra.toLowerCase()) ||
          palavrasRelacionadas[a.id as keyof typeof palavrasRelacionadas]?.some(p => 
            p.toLowerCase() === palavra.toLowerCase()
          )
        );
      }).map(a => a.id);
      
      return atendimentosCategoria.includes(atendimentoId);
    });
    
    return (
      // Verificação direta nas palavras-chave do setor
      palavras.some(palavra => 
        palavra.toLowerCase().includes(termoLower) || 
        termoLower.includes(palavra.toLowerCase())
      ) ||
      // Verificação por categoria
      relacionadoCategoria
    );
  };

  // Filtra os atendimentos com base no termo de busca usando Fuse.js
  const atendimentosFiltrados = useMemo(() => {
    if (!termoBusca) return atendimentos;

    const termoLower = termoBusca.toLowerCase().trim();
    
    // Se o termo for vazio após o trim, retorne todos os atendimentos
    if (termoLower.length === 0) return atendimentos;
    
    // Verificar se o termo é exatamente uma categoria
    if (termoLower in palavrasAdicionais) {
      const palavrasDaCategoria = palavrasAdicionais[termoLower as keyof typeof palavrasAdicionais];
      
      return atendimentos.filter(atendimento => {
        // Verifica se o atendimento tem relação com as palavras da categoria
        return (
          atendimento.titulo.toLowerCase().includes(termoLower) ||
          atendimento.descricao.toLowerCase().includes(termoLower) ||
          palavrasDaCategoria.some(palavra => 
            atendimento.titulo.toLowerCase().includes(palavra) ||
            atendimento.descricao.toLowerCase().includes(palavra) ||
            palavrasRelacionadas[atendimento.id as keyof typeof palavrasRelacionadas]?.some(p => 
              p.toLowerCase() === palavra.toLowerCase()
            )
          )
        );
      });
    }
    
    // Realizar busca com Fuse.js
    const fuseResults = fuse.search(termoLower);
    
    // Se não encontrarmos resultados com Fuse, tente verificar termos relacionados
    if (fuseResults.length === 0) {
      return atendimentos.filter(atendimento => {
        // Busca no título e descrição
        const matchTitulo = atendimento.titulo.toLowerCase().includes(termoLower);
        const matchDescricao = atendimento.descricao.toLowerCase().includes(termoLower);
        
        // Busca em palavras relacionadas
        const matchRelacionado = verificarTermoRelacionado(termoLower, atendimento.id);

        return matchTitulo || matchDescricao || matchRelacionado;
      });
    }
    
    // Processar resultados do Fuse (converta para array de atendimentos)
    return fuseResults.map(result => result.item);
  }, [termoBusca, fuse]);

  // Efeito para lidar com tecla ESC para limpar a busca
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && termoBusca) {
        setTermoBusca('');
        setAnnounceMessage('Campo de busca limpo');
        document.getElementById('search-atendimentos')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [termoBusca]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Anúncio de acessibilidade para leitores de tela */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {announceMessage}
      </div>
      
      {/* Cabeçalho */}
      <div className="bg-[#071D41] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Central de Atendimentos
            </h1>
            <p className="text-lg opacity-80">
              Encontre aqui todos os canais de atendimento disponíveis para a comunidade acadêmica
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center py-4 text-sm">
            <Link href="/" className="text-[#1351B4] hover:text-[#2670E8] transition-colors">
              <i className="fas fa-home mr-2"></i>
              Início
            </Link>
            <i className="fas fa-chevron-right text-gray-400 mx-3 text-xs"></i>
            <span className="text-gray-600">Central de Atendimentos</span>
          </nav>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Busque por serviço, setor ou palavra-chave..."
              value={termoBusca}
              onChange={(e) => {
                setTermoBusca(e.target.value)
                if (e.target.value === '') {
                  setAnnounceMessage("Campo de busca limpo")
                }
              }}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-[#1351B4] focus:ring-2 focus:ring-[#1351B4]/20 transition-all outline-none"
              aria-label="Buscar atendimentos"
              id="search-atendimentos"
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            {termoBusca && (
              <button
                onClick={() => {
                  setTermoBusca('')
                  setAnnounceMessage("Campo de busca limpo")
                  document.getElementById("search-atendimentos")?.focus()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Limpar busca"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          {termoBusca && atendimentosFiltrados.length === 0 && (
            <div className="mt-4 text-center text-gray-600">
              <p>Nenhum resultado encontrado para "{termoBusca}"</p>
              <p className="text-sm mt-2">
                Tente buscar por outros termos relacionados ao serviço que você procura.
              </p>
            </div>
          )}
          
          {/* Filtros rápidos */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-center gap-3">
            <div className="text-sm text-gray-500 hidden md:block">
              <i className="fas fa-filter mr-1" aria-hidden="true"></i>
              <span>Filtros rápidos:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => {
                  setTermoBusca("")
                  setAnnounceMessage("Mostrando todos os atendimentos")
                }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${!termoBusca ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
              >
                Todos ({atendimentos.length})
              </button>
              <button 
                onClick={() => {
                  setTermoBusca("acadêmico")
                  setAnnounceMessage("Filtrando por atendimentos acadêmicos")
                }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${termoBusca === "acadêmico" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
              >
                <i className="fas fa-graduation-cap mr-1" aria-hidden="true"></i> Acadêmico
              </button>
              <button 
                onClick={() => {
                  setTermoBusca("administrativo")
                  setAnnounceMessage("Filtrando por atendimentos administrativos")
                }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${termoBusca === "administrativo" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
              >
                <i className="fas fa-building mr-1" aria-hidden="true"></i> Administrativo
              </button>
              <button 
                onClick={() => {
                  setTermoBusca("ensino")
                  setAnnounceMessage("Filtrando por atendimentos de ensino")
                }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${termoBusca === "ensino" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
              >
                <i className="fas fa-chalkboard-teacher mr-1" aria-hidden="true"></i> Ensino
              </button>
              <button 
                onClick={() => {
                  setTermoBusca("suporte")
                  setAnnounceMessage("Filtrando por atendimentos de suporte")
                }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${termoBusca === "suporte" ? 'bg-[#1351B4] text-white border-[#1351B4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#1351B4] hover:text-[#1351B4]'}`}
              >
                <i className="fas fa-headset mr-1" aria-hidden="true"></i> Suporte
              </button>
            </div>
          </div>
          
          {/* Contador de resultados */}
          {termoBusca && (
            <div className="mt-3 text-center">
              <span className={`${atendimentosFiltrados.length === 0 ? 'text-red-500' : 'text-[#1351B4]'} font-medium`}>
                {atendimentosFiltrados.length === 0 
                  ? "Nenhum atendimento encontrado" 
                  : atendimentosFiltrados.length === 1 
                    ? "1 atendimento encontrado" 
                    : `${atendimentosFiltrados.length} atendimentos encontrados`}
              </span>
              <span className="text-gray-500 ml-1">para "{termoBusca}"</span>
            </div>
          )}

          {/* Dicas de busca */}
          <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-700 flex items-start">
            <i className="fas fa-lightbulb text-yellow-500 mt-0.5 mr-2" aria-hidden="true"></i>
            <div>
              <strong>Dicas de busca:</strong>
              <ul className="mt-1 ml-4 list-disc text-xs">
                <li>Use os filtros rápidos para encontrar categorias de atendimentos</li>
                <li>A busca considera nome, descrição e palavras-chave relacionadas</li>
                <li>A busca é inteligente e encontra resultados mesmo com erros de digitação</li>
                <li>Pressione ESC para limpar a pesquisa rapidamente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {atendimentosFiltrados.map((atendimento) => (
            <div
              key={atendimento.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{
                      backgroundColor: atendimento.cor
                    }}
                  >
                    <i className={`${atendimento.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#071D41]">
                      {atendimento.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {atendimento.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <i className="fas fa-clock text-[#1351B4] mr-2"></i>
                    {atendimento.horario}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt text-[#1351B4] mr-2"></i>
                    {atendimento.local}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <i className="fas fa-phone text-[#1351B4] mr-2"></i>
                    {atendimento.contato}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <i className="fas fa-envelope text-[#1351B4] mr-2"></i>
                    {atendimento.email}
                  </div>
                  <a
                    href={`#${atendimento.id}`}
                    className="block w-full py-2 px-4 bg-[#1351B4] text-white text-center rounded-md hover:bg-[#2670E8] transition-colors"
                  >
                    Solicitar Atendimento
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informações de contato geral */}
        <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#1351B4] rounded-lg flex items-center justify-center text-white mr-4">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="font-semibold text-[#071D41]">Central de Atendimento UNIFESSPA</h3>
              <p className="text-[#1351B4]">(94) 2101-7100</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Horário de atendimento: Segunda a Sexta, das 08h às 20h
          </p>
        </div>
      </div>
    </div>
  );
} 