# UC-ESO-006

## Transmitir Evento S-2200

### Objetivo

Permitir a transmissao da admissao e vinculacao do colaborador.

---

# Atores

## Primarios

* Motor de eSocial

## Secundarios

* eSocial
* Auditoria

---

# Pre-condicoes

* Admissao disponivel.
* Ambiente e certificado configurados.

---

# Gatilho

O processo inicia quando o S-2200 e transmitido.

---

# Fluxo Principal

### Etapa 1

Sistema monta os dados da admissao.

### Etapa 2

Sistema envia o evento.

### Etapa 3

Sistema grava protocolo ou pendencia.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Admissao incompleta

### Condicao

Os dados nao estao consolidados.

### Fluxo

* Sistema bloqueia o envio.

---

# Pos-condicoes

* Evento transmitido ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A admissao precisa ser rastreavel.
* A ordem com os demais eventos deve ser preservada.

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

* UC-ATS-010 - Converter Candidato em Pre-Admissao
* UC-ONB-001 - Criar Processo de Pre-Admissao
