# UC-ESO-010

## Conciliar Totalizadores do eSocial

### Objetivo

Permitir a conciliacao dos totalizadores enviados com os dados locais.

---

# Atores

## Primarios

* Gestor de eSocial

## Secundarios

* Motor de eSocial
* Auditoria

---

# Pre-condicoes

* Eventos transmitidos ou fechados.

---

# Gatilho

O processo inicia quando a conciliacao e executada.

---

# Fluxo Principal

### Etapa 1

Sistema coleta os totalizadores.

### Etapa 2

Sistema compara com a base local.

### Etapa 3

Sistema identifica divergencias.

### Etapa 4

Sistema registra o resultado.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Divergencia encontrada

### Condicao

Os totalizadores nao batem.

### Fluxo

* Sistema sinaliza a divergencia e preserva o historico.

---

# Pos-condicoes

* Conciliacao executada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A conciliacao nao pode corromper o historico local.
* O resultado precisa ser rastreavel.

---

# Entidades Envolvidas

## EsocialReconciliation

```text
id
tenant_id
status
divergence_count
reconciled_at
```

---

# Casos Relacionados

* UC-ESO-009 - Transmitir Evento S-1299
* UC-SEC-010 - Auditar Acessos e Operacoes
