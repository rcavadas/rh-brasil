# UC-ADM-010

## Registrar Desligamento Administrativo

### Objetivo

Permitir o registro formal do desligamento de um colaborador, iniciando o processo de encerramento do vínculo empregatício e disparando as integrações necessárias com folha de pagamento, rescisão, benefícios, SST, eSocial, segurança da informação e analytics.

---

# Atores

## Primários

* Analista de RH
* Business Partner
* Administrador do Sistema

## Secundários

* Gestor
* Jurídico
* Folha de Pagamento
* eSocial
* SST
* Benefícios
* IAM
* Analytics

---

# Pré-Condições

* Colaborador ativo.
* Contrato ativo.
* Usuário autorizado.
* Motivo de desligamento cadastrado.

---

# Gatilho

O processo inicia quando a organização decide encerrar o vínculo de trabalho do colaborador ou quando o próprio colaborador solicita seu desligamento.

---

# Tipos de Desligamento

## Sem Justa Causa

Iniciativa do empregador.

---

## Com Justa Causa

Conforme legislação trabalhista.

---

## Pedido de Demissão

Iniciativa do colaborador.

---

## Rescisão Consensual

Conforme Art. 484-A da CLT.

---

## Término de Contrato

Encerramento automático do vínculo.

---

## Aposentadoria

Quando aplicável.

---

## Falecimento

Encerramento por óbito.

---

## Encerramento de Aprendizagem

Fim do contrato de aprendizagem.

---

## Encerramento de Estágio

Fim do contrato de estágio.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Desligamentos
→ Novo Desligamento
```

### Etapa 2

Usuário seleciona colaborador.

### Etapa 3

Sistema apresenta situação atual.

### Etapa 4

Usuário informa:

* Motivo
* Data do desligamento
* Data do aviso prévio
* Tipo de aviso
* Observações

### Etapa 5

Sistema valida elegibilidade.

### Etapa 6

Sistema inicia workflow quando necessário.

### Etapa 7

Aprovação concluída.

### Etapa 8

Sistema registra desligamento.

### Etapa 9

Sistema altera status do colaborador.

### Etapa 10

Sistema inicia processo rescisório.

### Etapa 11

Sistema dispara integrações.

### Etapa 12

Sistema registra auditoria.

---

# Fluxo de Offboarding

Após confirmação do desligamento:

### Etapa 1

Revogar acessos.

### Etapa 2

Cancelar benefícios.

### Etapa 3

Recolher equipamentos.

### Etapa 4

Encerrar treinamentos ativos.

### Etapa 5

Bloquear novos workflows.

### Etapa 6

Preparar documentação rescisória.

### Etapa 7

Atualizar indicadores.

---

# Fluxos Alternativos

## FA-01 — Colaborador inexistente

### Resultado

```text
Operação bloqueada.
```

---

## FA-02 — Contrato já encerrado

### Resultado

```text
Desligamento não permitido.
```

---

## FA-03 — Workflow rejeitado

### Resultado

```text
Processo cancelado.
```

---

## FA-04 — Data inválida

### Resultado

```text
Validação obrigatória.
```

---

# Pós-Condições

## Sucesso

* Colaborador desligado.
* Processo rescisório iniciado.
* Histórico registrado.
* Integrações executadas.

## Falha

* Nenhuma alteração aplicada.

---

# Regras de Negócio

## RN-ADM-DES-001

Todo desligamento deve possuir motivo.

---

## RN-ADM-DES-002

Todo desligamento deve possuir data efetiva.

---

## RN-ADM-DES-003

O desligamento deve iniciar automaticamente o processo rescisório.

---

## RN-ADM-DES-004

O sistema deve impedir novos apontamentos após desligamento efetivo.

---

## RN-ADM-DES-005

O sistema deve preservar todo histórico do colaborador.

---

## RN-ADM-DES-006

O sistema deve bloquear exclusão física do cadastro.

---

## RN-ADM-DES-007

O sistema deve registrar trilha completa de auditoria.

---

## RN-ADM-DES-008

O desligamento deve atualizar todos os módulos dependentes.

---

# Entidades Envolvidas

## EmployeeTermination

```text
id
employee_id
termination_type
termination_reason
termination_date
notice_type
status
```

---

## EmployeeTerminationWorkflow

```text
id
termination_id
approver_id
status
approved_at
```

---

## EmployeeOffboarding

```text
id
termination_id
equipment_returned
access_revoked
benefits_cancelled
completed_at
```

---

## EmployeeTerminationHistory

```text
id
termination_id
event_type
event_date
performed_by
```

---

# Campos Obrigatórios

| Campo             | Obrigatório |
| ----------------- | ----------- |
| Colaborador       | Sim         |
| Motivo            | Sim         |
| Tipo Desligamento | Sim         |
| Data Desligamento | Sim         |
| Status            | Sim         |

---

# Permissões

| Perfil      | Permissão |
| ----------- | --------- |
| RH Admin    | Total     |
| RH BP       | Total     |
| RH Operação | Criar     |
| Gestor      | Solicitar |
| Jurídico    | Consulta  |
| Auditor     | Consulta  |

---

# APIs Sugeridas

## Criar desligamento

```http
POST /api/v1/terminations
```

---

## Consultar desligamento

```http
GET /api/v1/terminations/{id}
```

---

## Aprovar desligamento

```http
POST /api/v1/terminations/{id}/approve
```

---

## Executar offboarding

```http
POST /api/v1/terminations/{id}/offboarding
```

---

# Eventos de Domínio

```text
EmployeeTerminationRequested
EmployeeTerminationApproved
EmployeeTerminated
EmployeeOffboardingStarted
EmployeeOffboardingCompleted
```

---

# Integrações Impactadas

## Rescisão

* Cálculo rescisório
* Documentação

---

## Folha

* Verbas finais
* Encargos

---

## Benefícios

* Cancelamentos
* Encerramentos

---

## SST

* Encerramento de exposição
* Arquivamento ocupacional

---

## IAM

* Revogação de acessos
* Encerramento de credenciais

---

## eSocial

### Possível evento

```text
S-2299
```

---

## Analytics

* Turnover
* Headcount
* Custos de desligamento

---

# Casos de Teste

## CT-ADM-010-001

Registrar pedido de demissão.

Resultado esperado:

```text
Desligamento registrado.
```

---

## CT-ADM-010-002

Registrar desligamento sem justa causa.

Resultado esperado:

```text
Processo rescisório iniciado.
```

---

## CT-ADM-010-003

Registrar desligamento sem motivo.

Resultado esperado:

```text
Erro de validação.
```

---

## CT-ADM-010-004

Executar offboarding.

Resultado esperado:

```text
Acessos revogados e benefícios encerrados.
```

---

# Métricas

* Desligamentos por período
* Desligamentos por motivo
* Turnover voluntário
* Turnover involuntário
* Tempo médio de offboarding
* Custos de desligamento
* Taxa de retenção

---

# Observações Arquiteturais

O desligamento administrativo não encerra diretamente o contrato nem calcula verbas rescisórias.

Fluxo recomendado:

```text
TerminationRequest
→ Workflow
→ Approval
→ EmployeeTermination
→ Offboarding
→ RescissionProcess
→ eSocial
→ Analytics
```

Isso mantém separadas as responsabilidades dos módulos:

```text
ADM → decisão de desligar
RES → cálculo rescisório
ESO → obrigações governamentais
IAM → revogação de acessos
BI → indicadores
```
---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha o pacote ADM. Ele deve ser lido depois do cadastro, do vínculo, das atualizações cadastrais, dos dependentes e das movimentações internas, porque prepara a transição para offboarding e rescisão.
