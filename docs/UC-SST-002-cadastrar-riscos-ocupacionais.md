# UC-SST-002

## Cadastrar Riscos Ocupacionais

### Objetivo

Permitir o mapeamento de riscos ocupacionais por ambiente de trabalho.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* Motor de SST
* Auditoria

---

# Pre-condicoes

* Ambiente de trabalho cadastrado.

---

# Gatilho

O processo inicia quando os riscos sao cadastrados.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o ambiente.

### Etapa 2

Sistema apresenta os riscos disponiveis.

### Etapa 3

Usuario define intensidade e frequencia.

### Etapa 4

Sistema grava o risco.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Risco inconsistente

### Condicao

O risco nao e compativel com o ambiente.

### Fluxo

* Sistema bloqueia o cadastro.

---

# Pos-condicoes

* Riscos cadastrados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Riscos precisam ser versionados por ambiente.
* A classificação deve ser rastreavel.

---

# Entidades Envolvidas

## OccupationalRisk

```text
id
work_environment_id
name
severity
status
```

---

# Casos Relacionados

* UC-SST-003 - Gerenciar PGR
* UC-SST-004 - Gerenciar PCMSO
