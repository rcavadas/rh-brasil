# UC-GED-002

## Anexar Documento ao Colaborador

### Objetivo

Permitir o vinculo de documentos ao cadastro do colaborador, com classificacao e auditoria.

---

# Atores

## Primarios

* Gestor documental

## Secundarios

* Portal administrativo
* GED
* Auditoria

---

# Pre-condicoes

* Colaborador existente.
* Documento disponivel.
* Permissao de anexacao habilitada.

---

# Gatilho

O processo inicia quando um documento e anexado ao prontuario do colaborador.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o colaborador.

### Etapa 2

Usuario envia ou vincula o documento.

### Etapa 3

Sistema classifica o documento.

### Etapa 4

Sistema grava o anexo no prontuario.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Documento nao permitido

### Condicao

O arquivo nao atende a politica.

### Fluxo

* Sistema bloqueia o anexo.

---

# Pos-condicoes

* Documento anexado ou recusado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O documento deve respeitar finalidade e retencao.
* A anexacao deve ser rastreavel.

---

# Entidades Envolvidas

## DocumentAttachment

```text
id
employee_id
document_id
category
created_at
```

---

# Casos Relacionados

* UC-GED-007 - Consultar Prontuario Eletronico
* UC-ONB-004 - Coletar Documentos Admissionais
