# UC-SEC-009

## Registrar Incidente de Seguranca

### Objetivo

Permitir o registro e acompanhamento de incidentes de seguranca.

---

# Atores

## Primarios

* Equipe de seguranca

## Secundarios

* Auditoria

---

# Pre-condicoes

* Incidente identificado.

---

# Gatilho

O processo inicia quando o incidente e registrado.

---

# Fluxo Principal

### Etapa 1

Usuario descreve o incidente.

### Etapa 2

Sistema classifica severidade e impacto.

### Etapa 3

Sistema grava o incidente.

### Etapa 4

Sistema registra as acoes de resposta.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Incidente duplicado

### Condicao

Ja existe um registro equivalente.

### Fluxo

* Sistema sinaliza duplicidade.

---

# Pos-condicoes

* Incidente registrado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O incidente precisa ser auditavel.
* Dados sensiveis devem ser minimizados.

---

# Entidades Envolvidas

## SecurityIncident

```text
id
severity
status
reported_at
```

---

# Casos Relacionados

* UC-SEC-010 - Auditar Acessos e Operacoes
* UC-API-010 - Monitorar Integracoes
