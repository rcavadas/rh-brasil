# UC-LMS-007

## Controlar Reciclagem Obrigatoria

### Objetivo

Permitir o controle de vencimento e reciclagem de treinamentos obrigatorios.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Treinamento obrigatório cadastrado.

---

# Gatilho

O processo inicia quando a reciclagem precisa ser controlada.

---

# Fluxo Principal

### Etapa 1

Sistema identifica vencimentos.

### Etapa 2

Sistema sinaliza colaborador ou gestor.

### Etapa 3

Sistema agenda ou cria nova matricula.

### Etapa 4

Sistema atualiza o status da reciclagem.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Treinamento nao vencido

### Condicao

O treinamento ainda esta valido.

### Fluxo

* Sistema apenas monitora.

---

# Pos-condicoes

* Reciclagem controlada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O vencimento precisa ser rastreavel.
* A obrigatoriedade depende de politica interna ou regulatoria.

---

# Entidades Envolvidas

## MandatoryRecertification

```text
id
course_id
employee_id
expires_at
status
```

---

# Casos Relacionados

* UC-LMS-003 - Matricular Colaborador
* UC-LMS-009 - Consultar Historico de Treinamento
