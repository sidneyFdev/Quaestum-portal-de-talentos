# 🚀 Quaestum - TESTE PRÁTICO - DESENVOLVEDOR WEB

> ⚠️ Projeto em desenvolvimento. Este repositório será atualizado frequentemente até a conclusão do teste técnico.

Este repositório é um projeto prático desenvolvido para testar meus conhecimentos para a vaga de desenvolvedor fullstack da empresa [Quaestum](https://www.quaestum.com.br/).

- [🚀 Quaestum - TESTE PRÁTICO - DESENVOLVEDOR WEB](#-quaestum---teste-prático---desenvolvedor-web)
  - [Requisitos](#requisitos)
  - [Requisitos Obrigatórios](#requisitos-obrigatórios)
  - [Componentes e Páginas do FrontEnd](#componentes-e-páginas-do-frontend)
    - [Informações adicionais do projeto](#informações-adicionais-do-projeto)
- [Configuração local da aplicação](#configuração-local-da-aplicação)
  - [Criando o banco de dados localmente](#criando-o-banco-de-dados-localmente)
    - [Docker](#docker)
  - [AdonisJS](#adonisjs)
    - [Instalação](#instalação)
    - [Dependências](#dependências)
    - [Migrations](#migrations)
    - [Seeds](#seeds)
    - [🔐 Variáveis de Ambiente (.env)](#-variáveis-de-ambiente-env)
  - [ReactJS / Vite](#reactjs--vite)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
- [🔧 Problemas Conhecidos / Implementações Futuras](#-problemas-conhecidos--implementações-futuras)
  - [🔧 Problemas](#-problemas)
  - [🛡️ Problemas Solucionados](#️-problemas-solucionados)
  - [🛠️ Melhorias](#️-melhorias)
  - [📄 Licença](#-licença)
- [Sobre mim](#sobre-mim)
  - [📬 Contato](#-contato)

## Requisitos

![ReactJS](https://img.shields.io/badge/ReactJS-grey?style=for-the-badge&logo=react&logoColor=white)
![AdonisJS](https://img.shields.io/badge/adonisjs-grey?style=for-the-badge&logo=adonisjs)
![MySQL](https://img.shields.io/badge/MySQL-grey?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-grey?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-grey?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=github&logoColor=white)


> Durante o desenvolvimento deste projeto, foi utilizado [Docker](https://www.docker.com/). Em caso de dúvidas, consulte a documentação oficial do Docker.
> ⚠️ Este projeto é um teste técnico e não está completamente otimizado, logo, não deve ser utilizado em produção.

## Requisitos Obrigatórios

| Requisito | Status | Link |Comentários |
|-----------|--------|------|------------|
| As tabelas devem ser criadas com migrations do AdonisJS | ✅ Concluído | [📁](/backend/database/migrations/) | Foram criadas 5 migrations para as entidades principais. |
| O e-mail do candidato deve ser único | ✅ Concluído | [📄](/backend/database/migrations/1747270779397_create_users_table.ts) | Restrição definida na migration com `unique()`.                                              |
| Código do candidato sequencial e automático  | ✅ Concluído | [📄](/backend/database/migrations/1747270779397_create_users_table.ts) | Campo `id` com auto incremento padrão. |
| Endereço preenchido automaticamente via ViaCEP  | ✅ Concluído | [📄](/frontend/src/services/viaCEP.ts) | Requisição feita ao ViaCEP via web service.                                         |
| Apenas usuários logados podem visualizar dados | ✅ Concluído  | [📄](/frontend/src/router/routes.jsx) | Rotas protegidas através de autenticação `middleware` no backend e `authProvider` nas rotas do FrontEnd |
| Dois tipos de usuário: gestor e candidato  | ✅ Concluído  | [📄](/backend/app/models/user.ts) | Implementado as colunas de `administradores` e `recrutador` no banco de dados usuários.                                 |
| Preenchimento de habilidades com lista pré-definida  | ✅ Concluído | [📄](/backend/database/seeders/users_seeder.ts) | Lista incluída com seed e implementada no frontend com seleção múltipla, preenchida através de requisição GET |
| Candidato recebe e-mail de confirmação com link para definir senha  | ✅ Concluído | [📄](/backend/app/controllers/Http/user_controller.ts) | Implementado com `uuid` e `@adonisjs/mail`.  |      
 Candidato recebe e-mail de confirmação com link para redefinição senha  | 🚧 Em andamento | [📄](/backend/app/controllers/Http/user_controlle.ts) | Será implementado dentro do controlador de Usuario com `uuid` e `@adonisjs/mail`. |
| Sistema deve permitir login com e-mail e senha | ✅ Concluído | [📄](/frontend/src/pages/auth/login.jsx) | Tela de login funcional |
| Área restrita para listagem de candidatos acessível só por gestores | ✅ Concluído  | [📄](/frontend/src/router/protectedAdminRoutes.jsx) | Realizado a checagem da coluna `is_admin` presente no banco `users`para que a rota fique protegida por autenticação. Checagem feita no `backend` e no `frontend`|
| Listagem mostra Código, Nome, E-mail, Telefone e Habilidades | ✅ Concluído | [📄](/frontend/src/pages/recruiter/home.jsx)| Implementado na página `'/recruiter'`, disponível somente na rota de `administradores`  |
| Buscar candidatos por nome e habilidades | 🚧 Concluído parcialmente  | [📄](/frontend/src/pages/recruiter/home.jsx) | Embora seja possível filtrar `habilidades`, `nome` e `email`, estes filtros não foram separadas |
| Selecionar candidatos e enviar convite por e-mail para entrevista | ✅ Concluído  | [📄](/backend/app/controllers/Http/recruiters_controller.ts) | Implementado através da seleção de candidatos dentro da página `'/recruiter'` |
| Candidato selecionado deve ser notificação ao acessar o sistema | ❌ Não iniciado | | Ainda não implementado |
| Aplicação deve usar ReactJS (Frontend) e AdonisJS V6 (Backend) | ✅ Concluído | [📁Front](/frontend) [📁Back](/backend) | Aplicação atendendo os requisitos. |
| Banco de dados deve ser MySQL | ✅ Concluído | [📄](/backend/config/database.ts) | Conexão configurada em .env para uso local |
| Repositório deve conter um README explicando como rodar e testar a aplicação  | 🚧 Em andamento  | [📄](/README.md) | Está sendo escrito junto ao desenvolvimento do projeto |
| Todos os arquivos necessários para rodar o projeto devem estar incluídos no repositório  | 🚧 Em andamento | [📁](/) | Aplicação em desenvolvimento |
****


## Componentes e Páginas do FrontEnd

| Componente / Páginas | Status | Link |
| -------------------- | ------ | ---- |
| Página - Login do Candidato | ✅ Concluído | [📄](/frontend/src/pages/auth/login.jsx) |
| Página - Registro | ✅ Concluído | [📄](/frontend/src/pages/auth/register.jsx) |
| Página - Esqueci a senha | ✅ Concluído |[📄](/frontend/src/pages/auth/resetpassword.jsx) |
| Página - Confirmação de e-mail  | ✅ Concluído | [📄](/frontend/src/pages/auth/confirm.jsx) |
| Página - Painel Recrutador | ✅ Concluído | [📄](/frontend/src/pages/recruiter/home.jsx) |
| Página - Painel Candidato | 🚧 Em andamento  | [📄](/frontend/src/pages/candidate/home.jsx) |
| Componente - Header | 🚧 Em andamento |[📄](/frontend/src/components/layout/header.jsx) |
| Componente - Sidebar | 🚧 Em andamento |[📄](/frontend/src/components/layout/sidebar.jsx) |
| Componente - Footer | 🚧 Em andamento | [📄](/frontend/src/components/layout/footer.jsx) |


### Informações adicionais do projeto

- Estilização desenvolvida com [Tailwindcss](https://tailwindcss.com/).
- Projeto React criado com [Vite](https://vite.dev/).
- Rotas de navegação criados com [React Router Dom](https://www.npmjs.com/package/react-router-dom).

# Configuração local da aplicação

> ⚠️ Projeto em desenvolvimento. Sem detalhes completos para configuração do ambiente.

## Criando o banco de dados localmente

### Docker

Exemplo de Docker Compose para criar o banco de dados MySQL localmente. Lembre-se de criar um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias definidas neste docker-compose.

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql_quaestum
    restart: always
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: adonis_app
      MYSQL_USER: adonis
      MYSQL_PASSWORD: adonis
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:

```
Iniciando o container:
```bash
docker-compose up -d
```
> Observação: Em alguns ambientes de sistema Linux, dependendo da sua configuração, pode ser necessário usar `sudo` para executar o comando acima. Além disso, o Docker Compose também pode ser utilizado com o comando `docker compose` (sem o hífen) caso o anterior não funcione.

```bash
docker exec -it mysql_quaestum mysql -u adonis -p
```
Executando o MySQL via terminal.

```bash
docker exec -it mysql_quaestum mysql -uroot -proot
```

## AdonisJS

### Instalação

```bash
cd backend
npm init adonisjs@latest
```
### Dependências
```bash
npm i @adonisjs/lucid
npm i @adonisjs/mail
npm init adonisjs@latest -- -K=api --adapter=react --db=mysql
```

### Migrations

Criação das tabelas predefinidas pelas configurações no AdonisJS

```bash
node ace migrations:run
```

### Seeds

Popular as tabelas `skills` e adicionar alguns `candidatos` para o funcionamento básico da aplicação
```bash
node ace db:seed
```

### 🔐 Variáveis de Ambiente (.env)

As variáveis a seguir são necessárias para o funcionamento da aplicação. Um arquivo `.env.example` já está incluído no repositório como modelo.

```env
DB_URL=http://localhost:3333
DB_USER=adonis
DB_PASSWORD=adonis
DB_NAME=adonis_app
DB_HOST=localhost
DB_PORT=3306
MAIL_HOST=smtp.exemplo.io
MAIL_PORT=2525
MAIL_USER=exemplo@exemplo.com
MAIL_PASSWORD=your_password

```

## ReactJS / Vite

```bash
cd frontend
npm install
```

### Variáveis de ambiente

> 🔔 Atenção: todas as variáveis de ambiente no Vite devem começar com `VITE_`. Caso crie localmente com React, deverão começar com `REACT_APP_` Crie um arquivo `.env` na raiz do projeto React com:

```env
VITE_API_URL=http://localhost:3333
```

# 🔧 Problemas Conhecidos / Implementações Futuras

## 🔧 Problemas

- ⚠️ Não há redirecionamento para página de NotFound no caso de URLs inexistentes no frontend.
- ⚠️ Falta telas de loading e desabilitar botões do frontend para evitar requests repetidas ao backend.
- ⚠️ As respostas e funções do backend, embora estejam funcionando, não estão padronizadas.

## 🛡️ Problemas Solucionados
- 🪪 Middleware de autenticação nas rotas do backend.
- 🪪 Rotas protegidas no frontend.

## 🛠️ Melhorias
- 📬 Envio de confirmação de cadastro após validação pelo usuário.
- 🧪 Criação de testes unitários principais.
- 💡 Componentização dos elementos no frontend.
- 🦋 Implementação de nomes, logos e ícones.
- 📊 Implementar funcionalidades na tabela do recrutados, para facilitar visualização, como organização por ordem alfabética.
- ⚠️ Ao invés de respostas pelo backend, as repostas das requests estão sendo enviadas via `alert`, o que não é o ideal.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Sobre mim

## 📬 Contato

Quer trocar uma ideia ou dar feedback? Fique à vontade para me chamar!
📧 [sidney.figueiredo97.dev@outlook.com](sidney.figueiredo97.dev@outlook.com)  
🔗 Linkedin: [Sidney Figueiredo](https://www.linkedin.com/in/sidney-figueiredo)  
🐙 GitHub: [sidneyFdev](https://github.com/sidneyFdev)

---

<i>Feito com </i>💛<i> por Sidney!</i>
