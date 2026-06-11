# UC-SST-004

## Gerenciar PCMSO

### Objetivo

Permitir o gerenciamento do Programa de Controle Medico de Saude Ocupacional.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Auditoria

---

# Pre-condicoes

* Ambiente e riscos cadastrados.

---

# Gatilho

O processo inicia quando o PCMSO e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario abre o programa.

### Etapa 2

Sistema apresenta a vigencia e o responsavel tecnico.

### Etapa 3

Usuario atualiza o documento.

### Etapa 4

Sistema grava a nova versao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Documento invalido

### Condicao

O conteudo nao atende a politica.

### Fluxo

* Sistema bloqueia a publicacao.

---

# Pos-condicoes

* PCMSO atualizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O PCMSO deve permanecer versionado.
* O documento precisa ser rastreavel.

---

# Entidades Envolvidas

## OccupationalHealthProgram

```text
id
tenant_id
type
version
effective_from
```

---

# Casos Relacionados

* UC-SST-003 - Gerenciar PGR
* UC-SST-005 - Gerenciar LTCAT
