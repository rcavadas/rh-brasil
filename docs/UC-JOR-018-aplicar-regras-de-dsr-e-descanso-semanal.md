# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-018 - Aplicar Regras de DSR e Descanso Semanal

### Versao

1.0

---

# Objetivo

Permitir a aplicacao das regras de DSR e de descanso semanal sobre a apuracao de ponto, considerando jornada vigente, escalas, feriados, domingos, faltas, ausencias justificadas e politicas corporativas ou coletivas, com registro de memoria de calculo e disponibilizacao para folha quando aplicavel.

Baseline operacional:

- o repouso semanal remunerado segue a regra legal e a politica coletiva ou corporativa aplicavel;
- domingos e feriados entram no calculo conforme escala, jornada e elegibilidade;
- ausencias justificadas podem manter ou afetar o direito conforme politica versionada;
- a regra nunca sobrescreve a marcacao original e sempre preserva memoria de competencia.

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
- Jornada ou escala vigente.
- Calendario de feriados e excecoes configurado quando aplicavel.
- Regra de DSR ou descanso semanal configurada.
- Marcacoes e ocorrencias de jornada disponiveis.

---

# Gatilho

O processo inicia durante o fechamento, recalculo ou consolidacao do periodo quando o sistema precisa apurar direito a DSR ou tratamento equivalente de descanso semanal.

---

# Fluxo Principal

1. Sistema carrega jornada, escala e ocorrencias do periodo.
2. Sistema identifica dias com trabalho, falta, afastamento, feriado ou domingo.
3. Sistema aplica criterios de elegibilidade ao DSR conforme politica configurada.
4. Sistema verifica perda, manutencao ou proporcionalidade do descanso semanal.
5. Sistema identifica reflexos sobre domingos, feriados e ausencias justificadas.
6. Sistema calcula o evento correspondente quando aplicavel.
7. Sistema registra memoria de calculo.
8. Sistema disponibiliza o resultado para conferencia.
9. Sistema integra com folha quando a regra exigir reflexo financeiro.
10. Sistema registra auditoria do calculo.

---

# Fluxos Alternativos

## FA-01 - Regra de DSR nao configurada

Sistema usa regra padrao ou gera pendencia conforme politica.

## FA-02 - Ponto nao tratado

Sistema bloqueia o calculo final.

## FA-03 - Periodo ja fechado

Sistema exige reabertura para recalcular.

## FA-04 - Ausencia justificada

Sistema aplica tratamento proporcional conforme configuracao.

---

# Pos-condicoes

- DSR ou descanso semanal calculado conforme regra aplicavel.
- Memoria de calculo registrada.
- Valor ou indicacao de elegibilidade disponivel para folha quando aplicavel.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- O tratamento de DSR deve respeitar a politica corporativa, acordo coletivo ou regra parametrizada.
- Faltas e ausencias justificadas podem afetar ou nao o DSR conforme configuracao vigente.
- O calculo deve considerar domingos e feriados quando impactarem o direito ou o reflexo.
- O evento calculado nao deve alterar a marcacao original nem a jornada base.
- Somente valores aprovados ou consolidados devem seguir para folha quando houver reflexo financeiro.

---

# Entidades Envolvidas

## WeeklyRestAllowanceCalculation

```text
id
employee_id
period_id
status
rule_reference
calculation_basis
total_minutes
created_at
created_by
updated_at
updated_by
```

## WeeklyRestAllowanceItem

```text
id
calculation_id
date
day_type
minutes
percentage
reason
source_reference
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Periodo | Obrigatorio |
| Colaborador | Obrigatorio |
| Regra de DSR | Obrigatorio |
| Base de calculo | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Calcular |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/weekly-rest-allowance/calculate
```

```http
GET /api/v1/weekly-rest-allowance/calculations/{id}
```

```http
POST /api/v1/weekly-rest-allowance/calculations/{id}/approve
```

---

# Eventos de Dominio

```text
WeeklyRestAllowanceCalculated
WeeklyRestAllowanceApproved
WeeklyRestAllowanceSentToPayroll
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

## CT-JOR-018-001

Calcular DSR com jornada e frequencia validas.

Resultado esperado:

```text
DSR calculado com sucesso.
```

## CT-JOR-018-002

Calcular DSR com regra ausente.

Resultado esperado:

```text
Sistema bloqueia ou cria pendencia conforme configuracao.
```

## CT-JOR-018-003

Recalcular periodo fechado.

Resultado esperado:

```text
Sistema exige reabertura.
```

---

# Metricas

- DSR calculados por periodo
- DSR afetados por ausencia
- Custo estimado de reflexos de DSR

---

# Observacoes Arquiteturais

DSR deve ser tratado como evento proprio da apuracao de ponto, com memoria reproduzivel e rastreabilidade por competencia.

O caso nao deve sobrescrever jornadas ou marcacoes originais; ele apenas consolida reflexos elegiveis para uso posterior.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois da analise de jornada, ponto e calendario, porque aplica regras de repouso que influenciam folha e conformidade trabalhista.
