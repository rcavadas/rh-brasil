# UC-ESO-007

## Transmitir Evento S-1200

### Objetivo

Permitir a transmissao da remuneracao e folha ao eSocial.

---

# Atores

## Primarios

* Motor de eSocial

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Folha processada ou elegivel.

---

# Gatilho

O processo inicia quando o S-1200 e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema monta a remuneracao.

### Etapa 2

Sistema envia o evento.

### Etapa 3

Sistema grava o protocolo ou pendencia.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Folha divergente

### Condicao

Os valores nao batem com a base local.

### Fluxo

* Sistema sinaliza a divergencia.

---

# Pos-condicoes

* Evento transmitido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A remuneração deve refletir a folha vigente.
* A transmissao deve ser rastreavel.

---

# Entidades Envolvidas

## EsocialEvent

```text
id
event_type
status
protocol
sent_at
```

---

# Casos Relacionados

* UC-FOL-003 - Processar Folha Mensal
* UC-FER-010 - Integrar Ferias com Folha
