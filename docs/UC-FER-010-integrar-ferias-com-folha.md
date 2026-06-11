# UC-FER-010

## Integrar Ferias com Folha

### Objetivo

Permitir o reflexo das ferias na folha e no eSocial com trilha auditavel.

---

# Atores

## Primarios

* Motor de ferias

## Secundarios

* Folha de pagamento
* eSocial
* Auditoria

---

# Pre-condicoes

* Ferias calculadas e aprovadas.
* Calendario de pagamento disponivel.

---

# Gatilho

O processo inicia quando as ferias sao integradas a folha.

---

# Fluxo Principal

### Etapa 1

Sistema prepara os eventos de reflexo.

### Etapa 2

Sistema envia os dados para folha.

### Etapa 3

Sistema registra o reflexo no eSocial quando aplicavel.

### Etapa 4

Sistema grava o recibo sintetico.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Integração falha

### Condicao

O destino de folha ou eSocial nao responde.

### Fluxo

* Sistema sinaliza a falha e preserva o historico.

---

# Pos-condicoes

* Integração registrada ou falha sinalizada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O reflexo em folha precisa ser consistente com a aprovacao.
* A transmissao ao eSocial deve permanecer rastreavel.

---

# Entidades Envolvidas

## VacationPayrollIntegration

```text
id
vacation_request_id
status
payload_hash
sent_at
```

---

# Casos Relacionados

* UC-FER-006 - Calcular Ferias
* UC-ESO-007 - Transmitir Evento S-1200
