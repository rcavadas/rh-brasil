# UC-RES-009

## Fechar Rescisao

### Objetivo

Permitir o fechamento operacional do processo de rescisao.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Motor de rescisao
* Auditoria

---

# Pre-condicoes

* Calculos concluidos.
* Documentos gerados.

---

# Gatilho

O processo inicia quando a rescisao e fechada.

---

# Fluxo Principal

### Etapa 1

Sistema valida os calculos e documentos.

### Etapa 2

Usuario confirma o fechamento.

### Etapa 3

Sistema muda o estado para fechado.

### Etapa 4

Sistema registra a trilha final.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Pendencia aberta

### Condicao

Ainda ha calculo ou documento pendente.

### Fluxo

* Sistema bloqueia o fechamento.

---

# Pos-condicoes

* Rescisao fechada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O fechamento nao pode apagar historico.
* A memoria de calculo precisa permanecer acessivel.

---

# Entidades Envolvidas

## RescissionClose

```text
id
termination_request_id
status
closed_at
```

---

# Casos Relacionados

* UC-RES-008 - Gerar Documentos Rescisorios
* UC-RES-010 - Transmitir Desligamento ao eSocial
