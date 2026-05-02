# APAS Angular

## English version

> Management and fundraising platform for APAS - Associação Protetora dos Animais de Serrinha.

### Overview

This project was developed during the undergraduate course at UNIFAN - Centro Universitário Nobre in Brazil and became the final course project (TCC). It provides a full-stack solution for an NGO to manage donations, communicate financial transparency, and engage supporters.

The application is running in production and can be accessed at:

- Frontend: `https://apas.sempreautomatize.com.br/#/`
- Backend: `https://api-apas.sempreautomatize.com.br:9000`

### Deployment architecture

- Frontend: Angular 17 hosted on Netlify
- Backend: Node.js / Express hosted on a Linux VPS from Locaweb
- Database: MongoDB Atlas
- Authentication: JWT
- API documentation: Swagger at `/api-docs`

### Key features

- User and administrator registration
- Login, password recovery and password change
- Protected admin panel with route guard
- Donation registration with donor message
- Mercado Pago integration for credit card and PIX/bank transfer payments
- Donation status update after payment approval
- Instagram feed integration to display recent posts
- Reports for donations and expenses
- Profile image upload and responsive navigation

### Implemented capabilities

- Institutional landing page
- Donation flow with payment integration
- Donation message submission to encourage new supporters
- Common user registration and authentication
- Admin registration through the dashboard
- Administrative reports for donations and expenses
- Instagram API integration to display social feed
- Public and protected backend routes using JWT

### Technologies

- Frontend
  - Angular 17
  - Angular Material
  - RxJS
  - TypeScript
- Backend
  - Node.js
  - Express
  - MongoDB / Mongoose
  - Swagger
  - Mercado Pago API
  - Instagram Graph API
  - CORS
  - dotenv

### Main API endpoints

- `GET /` - backend health check
- `GET /instagram` - fetch recent Instagram posts
- `GET /doacoes` - list all donations
- `GET /doacoes/feed` - list completed user donations
- `GET /doacoes/concluidas` - list all completed donations
- `POST /doacoes/cadastro` - create a new donation entry
- `POST /doacoes/mercado-pago` - create a Mercado Pago payment preference
- `PATCH /doacoes/aprovacao` - update payment approval status
- `POST /login` - authenticate user or admin
- `POST /recupera` - start password recovery
- `GET /api-docs` - Swagger API documentation

### Local setup

#### Backend

1. Open the `backend/` folder
2. Install dependencies:
   - `npm install`
3. Create a `.env` file with the required environment variables
4. Start the server:
   - `npm start`

#### Frontend

1. Install dependencies in the main project directory:
   - `npm install`
2. Start the Angular development server:
   - `ng serve`
3. Open in browser:
   - `http://localhost:4200`

### Important environment variables

- `USERDB` and `PASSWORD` for MongoDB Atlas
- `TOKENMERCADOPAGO` for Mercado Pago integration
- `IGTOKEN` for Instagram Graph API access
- `BASEURL` for Mercado Pago redirect URLs
- `KEYCERT` and `CERTIFICATE` for HTTPS in production
- `ENVIROMENT` to switch between production (`P`) and development (`D`)

### Notes

- The backend uses JWT middleware to protect admin and expense management routes.
- Mercado Pago is used for payment preference creation and payment status tracking.
- The Instagram feed is fetched server-side so the access token is not exposed to the client.

### Production status

This project is live with the frontend hosted on Netlify and the backend running on a Linux VPS from Locaweb. It delivers a complete NGO solution focused on transparency, resource capture, and digital engagement.

---

## Versão em português

> Plataforma de gestão, captação de recursos e transparência para a APAS - Associação Protetora dos Animais de Serrinha.

### Visão geral

Este projeto foi desenvolvido durante o curso de graduação na UNIFAN - Centro Universitário Nobre, Brasil, e se tornou o Trabalho de Conclusão de Curso (TCC). Ele oferece uma solução full-stack para uma ONG gerenciar doações, comunicar transparência financeira e engajar apoiadores.

A aplicação está em produção e pode ser acessada em:

- Frontend: `https://apas.sempreautomatize.com.br/#/`
- Backend: `https://api-apas.sempreautomatize.com.br:9000`

### Arquitetura de implantação

- Frontend: Angular 17 hospedado no Netlify
- Backend: Node.js / Express em servidor VPS Linux da Locaweb
- Banco de dados: MongoDB Atlas
- Autenticação: JWT
- Documentação da API: Swagger em `/api-docs`

### Principais funcionalidades

- Cadastro de usuário comum e administrador
- Login, recuperação de senha e alteração de senha
- Painel administrativo protegido por guarda de rota
- Cadastro de doações com mensagem do doador
- Integração com Mercado Pago para pagamento via cartão e PIX/transferência
- Atualização do status da doação após aprovação do pagamento
- Integração com Instagram para exibir posts recentes
- Relatórios de doações e gastos
- Upload de imagem de perfil e navegação responsiva

### Recursos implementados

- Landing page institucional
- Fluxo de doação com integração de pagamento
- Envio de mensagem junto à doação para incentivar novos doadores
- Cadastro e autenticação de usuário comum
- Cadastro de administradores pelo painel
- Relatórios administrativos de doações e gastos
- Integração com API do Instagram para exibir o feed
- Rotas públicas e protegidas no backend usando JWT

### Tecnologias

- Frontend
  - Angular 17
  - Angular Material
  - RxJS
  - TypeScript
- Backend
  - Node.js
  - Express
  - MongoDB / Mongoose
  - Swagger
  - Mercado Pago API
  - Instagram Graph API
  - CORS
  - dotenv

### Endpoints principais

- `GET /` - verifica o status do backend
- `GET /instagram` - retorna posts recentes do Instagram
- `GET /doacoes` - lista todas as doações
- `GET /doacoes/feed` - lista doações concluídas de usuários
- `GET /doacoes/concluidas` - lista todas as doações concluídas
- `POST /doacoes/cadastro` - registra uma nova doação
- `POST /doacoes/mercado-pago` - cria preferência de pagamento no Mercado Pago
- `PATCH /doacoes/aprovacao` - atualiza o status de pagamento da doação
- `POST /login` - autentica usuário ou administrador
- `POST /recupera` - inicia a recuperação de senha
- `GET /api-docs` - documentação da API via Swagger

### Como executar localmente

#### Backend

1. Acesse a pasta `backend/`
2. Instale dependências:
   - `npm install`
3. Crie o arquivo `.env` com as variáveis de ambiente necessárias
4. Inicie o servidor:
   - `npm start`

#### Frontend

1. Instale dependências no diretório principal:
   - `npm install`
2. Inicie o servidor Angular:
   - `ng serve`
3. Acesse:
   - `http://localhost:4200`

### Variáveis de ambiente relevantes

- `USERDB` e `PASSWORD` para o MongoDB Atlas
- `TOKENMERCADOPAGO` para integração com Mercado Pago
- `IGTOKEN` para integração com Instagram
- `BASEURL` para URLs de retorno do Mercado Pago
- `KEYCERT` e `CERTIFICATE` para HTTPS em produção
- `ENVIROMENT` para alternar entre produção (`P`) e desenvolvimento (`D`)

### Observações

- O backend utiliza middleware JWT para proteger rotas administrativas e de gestão de gastos.
- O fluxo de pagamento usa preferências do Mercado Pago e oferece suporte para aprovação de pagamento por cartão ou transferência.
- O feed do Instagram é consumido pelo backend para proteger o token de acesso.

### Status de produção

O projeto está em produção, com frontend hospedado no Netlify e backend em servidor Linux da Locaweb. Esta solução atende a APAS com foco em transparência, captação de recursos e engajamento digital.
