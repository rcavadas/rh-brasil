# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-003 - Consultar Turnover

### Versao

1.0

---

# Objetivo

Permitir consultar taxas e volumes de turnover por competencia, empresa, filial, area e motivo, com agregacao segura e memoria de calculo.

---

# Atores

- Gestor de RH
- Analista de BI
- Diretor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de turnover.
- Bases de admissao e desligamento consolidadas.

---

# Gatilho

O usuario solicita a consulta de turnover.

---

# Fluxo Principal

1. Usuario acessa a consulta de turnover.
2. Sistema apresenta filtros de competencia e escopo.
3. Usuario seleciona os filtros.
4. Sistema calcula entradas, saidas e taxa de rotatividade.
5. Sistema exibe comparativos e tendencia.
6. Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Base incompleta

Sistema informa ausencia parcial de dados.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita correcao.

---

# Regras de Negocio

- Turnover deve considerar a mesma definicao oficial em toda a plataforma.
- Motivos de desligamento devem ser agregados conforme politica.
- Dados pessoais devem ser mascarados quando nao essenciais.

---

# Entidades

- BIKpiSnapshot
- BIKpiDefinition
- BIQueryExecution

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Consulta total |
| RH BI | Consulta total |
| Gestor | Consulta restrita |
| Colaborador | Nao |
| Auditor | Consulta |

---

# APIs

```http
GET /api/v1/bi/turnover
```

---

# Eventos

```text
BITurnoverViewed
BIQueryExecuted
```

---

# Integracoes

- Data warehouse / analytics
- Auditoria

---

# Testes

- Consultar turnover valido.
- Consultar sem permissao.
- Consultar sem dados.

---

# Metricas

- Turnover por competencia
- Tempo de resposta
- Consultas sem dados

