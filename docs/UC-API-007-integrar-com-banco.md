# UC-API-007

## Integrar com Banco

### Objetivo

Permitir a integracao com banco para remessas, retornos ou sincronizacoes operacionais.

---

# Atores

## Primarios

* Motor de integracoes

## Secundarios

* Banco externo
* Auditoria

---

# Pre-condicoes

* Contrato de integracao configurado.

---

# Gatilho

O processo inicia quando a integracao com banco e executada.

---

# Fluxo Principal

### Etapa 1

Sistema monta a mensagem.

### Etapa 2

Sistema envia ao banco.

### Etapa 3

Sistema grava o retorno.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Banco indisponivel

### Condicao

O canal nao responde.

### Fluxo

* Sistema sinaliza a falha e preserva o historico.

---

# Pos-condicoes

* Integracao executada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A remessa precisa ser conciliavel.
* O reprocessamento deve ser rastreavel.

---

# Entidades Envolvidas

## BankIntegrationRequest

```text
id
integration_id
status
executed_at
```

---

# Casos Relacionados

* UC-API-006 - Integrar com ERP
* UC-API-010 - Monitorar Integracoes
