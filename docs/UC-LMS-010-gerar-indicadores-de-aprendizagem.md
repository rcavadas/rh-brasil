# UC-LMS-010

## Gerar Indicadores de Aprendizagem

### Objetivo

Permitir a geracao de indicadores de treinamento e aprendizagem para analise gerencial.

---

# Atores

## Primarios

* Gestor de treinamento

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Dados de treinamento disponiveis.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando os indicadores sao gerados.

---

# Fluxo Principal

### Etapa 1

Sistema coleta dados de cursos, matriculas e conclusoes.

### Etapa 2

Sistema agrega os resultados.

### Etapa 3

Sistema calcula os indicadores.

### Etapa 4

Sistema disponibiliza o painel.

### Etapa 5

Sistema registra auditoria quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Base insuficiente

### Condicao

Os dados nao sao suficientes para o indicador.

### Fluxo

* Sistema sinaliza o recorte incompleto.

---

# Pos-condicoes

* Indicadores gerados.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* Indicadores devem ser agregados.
* O recorte nao pode expor dados indevidos.

---

# Entidades Envolvidas

## LearningIndicator

```text
id
tenant_id
metric
value
period
```

---

# Casos Relacionados

* UC-LMS-009 - Consultar Historico de Treinamento
* UC-BI-007 - Consultar Indicadores de Treinamento
