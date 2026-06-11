# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-007 - Calcular FGTS

### Versao

1.0

---

# Objetivo

Permitir o calculo do FGTS devido na competencia, considerando a base de incidencia configurada, a aliquota aplicavel, o tipo de vinculo, a origem do calculo e os ajustes decorrentes de folha mensal, folha complementar, 13o salario ou outras competencias habilitadas, com memoria de calculo auditavel e preparacao para FGTS Digital e rotinas correlatas.

---

# Atores

## Primarios

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundarios

- Folha de Pagamento
- FGTS Digital
- Contabilidade
- Auditoria
- eSocial

---

# Pre-condicoes

- Empresa cadastrada.
- Usuario autenticado.
- Usuario com permissao para calcular FGTS.
- Rubricas com incidencia de FGTS configurada.
- Competencia de apuracao definida.
- Base de remuneracao disponivel para a competencia.
- Aliquota ou regra de FGTS configurada para o tipo de vinculo.
- Vinculos elegiveis identificados.

---

# Gatilho

O processo inicia quando a area de folha precisa apurar o FGTS da competencia, seja para a folha mensal, para folha complementar, para 13o salario ou para outro escopo habilitado pela politica da empresa.

---

# Fluxo Principal

### Etapa 1

Usuario acessa:

```text
Folha de Pagamento
-> Encargos
-> FGTS
```

### Etapa 2

Sistema apresenta as competencias e os escopos de calculo disponiveis.

### Etapa 3

Usuario seleciona a competencia e a origem do calculo:

- folha mensal;
- folha complementar;
- 13o salario;
- recalculo;
- ajuste retroativo.

### Etapa 4

Sistema carrega a base de incidencia fundiaria de cada colaborador.

### Etapa 5

Sistema identifica as rubricas que compoem a base, conforme incidencias configuradas e regras da competencia.

### Etapa 6

Sistema aplica a aliquota de FGTS configurada para o tipo de vinculo e para a competencia.

### Etapa 7

Sistema calcula o valor devido de FGTS por colaborador, considerando:

- base de incidencia validada;
- tipo de vinculo;
- percentual aplicavel;
- arredondamento configurado;
- ajustes por eventos retroativos;
- complementos da folha mensal;
- reflexos do 13o salario, quando habilitado.

### Etapa 8

Sistema consolida a memoria de calculo por colaborador e por competencia.

### Etapa 9

Sistema prepara os dados para consumo do FGTS Digital ou de rotina fundiaria equivalente, conforme integracao disponivel.

### Etapa 10

Sistema disponibiliza o resultado para conferencia e integracao com os processos dependentes.

### Etapa 11

Sistema registra auditoria e mantém o calculo rastreavel.

---

# Fluxos Alternativos

## FA-01 - Base de FGTS inconsistente

### Condicao

A base fundiaria nao pode ser montada por falta de incidencia configurada ou por conflito de configuracao.

### Acao

Sistema bloqueia o calculo para os itens inconsistentes e aponta a origem do problema.

### Resultado

Calculo fica pendente de saneamento.

---

## FA-02 - Aliquota ausente ou invalida

### Condicao

Nao existe aliquota valida ou regra parametrizada para o tipo de vinculo e a competencia.

### Acao

Sistema bloqueia o calculo.

### Resultado

Usuario precisa configurar ou selecionar a regra adequada.

---

## FA-03 - Competencia nao elegivel

### Condicao

A competencia nao permite calculo de FGTS no escopo selecionado.

### Acao

Sistema bloqueia a operacao e orienta o usuario a escolher outro escopo.

### Resultado

Calculo nao realizado para a competencia invalida.

---

## FA-04 - Reprocessamento nao autorizado

### Condicao

O periodo esta fechado ou o usuario nao possui permissao para recalculo.

### Acao

Sistema bloqueia o reprocessamento.

### Resultado

Historico original permanece inalterado.

---

## FA-05 - Divergencia por complemento ou retroativo

### Condicao

A folha complementar ou um evento retroativo altera a base original.

### Acao

Sistema recalcula apenas a diferenca impactada e preserva a memoria do calculo original.

### Resultado

FGTS complementar registrado sem sobrescrever a apuracao anterior.

---

# Pos-condicoes

## Sucesso

- FGTS calculado.
- Memoria de calculo preservada.
- Base fundiaria consolidada por colaborador e competencia.
- Dados preparados para FGTS Digital ou rotina equivalente.

## Falha

- Nenhuma alteracao persistida, exceto registros de erro e tentativa quando aplicavel.

---

# Regras de Negocio Relacionadas

- O calculo deve respeitar a incidencias de FGTS configuradas para cada rubrica.
- Rubricas sem incidencia de FGTS nao devem compor a base fundiaria.
- O percentual de FGTS deve ser parametrizavel conforme tipo de vinculo e competencia.
- O calculo deve abranger competencias mensais e reflexos habilitados pela politica do modulo.
- Folha complementar e eventos retroativos devem gerar recalculo apenas da parcela impactada.
- O calculo deve manter memoria por competencia e por colaborador.
- O calculo nao deve sobrescrever historico de competencias ja processadas.
- A base fundiaria deve ser auditavel e conciliavel com o FGTS Digital.
- Divergencias entre folha e FGTS Digital devem gerar alerta de conferencia.
- A liquidacao, recolhimento ou transmissao nao fazem parte deste caso de uso, salvo quando houver integracao explicita em processo adjacente.

---

# Entidades Envolvidas

## PayrollFgtsCalculation

```text
id
company_id
competence
source_type
status
calculated_at
calculated_by
total_amount
```

## PayrollFgtsItem

```text
id
payroll_fgts_calculation_id
employee_id
base_amount
fgts_amount
status
```

## PayrollFgtsBaseComponent

```text
id
payroll_fgts_item_id
rubric_id
description
amount
incidence_type
```

## PayrollFgtsCalculationMemory

```text
id
payroll_fgts_calculation_id
employee_id
calculation_ref
created_at
```

---

# Campos Obrigatorios

| Campo | Obrigatorio |
|---|---|
| Empresa | Sim |
| Competencia | Sim |
| Base de incidencia | Sim |
| Aliquota aplicada | Sim |
| Status do calculo | Sim |
| Memoria de calculo | Sim |

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Total |
| RH Folha | Calcular e consultar |
| Gestor | Nao |
| Colaborador | Consulta limitada, quando habilitada |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payrolls/fgts/calculate
```

```http
GET /api/v1/payrolls/fgts/{id}
```

```http
POST /api/v1/payrolls/fgts/{id}/recalculate
```

```http
POST /api/v1/payrolls/fgts/{id}/lock
```

---

# Eventos de Dominio

```text
PayrollFgtsCalculated
PayrollFgtsRecalculated
PayrollFgtsLocked
PayrollFgtsCalculationFailed
```

---

# Integracoes Impactadas

- Folha de Pagamento mensal.
- Folha complementar.
- 13o salario.
- FGTS Digital.
- Contabilidade.
- Auditoria.
- Analytics e BI.
- eSocial, quando houver reflexo na integracao de bases.

---

# Casos de Teste

### CT-FOL-007-001

Calcular FGTS para competencia valida com bases consistentes.

Resultado esperado:

```text
FGTS calculado com sucesso.
```

### CT-FOL-007-002

Calcular FGTS com rubrica sem incidencia configurada.

Resultado esperado:

```text
Sistema bloqueia o item inconsistente e aponta a origem.
```

### CT-FOL-007-003

Calcular FGTS com aliquota invalida.

Resultado esperado:

```text
Sistema bloqueia o calculo e informa a regra ausente ou invalida.
```

### CT-FOL-007-004

Recalcular FGTS em folha complementar.

Resultado esperado:

```text
Sistema registra a diferenca complementar sem sobrescrever o historico original.
```

### CT-FOL-007-005

Tentar recalcular FGTS em periodo fechado sem permissao.

Resultado esperado:

```text
Sistema bloqueia o reprocessamento.
```

---

# Metricas

- Valor total de FGTS por competencia.
- Valor total por colaborador e por empresa.
- Quantidade de recalculos por folha complementar.
- Quantidade de bloqueios por base inconsistente.
- Tempo medio de processamento por competencia.

---

# Observacoes Arquiteturais

O calculo de FGTS deve ser tratado como apuracao derivada, nunca como valor manual sem origem rastreavel.

A composicao da base precisa preservar a origem dos valores para permitir auditoria, reprocessamento e conciliacao com folha mensal, folha complementar, 13o salario e rotinas fundiarias.

O sistema deve separar a memoria do calculo original da memoria de recalculo complementar para que divergencias futuras possam ser explicadas com clareza.

---

# Lacunas adjacentes ao UC-FOL-007

O calculo de FGTS depende de definicoes posteriores, que devem permanecer em casos de uso proprios:

- UC-FOL-008 - Calcular IRRF;
- UC-FOL-009 - Gerar Holerite;
- UC-FOL-010 - Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido junto do INSS e da folha mensal, porque compoe uma base fundiaria que precisa permanecer coerente com incidencias e fechamento.
