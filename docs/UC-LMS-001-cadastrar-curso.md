# UC-LMS-001

## Cadastrar Curso

### Objetivo

Permitir o cadastro de cursos, conteudos e dados basicos de treinamento.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Usuario autenticado.
* Tenant ativo validado.
* Permissao de gestao de treinamento habilitada.

---

# Gatilho

O processo inicia quando um novo curso e cadastrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome, descricao e publico alvo.

### Etapa 2

Sistema valida duplicidade.

### Etapa 3

Sistema salva o curso.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Curso duplicado

### Condicao

Ja existe curso equivalente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Curso criado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O curso pertence ao tenant.
* O conteudo deve ser versionavel.

---

# Entidades Envolvidas

## Course

```text
id
tenant_id
title
description
status
```

---

# Casos Relacionados

* UC-LMS-002 - Criar Trilha de Aprendizagem
* UC-LMS-004 - Executar Treinamento
