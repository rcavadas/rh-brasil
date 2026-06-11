# UC-GED-008

## Aplicar Politica de Retencao

### Objetivo

Permitir a aplicacao de politica de retencao por classe documental, finalidade e base legal.

---

# Atores

## Primarios

* Administrador documental

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Politica de retencao configurada.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando uma politica de retencao e executada.

---

# Fluxo Principal

### Etapa 1

Sistema identifica os documentos elegiveis.

### Etapa 2

Sistema avalia prazo e finalidade.

### Etapa 3

Sistema marca os itens para retenção, anonimização ou descarte.

### Etapa 4

Sistema registra a aplicacao da politica.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Legal hold ativo

### Condicao

O documento esta sob preservacao obrigatoria.

### Fluxo

* Sistema suspende o descarte.

---

# Pos-condicoes

* Politica aplicada ou suspensa.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A retencao depende de finalidade e base legal.
* Excecoes devem ser registradas.

---

# Entidades Envolvidas

## RetentionPolicy

```text
id
document_type_id
purpose
retention_rule
status
```

---

# Casos Relacionados

* UC-SEC-008 - Aplicar Politica de Retencao
* UC-GED-009 - Descartar Documento Autorizado
