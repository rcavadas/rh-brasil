# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-010 - Fechar Folha de Pagamento

### Versao

1.0

---

# Objetivo

Permitir o fechamento formal da folha de pagamento de uma competencia, bloqueando novas alteracoes, consolidando os resultados finais, registrando auditoria, preparando os artefatos de encerramento e habilitando as etapas posteriores de disponibilizacao, integracao e obrigações correlatas.

---

# Atores

## Primarios

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundarios

- Folha de Pagamento
- eSocial
- Contabilidade
- Auditoria
- Portal do Colaborador
- Gestao Documental

---

# Pre-condicoes

- Competencia calculada e conferida.
- Bases de INSS, FGTS e IRRF consolidadas.
- Holerites gerados ou em estado apto para geracao.
- Pendencias criticas resolvidas ou formalmente aceitas.
- Usuario autenticado.
- Usuario com permissao para fechar folha.

---

# Gatilho

O processo inicia quando a area de folha conclui o processamento, a conferencia e a aprovacao final da competencia e precisa encerrar formalmente a folha para evitar alteracoes indevidas.

---

# Fluxo Principal

### Etapa 1

Usuario acessa:

```text
Folha de Pagamento
-> Competencias
-> Fechar
```

### Etapa 2

Sistema apresenta a competencia elegivel para fechamento.

### Etapa 3

Sistema valida a integridade da competencia:

- folha mensal processada;
- complementares conciliadas;
- adiantamentos vinculados;
- bases de INSS, FGTS e IRRF consolidadas;
- holerites aptos;
- pendencias de conferencia tratadas.

### Etapa 4

Usuario confirma o fechamento.

### Etapa 5

Sistema executa validacoes finais e bloqueia novas alteracoes na competencia.

### Etapa 6

Sistema registra o status de folha fechada e o identificador da versao encerrada.

### Etapa 7

Sistema registra auditoria do fechamento, incluindo usuario, data e escopo.

### Etapa 8

Sistema dispara, quando aplicavel, as rotinas correlatas:

- preparacao de arquivos ou eventos para eSocial;
- disponibilizacao final de holerites;
- arquivamento documental;
- consolidacao para financeiro e contabilidade.

### Etapa 9

Sistema disponibiliza o resumo de fechamento para consulta autorizada.

---

# Fluxos Alternativos

## FA-01 - Competencia incompleta

### Condicao

A competencia ainda possui pendencias criticas ou dados nao consolidados.

### Acao

Sistema bloqueia o fechamento.

### Resultado

Usuario precisa concluir os ajustes antes de tentar novamente.

---

## FA-02 - Holerite ou base obrigatoria ausente

### Condicao

Faltam holerites, bases ou consolidacoes obrigatorias para a competencia.

### Acao

Sistema bloqueia o fechamento ou gera pendencia formal, conforme politica.

### Resultado

Competencia nao e encerrada.

---

## FA-03 - Usuario sem permissao

### Condicao

Usuario nao possui permissao para fechar a folha.

### Acao

Sistema bloqueia a operacao.

### Resultado

Fechamento nao realizado.

---

## FA-04 - Reabertura posterior

### Condicao

Surge necessidade de corrigir uma competencia ja fechada.

### Acao

Sistema informa que a reabertura depende de fluxo autorizado especifico e de registro de impacto.

### Resultado

Fechamento permanece efetivo ate autorizacao apropriada.

---

## FA-05 - Rejeicao por integracao correlata

### Condicao

Uma integracao dependente, como eSocial ou arquivo correlato, aponta inconsistência impeditiva.

### Acao

Sistema bloqueia o fechamento ou registra pendencia operacional.

### Resultado

Fechamento aguarda saneamento.

---

# Pos-condicoes

## Sucesso

- Folha fechada.
- Competencia bloqueada para alteracoes indevidas.
- Status final registrado.
- Auditoria e resumo de fechamento preservados.

## Falha

- Competencia permanece aberta ou em estado pendente, sem perda de historico.

---

# Regras de Negocio Relacionadas

- O fechamento da folha deve impedir novas alteracoes na competencia.
- O fechamento deve ser auditable e versionado.
- O fechamento deve gerar evento S-1299 quando aplicavel.
- A competencia fechada deve manter vinculacao com seus holerites, bases e memórias.
- Reprocessamentos posteriores devem seguir fluxo autorizado de excecao.
- O fechamento nao deve apagar historico nem sobrescrever apuracoes anteriores.

---

# Entidades Envolvidas

## PayrollClosing

```text
id
company_id
competence
status
closed_at
closed_by
summary_ref
```

## PayrollClosingValidation

```text
id
payroll_closing_id
validation_type
result
message
created_at
```

## PayrollClosingAudit

```text
id
payroll_closing_id
event_type
event_ref
created_at
created_by
```

---

# Campos Obrigatorios

| Campo | Obrigatorio |
|---|---|
| Empresa | Sim |
| Competencia | Sim |
| Status do fechamento | Sim |
| Data do fechamento | Sim |
| Usuario responsavel | Sim |
| Resumo de fechamento | Sim |

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Total |
| RH Folha | Fechar e consultar |
| Gestor | Nao |
| Colaborador | Nao |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payrolls/{competence}/close
```

```http
GET /api/v1/payrolls/{competence}/closing
```

```http
POST /api/v1/payrolls/{competence}/closing/validate
```

---

# Eventos de Dominio

```text
PayrollClosed
PayrollClosingValidated
PayrollClosingFailed
PayrollClosingSummaryGenerated
```

---

# Integracoes Impactadas

- eSocial.
- Portal do Colaborador.
- Gestao Documental.
- Contabilidade.
- Auditoria.
- Analytics e BI.
- Financeiro, quando houver reflexo de encerramento.

---

# Casos de Teste

### CT-FOL-010-001

Fechar competencia valida e consolidada.

Resultado esperado:

```text
Folha fechada com sucesso.
```

### CT-FOL-010-002

Tentar fechar competencia com pendencias criticas.

Resultado esperado:

```text
Sistema bloqueia o fechamento.
```

### CT-FOL-010-003

Tentar fechar competencia sem permissao adequada.

Resultado esperado:

```text
Sistema bloqueia a operacao.
```

### CT-FOL-010-004

Tentar alterar competencia apos fechamento.

Resultado esperado:

```text
Sistema bloqueia a alteracao e orienta fluxo autorizado de excecao.
```

### CT-FOL-010-005

Fechar competencia com integracao correlata inconsistente.

Resultado esperado:

```text
Sistema registra pendencia e nao conclui o fechamento.
```

---

# Metricas

- Quantidade de competencias fechadas por periodo.
- Tempo medio entre conferencia final e fechamento.
- Quantidade de bloqueios por pendencia.
- Quantidade de reaberturas autorizadas.
- Quantidade de inconsistencias associadas ao fechamento.

---

# Observacoes Arquiteturais

O fechamento da folha deve ser o ponto de congelamento funcional da competencia.

Depois do fechamento, o sistema deve preservar integridade, auditoria e rastreabilidade, evitando alteracoes silenciosas em calculos, holerites e bases.

O evento de fechamento deve ser suficientemente claro para permitir integracoes, conferencias e excecoes controladas sem ambiguidades.

---

# Lacunas adjacentes ao UC-FOL-010

O fechamento da folha encerra o catalogo atual do modulo UC-FOL. As proximas continuidades catalogadas sao:

- UC-BI-001 - Consultar dashboard executivo;
- UC-SEC-001 - Gerenciar perfis de acesso;
- UC-API-001 - Cadastrar integração;
- UC-PLT-001 - Cadastrar tenant.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha o pacote FOL. Ele deve ser lido depois do processamento mensal, da complementacao, dos encargos e da geracao do holerite, porque bloqueia a competencia e consolida o resultado final.
