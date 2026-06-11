# UC-DEC-004

## Calcular Medias de Verbas Variaveis

### Objetivo

Permitir o calculo das medias de verbas variaveis para o 13o salario.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* Folha de pagamento
* Auditoria

---

# Pre-condicoes

* Verbas variaveis disponiveis.

---

# Gatilho

O processo inicia quando as medias sao calculadas.

---

# Fluxo Principal

### Etapa 1

Sistema identifica as verbas aplicaveis.

### Etapa 2

Sistema calcula a media.

### Etapa 3

Sistema grava a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Verba insuficiente

### Condicao

Nao ha base para media.

### Fluxo

* Sistema sinaliza a falta de dados.

---

# Pos-condicoes

* Medias calculadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A media deve ser por competencia.
* A origem das verbas precisa ser rastreavel.

---

# Entidades Envolvidas

## VariableEarningsAverage

```text
id
employee_id
earnings_type
amount
period
```

---

# Casos Relacionados

* UC-DEC-001 - Apurar Avos de Decimo Terceiro
* UC-DEC-005 - Calcular Encargos de Decimo Terceiro
