# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-007 — Aprovar Ajuste de Ponto

### Versão

1.0

---

# Objetivo

Permitir que gestores e RH aprovem, rejeitem ou solicitem complementação de ajustes de ponto, mantendo trilha completa de decisão.

---

# Atores

- Gestor
- Analista de RH
- Colaborador

---

# Pré-Condições

- Solicitação de ajuste aberta
- Usuário aprovador autorizado
- Workflow configurado

---

# Gatilho

O processo inicia quando uma solicitação de ajuste fica pendente de aprovação.

---

# Fluxo Principal

1. Gestor acessa pendências
2. Seleciona solicitação
3. Sistema apresenta detalhes e anexos
4. Gestor aprova, rejeita ou solicita ajuste
5. Sistema registra decisão
6. Se aprovado, sistema cria ajuste complementar
7. Sistema recalcula ponto
8. Sistema notifica colaborador
9. Sistema atualiza status
10. Sistema registra auditoria

---

# Fluxos Alternativos

## FA-01 — Gestor sem alçada

Sistema encaminha para aprovador correto.
## FA-02 — Solicitação rejeitada

Sistema exige justificativa e encerra solicitação.
## FA-03 — Solicitação expirada

Sistema bloqueia decisão ou exige autorização especial.

---

# Pós-Condições

- Decisão registrada
- Ponto recalculado quando aprovado
- Colaborador notificado

---

# Regras de Negócio Relacionadas

- Rejeições devem possuir justificativa
- Aprovador deve ter alçada sobre colaborador
- Ajustes aprovados devem preservar marcação original
- Decisões devem ser auditáveis

---

# Entidades Envolvidas

## TimeAdjustmentApproval

```text
id
request_id
approver_id
decision
decision_at
reason
```
## TimeSheetAdjustment

```text
id
request_id
created_from_approval
created_at
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Solicitação | Obrigatório |
| Decisão | Obrigatório |
| Justificativa | Obrigatório para rejeição |

---

# Permissões

| Item | Descrição |
|---|---|
| Gestor | Aprovar equipe |
| RH Admin | Total |
| RH Operação | Aprovar conforme perfil |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-adjustment-requests/{id}/approve
```
```http
POST /api/v1/time-adjustment-requests/{id}/reject
```
```http
POST /api/v1/time-adjustment-requests/{id}/request-changes
```

---

# Eventos de Domínio

```text
TimeAdjustmentApproved
TimeAdjustmentRejected
TimeSheetRecalculated
```

---

# Integrações Impactadas

- Workflow
- Portal do Gestor
- Tratamento de ponto
- Folha

---

# Casos de Teste

## CT-JOR-007-001

Aprovar ajuste

Resultado esperado:

```text
Ajuste aplicado.
```
## CT-JOR-007-002

Rejeitar sem justificativa

Resultado esperado:

```text
Sistema bloqueia.
```
## CT-JOR-007-003

Aprovar sem alçada

Resultado esperado:

```text
Acesso negado.
```

---

# Métricas

- Aprovações por gestor
- Rejeições
- Tempo médio de aprovação
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois da solicitacao de ajuste, porque representa a decisao operacional que valida ou rejeita a excecao antes dos calculos posteriores.
