# UC-SST-005

## Gerenciar LTCAT

### Objetivo

Permitir o gerenciamento do laudo tecnico de condicoes ambientais do trabalho.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Auditoria

---

# Pre-condicoes

* Ambiente de trabalho cadastrado.
* Responsavel tecnico definido.

---

# Gatilho

O processo inicia quando o LTCAT e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario abre o laudo.

### Etapa 2

Sistema apresenta a versao vigente.

### Etapa 3

Usuario atualiza o documento.

### Etapa 4

Sistema registra a nova versao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Laudo inexistente

### Condicao

Nao ha documento para o ambiente.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* LTCAT atualizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O laudo deve ser versionado.
* A relacao com o ambiente precisa ser rastreavel.

---

# Entidades Envolvidas

## LtcatReport

```text
id
work_environment_id
version
status
effective_from
```

---

# Casos Relacionados

* UC-SST-004 - Gerenciar PCMSO
* UC-SST-006 - Registrar Exame Ocupacional
