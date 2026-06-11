# UC-SEC-010

## Auditar Acessos e Operacoes

### Objetivo

Permitir a consulta da trilha de acessos e operacoes sensiveis.

---

# Atores

## Primarios

* Auditor ou compliance

## Secundarios

* Auditoria

---

# Pre-condicoes

* Eventos de auditoria disponiveis.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando a auditoria e consultada.

---

# Fluxo Principal

### Etapa 1

Usuario define o recorte.

### Etapa 2

Sistema recupera os eventos.

### Etapa 3

Sistema apresenta a trilha consolidada.

### Etapa 4

Sistema preserva a finalidade e o mascaramento.

### Etapa 5

Sistema registra a consulta quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Recorte sem dados

### Condicao

Nao ha eventos para o periodo.

### Fluxo

* Sistema sinaliza a ausencia.

---

# Pos-condicoes

* Auditoria consultada.
* Consulta registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A trilha deve ser preservada.
* A consulta precisa respeitar finalidade e acesso.

---

# Entidades Envolvidas

## AuditLog

```text
id
actor_subject
action
resource_type
created_at
```

---

# Casos Relacionados

* UC-SEC-009 - Registrar Incidente de Seguranca
* UC-GED-010 - Auditar Movimentacao Documental
