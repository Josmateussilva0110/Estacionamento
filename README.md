# 🚗 Sistema de Gestão de Estacionamento

## 📌 Sobre o Projeto

Este projeto é uma aplicação completa para **gestão de estacionamentos**, permitindo o controle de entradas e saídas de veículos, cálculo de valores de permanência e visualização de estatísticas operacionais.

---

## 🎯 Objetivo

O principal objetivo do sistema é facilitar o gerenciamento de estacionamentos, oferecendo:

* Controle de veículos em tempo real
* Cálculo automático de tarifas
* Visualização de dados e métricas
* Organização de registros de entrada e saída

---

## 🧱 Arquitetura do Projeto

O sistema segue uma arquitetura em camadas:

### 🔹 Frontend

* Desenvolvido com **React + TypeScript**
* Utiliza **Vite** como bundler
* Biblioteca de gráficos: **Recharts**
* Interface moderna e responsiva

### 🔹 Backend

* Desenvolvido com **Node.js + Express**
* Responsável por:

  * Regras de negócio
  * Cálculo de valores
  * APIs REST

### 🔹 Banco de Dados

* **Postgres**
* Armazena:

  * Veículos
  * Entradas e saídas
  * Tipos de pagamento
  * Estatísticas



## ⚙️ Funcionalidades

### 🚘 Gestão de Veículos

* Registro de entrada
* Registro de saída
* Controle de vagas ocupadas

### 💰 Cálculo de Tarifas

* Cobrança por:

  * Hora
  * Diária
  * Mensal
* Cálculo automático baseado no tempo de permanência

### 📊 Dashboard e Estatísticas

* Receita total
* Quantidade de veículos
* Ocupação do estacionamento
* Gráficos dinâmicos

### 🔐 Autenticação (em evolução)

* Sistema de login
* Controle de sessão

---


### 📌 Princípios aplicados

* Separação de responsabilidades
* Código modular
* Tipagem forte com TypeScript
* Reutilização de componentes

---

## 🔄 Regras de Negócio

* O valor da permanência é calculado com base no tempo entre entrada e saída
* Diferentes tipos de cobrança são aplicados conforme configuração
* Dados são agregados para geração de métricas e gráficos

---

## 🚀 Como Executar o Projeto
