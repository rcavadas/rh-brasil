# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-006 — Solicitar Ajuste de Ponto

### Versão

1.0

---

# Objetivo

Permitir que o colaborador solicite correções ou justificativas de ponto por meio do portal, garantindo workflow de aprovação, histórico e rastreabilidade.

---

# Atores

- Colaborador
- Gestor
- RH

---

# Pré-Condições

- Colaborador autenticado
- Período de ponto aberto
- Marcações existentes ou ausência identificada

---

# Gatilho

O processo inicia quando o colaborador identifica necessidade de corrigir ou justificar uma marcação.

---

# Fluxo Principal

1. Colaborador acessa Portal > Ponto > Solicitar Ajuste
2. Seleciona data
3. Seleciona tipo de ajuste
4. Informa horário ou justificativa
5. Anexa comprovante quando aplicável
6. Envia solicitação
7. Sistema valida período
8. Sistema encaminha para aprovação
9. Sistema registra protocolo
10. Sistema notifica gestor

---

# Fluxos Alternativos

## FA-01 — Período fechado

Sistema bloqueia ou direciona para solicitação especial.
## FA-02 — Solicitação duplicada

Sistema alerta duplicidade.
## FA-03 — Sem justificativa

Sistema impede envio.

---

# Pós-Condições

- Solicitação criada
- Gestor notificado
- Histórico registrado

---

# Regras de Negócio Relacionadas

- Solicitações devem possuir justificativa
- Solicitações devem respeitar prazo configurado
- Anexos devem respeitar política documental
- Aprovação deve gerar ajuste complementar

---

# Entidades Envolvidas

## TimeAdjustmentRequest

```text
id
employee_id
date
request_type
status
justification
```
## TimeAdjustmentAttachment

```text
id
request_id
file_id
uploaded_at
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Data | Obrigatório |
| Tipo de ajuste | Obrigatório |
| Justificativa | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| Colaborador | Criar solicitação |
| Gestor | Aprovar equipe |
| RH | Administrar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-adjustment-requests
```
```http
GET /api/v1/time-adjustment-requests/{id}
```
```http
GET /api/v1/employees/{id}/time-adjustment-requests
```

---

# Eventos de Domínio

```text
TimeAdjustmentRequested
TimeAdjustmentRequestCanceled
TimeAdjustmentRequestSubmitted
```

---

# Integrações Impactadas

- Workflow
- Portal do Colaborador
- Portal do Gestor
- Tratamento de ponto

---

# Casos de Teste

## CT-JOR-006-001

Solicitar ajuste válido

Resultado esperado:

```text
Solicitação enviada.
```
## CT-JOR-006-002

Solicitar em período fechado

Resultado esperado:

```text
Solicitação bloqueada.
```
## CT-JOR-006-003

Solicitar sem justificativa

Resultado esperado:

```text
Validação exibida.
```

---

# Métricas

- Solicitações abertas
- Solicitações por colaborador
- Solicitações por motivo
---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem depois da detecao de inconsistencias, porque formaliza a solicitação de correção antes da decisão de aprovacao.
