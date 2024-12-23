# Desafio TokenLab - Backend

Este repositório contém o **backend** do projeto "Desafio TokenLab", desenvolvido em **Node.js** com **TypeScript**. O sistema é construído para fornecer uma API utilizando tecnologias como **Express**, **JWT** e **MySQL** como banco de dados.

## 🚀 Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Express**: Framework web minimalista para Node.js.
- **JWT (JSON Web Token)**: Sistema de autenticação baseado em tokens.
- **MySQL2**: Cliente para conectar ao banco de dados MySQL.
- **dotenv**: Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **Nodemon**: Utilitário para reiniciar automaticamente a aplicação durante o desenvolvimento.
- **CORS**: Middleware para permitir requisições de diferentes origens.
  
## 🔧 Instruções para Executar

Siga os passos abaixo para rodar o backend localmente em sua máquina:

### 1. Clonar o repositório
Clone o repositório para sua máquina local:

```bash
git clone https://github.com/maraeliza/desafio-tokenlab.git
cd desafio-tokenlab
```

### 2. Instalar as dependências
Instale as dependências necessárias usando o npm:

```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias, como por exemplo:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=nome_do_seu_banco
JWT_SECRET=your-secret-key
```
### 4. Rodar a aplicação em modo de desenvolvimento
Para iniciar o servidor em modo de desenvolvimento com reinicialização automática (usando nodemon):
```bash
npm run dev
```
### 5. O servidor estará rodando na porta: http://localhost:8080

### 🔗 Repositório do Frontend
O repositório do frontend deste projeto pode ser acessado aqui: https://github.com/maraeliza/desafio-tokenlab

