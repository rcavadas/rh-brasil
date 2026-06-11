# UC-LMS-006

## Emitir Certificado

### Objetivo

Permitir a emissao de certificado apos conclusao valida do treinamento.

---

# Atores

## Primarios

* LMS

## Secundarios

* Colaborador
* Auditoria

---

# Pre-condicoes

* Treinamento concluido.
* Regras de certificacao atendidas.

---

# Gatilho

O processo inicia quando o certificado e emitido.

---

# Fluxo Principal

### Etapa 1

Sistema valida conclusao e carga horaria.

### Etapa 2

Sistema gera o certificado.

### Etapa 3

Sistema associa o documento ao colaborador.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Requisitos incompletos

### Condicao

O participante nao cumpriu os requisitos.

### Fluxo

* Sistema bloqueia a emissao.

---

# Pos-condicoes

* Certificado emitido ou negado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O certificado deve ser rastreavel.
* A emissao depende de conclusao valida.

---

# Entidades Envolvidas

## Certificate

```text
id
enrollment_id
certificate_number
issued_at
status
```

---

# Casos Relacionados

* UC-LMS-005 - Aplicar Avaliacao
* UC-LMS-007 - Controlar Reciclagem Obrigatoria
