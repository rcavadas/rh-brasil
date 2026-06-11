# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-004 - Consultar Absenteismo

### Versao

1.0

---

# Objetivo

Permitir consultar indicadores de absenteismo por periodo, empresa, filial, area e tipo de ausencia, com agregacao e rastreabilidade.

---

# Atores

- Gestor de RH
- Analista de BI
- Gestor
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de absenteismo.
- Eventos de ponto e afastamentos consolidados.

---

# Gatilho

O usuario solicita a consulta de absenteismo.

---

# Fluxo Principal

1. Usuario acessa a consulta de absenteismo.
2. Sistema apresenta filtros de competencia e escopo.
3. Usuario seleciona os filtros.
4. Sistema agrega faltas, atrasos e ausencias relevantes.
5. Sistema exibe graficos, tabelas e alertas.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Base parcial

Sistema informa que parte dos dados ainda esta em consolidacao.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Escopo invalido

Sistema solicita ajuste.

---

# Regras de Negocio

- Absenteismo deve respeitar regras de consolidacao e filtro de competencia.
- Dados pessoais e justificativas devem ser agregados.
- Faltas justificadas e injustificadas devem ser diferenciadas quando autorizado.

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
GET /api/v1/bi/absenteeism
```

---

# Eventos

```text
BIAbsenteeismViewed
BIQueryExecuted
```

---

# Integracoes

- Ponto
- Afastamentos
- Auditoria
- Data warehouse / analytics

---

# Testes

- Consultar absenteismo valido.
- Consultar sem permissao.
- Consultar com dados incompletos.

---

# Metricas

- Absenteismo por competencia
- Tempo de resposta
- Consultas sem dados

