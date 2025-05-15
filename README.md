# 🚀 Quaestum - TESTE PRÁTICO - DESENVOLVEDOR WEB

> ⚠️ Projeto em desenvolvimento. Este repositório será atualizado frequentemente até a conclusão do teste técnico.

Este repositório é um projeto prático desenvolvido para testar meus conhecimentos para a vaga de desenvolvedor fullstack da empresa [Quaestum](https://www.quaestum.com.br/). O objetivo é provar meus conhecimentos de desenvolvedor Web.

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
> ⚠️ Este projeto é um teste técnico e não deve ser utilizado em produção. O código pode conter erros e não está otimizado para produção.

## Requisitos Obrigatórios

| Requisito | Status | Link |Comentários |
|-----------|--------|------|------------|
| As tabelas devem ser criadas com migrations do AdonisJS | ✅ Concluído | [📁](/backend/database/migrations/) | Foram criadas 5 migrations para as entidades principais. |
| O e-mail do candidato deve ser único | ✅ Concluído | [📄](/backend/app/models/candidate.ts) | Restrição definida na migration com `unique()`.                                              |
| Código do candidato sequencial e automático  | ✅ Concluído | [📁](/backend/database/migrations/candidate.ts) | Campo `id` com auto incremento padrão. |
| Endereço preenchido automaticamente via ViaCEP  | ✅ Concluído | [📄](/frontend/src/services/viaCEP.ts) | Requisição feita ao ViaCEP via web service.                                         |
| Apenas usuários logados podem visualizar dados | 🚧 Em andamento | [📄](/backend/start/routes.ts) | Falta proteger com middleware `auth`. Foram implementadas poucas rotas sem segurança até o momento |
| Dois tipos de usuário: gestor e candidato  | ❌ Não iniciado  |  | Será implementado um novo banco para `administradores`.                                 |
| Preenchimento de habilidades com lista pré-definida  | ✅ Concluído | [📄](/backend/database/seeders/CandidateSkillsSeeder.ts) | Lista incluída com seed e implementada no frontend com seleção múltipla, preenchida através de requisição GET |
| Candidato recebe e-mail de confirmação com link para definir senha  | ✅ Concluído | [📄](/backend/app/controllers/Http/CandidatesController.ts) | Implementado com `uuid` e `@adonisjs/mail`.                                            |
| Sistema deve permitir login com e-mail e senha | ❌ Não iniciado | | Somente a validação do e-mail após cadastro está ativa. |
| Área restrita para listagem de candidatos acessível só por gestores | ❌ Não iniciado  | | Requer filtro, segurança e banco de dados dos recrutadores. |
| Listagem mostra Código, Nome, E-mail, Telefone e Habilidades | ❌ Não iniciado | | NNão implementado devido à ausência do banco de dados dos recrutadores. |
| Buscar candidatos por nome e habilidades | ❌ Não iniciado  | | NNão implementado devido à ausência do banco de dados dos recrutadores. |
| Selecionar candidatos e enviar convite por e-mail para entrevista | ❌ Não iniciado | | NNão implementado devido à ausência do banco de dados dos recrutadores. |
| Candidato selecionado deve ver notificação ao acessar o sistema | ❌ Não iniciado | | NNão implementado devido à ausência do banco de dados dos recrutadores. |
| Aplicação deve usar ReactJS (Frontend) e AdonisJS V6 (Backend) | ✅ Concluído | [📁Front](/frontend) [📁Back](/backend) | Campo id com auto-increProjeto iniciado com Vite e ReactJS no frontend e AdonisJS v6 no backend.mento padrão.                               |
| Banco de dados deve ser MySQL | ✅ Concluído | [📄](/backend/config/database.ts) | Conexão configurada em .env para uso local |
| Repositório deve conter um README explicando como rodar e testar a aplicação  | 🚧 Em andamento  | [📄](/README.md) | Está sendo escrito com o andar do projeto |
| Todos os arquivos necessários para rodar o projeto devem estar incluídos no repositório  | 🚧 Em andamento | [📁](/) | Aplicação em desenvolvimento |
****


## Componentes e Páginas do FrontEnd

| Componente / Páginas | Status | Link |
| -------------------- | ------ | ---- |
| Página - Login do Candidato | ✅ Concluído | [📄](/frontend/src/auth/login.jsx) |
| Página - Registro | ✅ Concluído | [📄](/frontend/src/auth/register.jsx) |
| Página - Esqueci a senha | ❌ Não iniciado | |
| Página - Confirmação de e-mail  | ❌ Não iniciado | |
| Página - Login do Recrutador | 🚧 Em andamento | [📄](/frontend/src/admin/login.jsx) |
| Página - Painel Recrutador | ❌ Não iniciado | |
| Componente - Header | 🚧 Em andamento |[📄](/frontend/src/components/layout/header.jsx) |
| Componente - Sidebar | 🚧 Em andamento |[📄](/frontend/src/components/layout/sidebar.jsx) |
| Componente - Footer | ❌ Não iniciado | |

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
> Observação: Em alguns sistemas, pode ser necessário usar `sudo` para executar o comando acima. Além disso, o Docker Compose também pode ser utilizado com o comando `docker compose` (sem o hífen).

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
- ⚠️ Middleware de autenticação ainda não está protegendo todas as rotas.
- ⚠️ Banco, interface e funcionalidades do gestor/recrutador não foram implementadas.

## 🛠️ Melhorias
- 📬 Reenvio de e-mail de confirmação para candidatos.
- 🧪 Criação de testes unitários principais.
- 💡 Componentização dos elementos no frontend.
- 📊 Implementar filtro de busca na listagem de candidatos.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Sobre mim

## 📬 Contato

Quer trocar uma ideia ou dar feedback? Fique à vontade para me chamar!
📧 [sidney.figueiredo97.dev@outlook.com](sidney.figueiredo97.dev@outlook.com)  
🔗 Linkedin: [Sidney Figueiredo](https://www.linkedin.com/in/sidney-figueiredo)  
🐙 GitHub: [sidneyFdev](https://github.com/sidneyFdev)

---

<i>Feito com 💛 por Sidney!</i>
