# UC-GED-001

## Cadastrar Tipo Documental

### Objetivo

Permitir o cadastro de tipos documentais com finalidade, vigencia, obrigatoriedade e politica associada.

---

# Atores

## Primarios

* Administrador documental

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de gestao documental habilitada.

---

# Gatilho

O processo inicia quando o usuario cadastra um novo tipo documental.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome, finalidade e vigencia.

### Etapa 2

Sistema valida duplicidade e consistencia.

### Etapa 3

Sistema salva o tipo documental.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Tipo duplicado

### Condicao

Ja existe tipo documental equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Tipo documental criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O tipo documental pertence ao tenant.
* A finalidade deve ser declarada.

---

# Entidades Envolvidas

## DocumentType

```text
id
tenant_id
name
purpose
status
```

---

# Casos Relacionados

* UC-GED-003 - Gerar Documento Automaticamente
* UC-GED-008 - Aplicar Politica de Retencao
