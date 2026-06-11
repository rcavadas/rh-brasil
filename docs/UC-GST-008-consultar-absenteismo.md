# UC-GST-008

## Consultar Absenteismo

### Objetivo

Permitir que o gestor consulte o absenteismo consolidado da equipe, com recorte por periodo e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* API de BI
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Indicador de absenteismo disponivel.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o gestor acessa absenteismo da equipe.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Absenteismo
```

### Etapa 2

Sistema apresenta os periodos disponiveis.

### Etapa 3

Gestor seleciona o periodo desejado.

### Etapa 4

Sistema consolida faltas, atrasos e afastamentos aplicaveis.

### Etapa 5

Sistema exibe o indicador e, quando previsto, o detalhamento agregado.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados insuficientes

### Condicao

Nao ha dados suficientes para o periodo.

### Fluxo

* Sistema informa indisponibilidade parcial.

---

# Pos-condicoes

* Absenteismo consultado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O gestor ve apenas sua equipe.
* O indicador deve respeitar agregacao e privacidade.

---

# Entidades Envolvidas

## AbsenteeismSnapshot

```text
id
manager_id
period
absent_days
late_minutes
leave_days
```

## AuditEvent

```text
id
actor_subject
tenant_id
action
resource_type
resource_id
created_at
```

---

# Casos Relacionados

* UC-BI-004 - Consultar Absenteismo
* UC-BI-001 - Consultar Dashboard Executivo

