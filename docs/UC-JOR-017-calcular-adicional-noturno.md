# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-017 - Calcular Adicional Noturno

### Versao

1.0

---

# Objetivo

Permitir o calculo do adicional noturno sobre horas trabalhadas em periodo noturno, conforme jornada vigente, periodo parametrizado, acordos aplicaveis e regras corporativas, garantindo memoria de calculo, rastreabilidade e integracao com a folha de pagamento quando aprovado.

Baseline operacional:

- regra padrao: adicional noturno de 20% sobre a hora diurna, com hora noturna reduzida de 52 minutos e 30 segundos;
- a politica corporativa ou coletiva pode ampliar ou detalhar o tratamento, desde que versionada;
- o periodo noturno deve ser parametrizado por empresa ou categoria;
- o calculo sempre preserva memoria de competencia e origem.

---

# Atores

- Sistema de Ponto
- Analista de RH
- Gestor
- Folha de Pagamento
- Auditor

---

# Pre-condicoes

- Ponto tratado.
- Jornada vigente.
- Periodo noturno configurado para a empresa ou categoria.
- Marcacoes e/ou horas tratadas disponiveis.
- Regra de adicional noturno configurada.

---

# Gatilho

O processo inicia durante o fechamento, recalculo ou consolidacao do periodo de ponto quando houver horas elegiveis ao adicional noturno.

---

# Fluxo Principal

1. Sistema carrega jornada prevista e marcacoes tratadas.
2. Sistema identifica horas em periodo noturno conforme parametrizacao aplicavel.
3. Sistema aplica a hora noturna reduzida quando configurada.
4. Sistema calcula a quantidade de horas/minutos elegiveis.
5. Sistema aplica percentual de adicional noturno vigente.
6. Sistema separa eventos por data, periodo e eventual incidencia complementar.
7. Sistema registra memoria de calculo.
8. Sistema disponibiliza o valor calculado para conferencia ou aprovacao.
9. Sistema integra com folha quando aprovado.
10. Sistema registra auditoria do calculo.

---

# Fluxos Alternativos

## FA-01 - Periodo noturno nao configurado

Sistema bloqueia o calculo ou aplica regra padrao conforme politica.

## FA-02 - Ponto nao tratado

Sistema bloqueia o calculo final.

## FA-03 - Periodo ja fechado

Sistema exige reabertura para recalculo.

## FA-04 - Regra sindical ou corporativa ausente

Sistema usa regra padrao ou gera pendencia conforme configuracao.

---

# Pos-condicoes

- Adicional noturno calculado.
- Memoria de calculo registrada.
- Valor disponivel para folha quando aplicavel.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- O adicional noturno deve seguir o periodo configurado para a empresa ou categoria.
- A hora noturna reduzida deve ser considerada quando aplicavel.
- O calculo deve respeitar acordos coletivos e politicas internas vigentes.
- O valor calculado deve manter memoria por competencia.
- Somente valores aprovados devem ser enviados a folha quando houver etapa de aprovacao.
- O adicional noturno nao deve sobrescrever a jornada nem as marcacoes originais.

---

# Entidades Envolvidas

## NightShiftAllowanceCalculation

```text
id
employee_id
period_id
total_minutes
status
night_period_reference
calculation_base
created_at
created_by
updated_at
updated_by
```

## NightShiftAllowanceItem

```text
id
calculation_id
date
minutes
percentage
reason
reduced_hour_factor
source_reference
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Periodo | Obrigatorio |
| Colaborador | Obrigatorio |
| Regra de calculo | Obrigatorio |
| Periodo noturno | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Calcular |
| Gestor | Aprovar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/night-shift-allowance/calculate
```

```http
GET /api/v1/night-shift-allowance/calculations/{id}
```

```http
POST /api/v1/night-shift-allowance/calculations/{id}/approve
```

---

# Eventos de Dominio

```text
NightShiftAllowanceCalculated
NightShiftAllowanceApproved
NightShiftAllowanceSentToPayroll
```

---

# Integracoes Impactadas

- Folha
- Banco de horas
- Portal do gestor
- Analytics
- Auditoria

---

# Casos de Teste

## CT-JOR-017-001

Calcular adicional noturno em dia util.

Resultado esperado:

```text
Adicional noturno calculado com sucesso.
```

## CT-JOR-017-002

Calcular adicional noturno com regra ausente.

Resultado esperado:

```text
Sistema bloqueia ou cria pendencia conforme configuracao.
```

## CT-JOR-017-003

Enviar para folha sem aprovacao.

Resultado esperado:

```text
Sistema bloqueia.
```

---

# Metricas

- Adicionais noturnos por periodo
- Adicionais noturnos por area
- Custo estimado de adicional noturno

---

# Observacoes Arquiteturais

O adicional noturno deve ser calculado como evento proprio, mas permanecer coerente com o calculo de horas extras e com a base de ponto consolidada.

O valor calculado precisa ser reproduzivel por competencia e rastreavel ate a origem das marcacoes.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois da apuracao da jornada e do ponto, porque calcula um adicional legal derivado de faixas de horario e de regras vigentes.
