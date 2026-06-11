# UC-PLT-009

## Monitorar Performance

### Objetivo

Permitir o monitoramento de performance e capacidade da plataforma.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Operacao
* Auditoria

---

# Pre-condicoes

* Indicadores de telemetria disponiveis.

---

# Gatilho

O processo inicia quando a performance e monitorada.

---

# Fluxo Principal

### Etapa 1

Sistema coleta metricas.

### Etapa 2

Sistema calcula tendencias.

### Etapa 3

Sistema apresenta o painel.

### Etapa 4

Sistema registra a consulta quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Dados insuficientes

### Condicao

Nao ha metricas suficientes.

### Fluxo

* Sistema sinaliza a lacuna.

---

# Pos-condicoes

* Performance monitorada.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* O monitoramento deve ser auditavel.
* Dados sensiveis nao podem ser expostos.

---

# Entidades Envolvidas

## PerformanceSnapshot

```text
id
service_name
metric
value
captured_at
```

---

# Casos Relacionados

* UC-PLT-006 - Monitorar Disponibilidade
* UC-PLT-010 - Auditar Governanca da Plataforma
