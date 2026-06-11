# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-004 — Processar Folha Complementar

### Versão

1.0

---

# Objetivo

Permitir o processamento de folha complementar para apuração de diferenças, ajustes retroativos e eventos não considerados na folha mensal original, preservando histórico, memória de cálculo e integração com bases previdenciárias, fiscais e governamentais.

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
- Auditoria

---

# Pré-condições

- Folha mensal da competência original existente.
- Rubricas e incidências configuradas.
- Usuário autenticado.
- Usuário com permissão para processar folha complementar.
- Justificativa ou origem da complementação disponível.
- Pendência, diferença ou evento retroativo identificado.

---

# Gatilho

O processo inicia quando a empresa identifica necessidade de recalcular diferenças de uma competência já processada, seja por ajuste retroativo, evento omitido, reclassificação de verba, correção de incidência ou nova informação recebida após a folha mensal.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Folha de Pagamento
→ Competências
→ Folha Complementar
```

### Etapa 2

Sistema apresenta competências originais elegíveis para complementação.

### Etapa 3

Usuário seleciona a competência de origem e informa a competência complementar, quando aplicável.

### Etapa 4

Usuário informa o motivo da complementação.

### Etapa 5

Sistema identifica os eventos, rubricas e bases afetadas.

### Etapa 6

Sistema carrega os valores originais da competência de referência.

### Etapa 7

Sistema calcula apenas as diferenças e ajustes complementares necessários.

### Etapa 8

Sistema recalcula INSS, FGTS e IRRF quando houver impacto nas bases.

### Etapa 9

Sistema registra memória de cálculo da folha complementar.

### Etapa 10

Sistema consolida os valores complementares por colaborador.

### Etapa 11

Sistema disponibiliza a folha complementar para conferência.

### Etapa 12

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 — Nenhuma diferença encontrada

Sistema informa que não há valores complementares a processar.

## FA-02 — Competência original inexistente

Sistema bloqueia a operação.

## FA-03 — Diferença com base reaberta ou ajustada

Sistema recalcula com base nas informações atualizadas e registra o impacto na origem.

## FA-04 — Reprocessamento não autorizado

Sistema bloqueia a operação e registra a tentativa.

---

# Pós-Condições

## Sucesso

- Folha complementar processada.
- Diferenças apuradas e registradas.
- Memória de cálculo preservada.
- Bases previdenciárias, fundiárias e tributárias recalculadas quando aplicável.

## Falha

- Nenhuma alteração persistida além dos registros de erro, quando aplicável.

---

# Regras de Negócio Relacionadas

- O sistema deve permitir folha complementar.
- Diferenças de INSS em folha complementar devem ser recalculadas.
- O sistema deve recalcular FGTS quando a folha complementar alterar a base de incidência.
- O sistema deve recalcular IRRF quando a folha complementar alterar a base tributável.
- Toda folha de pagamento deve possuir competência de apuração.
- Toda rubrica deve possuir incidência configurada.
- Toda folha complementar deve manter histórico em relação à competência de origem.
- O sistema deve impedir que a folha complementar sobrescreva os valores originais da folha mensal.
- O sistema deve registrar memória de cálculo da complementação.
- O sistema deve preparar eventos para o eSocial quando aplicável.

---

# Entidades Envolvidas

## PayrollSupplementalSheet

```text
id
company_id
origin_sheet_id
competence
reason
status
calculated_at
calculated_by
```

## PayrollSupplementalSheetItem

```text
id
supplemental_sheet_id
employee_id
gross_amount
discount_amount
net_amount
delta_amount
status
```

## PayrollSupplementalSheetDetail

```text
id
supplemental_sheet_item_id
rubric_id
description
origin_amount
adjusted_amount
delta_amount
detail_type
```

## PayrollSupplementalCalculationMemory

```text
id
supplemental_sheet_id
employee_id
calculation_ref
created_at
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Competência de origem | Obrigatório |
| Motivo da complementação | Obrigatório |
| Empresa | Obrigatório |
| Status | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Folha | Processar e recalcular |
| Gestor | Consulta da equipe |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payrolls/supplemental/calculate
```
```http
GET /api/v1/payrolls/supplemental/{id}
```
```http
POST /api/v1/payrolls/supplemental/{id}/recalculate
```

---

# Eventos de Domínio

```text
PayrollSupplementalCalculationStarted
PayrollSupplementalCalculated
PayrollSupplementalRecalculated
PayrollSupplementalCalculationBlocked
```

---

# Integrações Impactadas

- Folha mensal original
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

## CT-FOL-004-001

Processar folha complementar com diferença válida

Resultado esperado:

```text
Folha complementar calculada com sucesso.
```

## CT-FOL-004-002

Processar folha complementar sem diferença

Resultado esperado:

```text
Sistema informa ausência de complementação.
```

## CT-FOL-004-003

Processar diferença de INSS

Resultado esperado:

```text
Diferença previdenciária recalculada.
```

## CT-FOL-004-004

Reprocessar sem autorização

Resultado esperado:

```text
Operação bloqueada.
```

---

# Métricas

- Quantidade de folhas complementares processadas.
- Quantidade de diferenças por competência.
- Tempo médio de processamento complementar.
- Quantidade de reprocessamentos.
- Divergências corrigidas após folha mensal.

---

# Observações Arquiteturais

A folha complementar deve preservar a folha mensal original e tratar apenas os deltas, evitando duplicação de histórico e de bases já calculadas.

O processamento complementar deve registrar a origem da diferença para permitir auditoria e rastreabilidade tributária e previdenciária.

---

# Lacunas adjacentes ao UC-FOL-004

Este caso de uso depende de definições complementares em outros casos de uso do módulo de folha:

- UC-FOL-005 — Processar Adiantamento Salarial;
- UC-FOL-006 — Calcular INSS;
- UC-FOL-007 — Calcular FGTS;
- UC-FOL-008 — Calcular IRRF;
- UC-FOL-009 — Gerar Holerite;
- UC-FOL-010 — Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois da folha mensal, porque trata ajustes retroativos, diferença de competência e recomposicao de bases já calculadas.
