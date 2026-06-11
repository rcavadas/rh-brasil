# UC-GED-004

## Versionar Documento

### Objetivo

Permitir o controle de versao, historico e comparacao de documentos.

---

# Atores

## Primarios

* Gestor documental

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Documento existente.
* Permissao de versionamento habilitada.

---

# Gatilho

O processo inicia quando uma nova versao do documento e publicada.

---

# Fluxo Principal

### Etapa 1

Usuario envia nova versao.

### Etapa 2

Sistema valida integridade e sequencia.

### Etapa 3

Sistema grava a nova versao.

### Etapa 4

Sistema preserva o historico anterior.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Versao invalida

### Condicao

A versao nao segue a sequencia esperada.

### Fluxo

* Sistema bloqueia a publicacao.

---

# Pos-condicoes

* Documento versionado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O historico deve ser imutavel.
* Cada versao deve ser identificavel.

---

# Entidades Envolvidas

## DocumentVersion

```text
id
document_id
version_number
status
created_at
```

---

# Casos Relacionados

* UC-GED-003 - Gerar Documento Automaticamente
* UC-GED-010 - Auditar Movimentacao Documental
