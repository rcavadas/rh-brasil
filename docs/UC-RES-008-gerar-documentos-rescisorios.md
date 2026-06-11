# UC-RES-008

## Gerar Documentos Rescisorios

### Objetivo

Permitir a geracao de termos, guias e comprovantes da rescisao.

---

# Atores

## Primarios

* Motor de rescisao

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Rescisao calculada ou em andamento.
* Templates documentais disponiveis.

---

# Gatilho

O processo inicia quando os documentos rescisorios sao gerados.

---

# Fluxo Principal

### Etapa 1

Sistema identifica os documentos necessarios.

### Etapa 2

Sistema gera os artefatos.

### Etapa 3

Sistema anexa as memorias e evidencias.

### Etapa 4

Sistema registra a disponibilidade para assinatura.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Template ausente

### Condicao

Nao existe modelo para algum documento.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* Documentos gerados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Os documentos devem manter assinatura e versionamento.
* A geracao precisa ser rastreavel.

---

# Entidades Envolvidas

## RescissionDocument

```text
id
termination_request_id
document_type
status
signed_at
```

---

# Casos Relacionados

* UC-GED-003 - Gerar Documento Automaticamente
* UC-RES-009 - Fechar Rescisao
