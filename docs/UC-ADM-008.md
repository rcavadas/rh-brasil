# UC-ADM-008

## Registrar Transferência

### Objetivo

Permitir o registro e controle das transferências organizacionais dos colaboradores, preservando histórico, conformidade legal, integridade dos vínculos empregatícios e integração com todos os módulos impactados.

---

# Atores

## Primários

* Analista de RH
* Business Partner
* Administrador do Sistema

## Secundários

* Gestor Origem
* Gestor Destino
* Folha de Pagamento
* SST
* Benefícios
* eSocial
* Analytics

---

# Pré-Condições

* Colaborador ativo.
* Contrato ativo.
* Unidade destino cadastrada.
* Usuário autorizado.
* Estrutura organizacional vigente.

---

# Gatilho

O processo inicia quando a organização decide transferir um colaborador para outra estrutura organizacional.

---

# Tipos de Transferência

## Organizacional

Mudança de departamento.

---

## Centro de Custo

Mudança financeira.

---

## Unidade

Mudança operacional.

---

## Filial

Transferência entre estabelecimentos.

---

## Empresa do Grupo

Transferência entre empresas.

---

## Gestor

Mudança hierárquica.

---

## Localidade

Mudança geográfica.

---

## Múltipla

Combinação de vários tipos.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Movimentações
→ Transferências
→ Nova Transferência
```

### Etapa 2

Sistema solicita colaborador.

### Etapa 3

Sistema apresenta situação atual.

### Etapa 4

Usuário seleciona tipo de transferência.

### Etapa 5

Usuário informa:

* Unidade origem
* Unidade destino
* Data efetiva
* Motivo
* Observações

### Etapa 6

Sistema valida regras organizacionais.

### Etapa 7

Sistema inicia workflow.

### Etapa 8

Aprovadores analisam solicitação.

### Etapa 9

Solicitação aprovada.

### Etapa 10

Sistema registra movimentação.

### Etapa 11

Sistema atualiza estruturas impactadas.

### Etapa 12

Sistema gera histórico.

### Etapa 13

Sistema dispara integrações.

### Etapa 14

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 — Unidade destino inexistente

### Resultado

```text
Transferência bloqueada.
```

---

## FA-02 — Transferência retroativa

### Resultado

```text
Necessária aprovação especial.
```

---

## FA-03 — Aprovação rejeitada

### Resultado

```text
Processo encerrado.
```

---

## FA-04 — Empresa destino incompatível

### Resultado

```text
Transferência impedida.
```

---

# Pós-Condições

## Sucesso

* Estrutura atualizada.
* Histórico registrado.
* Integrações executadas.

## Falha

* Nenhuma alteração persistida.

---

# Regras de Negócio

## RN-ADM-TRA-001

Toda transferência deve possuir justificativa.

## RN-ADM-TRA-002

Toda transferência deve possuir data efetiva.

## RN-ADM-TRA-003

Transferências devem gerar histórico permanente.

## RN-ADM-TRA-004

Transferências entre empresas podem exigir novo vínculo contratual.

## RN-ADM-TRA-005

Transferências devem atualizar estruturas organizacionais.

## RN-ADM-TRA-006

Mudanças de lotação devem atualizar SST.

## RN-ADM-TRA-007

Mudanças organizacionais devem atualizar indicadores.

## RN-ADM-TRA-008

Transferências devem ser auditáveis.

---

# Entidades Envolvidas

## EmployeeTransfer

```text
id
employee_id
transfer_type
source_unit_id
target_unit_id
effective_date
reason
status
```

---

## EmployeeTransferApproval

```text
id
transfer_id
approver_id
decision
decision_date
```

---

## EmployeeTransferHistory

```text
id
transfer_id
employee_id
created_at
created_by
```

---

# Campos Obrigatórios

| Campo              | Obrigatório |
| ------------------ | ----------- |
| Colaborador        | Sim         |
| Tipo Transferência | Sim         |
| Unidade Destino    | Sim         |
| Data Efetiva       | Sim         |
| Motivo             | Sim         |

---

# Permissões

| Perfil      | Permissão |
| ----------- | --------- |
| RH Admin    | Total     |
| RH BP       | Total     |
| RH Operação | Criar     |
| Gestor      | Solicitar |
| Auditor     | Consulta  |

---

# APIs Sugeridas

## Criar transferência

```http
POST /api/v1/transfers
```

---

## Consultar transferência

```http
GET /api/v1/transfers/{id}
```

---

## Aprovar transferência

```http
POST /api/v1/transfers/{id}/approve
```

---

## Rejeitar transferência

```http
POST /api/v1/transfers/{id}/reject
```

---

# Eventos de Domínio

```text
EmployeeTransferred
EmployeeManagerChanged
EmployeeDepartmentChanged
EmployeeCostCenterChanged
EmployeeBranchChanged
TransferApproved
TransferRejected
```

---

# Integrações Impactadas

## Folha

* Centro de custo
* Rateio
* Encargos

---

## SST

* Ambiente de trabalho
* Exposição ocupacional
* Riscos

---

## Benefícios

* Elegibilidade
* Operadoras regionais
* Cobertura

---

## eSocial

### Possíveis eventos

```text
S-2206
S-2240
```

Dependendo do tipo de transferência.

---

## Analytics

* Headcount
* Movimentação interna
* Estrutura organizacional
* Workforce Planning

---

# Casos de Teste

## CT-ADM-008-001

Transferir colaborador entre departamentos.

Resultado esperado:

```text
Transferência concluída.
```

---

## CT-ADM-008-002

Transferir para unidade inexistente.

Resultado esperado:

```text
Operação bloqueada.
```

---

## CT-ADM-008-003

Transferência rejeitada.

Resultado esperado:

```text
Processo encerrado.
```

---

## CT-ADM-008-004

Transferência com impacto SST.

Resultado esperado:

```text
Riscos ocupacionais recalculados.
```

---

# Métricas

* Transferências por período
* Transferências por unidade
* Transferências por gestor
* Transferências entre filiais
* Transferências entre empresas
* Tempo médio de aprovação
* Mobilidade interna

---

# Observações Arquiteturais

Transferências não devem atualizar diretamente o cadastro do colaborador.

O fluxo correto deve ser:

```text
TransferRequest
→ Workflow
→ Approval
→ TransferExecution
→ History
→ Domain Events
→ Integrations
```

Isso garante rastreabilidade, auditoria e consistência entre todos os módulos.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido como uma movimentacao interna posterior ao contrato, porque altera lotacao, gestor ou contexto operacional sem encerrar o vinculo do colaborador.
