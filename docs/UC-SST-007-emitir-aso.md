# UC-SST-007

## Emitir ASO

### Objetivo

Permitir a emissao do atestado de saude ocupacional com base em exame valido.

---

# Atores

## Primarios

* Profissional de saude

## Secundarios

* SST
* Auditoria

---

# Pre-condicoes

* Exame ocupacional registrado.

---

# Gatilho

O processo inicia quando o ASO e emitido.

---

# Fluxo Principal

### Etapa 1

Sistema recupera o exame.

### Etapa 2

Usuario emite o atestado.

### Etapa 3

Sistema grava a evidencia.

### Etapa 4

Sistema associa o ASO ao colaborador.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Exame inapto

### Condicao

O exame nao permite emissao.

### Fluxo

* Sistema bloqueia a emissao.

---

# Pos-condicoes

* ASO emitido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O ASO deve ser preservado como evidencia.
* O resultado medico e restrito.

---

# Entidades Envolvidas

## OccupationalAso

```text
id
occupational_exam_id
status
issued_at
```

---

# Casos Relacionados

* UC-SST-006 - Registrar Exame Ocupacional
* UC-SST-008 - Registrar CAT
