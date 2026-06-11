# UC-GED-009

## Descartar Documento Autorizado

### Objetivo

Permitir o descarte controlado de documentos quando autorizado pela politica e pelo ciclo de retencao.

---

# Atores

## Primarios

* Administrador documental

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Documento elegivel para descarte.
* Politica de retencao cumprida.
* Autorizacao valida.

---

# Gatilho

O processo inicia quando um descarte e solicitado.

---

# Fluxo Principal

### Etapa 1

Sistema valida elegibilidade.

### Etapa 2

Usuario confirma o descarte.

### Etapa 3

Sistema executa o descarte controlado.

### Etapa 4

Sistema preserva a trilha minima do evento.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Descarte bloqueado

### Condicao

O documento ainda nao pode ser removido.

### Fluxo

* Sistema bloqueia a operacao.

---

# Pos-condicoes

* Documento descartado ou preservado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O descarte precisa ser rastreavel.
* Evidencias minimas devem permanecer quando exigido.

---

# Entidades Envolvidas

## DocumentDisposal

```text
id
document_id
reason
disposed_at
```

---

# Casos Relacionados

* UC-GED-008 - Aplicar Politica de Retencao
* UC-GED-010 - Auditar Movimentacao Documental
