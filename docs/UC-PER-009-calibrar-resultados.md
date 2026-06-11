# UC-PER-009

## Calibrar Resultados

### Objetivo

Permitir a calibracao dos resultados entre avaliadores e liderancas.

---

# Atores

## Primarios

* Gestor de desempenho

## Secundarios

* Performance
* Auditoria

---

# Pre-condicoes

* Resultados consolidados.
* Participantes autorizados.

---

# Gatilho

O processo inicia quando a calibracao e aberta.

---

# Fluxo Principal

### Etapa 1

Sistema apresenta os resultados.

### Etapa 2

Participantes revisam a distribuicao.

### Etapa 3

Sistema permite ajustes conforme regra.

### Etapa 4

Sistema grava a calibracao.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Divergencia nao resolvida

### Condicao

Nao ha consenso sobre a calibracao.

### Fluxo

* Sistema mantém a rodada aberta.

---

# Pos-condicoes

* Resultados calibrados ou pendentes.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A calibracao deve preservar o historico original.
* Os ajustes precisam ser auditaveis.

---

# Entidades Envolvidas

## CalibrationSession

```text
id
cycle_id
status
started_at
closed_at
```

---

# Casos Relacionados

* UC-PER-010 - Gerar Matriz Desempenho-Potencial
* UC-PER-006 - Avaliar Metas
