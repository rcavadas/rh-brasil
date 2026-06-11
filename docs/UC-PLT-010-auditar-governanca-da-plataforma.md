# UC-PLT-010

## Auditar Governanca da Plataforma

### Objetivo

Permitir a auditoria da governanca operacional, isolamento e parametrizacoes da plataforma.

---

# Atores

## Primarios

* Auditor da plataforma

## Secundarios

* Auditoria

---

# Pre-condicoes

* Eventos de governanca disponiveis.

---

# Gatilho

O processo inicia quando a governanca e auditada.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o recorte.

### Etapa 2

Sistema recupera os eventos.

### Etapa 3

Sistema consolida o historico.

### Etapa 4

Sistema preserva mascaramento e finalidade.

### Etapa 5

Sistema registra a consulta quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Recorte sem eventos

### Condicao

Nao ha eventos no periodo.

### Fluxo

* Sistema sinaliza a ausencia.

---

# Pos-condicoes

* Governanca auditada.
* Consulta registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A governanca precisa ser rastreavel.
* O recorte nao pode expor dados indevidos.

---

# Entidades Envolvidas

## PlatformGovernanceAudit

```text
id
actor_subject
action
created_at
```

---

# Casos Relacionados

* UC-PLT-004 - Configurar Isolamento de Dados
* UC-PLT-009 - Monitorar Performance
