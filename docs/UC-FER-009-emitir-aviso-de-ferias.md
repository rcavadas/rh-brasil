# UC-FER-009

## Emitir Aviso de Ferias

### Objetivo

Permitir a emissao formal do aviso de ferias com trilha e evidencias.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Ferias aprovadas.
* Datas consolidadas.

---

# Gatilho

O processo inicia quando o aviso de ferias e emitido.

---

# Fluxo Principal

### Etapa 1

Sistema gera o aviso.

### Etapa 2

Sistema apresenta as datas e dados legais.

### Etapa 3

Sistema registra a evidencia de emissao.

### Etapa 4

Sistema disponibiliza o documento.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Aviso indisponivel

### Condicao

Os dados nao estao consolidados.

### Fluxo

* Sistema bloqueia a emissao.

---

# Pos-condicoes

* Aviso emitido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O aviso precisa ser rastreavel e versionado.
* A emissao depende da aprovacao previa.

---

# Entidades Envolvidas

## VacationNotice

```text
id
vacation_request_id
issued_at
status
document_id
```

---

# Casos Relacionados

* UC-FER-005 - Aprovar Ferias
* UC-GED-003 - Gerar Documento Automaticamente
