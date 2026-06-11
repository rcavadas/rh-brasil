# UC-PLT-006

## Monitorar Disponibilidade

### Objetivo

Permitir o monitoramento de disponibilidade da plataforma e dos servicos.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Operacao
* Auditoria

---

# Pre-condicoes

* Servicos operacionais disponiveis.

---

# Gatilho

O processo inicia quando a disponibilidade e monitorada.

---

# Fluxo Principal

### Etapa 1

Sistema coleta os indicadores.

### Etapa 2

Sistema avalia o estado.

### Etapa 3

Sistema apresenta alertas.

### Etapa 4

Sistema registra a consulta quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Serviço indisponivel

### Condicao

Um serviço nao responde.

### Fluxo

* Sistema sinaliza a indisponibilidade.

---

# Pos-condicoes

* Disponibilidade monitorada.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* O monitoramento deve ser auditavel.
* A falha precisa ser visivel sem expor segredos.

---

# Entidades Envolvidas

## AvailabilitySnapshot

```text
id
service_name
status
checked_at
```

---

# Casos Relacionados

* UC-PLT-007 - Executar Backup
* UC-PLT-009 - Monitorar Performance
