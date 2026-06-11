# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-009 - Gerar Holerite

### Versao

1.0

---

# Objetivo

Permitir a geracao e consolidacao do holerite do colaborador por competencia, reunindo proventos, descontos, bases de INSS, FGTS e IRRF, valor liquido, memoria de calculo e historico, com controle de acesso, rastreabilidade e integracao com a gestao documental, deixando a disponibilizacao ao colaborador para o fluxo de fechamento da folha.

---

# Atores

## Primarios

- Analista de Folha
- Analista de RH
- Administrador do Sistema

## Secundarios

- Colaborador
- Portal do Colaborador
- Gestao Documental
- Auditoria
- Folha de Pagamento

---

# Pre-condicoes

- Empresa cadastrada.
- Usuario autenticado.
- Usuario com permissao para gerar holerite.
- Competencia processada e conferida.
- Bases de INSS, FGTS e IRRF disponiveis para a competencia.
- Proventos, descontos e liquido consolidados para a competencia.
- Regras de disponibilizacao e acesso ao holerite configuradas.
- Colaborador com vinculo elegivel para recebimento do holerite.

---

# Gatilho

O processo inicia quando a folha da competencia esta apta a gerar o holerite, seja apos o processamento mensal ou apos a conferencia de ajustes, mas antes da disponibilizacao final ao colaborador.

---

# Fluxo Principal

### Etapa 1

Usuario acessa:

```text
Folha de Pagamento
-> Holerites
-> Gerar
```

### Etapa 2

Sistema apresenta as competencias aptas para geracao de holerite.

### Etapa 3

Usuario seleciona a competencia, o escopo e, quando aplicavel, o tipo de holerite:

- holerite mensal;
- holerite complementar;
- holerite de 13o salario;
- segunda via;
- reemissao.

### Etapa 4

Sistema consolida os componentes da remuneracao:

- proventos;
- descontos;
- bases de INSS, FGTS e IRRF;
- valor bruto;
- valor liquido;
- informacoes complementares da competencia.

### Etapa 5

Sistema monta a versao do holerite com identificacao unica da competencia e do colaborador.

### Etapa 6

Sistema valida:

- permissao do usuario;
- consistencia da competencia;
- disponibilidade das bases obrigatorias;
- integridade dos dados consolidados;
- existencia de bloqueio de acesso ou restricao documental.

### Etapa 7

Sistema gera o holerite em formato padronizado.

### Etapa 8

Sistema registra a data de geracao e a versao gerada.

### Etapa 9

Sistema armazena o documento em gestao documental ou repositório equivalente, quando configurado.

### Etapa 10

Sistema registra auditoria e trilha de acesso.

---

# Fluxos Alternativos

## FA-01 - Competencia nao processada

### Condicao

A competencia ainda nao possui fechamento logico suficiente para gerar holerite.

### Acao

Sistema bloqueia a geracao.

### Resultado

Usuario precisa concluir o processamento e a conferencia da competencia.

---

## FA-02 - Base obrigatoria ausente

### Condicao

Uma ou mais bases obrigatorias nao estao disponiveis.

### Acao

Sistema bloqueia ou gera pendencia de conferência, conforme politica.

### Resultado

Holerite nao e disponibilizado ate saneamento.

---

## FA-03 - Colaborador sem elegibilidade

### Condicao

O colaborador nao possui vinculo elegivel para emissao do holerite.

### Acao

Sistema bloqueia a emissao para o colaborador.

### Resultado

Nenhum documento e disponibilizado para aquele registro.

---

## FA-04 - Reemissao nao autorizada

### Condicao

O usuario nao possui permissao para emitir segunda via ou reemissao.

### Acao

Sistema bloqueia a operacao.

### Resultado

Nao ha nova emissao.

---

## FA-05 - Restricao documental ou de acesso

### Condicao

O holerite possui restricao de acesso, bloqueio por auditoria ou politica de retencao.

### Acao

Sistema impede a visualizacao e registra a tentativa.

### Resultado

Documento permanece protegido.

---

# Pos-condicoes

## Sucesso

- Holerite gerado por competencia.
- Versao do documento registrada.
- Data de geracao registrada.
- Documento disponivel no portal ou canal autorizado.
- Auditoria e trilha de acesso registradas.

## Falha

- Nenhuma disponibilizacao indevida de documento.

---

# Regras de Negocio Relacionadas

- Todo colaborador com remuneracao processada deve possuir holerite.
- O holerite deve apresentar proventos, descontos, bases de INSS, FGTS e IRRF e valor liquido.
- O holerite deve ser disponibilizado no portal do colaborador pelo fluxo de fechamento da folha quando configurado.
- O sistema deve registrar a data de geracao do holerite.
- O sistema deve permitir segunda via do holerite, respeitando permissao e politica.
- O acesso ao holerite deve respeitar controle de permissao e trilha de auditoria.
- O holerite deve manter historico por competencia.
- O documento nao deve ser tratado como simples tela; deve existir como artefato auditavel e versionado.
- Holerites complementares, de 13o salario e reemissoes devem manter identificacao propria sem sobrescrever a emissao anterior.

---

# Entidades Envolvidas

## PayrollPayslip

```text
id
company_id
employee_id
competence
type
status
version
gross_amount
net_amount
disclosed_at
created_at
created_by
```

## PayrollPayslipItem

```text
id
payroll_payslip_id
item_type
description
amount
category
```

## PayrollPayslipAccessLog

```text
id
payroll_payslip_id
accessed_by
accessed_at
access_type
result
```

## PayrollPayslipDocument

```text
id
payroll_payslip_id
document_ref
storage_status
created_at
```

---

# Campos Obrigatorios

| Campo | Obrigatorio |
|---|---|
| Empresa | Sim |
| Colaborador | Sim |
| Competencia | Sim |
| Tipo de holerite | Sim |
| Versao | Sim |
| Valor bruto | Sim |
| Valor liquido | Sim |
| Bases de INSS, FGTS e IRRF | Sim |

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Total |
| RH Folha | Gerar, reemitir e consultar |
| Gestor | Consultar quando autorizado |
| Colaborador | Consultar o proprio holerite |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payrolls/payslips/generate
```

```http
GET /api/v1/payrolls/payslips/{id}
```

```http
POST /api/v1/payrolls/payslips/{id}/reissue
```

```http
GET /api/v1/payrolls/payslips/{id}/access-log
```

---

# Eventos de Dominio

```text
PayrollPayslipGenerated
PayrollPayslipPublished
PayrollPayslipReissued
PayrollPayslipAccessed
PayrollPayslipGenerationFailed
```

---

# Integracoes Impactadas

- Gestao Documental.
- Folha de Pagamento.
- Auditoria.
- Analytics e BI.

---

# Casos de Teste

### CT-FOL-009-001

Gerar holerite para competencia valida com bases consolidadas.

Resultado esperado:

```text
Holerite gerado com sucesso.
```

### CT-FOL-009-002

Gerar holerite com competencia ainda nao conferida.

Resultado esperado:

```text
Sistema bloqueia a geracao.
```

### CT-FOL-009-003

Reemitir holerite sem permissao adequada.

Resultado esperado:

```text
Sistema bloqueia a operacao.
```

### CT-FOL-009-004

Consultar holerite como colaborador autorizado.

Resultado esperado:

```text
Documento disponibilizado com trilha de acesso.
```

### CT-FOL-009-005

Tentar acessar holerite com restricao documental ativa.

Resultado esperado:

```text
Sistema impede a visualizacao e registra a tentativa.
```

---

# Metricas

- Quantidade de holerites gerados por competencia.
- Quantidade de reemissoes por competencia.
- Tempo medio entre processamento e geracao.
- Quantidade de acessos por portal ou canal.
- Quantidade de bloqueios por restricao ou pendencia de conferencia.

---

# Observacoes Arquiteturais

O holerite deve ser tratado como documento versionado e auditavel, nao como simples renderizacao de interface.

A geracao do holerite precisa refletir a competencia consolidada e as bases efetivamente apuradas, sem reintroduzir incertezas do processamento anterior.

O acesso ao documento deve ser registrado para permitir auditoria, LGPD, suporte e conferencia posterior.

---

# Lacunas adjacentes ao UC-FOL-009

O holerite depende de definicoes posteriores, que devem permanecer em casos de uso proprios:

- UC-FOL-010 - Fechar Folha de Pagamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois do cálculo das bases e dos encargos, porque consolida o demonstrativo individual da competencia para disponibilizacao e conferência.
