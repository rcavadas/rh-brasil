# UC-GST-005

## Acompanhar Admissoes

### Objetivo

Permitir que o gestor acompanhe o andamento das admissões da sua equipe, incluindo etapas pendentes, documentos e status geral do processo.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* ATS
* Onboarding
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Admissoes vinculadas a equipe ou area sob responsabilidade.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa a visao de admissoes.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Admissoes
```

### Etapa 2

Sistema lista admissoes em andamento.

### Etapa 3

Gestor seleciona um processo.

### Etapa 4

Sistema exibe status, pendencias e documentos relevantes.

### Etapa 5

Sistema mostra o progresso entre ATS, pre-admissao e onboarding.

### Etapa 6

Sistema registra auditoria da consulta.

---

# Fluxos Alternativos

## FA-01 - Nenhuma admissao vinculada

### Condicao

Nao existem admissoes sob responsabilidade do gestor.

### Fluxo

* Sistema informa indisponibilidade.

## FA-02 - Processo concluido

### Condicao

O processo ja foi finalizado.

### Fluxo

* Sistema exibe o historico.

---

# Pos-condicoes

* Acompanhamento realizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor consulta apenas processos sob sua area.
* O acompanhamento e somente leitura.
* O progresso deve refletir as etapas correntes do fluxo.

---

# Entidades Envolvidas

## AdmissionDraft

```text
id
candidate_id
employee_id
status
current_stage
```

## AdmissionRequest

```text
id
employee_id
status
requested_at
```

## AuditEvent

```text
id
actor_subject
tenant_id
action
resource_type
resource_id
created_at
```

---

# Casos Relacionados

* UC-GST-001 - Visualizar Equipe
* UC-ATS-010 - Converter Candidato em Pre-Admissao
* UC-ONB-001 - Criar Processo de Pre-Admissao

