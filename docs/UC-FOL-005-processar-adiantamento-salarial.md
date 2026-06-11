# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-005 - Processar Adiantamento Salarial

### Versao

1.0

---

# Objetivo

Permitir o processamento do adiantamento salarial de colaboradores elegiveis, calculando o valor a antecipar, registrando a memorizacao do calculo, preparando o pagamento e garantindo que a deducao futura na folha mensal fique rastreavel, sem sobrescrever a folha mensal ou a folha complementar.

---

# Atores

## Primarios

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundarios

- Colaborador
- Folha de Pagamento
- Contas a Pagar / Financeiro
- Banco ou Instituicao Financeira
- Auditoria
- Workflow e Aprovacoes

---

# Pre-condicoes

- Empresa cadastrada.
- Usuario autenticado.
- Usuario com permissao para processar adiantamento salarial.
- Politica de adiantamento salarial configurada para a empresa.
- Regra de elegibilidade definida para o periodo e para o perfil do colaborador.
- Dados bancarios do colaborador disponiveis, quando o pagamento for por transferencia.
- Colaborador com vinculo ativo ou em situacao elegivel conforme a politica da empresa.
- Nenhum bloqueio operacional, disciplinar ou legal que impeca o adiantamento, quando aplicavel.

---

# Gatilho

O processo inicia quando o RH ou a area de folha precisa calcular, aprovar e disponibilizar um adiantamento salarial para um colaborador ou grupo de colaboradores, dentro da politica corporativa da empresa.

---

# Fluxo Principal

### Etapa 1

Usuario acessa:

```text
Folha de Pagamento
-> Adiantamentos
-> Novo Processamento
```

### Etapa 2

Sistema apresenta a politica ativa de adiantamento salarial, incluindo limite, data de processamento, forma de pagamento e competencia de deducao.

### Etapa 3

Usuario seleciona o escopo do processamento:

- colaborador individual;
- grupo de colaboradores;
- filial;
- departamento;
- centro de custo;
- empresa inteira, quando permitido.

### Etapa 4

Usuario informa a competencia de referencia e confirma o motivo operacional do adiantamento, quando exigido pela politica.

### Etapa 5

Sistema identifica os colaboradores elegiveis e calcula o valor maximo permitido para cada um, de acordo com:

- salario base;
- porcentual configurado;
- valor fixo configurado;
- regras de elegibilidade;
- afastamentos, suspensoes ou bloqueios;
- adiantamentos ja processados no periodo;
- politica de arredondamento e teto maximo.

### Etapa 6

Sistema apresenta a simulacao do adiantamento por colaborador, com memoria de calculo e impacto previsto na folha mensal.

### Etapa 7

Usuario confirma o processamento.

### Etapa 8

Sistema valida:

- permissao do usuario;
- elegibilidade do colaborador;
- existencia de dados bancarios, quando necessario;
- ausencia de duplicidade para a mesma competencia;
- aderencia aos limites da politica;
- consistencia da competencia de deducao.

### Etapa 9

Sistema grava o processamento do adiantamento salarial e gera a memoria de calculo correspondente.

### Etapa 10

Sistema cria o compromisso de deducao futura na folha mensal da competencia configurada.

### Etapa 11

Sistema disponibiliza o titulo/ordem de pagamento para o financeiro ou para a integracao bancaria, conforme a forma de pagamento definida.

### Etapa 12

Sistema registra auditoria e notifica o colaborador, quando a politica de comunicacao estiver habilitada.

---

# Fluxos Alternativos

## FA-01 - Colaborador inelegivel

### Condicao

O colaborador nao atende aos criterios da politica de adiantamento.

### Acao

Sistema bloqueia o processamento para o colaborador e registra o motivo.

### Resultado

Adiantamento nao gerado para aquele colaborador.

---

## FA-02 - Limite excedido

### Condicao

O valor calculado supera o teto permitido pela politica da empresa.

### Acao

Sistema bloqueia ou reduz o valor, conforme configuracao da politica.

### Resultado

Processamento segue apenas com valores permitidos ou e recusado.

---

## FA-03 - Adiantamento ja processado na competencia

### Condicao

Ja existe adiantamento ativo para o mesmo colaborador e a mesma competencia, e a politica nao permite acumulacao.

### Acao

Sistema bloqueia a duplicidade.

### Resultado

Nenhum novo adiantamento e gerado.

---

## FA-04 - Dados bancarios inexistentes

### Condicao

O pagamento exige transferencia bancaria, mas os dados do colaborador estao ausentes ou invalidos.

### Acao

Sistema bloqueia o envio ao banco e encaminha a pendencia para regularizacao.

### Resultado

Adiantamento permanece pendente de pagamento.

---

## FA-05 - Politica inexistente ou incompleta

### Condicao

Nao existe politica ativa suficiente para determinar limite, prazo ou deducao.

### Acao

Sistema bloqueia o processamento.

### Resultado

Operacao nao realizada ate a configuracao da politica.

---

## FA-06 - Reprocessamento nao autorizado

### Condicao

Um adiantamento ja processado precisa ser recalculado, mas o usuario nao possui permissao ou o periodo esta bloqueado.

### Acao

Sistema bloqueia o reprocessamento e registra a tentativa.

### Resultado

Adiantamento mantem o historico original.

---

# Pos-condicoes

## Sucesso

- Adiantamento salarial processado.
- Memoria de calculo preservada.
- Pagamento preparado para o financeiro ou para integracao bancaria.
- Deducao futura registrada para a folha mensal.
- Historico e auditoria registrados.

## Falha

- Nenhuma alteracao persistida, exceto registros de tentativa e erro quando aplicavel.

---

# Regras de Negocio Relacionadas

- O adiantamento salarial deve ser configurado por empresa.
- O valor do adiantamento deve respeitar limite, faixa ou formula definida na politica.
- O adiantamento salarial nao deve sobrescrever a folha mensal nem a folha complementar.
- O adiantamento deve gerar deducao futura na competencia configurada.
- Um mesmo colaborador nao deve receber adiantamento duplicado na mesma competencia, salvo politica explicita em contrario.
- O processamento deve manter memoria de calculo por colaborador e por competencia.
- O pagamento pode depender de dados bancarios validos ou de outra forma de liquidacao definida pela empresa.
- Se a competencia de deducao mudar por ajuste de calendario ou por reprocessamento, o impacto deve ser auditavel.
- Em caso de desligamento antes da deducao, a compensacao deve seguir a politica da empresa e a validacao trabalhista aplicavel.
- Regras de adiantamento podem variar por sindicato, categoria, acordo coletivo e politica interna.

---

# Entidades Envolvidas

## PayrollAdvance

```text
id
company_id
competence
processing_date
deduction_competence
scope_type
status
reason
total_amount
payment_method
created_at
created_by
updated_at
updated_by
```

## PayrollAdvanceItem

```text
id
payroll_advance_id
employee_id
salary_base_amount
eligible_base_amount
advance_amount
deduction_amount
status
bank_account_id
```

## PayrollAdvanceRule

```text
id
company_id
rule_type
percentage_limit
fixed_limit
minimum_amount
maximum_amount
allow_multiple_advances
deduction_competence_rule
active
```

## PayrollAdvanceCalculationMemory

```text
id
payroll_advance_id
employee_id
calculation_ref
created_at
```

---

# Campos Obrigatorios

| Campo | Obrigatorio |
|---|---|
| Empresa | Sim |
| Competencia de referencia | Sim |
| Data de processamento | Sim |
| Regra ativa de adiantamento | Sim |
| Escopo do processamento | Sim |
| Valor calculado ou regra de calculo | Sim |
| Competencia de deducao | Sim |
| Status inicial | Sim |

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Total |
| RH Folha | Processar, aprovar e consultar |
| Gestor | Consultar, quando permitido pela politica |
| Colaborador | Consultar apenas o proprio espelho ou notificacao, quando habilitado |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payrolls/advances/calculate
```

```http
GET /api/v1/payrolls/advances/{id}
```

```http
POST /api/v1/payrolls/advances/{id}/approve
```

```http
POST /api/v1/payrolls/advances/{id}/pay
```

```http
POST /api/v1/payrolls/advances/{id}/recalculate
```

```http
PATCH /api/v1/payrolls/advances/{id}/cancel
```

---

# Eventos de Dominio

```text
PayrollAdvanceCalculated
PayrollAdvanceApproved
PayrollAdvancePaymentPrepared
PayrollAdvancePaid
PayrollAdvanceCancelled
PayrollAdvanceRecalculated
PayrollAdvanceDeductionScheduled
```

---

# Integracoes Impactadas

- Folha de Pagamento mensal.
- Contas a Pagar / Financeiro.
- Integracao bancaria.
- Portal do Colaborador, quando houver notificacao ou comprovante.
- Auditoria.
- eSocial, quando o adiantamento refletir em rubricas ou bases exigidas.
- Analytics e BI.

---

# Casos de Teste

### CT-FOL-005-001

Processar adiantamento salarial valido para colaborador elegivel.

Resultado esperado:

```text
Adiantamento processado com sucesso.
```

### CT-FOL-005-002

Processar adiantamento acima do limite permitido.

Resultado esperado:

```text
Sistema bloqueia ou ajusta o valor conforme a politica configurada.
```

### CT-FOL-005-003

Processar adiantamento para colaborador inelegivel.

Resultado esperado:

```text
Sistema bloqueia o processamento e informa o motivo.
```

### CT-FOL-005-004

Processar segundo adiantamento na mesma competencia sem permissao de acumulacao.

Resultado esperado:

```text
Sistema bloqueia a duplicidade.
```

### CT-FOL-005-005

Processar adiantamento sem dados bancarios validos para pagamento por transferencia.

Resultado esperado:

```text
Sistema mantem a pendencia e nao envia o pagamento ao banco.
```

---

# Metricas

- Quantidade de adiantamentos processados por competencia.
- Valor total antecipado por empresa, filial ou centro de custo.
- Percentual de colaboradores elegiveis que receberam adiantamento.
- Quantidade de bloqueios por limite, inelegibilidade ou duplicidade.
- Tempo medio entre processamento e liquidacao financeira.

---

# Observacoes Arquiteturais

O adiantamento salarial deve ser modelado como evento financeiro independente da folha mensal e da folha complementar.

O caso de uso precisa preservar memoria de calculo e trilha de auditoria para que o valor antecipado seja conciliado depois com a deducao na folha mensal.

A compensacao futura nao deve ser embutida no processamento mensal como se fosse um provento comum; ela deve permanecer rastreavel como compromisso especifico de deducao.

Quando o adiantamento exigir integracao bancaria ou financeira, o sistema deve separar claramente a fase de calculo da fase de liquidacao.

---

# Lacunas adjacentes ao UC-FOL-005

O processamento de adiantamento salarial depende de definicoes posteriores, que devem permanecer em casos de uso proprios:

- UC-FOL-006 - Calcular INSS;
- UC-FOL-007 - Calcular FGTS;
- UC-FOL-008 - Calcular IRRF;
- UC-FOL-009 - Gerar Holerite;
- UC-FOL-010 - Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido junto do processamento mensal, porque antecipa parte da remuneracao e precisa ser reconciliado depois com a deducao futura.
