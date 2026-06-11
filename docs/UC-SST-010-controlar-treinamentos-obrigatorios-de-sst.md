# UC-SST-010

## Controlar Treinamentos Obrigatorios de SST

### Objetivo

Permitir o controle de treinamentos obrigatorios de SST, com vencimentos e reciclagem.

---

# Atores

## Primarios

* Gestor de SST

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Treinamentos catalogados.
* Regras de obrigatoriedade definidas.

---

# Gatilho

O processo inicia quando o treinamento obrigatorio e controlado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica o treinamento exigido.

### Etapa 2

Sistema vincula ao colaborador.

### Etapa 3

Sistema monitora vencimentos e reciclagem.

### Etapa 4

Sistema atualiza o status.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Treinamento vencido

### Condicao

O vencimento foi ultrapassado.

### Fluxo

* Sistema sinaliza a reciclagem pendente.

---

# Pos-condicoes

* Treinamento controlado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O vencimento deve ser rastreavel.
* A obrigatoriedade precisa respeitar a politica do tenant.

---

# Entidades Envolvidas

## MandatorySstTraining

```text
id
employee_id
training_name
expires_at
status
```

---

# Casos Relacionados

* UC-LMS-007 - Controlar Reciclagem Obrigatoria
* UC-SST-006 - Registrar Exame Ocupacional
