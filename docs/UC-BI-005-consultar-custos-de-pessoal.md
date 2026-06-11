# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-005 - Consultar Custos de Pessoal

### Versao

1.0

---

# Objetivo

Permitir a consulta de custos de pessoal por competencia, centro de custo, empresa, filial e categoria, com visao agregada e controlada por perfil.

---

# Atores

- Gestor de RH
- Financeiro
- Diretor
- Analista de BI
- Auditor

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para consulta de custos.
- Bases de folha e encargos consolidadas.

---

# Gatilho

O usuario solicita a consulta de custos de pessoal.

---

# Fluxo Principal

1. Usuario acessa a consulta de custos de pessoal.
2. Sistema apresenta filtros de competencia, empresa e centro de custo.
3. Usuario seleciona os filtros.
4. Sistema consolida saldos, encargos e provisoes autorizadas.
5. Sistema exibe graficos e totalizadores.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados incompletos

Sistema indica consolidacao pendente.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Filtro invalido

Sistema solicita correcao.

---

# Regras de Negocio

- Custos devem considerar apenas bases aprovadas e oficiais.
- A visao deve ser agregada e respeitar a segregacao por perfil.
- Valores individuais nao devem ser expostos sem autorizacao.

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
GET /api/v1/bi/personnel-costs
```

---

# Eventos

```text
BIPersonnelCostsViewed
BIQueryExecuted
```

---

# Integracoes

- Folha
- Provisoes
- Auditoria
- Data warehouse / analytics

---

# Testes

- Consultar custos validos.
- Consultar sem permissao.
- Consultar com dados pendentes.

---

# Metricas

- Custos por competencia
- Tempo de resposta
- Consultas sem dados

