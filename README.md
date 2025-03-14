# Sistema de Cards

Este é um projeto Next.js que utiliza TypeScript, Tailwind CSS e várias bibliotecas do Radix UI para uma interface moderna e acessível.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)

## Como instalar

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
pnpm install
```

## Como rodar o projeto

### Ambiente de desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:3000`

### Ambiente de produção

1. Gere o build do projeto:
```bash
pnpm build
```

2. Inicie o servidor de produção:
```bash
pnpm start
```

## Scripts disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Gera a versão de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa a verificação de linting

## Tecnologias principais

- Next.js 15.1.0
- React 19
- TypeScript
- Tailwind CSS
- Radix UI (diversos componentes)
- React Hook Form
- Zod para validação
- Next Themes para temas

## Estrutura do projeto

- `/app` - Páginas e rotas da aplicação
- `/components` - Componentes reutilizáveis
- `/hooks` - Custom hooks
- `/lib` - Utilitários e configurações
- `/public` - Arquivos estáticos
- `/styles` - Estilos globais e configurações do Tailwind 