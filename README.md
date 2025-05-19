# 🚀 Quaestum - Teste Técnico para Desenvolvedor Fullstack

Este repositório contém um projeto prático desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Fullstack na [Quaestum](https://www.quaestum.com.br/).  
O objetivo principal é demonstrar conhecimentos em ReactJS, AdonisJS, integração com APIs REST, arquitetura por feature, autenticação, e boas práticas de desenvolvimento.

- [🚀 Quaestum - Teste Técnico para Desenvolvedor Fullstack](#-quaestum---teste-técnico-para-desenvolvedor-fullstack)
  - [Requisitos](#requisitos)
  - [Requisitos Obrigatórios](#requisitos-obrigatórios)
  - [Componentes e Páginas do FrontEnd](#componentes-e-páginas-do-frontend)
    - [Informações adicionais do projeto](#informações-adicionais-do-projeto)
- [Configuração local da aplicação](#configuração-local-da-aplicação)
  - [Criando o banco de dados localmente](#criando-o-banco-de-dados-localmente)
    - [Docker](#docker)
      - [🪟 Utilizando o Docker no Windows](#-utilizando-o-docker-no-windows)
      - [🪟 Utilizando o Docker no Linux](#-utilizando-o-docker-no-linux)
      - [Passo a passo](#passo-a-passo)
    - [🛠️ Alternativa ao Docker: MySQL instalado localmente](#️-alternativa-ao-docker-mysql-instalado-localmente)
  - [AdonisJS](#adonisjs)
    - [Instalação](#instalação)
    - [🔐 Variáveis de Ambiente (.env)](#-variáveis-de-ambiente-env)
    - [Migrations](#migrations)
    - [Seeds](#seeds)
    - [Iniciando o backend](#iniciando-o-backend)
  - [ReactJS / Vite](#reactjs--vite)
    - [🔐 Variáveis de Ambiente (.env)](#-variáveis-de-ambiente-env-1)
    - [Iniciando o frontend](#iniciando-o-frontend)
- [🔧 Problemas / Implementações Futuras](#-problemas--implementações-futuras)
  - [🐛 Problemas Conhecidos](#-problemas-conhecidos)
  - [✅ Problemas Corrigidos](#-problemas-corrigidos)
  - [🛠️ Melhorias Futuras](#️-melhorias-futuras)
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
| As tabelas devem ser criadas com migrations do AdonisJS | ✅ Concluído | [📁](/backend/database/migrations/) | Foram criadas 7 migrations para as entidades principais. |
| O e-mail do candidato deve ser único | ✅ Concluído | [📄](/backend/database/migrations/1747270779397_create_users_table.ts) | Restrição definida na migration com `unique()`.                                              |
| Código do candidato sequencial e automático  | ✅ Concluído | [📄](/backend/database/migrations/1747270779397_create_users_table.ts) | Campo `id` com auto incremento padrão. |
| Endereço preenchido automaticamente via ViaCEP  | ✅ Concluído | [📄](/frontend/src/services/viaCEP.jsx) | Requisição feita ao ViaCEP via web service.                                         |
| Apenas usuários logados podem visualizar dados | ✅ Concluído  | [📄](/frontend/src/router/routes.jsx) | Rotas protegidas através de autenticação `middleware` no backend e `authProvider` nas rotas do FrontEnd. |
| Dois tipos de usuário: gestor e candidato  | ✅ Concluído  | [📄](/backend/app/models/user.ts) | Campo booleano adicionado à tabela de usuários para distinguir entre `candidatos` e `recrutadores`.                                 |
| Preenchimento de habilidades com lista pré-definida  | ✅ Concluído | [📄](/backend/database/seeders/users_seeder.ts) | Lista incluída com seed e implementada no frontend com seleção múltipla, preenchida através de requisição GET. |
| Candidato recebe e-mail de confirmação com link para definir senha  | ✅ Concluído | [📄](/backend/app/controllers/Http/user_controller.ts) | Implementado com `uuid` e `@adonisjs/mail`.  |      
| Candidato recebe e-mail de confirmação com link para redefinição senha  | ✅ Concluído  | [📄](/backend/app/controllers/Http/session_controller.ts) | Implementado usando `uuid` e `@adonisjs/mail`. |
| Sistema deve permitir login com e-mail e senha | ✅ Concluído | [📄](/frontend/src/pages/auth/login.jsx) | Tela de login funcional |
| Área restrita para listagem de candidatos acessível só por gestores | ✅ Concluído  | [📄](/frontend/src/router/protectedAdminRoutes.jsx) | Realizado a checagem da coluna `is_admin` presente no banco `users`para que a rota fique protegida por autenticação. Checagem feita no `backend` e no `frontend`|
| Listagem mostra Código, Nome, E-mail, Telefone e Habilidades | ✅ Concluído | [📄](/frontend/src/pages/recruiter/home.jsx)| Implementado na página `'/recruiter'`, disponível somente na rota de `administradores`  |
| Buscar candidatos por nome e habilidades | 🚧 Concluído parcialmente  | [📄](/frontend/src/pages/recruiter/home.jsx) | Filtros funcionais, mas agrupados; idealmente, deveriam ser independentes. |
| Selecionar candidatos e enviar convite por e-mail para entrevista | ✅ Concluído  | [📄](/backend/app/controllers/Http/recruiters_controller.ts) | Implementado através da seleção de candidatos dentro da página `'/recruiter'` |
| Candidato selecionado deve ser notificação ao acessar o sistema | ✅ Concluído | [📄](/backend/app/controllers/Http/session_controller.ts) | Após fornecer um token durante o login, um email é enviado ao usuário |
| Aplicação deve usar ReactJS (Frontend) e AdonisJS V6 (Backend) | ✅ Concluído | [📁Front](/frontend) [📁Back](/backend) | Aplicação atendendo os requisitos. |
| Banco de dados deve ser MySQL | ✅ Concluído | [📄](/backend/config/database.ts) | Conexão configurada em .env para uso local |
| Repositório deve conter um README explicando como rodar e testar a aplicação  | ✅ Concluído  | [📄](/README.md) | Projeto entregue. |
| Todos os arquivos necessários para rodar o projeto devem estar incluídos no repositório  | ✅ Concluído | [📁](/) | Aplicação pronto para clone e uso |
****

## Componentes e Páginas do FrontEnd

| Componente / Páginas | Status | Link |
| -------------------- | ------ | ---- |
| Página - Login do Candidato | ✅ Concluído | [📄](/frontend/src/pages/auth/login.jsx) |
| Página - Registro | ✅ Concluído | [📄](/frontend/src/pages/auth/register.jsx) |
| Página - Esqueci a senha | ✅ Concluído |[📄](/frontend/src/pages/auth/resetpassword.jsx) |
| Página - Confirmação de e-mail  | ✅ Concluído | [📄](/frontend/src/pages/auth/confirm.jsx) |
| Página - Painel Recrutador | ✅ Concluído | [📄](/frontend/src/pages/recruiter/home.jsx) |
| Página - Painel Candidato | 🚧 Concluído parcialmente | [📄](/frontend/src/pages/candidate/home.jsx) |
| Componente - Header | ✅ Concluído  |[📄](/frontend/src/components/layout/header.jsx) |
| Componente - Sidebar | ❌ Não necessário | ❌ |
| Componente - Footer | ✅ Concluído | [📄](/frontend/src/components/layout/footer.jsx) |

> Sobre o `Painel Candidato`: Infelizmente, não houve a implementação completa de todas as informações do candidato.

### Informações adicionais do projeto

- Estilização desenvolvida com [Tailwindcss](https://tailwindcss.com/).
- Projeto React criado com [Vite](https://vite.dev/).
- Rotas de navegação criados com [React Router Dom](https://www.npmjs.com/package/react-router-dom).

# Configuração local da aplicação

Para iniciar a utilização deste projeto, você deverá antes fazer um clone do repositório.

```bash
   git clone https://github.com/sidneyFdev/Quaestum-portal-de-talentos.git
   cd Quaestum-portal-de-talentos
```

## Criando o banco de dados localmente

### Docker

#### 🪟 Utilizando o Docker no Windows

Se você estiver utilizando Windows, siga estas instruções:

1. **Instale o [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/)**.
   > Requer habilitação da virtualização no BIOS e o WSL2 instalado.

#### 🪟 Utilizando o Docker no Linux

1. **Instale o [Docker Desktop para Linux](https://docs.docker.com/engine/install/ubuntu/)**.
   > Consulte a distribuição correta.

#### Passo a passo 

Exemplo de Docker Compose para criar o banco de dados MySQL localmente. O arquivo `yaml` a seguir está dentro da pasta docker do próprio repositório. Lembre-se de criar um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias definidas neste docker-compose.

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
cd docker
docker-compose up -d
```
> Observação: Em alguns ambientes de sistema Linux, dependendo da sua configuração, pode ser necessário usar `sudo` para executar o comando acima. Além disso, o Docker Compose também pode ser utilizado com o comando `docker compose` (sem o hífen) caso o anterior não funcione.

Definindo senha para o usuário antes de entrar no banco de dados. Neste caso, `adonis`.

```bash
docker exec -it mysql_quaestum mysql -u adonis -p
```
Executando o MySQL via terminal.

```bash
docker exec -it mysql_quaestum mysql -uroot -proot
```

### 🛠️ Alternativa ao Docker: MySQL instalado localmente

Se preferir não utilizar Docker, siga os passos abaixo para configurar o banco de dados diretamente na sua máquina:

1. **Instale o MySQL:**  
   - No Linux: `sudo apt install mysql-server`  
   - No Windows: use o instalador do [MySQL Community](https://dev.mysql.com/downloads/installer/)

2. **Crie o banco e usuário manualmente no terminal SQL:**

```sql
CREATE DATABASE adonis_app;
CREATE USER 'adonis'@'localhost' IDENTIFIED BY 'adonis';
GRANT ALL PRIVILEGES ON adonis_app.* TO 'adonis'@'localhost';
FLUSH PRIVILEGES;
```

## AdonisJS

### Instalação

Execute o seguinte comando para instalar as dependências.

```bash
cd backend
npm install 
```
### 🔐 Variáveis de Ambiente (.env)

As variáveis a seguir são necessárias para o funcionamento da aplicação. Um arquivo `.env.example` já está incluído no repositório como modelo. Sendo assim, copie-o e renomeie para `.env`.

```env
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=
NODE_ENV=development
FRONTEND_URL=http://localhost:5173/
DB_URL=http://localhost:3333/
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=adonis
DB_PASSWORD=adonis
DB_DATABASE=adonis_app
SESSION_DRIVER=cookie
MAIL_CONNECTION=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=exemplo@exemplo.com
SMTP_PASSWORD=your_password
MAIL_FROM="No-Reply <recrutamento@example.com>"
```

Execute o comando abaixo para popular o campo `APP_KEY`.
```bash
node ace generate:key
```

### Migrations

Criação das tabelas predefinidas pelas configurações no AdonisJS

```bash
node ace migration:run
```
Caso deseje recriar um banco de dados limpo, todas as migrações podem ser refeitas com:

> ⚠️ Atenção: Este comando irá limpar todas as tabelas do banco de dados que estão referenciadas nas migrations.

```bash
node ace migration:fresh
```

### Seeds

Popular as tabelas `skills` e adicionar alguns `candidatos` para o funcionamento básico da aplicação
```bash
node ace db:seed
```

### Iniciando o backend

Dentro da pasta backend, execute:

```bash
npm run dev
```

## ReactJS / Vite

```bash
cd frontend
npm install

```

### 🔐 Variáveis de Ambiente (.env)

Assim como com AdonisJS, já há um `.env.example` pronto para ser copiado.

> 🔔 Atenção: todas as variáveis de ambiente no Vite devem começar com `VITE_`. Caso crie localmente com React, deverão começar com `REACT_APP_`. Neste projeto, estaremos utilizando VITE.

```env
VITE_API_URL=http://localhost:3333/
```
### Iniciando o frontend

Dentro da pasta frontend, execute:

```bash
npm run dev
```

# 🔧 Problemas / Implementações Futuras

## 🐛 Problemas Conhecidos

- ⚠️ Não há redirecionamento para página de NotFound no caso de URLs inexistentes no frontend.
- ⚠️ Falta telas de loading e desabilitar botões e hooks do frontend para evitar requests repetidas ao backend.
- ⚠️ As respostas e funções do backend, embora estejam funcionando, não estão padronizadas.
- ⚠️ Os inputs no cadastro não estão sendo devidamente tratados antes de enviar ao backend. Logo, caso alguém insira, por exemplo, a data `99/99/2025`, ela será enviada sem a checagem e pode acarretar em erro.
- ⚠️ A listagem de usuários ainda não foi limitada. Logo, se adicionar muitos usuários, pode provocar extrema lentidão no aplicativo.

## ✅ Problemas Corrigidos
- 🪪 Middleware de autenticação nas rotas do backend.
- 🪪 Rotas protegidas no frontend.

## 🛠️ Melhorias Futuras
- 📬 Envio de confirmação de cadastro após validação pelo usuário.
- 🧪 Criação de testes unitários principais.
- 💡 Componentização dos elementos no frontend.
- 🦋 Implementação de nomes, logos e ícones.
- 🦋 Design atualmente está pobre. Porém, o objetivo é mostra o conhecimento de `comunicação com backend x frontend`.
- 📊 Implementar funcionalidades na tabela do recrutados, para facilitar visualização, como organização por ordem alfabética.
- ⚠️ Ao invés de respostas utilizando o próprio frontend, as repostas das requests estão sendo enviadas via `alert`, o que não é o ideal.
- 💡 Necessário `refatoração`, pois a maioria do frontend está com HTML puro, sem utilizar a vantagem do REACT que são seus componentes. Além disso, no backend, há muita repetição de código durantes as requests.
- 💡 Faltam `comentários` no código para guiar na leitura.
- 💡 No momento, há somente um usuário administrador e não é possível criar novos. Seguindo o cadastro já dentro das seeds, use esta credencial:
> email: admin@example.com
> senha: senha1

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
