# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-001 - Consultar Dashboard Executivo

### Versao

1.0

---

# Objetivo

Permitir a consulta do dashboard executivo com indicadores consolidados de RH, financeiros e operacionais, por competencia, empresa e filtros autorizados.

---

# Atores

- Gestor de RH
- Diretor
- Analista de BI
- Administrador do Sistema
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consultar dashboard executivo.
- Dados consolidados disponiveis para a competencia selecionada.

---

# Gatilho

O usuario solicita a visao executiva de indicadores do RH.

---

# Fluxo Principal

1. Usuario acessa BI -> Dashboard executivo.
2. Sistema apresenta filtros de competencia, empresa, filial e periodo.
3. Usuario seleciona os filtros.
4. Sistema valida permissao, tenancy e escopo.
5. Sistema consolida os indicadores autorizados.
6. Sistema exibe cards, graficos e alertas executivos.
7. Sistema registra cache, origem dos dados e auditoria de acesso.

---

# Fluxos Alternativos

## FA-01 - Sem dados consolidados

Sistema exibe indicacao de processamento pendente.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita ajuste.

---

# Regras de Negocio

- O dashboard deve usar apenas dados oficiais da plataforma.
- Indicadores devem respeitar tenancy, perfil e escopo.
- A visao executiva nao deve expor dados pessoais desnecessarios.

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
GET /api/v1/bi/dashboard/executive
```

---

# Eventos

```text
BIExecutiveDashboardViewed
BIQueryExecuted
```

---

# Integracoes

- Data warehouse / analytics
- Auditoria
- Portal interno

---

# Testes

- Consultar dashboard com dados validos.
- Consultar dashboard sem permissao.
- Consultar dashboard com periodo sem consolidacao.

---

# Metricas

- Numero de acessos
- Tempo de resposta
- Taxa de consultas sem dados

