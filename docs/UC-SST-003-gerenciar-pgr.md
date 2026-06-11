# UC-SST-003

## Gerenciar PGR

### Objetivo

Permitir o gerenciamento do Programa de Gerenciamento de Riscos.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Auditoria

---

# Pre-condicoes

* Riscos ocupacionais cadastrados.

---

# Gatilho

O processo inicia quando o PGR e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario abre o PGR.

### Etapa 2

Sistema apresenta o escopo e as versoes.

### Etapa 3

Usuario atualiza o documento.

### Etapa 4

Sistema grava a nova versao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - PGR sem base

### Condicao

Nao ha riscos mapeados suficientes.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* PGR atualizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O PGR deve ser versionado por vigencia.
* O historico nao pode ser apagado.

---

# Entidades Envolvidas

## RiskManagementProgram

```text
id
tenant_id
version
status
effective_from
```

---

# Casos Relacionados

* UC-SST-002 - Cadastrar Riscos Ocupacionais
* UC-SST-004 - Gerenciar PCMSO
