# Sistema de Cards UNIFESSPA

## 📋 Sobre o Sistema

Este é um sistema de cards desenvolvido para a Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA), que fornece uma interface moderna e acessível para visualização e acesso aos sistemas institucionais.

## 🚀 Funcionalidades Principais

### 🔍 Sistema de Busca
- Busca em tempo real por sistemas
- Filtros rápidos pré-definidos
- Indicador de quantidade de resultados encontrados
- Sugestões de busca quando nenhum resultado é encontrado

### 🎯 Cards Interativos
- Visualização expandível com detalhes do sistema
- Indicadores visuais por categoria (cores)
- Ícones representativos para cada sistema
- Animações suaves de transição
- Data da última atualização
- Lista de funcionalidades em formato de grid

### ♿ Acessibilidade
- Alto contraste (ativável via menu ou atalho)
- Ajuste de tamanho de fonte
- Compatibilidade com leitores de tela
- Links de pular conteúdo
- Navegação completa por teclado
- Suporte ao VLibras
- Anúncios para leitores de tela

### ⌨️ Atalhos de Teclado
- Alt + 1: Pular para conteúdo principal
- Alt + 2: Acessar menu de acessibilidade
- Alt + 3: Ir para busca
- Alt + 4: Alternar alto contraste

## 🎨 Design
- Interface seguindo o Design System do gov.br
- Layout responsivo
- Cores institucionais
- Animações e transições suaves
- Feedback visual para interações

## 📱 Responsividade
- Adaptação para diferentes tamanhos de tela
- Menu compacto para dispositivos móveis
- Grid adaptativo de cards
- Imagens otimizadas

## 🔒 Recursos de Segurança
- Acesso seguro aos sistemas
- Links externos com indicadores visuais
- Proteção contra navegação maliciosa

## 💾 Persistência de Dados
- Salvamento de preferências do usuário
- Armazenamento local de configurações de acessibilidade
- Manutenção do estado de cards expandidos

## 🔄 Estados do Sistema
- Gerenciamento de termo de busca
- Controle de alto contraste
- Ajuste de tamanho de fonte
- Estado de expansão dos cards
- Mensagens de anúncio para leitores de tela

## 📦 Sistemas Incluídos
1. ATENA - Sistema de gestão acadêmica
2. Avaliação de Desempenho
3. COC - Sistema de controle de conteúdos
4. SAE - Sistema de Acompanhamento Educacional
5. Sisplad - Sistema de Planejamento
6. Sisprol - Sistema de Projetos
7. Udocs - Gerenciamento de documentos

## 🛠️ Tecnologias Utilizadas
- React.js
- Next.js
- Tailwind CSS
- Font Awesome (ícones)
- TypeScript

## 👥 Acessibilidade e Inclusão
O sistema foi desenvolvido seguindo as diretrizes de acessibilidade:
- WCAG 2.1
- eMAG
- Design System do gov.br

## 📱 Compatibilidade
- Navegadores modernos
- Dispositivos móveis
- Tablets
- Leitores de tela
- VLibras

## 🔄 Ciclo de Vida do Componente
- Carregamento de preferências salvas
- Configuração de atalhos de teclado
- Atualização do documento baseado em preferências
- Gerenciamento de estados e animações

## 🎯 Objetivos do Sistema
- Facilitar o acesso aos sistemas institucionais
- Garantir acessibilidade universal
- Fornecer experiência de usuário consistente
- Manter conformidade com padrões governamentais
- Oferecer busca eficiente de sistemas

## 📞 Suporte e Contato
- Central de Suporte integrada
- Links para ouvidoria
- Acesso às redes sociais
- Informações institucionais

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
pnpm install
```

### Scripts Disponíveis
- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Gera a versão de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa a verificação de linting

### Ambientes

#### Desenvolvimento
```bash
pnpm dev
```
O projeto estará disponível em `http://localhost:3000`

#### Produção
1. Gere o build:
```bash
pnpm build
```

2. Inicie o servidor:
```bash
pnpm start
```

### Estrutura do Projeto
- `/app` - Páginas e rotas da aplicação
- `/components` - Componentes reutilizáveis
- `/hooks` - Custom hooks
- `/lib` - Utilitários e configurações
- `/public` - Arquivos estáticos
- `/styles` - Estilos globais e configurações do Tailwind

### Stack Técnico Detalhado
- Next.js 15.1.0
- React 19
- TypeScript
- Tailwind CSS
- Radix UI (diversos componentes)
- React Hook Form
- Zod para validação
- Next Themes para temas 