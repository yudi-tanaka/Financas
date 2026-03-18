# 💰 Sistema de Controle de Gastos Residenciais

## 📌 Descrição

Este projeto consiste no desenvolvimento de um sistema completo para controle de gastos residenciais, com arquitetura separada entre back-end e front-end.

A aplicação permite o gerenciamento de pessoas, categorias e transações financeiras, além da geração de relatórios com totais de receitas, despesas e saldo por pessoa.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Back-end
- .NET (Web API)
- C#
- Entity Framework Core
- SQLite (persistência de dados)
- REST API

### 🔹 Front-end
- React
- TypeScript
- Styled Components
- React Router DOM

### 🔹 Outros
- Git / GitHub

---

## 🧠 Principais Funcionalidades

### 👤 Cadastro de Pessoas
- Criação, edição, exclusão e listagem
- Campos:
  - Identificador (gerado automaticamente)
  - Nome (máx. 200 caracteres)
  - Idade
- Regra:
  - Ao excluir uma pessoa, todas as suas transações são removidas automaticamente

---

### 🏷️ Cadastro de Categorias
- Criação e listagem
- Campos:
  - Identificador (gerado automaticamente)
  - Descrição (máx. 400 caracteres)
  - Finalidade:
    - Despesa
    - Receita

---

### 💸 Cadastro de Transações
- Criação e listagem
- Campos:
  - Identificador (gerado automaticamente)
  - Descrição (máx. 400 caracteres)
  - Valor (positivo)
  - Tipo:
    - Despesa
    - Receita
  - Categoria
  - Pessoa

---

## ⚙️ Regras de Negócio

- Pessoas menores de 18 anos:
  - Podem registrar apenas **despesas**

- Validação de categoria:
  - Não é permitido usar uma categoria incompatível com o tipo da transação  
  (ex: categoria de receita em uma despesa)

- Integridade de dados:
  - Exclusão em cascata de transações ao remover uma pessoa
  - Validação de campos obrigatórios e limites de tamanho

---

## 📊 Consultas e Relatórios

### 🔹 Totais por Pessoa
- Total de receitas
- Total de despesas
- Saldo (Receitas - Despesas)

### 🔹 Total Geral
- Soma de todas as receitas
- Soma de todas as despesas
- Saldo consolidado

---

## 🧩 Arquitetura

O sistema foi desenvolvido com separação clara de responsabilidades:

- **Back-end (API)**
  - Responsável por regras de negócio, validações e persistência

- **Front-end**
  - Responsável pela interface, interação com o usuário e consumo da API

---

## 🛠️ Conceitos e Boas Práticas Aplicadas

- Estruturação de APIs REST
- Separação de camadas (Controller / Repository / Data)
- Uso de ORM com Entity Framework
- Modelagem de domínio (Pessoa, Categoria, Transação)
- Tipagem forte com TypeScript
- Componentização no React
- Validação de regras de negócio no back-end
- Organização e legibilidade de código

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de demonstrar:

- Capacidade de interpretação de requisitos
- Implementação de regras de negócio
- Organização e estruturação de aplicações fullstack
- Uso de boas práticas em .NET e React

## ▶️ Como executar o projeto

### 🔹 Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- .NET SDK (versão compatível com o projeto)
- Node.js (recomendado: versão LTS)
- npm ou yarn

---

### 🔹 Back-end (API .NET)

1. Acesse a pasta do projeto da API:

```bash
cd BackEnd
```

2. Execute a aplicação:

```bash
dotnet run
```

3. A API será iniciada, geralmente em:

```
http://localhost:5000
ou
https://localhost:5001
```

> Verifique a porta exata no arquivo `launchSettings.json`.

---

### 🔹 Front-end (React + Vite)

1. Acesse a pasta do front-end:

```bash
cd FrontEnd
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a URL da API:

No arquivo `vite.config.ts`, ajuste a URL da API conforme a porta em que o back-end está rodando:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

---

4. Inicie o projeto:

```bash
npm run dev
```

5. A aplicação estará disponível em alguma porta como:

```
http://localhost:5173
```

---

### ⚠️ Observações

* Certifique-se de que o back-end esteja rodando antes de iniciar o front-end.
* Caso a porta da API seja alterada, atualize também no `vite.config.ts`.

