# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-005 — Tratar Inconsistências de Ponto

### Versão

1.0

---

# Objetivo

Permitir que RH e gestores identifiquem, analisem e tratem inconsistências de ponto, como marcações faltantes, atrasos, saídas antecipadas, jornadas excedentes e conflitos de escala.

---

# Atores

- Analista de RH
- Gestor
- Administrador do Sistema

---

# Pré-Condições

- Marcações importadas ou registradas
- Jornada vigente
- Regras de tratamento configuradas

---

# Gatilho

O processo inicia quando o sistema identifica divergências entre jornada prevista e marcações realizadas.

---

# Fluxo Principal

1. Acessar Painel de Tratamento de Ponto
2. Selecionar período e equipe
3. Sistema apresenta inconsistências
4. Usuário analisa ocorrência
5. Usuário informa ajuste ou justificativa
6. Sistema recalcula jornada
7. Sistema registra alteração complementar
8. Sistema envia para aprovação quando necessário
9. Sistema atualiza espelho de ponto
10. Sistema registra auditoria

---

# Fluxos Alternativos

## FA-01 — Inconsistência sem justificativa

Sistema impede conclusão.
## FA-02 — Período fechado

Sistema exige reabertura formal.
## FA-03 — Ajuste rejeitado

Sistema mantém inconsistência pendente.

---

# Pós-Condições

- Inconsistência tratada
- Histórico registrado
- Espelho atualizado

---

# Regras de Negócio Relacionadas

- Marcação original deve ser preservada
- Ajustes devem possuir justificativa
- Tratamento em período fechado deve exigir permissão especial
- Toda alteração deve ser auditável

---

# Entidades Envolvidas

## TimeSheet

```text
id
employee_id
period_start
period_end
status
```
## TimeSheetInconsistency

```text
id
timesheet_id
type
date
status
```
## TimeSheetAdjustment

```text
id
inconsistency_id
adjustment_type
justification
created_by
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Período | Obrigatório |
| Inconsistência | Obrigatório |
| Justificativa | Obrigatório para ajuste |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Tratar |
| Gestor | Tratar equipe |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
GET /api/v1/timesheets/inconsistencies
```
```http
POST /api/v1/timesheets/adjustments
```
```http
POST /api/v1/timesheets/{id}/recalculate
```

---

# Eventos de Domínio

```text
TimeSheetInconsistencyDetected
TimeSheetAdjusted
TimeSheetRecalculated
```

---

# Integrações Impactadas

- Workflow
- Espelho de ponto
- Banco de horas
- Folha

---

# Casos de Teste

## CT-JOR-005-001

Tratar marcação faltante

Resultado esperado:

```text
Ajuste criado.
```
## CT-JOR-005-002

Tratar sem justificativa

Resultado esperado:

```text
Sistema bloqueia.
```
## CT-JOR-005-003

Recalcular período

Resultado esperado:

```text
Horas recalculadas.
```

---

# Métricas

- Inconsistências por tipo
- Pendências por gestor
- Tempo médio de tratamento
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois da captura e da importacao, porque fecha a analise dos desvios antes que o usuario solicite ajustes ou que o sistema avance para calculos de horas.
