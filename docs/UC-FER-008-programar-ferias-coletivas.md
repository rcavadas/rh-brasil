# UC-FER-008

## Programar Ferias Coletivas

### Objetivo

Permitir a programacao de ferias coletivas por empresa, filial ou unidade.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Politica coletiva definida.
* Periodo e publicos elegiveis.

---

# Gatilho

O processo inicia quando as ferias coletivas sao programadas.

---

# Fluxo Principal

### Etapa 1

Usuario define a abrangencia.

### Etapa 2

Sistema valida a janela coletiva.

### Etapa 3

Sistema registra o calendario.

### Etapa 4

Sistema notifica os envolvidos.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Sobreposicao de periodo

### Condicao

O periodo conflita com outro evento de afastamento.

### Fluxo

* Sistema bloqueia a programacao.

---

# Pos-condicoes

* Ferias coletivas programadas ou bloqueadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A programacao coletiva deve respeitar a politica operacional.
* O historico precisa ser preservado.

---

# Entidades Envolvidas

## CollectiveVacationPlan

```text
id
scope
starts_at
ends_at
status
```

---

# Casos Relacionados

* UC-FER-002 - Controlar Periodo Concessivo
* UC-FER-009 - Emitir Aviso de Ferias
