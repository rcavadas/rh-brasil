# UC-BEN-009

## Importar Coparticipacao

### Objetivo

Permitir a importacao de valores de coparticipacao e rateios por competencia.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Operadora de saude
* Auditoria

---

# Pre-condicoes

* Plano de saude ativo.
* Arquivo ou lote disponivel.

---

# Gatilho

O processo inicia quando a coparticipacao e importada.

---

# Fluxo Principal

### Etapa 1

Sistema recebe o arquivo.

### Etapa 2

Sistema valida estrutura e integridade.

### Etapa 3

Sistema importa os valores.

### Etapa 4

Sistema grava a memoria de importacao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Arquivo invalido

### Condicao

O layout nao e reconhecido.

### Fluxo

* Sistema rejeita a importacao.

---

# Pos-condicoes

* Coparticipacao importada ou rejeitada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A importacao deve preservar a origem.
* Os valores precisam ser conciliaveis.

---

# Entidades Envolvidas

## CopayImportBatch

```text
id
source
status
imported_at
```

---

# Casos Relacionados

* UC-BEN-008 - Gerenciar Plano de Saude
* UC-BEN-010 - Integrar Beneficios com Folha
