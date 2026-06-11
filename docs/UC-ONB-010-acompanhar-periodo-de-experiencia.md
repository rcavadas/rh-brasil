# UC-ONB-010

## Acompanhar Periodo de Experiencia

### Objetivo

Permitir o acompanhamento do periodo de experiencia com registros de marcos, alertas e decisao final.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Onboarding
* Auditoria

---

# Pre-condicoes

* Contrato assinado.
* Colaborador ativo.

---

# Gatilho

O processo inicia quando o periodo de experiencia passa a ser monitorado.

---

# Fluxo Principal

### Etapa 1

Sistema registra o inicio do periodo.

### Etapa 2

Sistema acompanha marcos e feedbacks.

### Etapa 3

Sistema sinaliza alertas de vencimento.

### Etapa 4

Sistema registra a decisao final.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Periodo encerrado sem avaliacao

### Condicao

Nao houve retorno no prazo.

### Fluxo

* Sistema sinaliza pendencia e mantém o historico.

---

# Pos-condicoes

* Periodo acompanhado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O periodo deve ter vigencia e marco final.
* O historico de acompanhamento nao pode ser perdido.

---

# Entidades Envolvidas

## TrialPeriod

```text
id
onboarding_process_id
starts_at
ends_at
status
```

---

# Casos Relacionados

* UC-ONB-006 - Assinar Contrato de Trabalho
* UC-ONB-009 - Atribuir Treinamentos Iniciais
