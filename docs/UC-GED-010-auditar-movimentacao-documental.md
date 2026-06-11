# UC-GED-010

## Auditar Movimentacao Documental

### Objetivo

Permitir a consulta da trilha de acesso, criacao, alteracao, assinatura e descarte de documentos.

---

# Atores

## Primarios

* Auditor ou gestor autorizado

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Documento ou prontuario existente.
* Usuario autenticado.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o usuario consulta o historico documental.

---

# Fluxo Principal

### Etapa 1

Usuario abre o historico.

### Etapa 2

Sistema lista eventos relevantes.

### Etapa 3

Usuario filtra por tipo de evento ou periodo.

### Etapa 4

Sistema apresenta a trilha consolidada.

### Etapa 5

Sistema registra a consulta quando exigido.

---

# Fluxos Alternativos

## FA-01 - Historico parcial

### Condicao

Algum evento nao esta disponivel.

### Fluxo

* Sistema sinaliza a lacuna e continua com o historico parcial.

---

# Pos-condicoes

* Historico consultado.
* Consulta registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A trilha deve ser imutavel.
* Consultas devem respeitar finalidade e autorizacao.

---

# Entidades Envolvidas

## DocumentAuditEvent

```text
id
document_id
event_type
actor_subject
created_at
```

---

# Casos Relacionados

* UC-GED-004 - Versionar Documento
* UC-GED-008 - Aplicar Politica de Retencao
