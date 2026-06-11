# UC-FER-003

## Consultar Saldo de Ferias

### Objetivo

Permitir a consulta do saldo disponivel, vencimentos e periodo atual de ferias.

---

# Atores

## Primarios

* Colaborador
* Gestor de RH

## Secundarios

* Portal administrativo
* Motor de ferias
* Auditoria

---

# Pre-condicoes

* Colaborador ativo.
* Saldo calculado ou estimado.

---

# Gatilho

O processo inicia quando o saldo de ferias e consultado.

---

# Fluxo Principal

### Etapa 1

Sistema recupera o saldo acumulado.

### Etapa 2

Sistema apresenta periodo aquisitivo e concessivo.

### Etapa 3

Sistema exibe vencimentos e historico basico.

### Etapa 4

Sistema registra auditoria quando exigido.

---

# Fluxos Alternativos

## FA-01 - Saldo indisponivel

### Condicao

Nao ha calculo consolidado.

### Fluxo

* Sistema sinaliza a indisponibilidade parcial.

---

# Pos-condicoes

* Saldo consultado.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* A consulta deve respeitar finalidade e acesso.
* O saldo deve refletir o historico do colaborador.

---

# Entidades Envolvidas

## VacationBalance

```text
id
employee_id
available_days
expiry_at
updated_at
```

---

# Casos Relacionados

* UC-FER-001 - Apurar Periodo Aquisitivo
* UC-FER-004 - Solicitar Ferias
