# UC-SST-006

## Registrar Exame Ocupacional

### Objetivo

Permitir o registro de exames ocupacionais com resultado, vigencia e vinculo opcional a ambiente.

---

# Atores

## Primarios

* Profissional de saude

## Secundarios

* SST
* Auditoria

---

# Pre-condicoes

* Colaborador ativo.
* Exame previsto.

---

# Gatilho

O processo inicia quando o exame ocupacional e registrado.

---

# Fluxo Principal

### Etapa 1

Usuario informa o tipo do exame.

### Etapa 2

Sistema valida o colaborador e a vigencia.

### Etapa 3

Sistema grava o resultado.

### Etapa 4

Sistema vincula a evidencia.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Exame incompleto

### Condicao

Ha campos obrigatorios ausentes.

### Fluxo

* Sistema bloqueia o envio.

---

# Pos-condicoes

* Exame registrado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Exames contêm dados sensiveis e exigem controle de acesso.
* A vigencia deve ser preservada.

---

# Entidades Envolvidas

## OccupationalExam

```text
id
employee_id
exam_type
result
performed_at
```

---

# Casos Relacionados

* UC-SST-007 - Emitir ASO
* UC-SST-010 - Controlar Treinamentos Obrigatorios de SST
