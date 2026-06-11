# UC-GED-003

## Gerar Documento Automaticamente

### Objetivo

Permitir a emissao automatica de documentos a partir de eventos do sistema.

---

# Atores

## Primarios

* Evento de negocio

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Modelo documental configurado.
* Evento de origem reconhecido.

---

# Gatilho

O processo inicia quando um evento de negocio exige geracao documental.

---

# Fluxo Principal

### Etapa 1

Sistema recebe o evento de origem.

### Etapa 2

Sistema identifica o template aplicavel.

### Etapa 3

Sistema gera o documento.

### Etapa 4

Sistema versiona o artefato.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Template indisponivel

### Condicao

Nao ha modelo documental para o evento.

### Fluxo

* Sistema registra a pendencia e nao gera o arquivo.

---

# Pos-condicoes

* Documento gerado ou sinalizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A geracao deve ser rastreavel.
* O documento deve manter a origem do evento.

---

# Entidades Envolvidas

## GeneratedDocument

```text
id
document_type_id
source_event
version
status
```

---

# Casos Relacionados

* UC-GED-004 - Versionar Documento
* UC-GED-010 - Auditar Movimentacao Documental
