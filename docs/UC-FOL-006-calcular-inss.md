# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-006 - Calcular INSS

### Versao

1.0

---

# Objetivo

Permitir o calculo da contribuicao previdenciaria devida na folha de pagamento, considerando base de incidencia, tabela vigente, teto previdenciario, categorias de vinculo e ajustes decorrentes de folha mensal, folha complementar e eventos retroativos, com memoria de calculo auditavel e integracao com as rotinas previdenciarias e fiscais da empresa.

---

# Atores

## Primarios

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundarios

- Folha de Pagamento
- eSocial
- DCTFWeb / Rotinas Previdenciarias
- Auditoria
- Contabilidade

---

# Pre-condicoes

- Empresa cadastrada.
- Usuario autenticado.
- Usuario com permissao para calcular encargos previdenciarios.
- Rubricas e incidencias configuradas.
- Competencia de apuracao definida.
- Base de remuneracao disponivel para a competencia.
- Tabela previdenciaria vigente ou parametrizada para a competencia.
- Vinculos elegiveis identificados.

---

# Gatilho

O processo inicia quando a area de folha precisa apurar a contribuicao previdenciaria da competencia, seja na folha mensal, em folha complementar ou em reprocessamento decorrente de ajustes retroativos.

---

# Fluxo Principal

### Etapa 1

Usuario acessa:

```text
Folha de Pagamento
-> Encargos
-> INSS
```

### Etapa 2

Sistema apresenta as competencias e os escopos de calculo disponiveis.

### Etapa 3

Usuario seleciona a competencia, o escopo e, quando aplicavel, a origem do calculo:

- folha mensal;
- folha complementar;
- reprocessamento;
- ajuste retroativo.

### Etapa 4

Sistema carrega a base de incidencia previdenciaria de cada colaborador.

### Etapa 5

Sistema identifica os componentes que entram ou nao na base, conforme as incidencias configuradas e a regra da competencia.

### Etapa 6

Sistema aplica a tabela previdenciaria vigente ou parametrizada para a competencia.

### Etapa 7

Sistema calcula a contribuicao devida por colaborador, considerando:

- faixa ou faixa progressiva configurada;
- teto previdenciario;
- natureza da rubrica;
- vinculo e categoria do trabalhador;
- ajustes por eventos retroativos;
- compensacoes ou abatimentos permitidos;
- arredondamento definido pela politica da empresa ou pela regra vigente.

### Etapa 8

Sistema consolida a memoria de calculo por colaborador e por competencia.

### Etapa 9

Sistema calcula, quando aplicavel:

- parcela do empregado;
- parcela patronal;
- outras parcelas previdenciarias vinculadas ao tipo de vinculo ou regime.

### Etapa 10

Sistema disponibiliza o resultado para conferencia e para integracao com os processos previdenciarios e fiscais.

### Etapa 11

Sistema registra auditoria e mantém o calculo rastreavel.

---

# Fluxos Alternativos

## FA-01 - Base de incidencia inconsistente

### Condicao

A base previdenciaria nao pode ser montada por falta de incidencia configurada ou por conflito de configuracao.

### Acao

Sistema bloqueia o calculo para os itens inconsistentes e aponta a origem do problema.

### Resultado

Calculo fica pendente de saneamento.

---

## FA-02 - Tabela previdenciaria ausente

### Condicao

Nao existe tabela valida ou parametrizacao vigente para a competencia.

### Acao

Sistema bloqueia o calculo.

### Resultado

Usuario precisa configurar ou selecionar a tabela adequada.

---

## FA-03 - Base acima do teto

### Condicao

A remuneracao ultrapassa o teto previdenciario aplicavel.

### Acao

Sistema limita a base ao teto configurado para a competencia.

### Resultado

Contribuicao calculada com base respeitando o teto.

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

Contribuicao complementar registrada sem sobrescrever a apuracao anterior.

---

# Pos-condicoes

## Sucesso

- Contribuicao previdenciaria calculada.
- Memoria de calculo preservada.
- Bases e parcelas consolidadas para a competencia.
- Integracoes previdenciarias e fiscais prontas para consumo pelos processos dependentes.

## Falha

- Nenhuma alteracao persistida, exceto registros de erro e tentativa quando aplicavel.

---

# Regras de Negocio Relacionadas

- O calculo deve respeitar a tabela previdenciaria vigente ou a parametrizacao especifica da competencia.
- A base previdenciaria deve seguir as incidencias cadastradas para cada rubrica.
- O teto previdenciario deve ser aplicado quando a remuneracao exceder o limite configurado para a competencia.
- Folha complementar e eventos retroativos devem gerar recalculo somente da parcela impactada.
- O calculo deve manter memoria de calculo por competencia e por colaborador.
- O calculo nao deve sobrescrever historico de competencias ja processadas.
- A composicao da base e as regras de abatimento devem ser auditaveis.
- A integracao com rotinas previdenciarias e fiscais deve refletir o resultado calculado e nao um valor manual sem rastreabilidade.
- Regras de categoria, vinculo e regime podem alterar a forma de calculo e devem ser parametrizaveis.

---

# Entidades Envolvidas

## PayrollInssCalculation

```text
id
company_id
competence
source_type
status
calculated_at
calculated_by
total_employee_amount
total_employer_amount
```

## PayrollInssItem

```text
id
payroll_inss_calculation_id
employee_id
base_amount
employee_amount
employer_amount
status
```

## PayrollInssBaseComponent

```text
id
payroll_inss_item_id
rubric_id
description
amount
incidence_type
```

## PayrollInssCalculationMemory

```text
id
payroll_inss_calculation_id
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
| Tabela previdenciaria aplicada | Sim |
| Base de incidencia | Sim |
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
POST /api/v1/payrolls/inss/calculate
```

```http
GET /api/v1/payrolls/inss/{id}
```

```http
POST /api/v1/payrolls/inss/{id}/recalculate
```

```http
POST /api/v1/payrolls/inss/{id}/lock
```

---

# Eventos de Dominio

```text
PayrollInssCalculated
PayrollInssRecalculated
PayrollInssLocked
PayrollInssCalculationFailed
```

---

# Integracoes Impactadas

- Folha de Pagamento mensal.
- Folha complementar.
- eSocial.
- DCTFWeb / rotinas previdenciarias.
- Contabilidade.
- Auditoria.
- Analytics e BI.

---

# Casos de Teste

### CT-FOL-006-001

Calcular INSS para competencia valida com bases consistentes.

Resultado esperado:

```text
INSS calculado com sucesso.
```

### CT-FOL-006-002

Calcular INSS com base acima do teto previdenciario.

Resultado esperado:

```text
Sistema aplica o teto e calcula a contribuicao conforme configuracao da competencia.
```

### CT-FOL-006-003

Calcular INSS com rubrica sem incidencia configurada.

Resultado esperado:

```text
Sistema bloqueia o item inconsistente e aponta a origem.
```

### CT-FOL-006-004

Recalcular INSS em folha complementar.

Resultado esperado:

```text
Sistema registra a diferenca complementar sem sobrescrever o historico original.
```

### CT-FOL-006-005

Tentar recalcular INSS em periodo fechado sem permissao.

Resultado esperado:

```text
Sistema bloqueia o reprocessamento.
```

---

# Metricas

- Valor total de INSS por competencia.
- Valor total por colaborador e por empresa.
- Quantidade de recalculos por folha complementar.
- Quantidade de bloqueios por base inconsistente.
- Tempo medio de processamento por competencia.

---

# Observacoes Arquiteturais

O calculo de INSS deve ser tratado como apuracao derivada, nunca como valor manual sem origem rastreavel.

A composicao da base precisa preservar a origem dos valores para permitir auditoria, reprocessamento e conciliacao com folha mensal, folha complementar e rotinas previdenciarias.

O sistema deve separar a memoria do calculo original da memoria de recalculo complementar para que divergencias futuras possam ser explicadas com clareza.

---

# Lacunas adjacentes ao UC-FOL-006

O calculo de INSS depende de definicoes posteriores, que devem permanecer em casos de uso proprios:

- UC-FOL-007 - Calcular FGTS;
- UC-FOL-008 - Calcular IRRF;
- UC-FOL-009 - Gerar Holerite;
- UC-FOL-010 - Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois do processamento da folha, porque calcula uma das bases legais centrais sobre os eventos consolidados da competencia.
