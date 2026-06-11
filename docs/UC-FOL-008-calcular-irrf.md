# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-008 - Calcular IRRF

### Versao

1.0

---

# Objetivo

Permitir o calculo do Imposto de Renda Retido na Fonte incidente sobre a folha de pagamento, considerando a tabela vigente, a base tributavel, as deducoes legais, a situacao cadastral do colaborador e os ajustes decorrentes de folha mensal, folha complementar, ferias, 13o salario ou outras competencias habilitadas, com memoria de calculo auditavel e preparacao para rotinas fiscais e de conferencia.

---

# Atores

## Primarios

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundarios

- Folha de Pagamento
- eSocial
- Rotinas Fiscais
- Contabilidade
- Auditoria

---

# Pre-condicoes

- Empresa cadastrada.
- Usuario autenticado.
- Usuario com permissao para calcular IRRF.
- Rubricas e incidencias configuradas.
- Competencia de apuracao definida.
- Base de remuneracao disponivel para a competencia.
- Tabela do IRRF vigente ou parametrizada para a competencia.
- Dependentes e deducoes cadastrais disponiveis, quando aplicavel.
- Vinculos e categorias elegiveis identificados.

---

# Gatilho

O processo inicia quando a area de folha precisa apurar o IRRF da competencia, seja na folha mensal, em folha complementar, em ferias, em 13o salario ou em outro escopo habilitado pela politica da empresa.

---

# Fluxo Principal

### Etapa 1

Usuario acessa:

```text
Folha de Pagamento
-> Encargos
-> IRRF
```

### Etapa 2

Sistema apresenta as competencias e os escopos de calculo disponiveis.

### Etapa 3

Usuario seleciona a competencia e a origem do calculo:

- folha mensal;
- folha complementar;
- ferias;
- 13o salario;
- recalculo;
- ajuste retroativo.

### Etapa 4

Sistema carrega a base tributavel de cada colaborador.

### Etapa 5

Sistema identifica os componentes que entram ou nao na base, conforme incidencias configuradas, deducoes legais e regras da competencia.

### Etapa 6

Sistema aplica a tabela do IRRF vigente ou parametrizada para a competencia.

### Etapa 7

Sistema calcula o imposto devido por colaborador, considerando:

- base tributavel validada;
- dependentes elegiveis;
- deducoes legais aplicaveis;
- pensao alimenticia, quando configurada e permitida;
- previdencia dedutivel quando prevista pela regra da competencia;
- faixa e aliquota aplicaveis;
- parcela a deduzir;
- reflexos de ferias, 13o salario e complementares;
- arredondamento configurado.

### Etapa 8

Sistema consolida a memoria de calculo por colaborador e por competencia.

### Etapa 9

Sistema disponibiliza o resultado para conferencia e para integracao com rotinas fiscais e de folha.

### Etapa 10

Sistema registra auditoria e mantém o calculo rastreavel.

---

# Fluxos Alternativos

## FA-01 - Base tributavel inconsistente

### Condicao

A base de IRRF nao pode ser montada por falta de incidencia configurada ou por conflito de configuracao.

### Acao

Sistema bloqueia o calculo para os itens inconsistentes e aponta a origem do problema.

### Resultado

Calculo fica pendente de saneamento.

---

## FA-02 - Tabela do IRRF ausente

### Condicao

Nao existe tabela valida ou parametrizacao vigente para a competencia.

### Acao

Sistema bloqueia o calculo.

### Resultado

Usuario precisa configurar ou selecionar a tabela adequada.

---

## FA-03 - Dependente ou deducao invalida

### Condicao

Uma deducao cadastrada nao atende aos criterios da competencia.

### Acao

Sistema desconsidera a deducao invalida ou bloqueia o calculo conforme configuracao.

### Resultado

Calculo segue apenas com deducoes validas ou fica pendente de correção.

---

## FA-04 - Reprocessamento nao autorizado

### Condicao

O periodo esta fechado ou o usuario nao possui permissao para recalculo.

### Acao

Sistema bloqueia o reprocessamento.

### Resultado

Historico original permanece inalterado.

---

## FA-05 - Divergencia por complemento, ferias ou 13o

### Condicao

A folha complementar, ferias ou 13o salario altera a base original.

### Acao

Sistema recalcula apenas a diferenca impactada e preserva a memoria do calculo original.

### Resultado

IRRF complementar registrado sem sobrescrever a apuracao anterior.

---

# Pos-condicoes

## Sucesso

- IRRF calculado.
- Memoria de calculo preservada.
- Base tributavel consolidada por colaborador e competencia.
- Dados preparados para rotinas fiscais, conferencias e integracoes dependentes.

## Falha

- Nenhuma alteracao persistida, exceto registros de erro e tentativa quando aplicavel.

---

# Regras de Negocio Relacionadas

- O calculo deve respeitar a tabela do IRRF vigente ou a parametrizacao especifica da competencia.
- A base tributavel deve seguir as incidencias configuradas para cada rubrica.
- Dependentes e deducoes devem respeitar os criterios legais e cadastrais da competencia.
- O calculo deve permitir reflexos de ferias, 13o salario, folha complementar e eventos retroativos quando habilitados.
- O calculo deve manter memoria por competencia e por colaborador.
- O calculo nao deve sobrescrever historico de competencias ja processadas.
- A base tributavel deve ser auditavel e conciliavel com a folha e com as rotinas fiscais.
- Divergencias entre folha e rotinas fiscais devem gerar alerta de conferencia.
- A retencao, recolhimento ou transmissao nao fazem parte deste caso de uso, salvo quando houver integracao explicita em processo adjacente.

---

# Entidades Envolvidas

## PayrollIrrfCalculation

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

## PayrollIrrfItem

```text
id
payroll_irrf_calculation_id
employee_id
taxable_base_amount
irrf_amount
status
```

## PayrollIrrfBaseComponent

```text
id
payroll_irrf_item_id
rubric_id
description
amount
incidence_type
```

## PayrollIrrfDeductionComponent

```text
id
payroll_irrf_item_id
deduction_type
description
amount
```

## PayrollIrrfCalculationMemory

```text
id
payroll_irrf_calculation_id
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
| Tabela do IRRF aplicada | Sim |
| Base tributavel | Sim |
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
POST /api/v1/payrolls/irrf/calculate
```

```http
GET /api/v1/payrolls/irrf/{id}
```

```http
POST /api/v1/payrolls/irrf/{id}/recalculate
```

```http
POST /api/v1/payrolls/irrf/{id}/lock
```

---

# Eventos de Dominio

```text
PayrollIrrfCalculated
PayrollIrrfRecalculated
PayrollIrrfLocked
PayrollIrrfCalculationFailed
```

---

# Integracoes Impactadas

- Folha de Pagamento mensal.
- Folha complementar.
- Ferias.
- 13o salario.
- Rotinas fiscais.
- eSocial.
- Contabilidade.
- Auditoria.
- Analytics e BI.

---

# Casos de Teste

### CT-FOL-008-001

Calcular IRRF para competencia valida com bases consistentes.

Resultado esperado:

```text
IRRF calculado com sucesso.
```

### CT-FOL-008-002

Calcular IRRF com rubrica sem incidencia configurada.

Resultado esperado:

```text
Sistema bloqueia o item inconsistente e aponta a origem.
```

### CT-FOL-008-003

Calcular IRRF com tabela invalida ou ausente.

Resultado esperado:

```text
Sistema bloqueia o calculo e informa a regra ausente ou invalida.
```

### CT-FOL-008-004

Recalcular IRRF em folha complementar.

Resultado esperado:

```text
Sistema registra a diferenca complementar sem sobrescrever o historico original.
```

### CT-FOL-008-005

Tentar recalcular IRRF em periodo fechado sem permissao.

Resultado esperado:

```text
Sistema bloqueia o reprocessamento.
```

---

# Metricas

- Valor total de IRRF por competencia.
- Valor total por colaborador e por empresa.
- Quantidade de recalculos por folha complementar, ferias ou 13o.
- Quantidade de bloqueios por base inconsistente.
- Tempo medio de processamento por competencia.

---

# Observacoes Arquiteturais

O calculo de IRRF deve ser tratado como apuracao derivada, nunca como valor manual sem origem rastreavel.

A composicao da base precisa preservar a origem dos valores para permitir auditoria, reprocessamento e conciliacao com folha mensal, folha complementar, ferias, 13o salario e rotinas fiscais.

O sistema deve separar a memoria do calculo original da memoria de recalculo complementar para que divergencias futuras possam ser explicadas com clareza.

---

# Lacunas adjacentes ao UC-FOL-008

O calculo de IRRF depende de definicoes posteriores, que devem permanecer em casos de uso proprios:

- UC-FOL-009 - Gerar Holerite;
- UC-FOL-010 - Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois da folha mensal e das bases de INSS e FGTS, porque aplica a ultima camada de tributacao sobre a competencia consolidada.
