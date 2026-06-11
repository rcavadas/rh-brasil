# UC-FER-002

## Controlar Periodo Concessivo

### Objetivo

Permitir o controle do periodo concessivo, vencimentos e janela de utilizacao das ferias.

---

# Atores

## Primarios

* Gestor de RH

## Secundarios

* Motor de ferias
* Auditoria

---

# Pre-condicoes

* Periodo aquisitivo apurado.

---

# Gatilho

O processo inicia quando o periodo concessivo e monitorado.

---

# Fluxo Principal

### Etapa 1

Sistema calcula a janela concessiva.

### Etapa 2

Sistema sinaliza vencimentos proximos.

### Etapa 3

Sistema bloqueia uso fora da janela.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Janela expirada

### Condicao

O periodo concessivo venceu.

### Fluxo

* Sistema sinaliza risco operacional e legal.

---

# Pos-condicoes

* Periodo concessivo monitorado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A janela concessiva deve ser calculada por competencia.
* O vencimento precisa ser rastreavel.

---

# Entidades Envolvidas

## VacationConcessiveWindow

```text
id
employee_id
starts_at
ends_at
status
```

---

# Casos Relacionados

* UC-FER-001 - Apurar Periodo Aquisitivo
* UC-FER-004 - Solicitar Ferias
