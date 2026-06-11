# UC-RES-002

## Definir Motivo de Desligamento

### Objetivo

Permitir a classificacao do motivo de desligamento com regras associadas.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Motor de rescisao
* Auditoria

---

# Pre-condicoes

* Desligamento registrado.

---

# Gatilho

O processo inicia quando o motivo e definido.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona a categoria do desligamento.

### Etapa 2

Sistema valida a classificacao.

### Etapa 3

Sistema grava o motivo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Motivo invalido

### Condicao

O motivo nao se enquadra na politica.

### Fluxo

* Sistema bloqueia a alteracao.

---

# Pos-condicoes

* Motivo definido ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O motivo pode impactar verbas, prazos e documentos.
* A classificacao deve ser rastreavel.

---

# Entidades Envolvidas

## TerminationReason

```text
id
termination_request_id
category
notes
created_at
```

---

# Casos Relacionados

* UC-RES-001 - Registrar Desligamento
* UC-RES-003 - Calcular Aviso Previo
