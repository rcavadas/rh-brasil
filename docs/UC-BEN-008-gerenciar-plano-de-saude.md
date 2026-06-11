# UC-BEN-008

## Gerenciar Plano de Saude

### Objetivo

Permitir adesao, elegibilidade e acompanhamento de plano de saude e coparticipacao.

---

# Atores

## Primarios

* Gestor de beneficios

## Secundarios

* Operadora de saude
* Motor de beneficios
* Auditoria

---

# Pre-condicoes

* Plano de saude cadastrado.
* Colaborador elegivel.

---

# Gatilho

O processo inicia quando o plano e gerenciado.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o plano.

### Etapa 2

Sistema valida elegibilidade e dependentes.

### Etapa 3

Sistema registra adesao ou ajuste.

### Etapa 4

Sistema controla coparticipacao quando aplicavel.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Coparticipacao nao cadastrada

### Condicao

Nao ha regra financeira definida.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* Plano gerenciado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Dados de saude exigem controle LGPD e acesso restrito.
* A coparticipacao precisa ser rastreavel.

---

# Entidades Envolvidas

## HealthPlanEnrollment

```text
id
employee_id
plan_name
status
copay_rule
```

---

# Casos Relacionados

* UC-BEN-009 - Importar Coparticipacao
* UC-BEN-010 - Integrar Beneficios com Folha
