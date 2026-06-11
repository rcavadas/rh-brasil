# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-003 — Processar Folha Mensal

### Versão

1.0

---

# Objetivo

Permitir o processamento e o cálculo da folha mensal, consolidando proventos, descontos, encargos, bases legais e memórias de cálculo por competência, deixando a folha disponível para conferência, reprocessamento controlado e posterior fechamento.

---

# Atores

## Primários

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundários

- Folha de Pagamento
- eSocial
- FGTS Digital
- Ponto e Jornada
- Benefícios
- Férias
- Afastamentos
- Rescisão
- Analytics

---

# Pré-condições

- Competência mensal definida.
- Empresa cadastrada e configurada para folha.
- Rubricas cadastradas por meio do UC-FOL-001.
- Incidências da rubrica configuradas por meio do UC-FOL-002.
- Usuário autenticado.
- Usuário com permissão para processar folha.
- Dados de entrada disponíveis ou formalmente pendentes para a competência.

---

# Gatilho

O processo inicia quando a área de folha precisa calcular a competência mensal da empresa, seja no processamento regular, em recálculo ou em reprocessamento autorizado.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Folha de Pagamento
→ Competências
→ Processar Folha Mensal
```

### Etapa 2

Sistema apresenta a competência e os parâmetros de processamento.

### Etapa 3

Usuário seleciona a competência desejada.

### Etapa 4

Sistema carrega colaboradores elegíveis, contratos ativos, rubricas parametrizadas e dados de entrada da competência.

### Etapa 5

Sistema consolida as bases da competência.

### Etapa 6

Sistema importa eventos dependentes, quando aplicável, incluindo:

- ponto e jornada;
- horas extras;
- banco de horas;
- benefícios;
- férias;
- afastamentos;
- rescisões;
- adicional noturno;
- outras verbas variáveis.

### Etapa 7

Sistema calcula proventos e descontos por colaborador.

### Etapa 8

Sistema calcula INSS, FGTS e IRRF conforme as regras vigentes e a parametrização das rubricas.

### Etapa 9

Sistema registra memória de cálculo por colaborador e por rubrica.

### Etapa 10

Sistema consolida o resultado da competência em estado de cálculo ou conferência.

### Etapa 11

Sistema disponibiliza a folha para conferência, ajustes e eventual fechamento posterior.

### Etapa 12

Sistema registra auditoria do processamento.

---

# Fluxos Alternativos

## FA-01 — Competência com dados obrigatórios pendentes

Sistema executa o cálculo parcial ou bloqueia a finalização conforme parametrização, listando as pendências.

## FA-02 — Rubrica sem incidência configurada

Sistema bloqueia o processamento da parte afetada e registra inconsistência.

## FA-03 — Colaborador sem contrato ativo

Sistema exclui o colaborador da competência ou gera pendência, conforme regra da empresa.

## FA-04 — Reprocessamento não autorizado

Sistema bloqueia a operação e registra a tentativa.

---

# Pós-Condições

## Sucesso

- Folha mensal calculada.
- Memória de cálculo registrada.
- Base da competência consolidada.
- Folha disponível para conferência e reprocessamento controlado.

## Falha

- Nenhuma alteração persistida além dos registros de erro, quando aplicável.

---

# Regras de Negócio Relacionadas

- Toda folha de pagamento deve possuir competência de apuração.
- Cada colaborador deve possuir cálculo individualizado.
- O sistema deve permitir folha mensal.
- O sistema deve impedir fechamento de folha com cálculo pendente.
- Toda rubrica deve possuir código interno único.
- Toda rubrica deve possuir incidência de INSS configurada.
- Toda rubrica deve possuir incidência de FGTS configurada.
- Toda rubrica deve possuir incidência de IRRF configurada.
- Toda rubrica deve possuir classificação compatível com o eSocial.
- Alterações em rubricas devem manter histórico.
- Horas extras aprovadas devem ser importadas do módulo de ponto.
- Banco de horas pago deve gerar rubrica própria.
- O cálculo deve registrar memória de cálculo.
- Divergências entre folha e FGTS Digital devem gerar alerta de conferência.
- A folha mensal deve preparar eventos para o eSocial conforme aplicável.

---

# Entidades Envolvidas

## PayrollSheet

```text
id
company_id
competence
sheet_type
status
calculated_at
calculated_by
```

## PayrollSheetItem

```text
id
sheet_id
employee_id
gross_amount
discount_amount
net_amount
status
```

## PayrollSheetItemDetail

```text
id
sheet_item_id
rubric_id
description
base_amount
amount
detail_type
```

## PayrollCalculationMemory

```text
id
sheet_id
employee_id
calculation_ref
created_at
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Competência | Obrigatório |
| Tipo de folha | Obrigatório |
| Empresa | Obrigatório |
| Status | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Folha | Processar e recálcular |
| Gestor | Consulta da equipe |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payrolls/calculate
```
```http
GET /api/v1/payrolls/{id}
```
```http
POST /api/v1/payrolls/{id}/recalculate
```

---

# Eventos de Domínio

```text
PayrollCalculationStarted
PayrollCalculated
PayrollRecalculated
PayrollCalculationBlocked
```

---

# Integrações Impactadas

- Ponto e Jornada
- Benefícios
- Férias
- Afastamentos
- Rescisão
- eSocial
- FGTS Digital
- Analytics e BI

---

# Casos de Teste

## CT-FOL-003-001

Processar folha mensal válida

Resultado esperado:

```text
Folha mensal calculada com sucesso.
```

## CT-FOL-003-002

Processar folha com rubrica sem incidência

Resultado esperado:

```text
Sistema bloqueia a parte afetada e registra inconsistência.
```

## CT-FOL-003-003

Reprocessar competência autorizada

Resultado esperado:

```text
Folha recalculada com memória preservada.
```

## CT-FOL-003-004

Processar colaborador sem contrato ativo

Resultado esperado:

```text
Colaborador tratado conforme regra da empresa.
```

---

# Métricas

- Quantidade de folhas processadas.
- Tempo médio de processamento.
- Quantidade de inconsistências por competência.
- Quantidade de reprocessamentos.
- Divergências entre folha e bases externas.

---

# Observações Arquiteturais

O processamento da folha mensal deve ser idempotente sempre que possível, preservando rastreabilidade entre cálculo original e recálculos posteriores.

A separação entre cálculo, conferência e fechamento deve ser mantida para permitir controle operacional e rollback lógico quando necessário.

O fechamento da folha permanece em caso de uso próprio e não deve ser confundido com o processamento mensal.

---

# Lacunas adjacentes ao UC-FOL-003

Este caso de uso depende de definições complementares em outros casos de uso do módulo de folha:

- UC-FOL-004 — Processar Folha Complementar;
- UC-FOL-005 — Processar Adiantamento Salarial;
- UC-FOL-006 — Calcular INSS;
- UC-FOL-007 — Calcular FGTS;
- UC-FOL-008 — Calcular IRRF;
- UC-FOL-009 — Gerar Holerite;
- UC-FOL-010 — Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso e o centro do pacote FOL. Ele deve ser lido depois de rubricas e incidencias, porque consome ponto, beneficios, ferias, afastamentos, rescisao e bases legais para montar a competencia.
