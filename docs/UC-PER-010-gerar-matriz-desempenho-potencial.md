# UC-PER-010

## Gerar Matriz Desempenho-Potencial

### Objetivo

Permitir a geracao de matriz de desempenho-potencial, como 9-box ou equivalente.

---

# Atores

## Primarios

* Gestor de desempenho

## Secundarios

* Performance
* Auditoria

---

# Pre-condicoes

* Resultados calibrados ou consolidados.
* Dados suficientes para mapeamento.

---

# Gatilho

O processo inicia quando a matriz e gerada.

---

# Fluxo Principal

### Etapa 1

Sistema coleta os resultados do ciclo.

### Etapa 2

Sistema posiciona os avaliados na matriz.

### Etapa 3

Sistema gera a visao consolidada.

### Etapa 4

Sistema disponibiliza o painel.

### Etapa 5

Sistema registra auditoria quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Dados insuficientes

### Condicao

Nao ha avaliacao suficiente.

### Fluxo

* Sistema sinaliza a lacuna.

---

# Pos-condicoes

* Matriz gerada.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A matriz deve ser agregada e controlada.
* O recorte nao pode expor dados indevidos.

---

# Entidades Envolvidas

## PerformancePotentialMatrix

```text
id
cycle_id
employee_id
performance_band
potential_band
```

---

# Casos Relacionados

* UC-PER-009 - Calibrar Resultados
* UC-BI-008 - Consultar Indicadores de Desempenho
