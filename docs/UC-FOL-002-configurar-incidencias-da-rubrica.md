# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-002 — Configurar Incidências da Rubrica

### Versão

1.0

---

# Objetivo

Permitir a configuração das incidências tributárias, previdenciárias, trabalhistas e de eSocial de uma rubrica de folha, garantindo compatibilidade com a legislação vigente, com o modelo de cálculo da empresa e com os eventos periódicos e tabelas governamentais aplicáveis.

---

# Atores

## Primários

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundários

- eSocial
- Folha de Pagamento
- Auditoria
- Workflow e Aprovações

---

# Pré-condições

- Rubrica cadastrada por meio do UC-FOL-001.
- Usuário autenticado.
- Usuário com permissão para parametrizar incidências.
- Empresa configurada para folha.
- Estrutura de eSocial da empresa conhecida ou em preparação.
- Rubrica em estado apto a receber parametrização.

---

# Gatilho

O processo inicia quando a área de folha precisa definir como a rubrica será tratada nos cálculos, bases legais, eventos governamentais e integrações da empresa.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Folha de Pagamento
→ Rubricas
→ Incidências
→ Configurar
```

### Etapa 2

Sistema apresenta a rubrica selecionada e suas informações cadastrais.

### Etapa 3

Usuário define as incidências da rubrica, incluindo:

- incidência de INSS;
- incidência de FGTS;
- incidência de IRRF;
- natureza tributária e previdenciária;
- classificação compatível com eSocial;
- vigência da configuração.

### Etapa 4

Usuário informa regras adicionais quando aplicáveis:

- composição ou não da base de cálculo;
- participação em eventos periódicos;
- comportamento em folha mensal;
- comportamento em folha complementar;
- comportamento em adiantamento, férias, 13º ou rescisão, quando aplicável.

### Etapa 5

Usuário confirma a parametrização.

### Etapa 6

Sistema valida consistência entre:

- natureza da rubrica;
- incidências informadas;
- regras mínimas do eSocial;
- vigência da parametrização;
- compatibilidade com a folha da empresa.

### Etapa 7

Sistema grava a configuração.

### Etapa 8

Sistema registra histórico da alteração.

### Etapa 9

Sistema disponibiliza a rubrica parametrizada para cálculos, conferências e integrações posteriores.

### Etapa 10

Sistema registra trilha de auditoria.

---

# Fluxos Alternativos

## FA-01 — Rubrica inexistente ou inativa

### Condição

A rubrica não existe ou está inativa.

### Ação

Sistema bloqueia a configuração.

### Resultado

Incidências não configuradas.

---

## FA-02 — Incidência obrigatória ausente

### Condição

Um campo obrigatório de incidência não foi preenchido.

### Ação

Sistema exibe inconsistências.

### Resultado

Usuário precisa corrigir antes de salvar.

---

## FA-03 — Classificação incompatível com eSocial

### Condição

A configuração não é compatível com a tabela ou regra de eSocial aplicável.

### Ação

Sistema bloqueia a gravação ou marca a inconsistência como pendente de ajuste.

### Resultado

Configuração não concluída.

---

## FA-04 — Usuário sem permissão

### Condição

Usuário não possui permissão para parametrizar incidências.

### Ação

Sistema bloqueia o acesso.

### Resultado

Operação não realizada.

---

# Pós-Condições

## Sucesso

- Rubrica parametrizada com incidências.
- Histórico da configuração registrado.
- Rubrica apta para uso em cálculo, conferência e integração, conforme o restante da configuração da empresa.

## Falha

- Nenhuma alteração persistida.

---

# Regras de Negócio Relacionadas

- Toda rubrica utilizada na folha deve possuir correspondência no eSocial.
- Toda rubrica deve possuir incidência de INSS configurada.
- Toda rubrica deve possuir incidência de FGTS configurada.
- Toda rubrica deve possuir incidência de IRRF configurada.
- Toda rubrica deve possuir classificação compatível com o eSocial.
- Alterações em rubricas devem manter histórico.
- Rubricas utilizadas em folha fechada não podem ser excluídas.
- Rubricas inativas não podem ser utilizadas em novos lançamentos.
- A vigência da configuração deve ser respeitada no cálculo.

---

# Entidades Envolvidas

## PayrollRubricTaxIncidence

```text
id
payroll_rubric_id
company_id
inss_incidence
fgts_incidence
irrf_incidence
esocial_classification
valid_from
valid_to
status
created_at
created_by
updated_at
updated_by
```

## PayrollRubricTaxIncidenceHistory

```text
id
payroll_rubric_tax_incidence_id
change_type
changed_by
changed_at
snapshot
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Rubrica | Obrigatório |
| INSS | Obrigatório |
| FGTS | Obrigatório |
| IRRF | Obrigatório |
| Classificação eSocial | Obrigatório |
| Vigência | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Folha | Criar e editar |
| Gestor | Não |
| Colaborador | Não |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payroll-rubrics/{id}/incidences
```

```http
GET /api/v1/payroll-rubrics/{id}/incidences
```

```http
PUT /api/v1/payroll-rubrics/{id}/incidences
```

```http
PATCH /api/v1/payroll-rubrics/{id}/incidences/inactivate
```

---

# Eventos de Domínio

```text
PayrollRubricIncidencesConfigured
PayrollRubricIncidencesUpdated
PayrollRubricIncidencesInactivated
```

---

# Integrações Impactadas

- Folha de Pagamento
- eSocial S-1010
- Fechamento da folha
- Cálculos de INSS, FGTS e IRRF
- Analytics e BI
- Auditoria

---

# Casos de Teste

## CT-FOL-002-001

Configurar incidências válidas.

Resultado esperado:

```text
Incidências configuradas com sucesso.
```

## CT-FOL-002-002

Salvar sem incidência obrigatória.

Resultado esperado:

```text
Sistema bloqueia a gravação.
```

## CT-FOL-002-003

Configurar classificação incompatível com eSocial.

Resultado esperado:

```text
Sistema informa a inconsistência e impede a conclusão.
```

## CT-FOL-002-004

Alterar incidência de rubrica já usada em folha fechada.

Resultado esperado:

```text
Sistema preserva histórico e impede exclusão retroativa indevida.
```

---

# Métricas

- Quantidade de rubricas parametrizadas.
- Quantidade de rubricas com incidências pendentes.
- Quantidade de alterações de incidências por competência.
- Quantidade de inconsistências de eSocial relacionadas a rubricas.

---

# Observações Arquiteturais

A configuração de incidências deve ser tratada como camada distinta do cadastro da rubrica.

Essa separação evita que o sistema confunda identidade estrutural da rubrica com sua aptidão operacional para cálculo e transmissão.

A vigência da incidência deve ser respeitada para preservar histórico e permitir recalculo de competências anteriores.

---

# Lacunas adjacentes ao UC-FOL-002

Este caso de uso depende de definições complementares em outros casos de uso do módulo de folha:

- UC-FOL-003 — Processar Folha Mensal;
- UC-FOL-004 — Processar Folha Complementar;
- UC-FOL-005 — Processar Adiantamento Salarial;
- UC-FOL-006 — Calcular INSS;
- UC-FOL-007 — Calcular FGTS;
- UC-FOL-008 — Calcular IRRF;
- UC-FOL-009 — Gerar Holerite;
- UC-FOL-010 — Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem imediatamente depois do cadastro da rubrica, porque define a carga fiscal, previdenciaria e de eSocial que o calculo ira respeitar.
