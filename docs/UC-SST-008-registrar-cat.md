# UC-SST-008

## Registrar CAT

### Objetivo

Permitir o registro da Comunicacao de Acidente de Trabalho com trilha e evidencias.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Auditoria
* eSocial

---

# Pre-condicoes

* Evento de acidente ou ocorrencia reconhecido.

---

# Gatilho

O processo inicia quando a CAT e registrada.

---

# Fluxo Principal

### Etapa 1

Usuario informa os dados da ocorrencia.

### Etapa 2

Sistema valida campos obrigatorios.

### Etapa 3

Sistema grava a CAT.

### Etapa 4

Sistema prepara a transmissao quando aplicavel.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados insuficientes

### Condicao

Nao ha base minima para a CAT.

### Fluxo

* Sistema bloqueia o registro.

---

# Pos-condicoes

* CAT registrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A CAT carrega dados sensiveis e deve ser protegida.
* O evento precisa ser rastreavel.

---

# Entidades Envolvidas

## WorkAccidentNotice

```text
id
employee_id
incident_at
status
reported_at
```

---

# Casos Relacionados

* UC-SST-007 - Emitir ASO
* UC-SST-009 - Controlar Entrega de EPI
