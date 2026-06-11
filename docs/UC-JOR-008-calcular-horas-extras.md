# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-008 — Calcular Horas Extras

### Versão

1.0

---

# Objetivo

Permitir o cálculo automático das horas extras e do adicional noturno com base em jornada prevista, marcações tratadas, feriados, domingos e regras sindicais ou corporativas.

---

# Atores

- Sistema de Ponto
- Analista de RH
- Gestor
- Folha de Pagamento

---

# Pré-condições

- Ponto tratado
- Jornada vigente
- Regras de horas extras configuradas
- Calendário de feriados configurado

---

# Gatilho

O processo inicia durante o fechamento ou recálculo do período de ponto.

---

# Fluxo Principal

1. Sistema carrega jornada prevista
2. Sistema carrega marcações tratadas
3. Sistema identifica excedentes de jornada
4. Sistema aplica tolerâncias
5. Sistema classifica horas extras
6. Sistema aplica percentuais
7. Sistema separa feriados e domingos
8. Sistema identifica períodos noturnos e calcula adicional noturno quando aplicável
9. Sistema registra memória de cálculo
10. Sistema disponibiliza valores para aprovação
11. Sistema integra com folha quando aprovado

---

# Fluxos Alternativos

## FA-01 — Ponto não tratado

Sistema bloqueia cálculo final.

## FA-02 — Regra sindical ausente

Sistema usa regra padrão ou gera pendência conforme configuração.

## FA-03 — Período já fechado

Sistema exige reabertura para recalcular.

---

# Pós-Condições

- Horas extras calculadas
- Memória de cálculo registrada
- Valores disponíveis para folha

---

# Regras de Negócio Relacionadas

- Horas extras devem considerar jornada vigente
- Percentuais devem ser parametrizáveis
- Horas em feriados podem ter tratamento específico
- Adicional noturno deve ser calculado conforme período configurado e regras aplicáveis
- Somente horas aprovadas devem ir para folha

---

# Entidades Envolvidas

## OvertimeCalculation

```text
id
employee_id
period_id
total_minutes
status
```
## OvertimeCalculationItem

```text
id
calculation_id
date
minutes
percentage
reason
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Período | Obrigatório |
| Colaborador | Obrigatório |
| Regra de cálculo | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Calcular |
| Gestor | Aprovar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/overtime/calculate
```
```http
GET /api/v1/overtime/calculations/{id}
```
```http
POST /api/v1/overtime/calculations/{id}/approve
```

---

# Eventos de Domínio

```text
OvertimeCalculated
OvertimeApproved
OvertimeSentToPayroll
```

---

# Integrações Impactadas

- Folha
- Banco de horas
- Portal do Gestor
- Analytics

---

# Casos de Teste

## CT-JOR-008-001

Calcular hora extra comum

Resultado esperado:

```text
Horas calculadas com percentual correto.
```
## CT-JOR-008-002

Calcular feriado

Resultado esperado:

```text
Hora classificada como feriado.
```
## CT-JOR-008-003

Enviar para folha sem aprovação

Resultado esperado:

```text
Sistema bloqueia.
```

## CT-JOR-008-004

Calcular adicional noturno

Resultado esperado:

```text
Adicional noturno calculado.
```

---

# Métricas

- Horas extras por período
- Horas extras por área
- Custo estimado de horas extras
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois da marcacao, dos ajustes e do tratamento de inconsistencias, porque converte o ponto validado em horas extras apuradas.
