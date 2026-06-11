# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-002 - Consultar Headcount

### Versao

1.0

---

# Objetivo

Permitir consultar o numero de colaboradores ativos, admitidos e desligados, com distribuicao por empresa, filial, area, cargo e periodo, respeitando competencia, tenancy e perfil de acesso.

---

# Atores

- Gestor de RH
- Analista de BI
- Diretor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de headcount.
- Base de pessoas e vinculos consolidada para a competencia.

---

# Gatilho

O usuario solicita a consulta de headcount.

---

# Fluxo Principal

1. Usuario acessa a consulta de headcount.
2. Sistema apresenta filtros de competencia e escopo.
3. Usuario seleciona os filtros.
4. Sistema valida o acesso.
5. Sistema calcula ativos, admitidos, desligados e saldo.
6. Sistema exibe graficos, tabelas e comparativos.
7. Sistema registra a consulta em auditoria.

---

# Fluxos Alternativos

## FA-01 - Sem dados consolidados

Sistema informa que nao ha informacoes disponiveis para a competencia.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Escopo invalido

Sistema solicita ajuste de empresa, filial ou periodo.

---

# Pos-condicoes

- Headcount exibido ou acesso bloqueado.
- Consulta registrada em auditoria.

---

# Regras de Negocio Relacionadas

- Headcount deve respeitar competencia e escopo.
- Nao expor dados pessoais indevidos.
- A contagem deve considerar apenas vinculos elegiveis conforme politica.

---

# Entidades Envolvidas

- BIKpiSnapshot
- BIKpiDefinition
- BIQueryExecution

---

# Campos Principais

| Campo | Obrigatorio |
|---|---|
| Competencia | Sim |
| Escopo | Sim |
| Tipo de headcount | Sim |

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

# APIs Sugeridas

```http
GET /api/v1/bi/headcount
```

---

# Eventos de Dominio

```text
BIHeadcountViewed
BIQueryExecuted
```

---

# Integracoes Impactadas

- Data warehouse / analytics
- Auditoria
- Portal interno

---

# Casos de Teste

## CT-BI-002-001

Consultar headcount valido.

Resultado esperado:

```text
Headcount exibido com sucesso.
```

## CT-BI-002-002

Consultar headcount sem permissao.

Resultado esperado:

```text
Acesso bloqueado.
```

## CT-BI-002-003

Consultar headcount sem dados.

Resultado esperado:

```text
Sistema indica ausencia de dados.
```

---

# Metricas

- Headcount por competencia
- Tempo de resposta
- Consultas sem dados

---

# Observacoes Arquiteturais

A consulta deve privilegiar agregacao e evitar exposicao de informacoes pessoais desnecessarias.
