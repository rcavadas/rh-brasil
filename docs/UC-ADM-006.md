# UC-ADM-006

## Registrar Alteração Contratual

### Objetivo

Permitir o registro, aprovação, controle e rastreamento das alterações contratuais ocorridas durante a vigência do vínculo empregatício, preservando histórico, conformidade legal e integração com os sistemas dependentes.

---

# Atores

## Primários

* Analista de RH
* Business Partner de RH
* Administrador do Sistema

## Secundários

* Gestor
* Folha de Pagamento
* eSocial
* SST
* Benefícios
* Analytics

---

# Pré-Condições

* Colaborador ativo.
* Contrato ativo.
* Usuário autorizado.
* Histórico contratual disponível.

---

# Gatilho

O processo inicia quando ocorre uma alteração nas condições do contrato de trabalho.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Contratos
→ Alterações Contratuais
→ Nova Alteração
```

### Etapa 2

Usuário seleciona colaborador.

### Etapa 3

Sistema apresenta contrato vigente.

### Etapa 4

Usuário seleciona tipo de alteração.

### Etapa 5

Usuário informa novos valores.

### Etapa 6

Sistema executa validações.

### Etapa 7

Sistema registra alteração.

### Etapa 8

Sistema atualiza contrato vigente.

### Etapa 9

Sistema gera histórico contratual.

### Etapa 10

Sistema identifica impactos regulatórios.

### Etapa 11

Sistema dispara integrações.

### Etapa 12

Sistema registra auditoria.

---

# Tipos de Alteração Contratual

## Cargo

Mudança de cargo.

---

## Função

Mudança de função exercida.

---

## Salário

Reajuste salarial.

---

## Jornada

Mudança de horário ou carga horária.

---

## Centro de Custo

Mudança organizacional.

---

## Gestor

Alteração da hierarquia.

---

## Unidade Organizacional

Mudança de departamento ou área.

---

## Local de Trabalho

Mudança de estabelecimento ou filial.

---

## Regime de Trabalho

* Presencial
* Híbrido
* Remoto

---

## Tipo Contratual

Quando permitido pela legislação.

---

# Fluxos Alternativos

## FA-01 — Contrato inexistente

### Condição

Colaborador sem contrato ativo.

### Resultado

Sistema bloqueia operação.

---

## FA-02 — Alteração retroativa não autorizada

### Condição

Data efetiva anterior ao limite permitido.

### Resultado

Sistema exige aprovação especial.

---

## FA-03 — Salário abaixo da faixa mínima

### Condição

Novo salário fora da política salarial.

### Resultado

Sistema impede aprovação.

---

## FA-04 — Cargo incompatível

### Condição

Cargo inativo ou inexistente.

### Resultado

Sistema bloqueia alteração.

---

# Pós-Condições

## Sucesso

* Contrato atualizado.
* Histórico preservado.
* Eventos regulatórios gerados.
* Integrações executadas.

## Falha

* Nenhuma alteração aplicada.

---

# Regras de Negócio Relacionadas

## Vigência

Toda alteração contratual deve possuir data efetiva.

---

## Histórico

Nenhuma alteração poderá sobrescrever informações anteriores.

---

## Auditoria

Toda alteração deve ser registrada.

---

## Aprovação

Alterações salariais podem exigir aprovação.

---

## Conformidade

Alterações devem respeitar legislação trabalhista vigente.

---

# Entidades Envolvidas

## EmploymentContractChange

```text
id
contract_id
change_type
effective_date
reason
status
created_by
created_at
```

---

## EmploymentContractChangeDetail

```text
id
change_id
field_name
old_value
new_value
```

---

## EmploymentContractHistory

```text
id
contract_id
event_type
event_date
performed_by
```

---

## ApprovalWorkflow

```text
id
process_id
approver_id
status
approved_at
```

---

# Campos Obrigatórios

| Campo          | Obrigatório |
| -------------- | ----------- |
| Colaborador    | Sim         |
| Tipo Alteração | Sim         |
| Data Efetiva   | Sim         |
| Motivo         | Sim         |
| Novo Valor     | Sim         |

---

# Permissões

| Perfil      | Permissão       |
| ----------- | --------------- |
| RH Admin    | Total           |
| RH BP       | Criar e Aprovar |
| RH Operação | Criar           |
| Gestor      | Solicitar       |
| Auditor     | Consulta        |

---

# APIs Sugeridas

## Criar alteração

```http
POST /api/v1/contracts/{id}/changes
```

---

## Consultar alterações

```http
GET /api/v1/contracts/{id}/changes
```

---

## Aprovar alteração

```http
POST /api/v1/contracts/{id}/changes/{changeId}/approve
```

---

## Cancelar alteração

```http
POST /api/v1/contracts/{id}/changes/{changeId}/cancel
```

---

# Eventos de Domínio

```text
EmploymentContractChanged
EmployeeJobChanged
EmployeeSalaryChanged
EmployeeDepartmentChanged
EmployeeManagerChanged
EmploymentContractChangeApproved
```

---

# Integrações Impactadas

## Folha

* Salário
* Encargos
* Benefícios

---

## eSocial

### Possíveis eventos

```text
S-2205
S-2206
```

---

## SST

* Ambiente de trabalho
* Exposição ocupacional

---

## Analytics

* Headcount
* Movimentações internas
* Custos de pessoal

---

# Casos de Teste

## CT-ADM-006-001

Alterar salário.

Resultado esperado:

```text
Alteração registrada e histórico criado.
```

---

## CT-ADM-006-002

Alterar cargo.

Resultado esperado:

```text
Novo cargo aplicado e evento gerado.
```

---

## CT-ADM-006-003

Alteração sem motivo.

Resultado esperado:

```text
Validação obrigatória.
```

---

## CT-ADM-006-004

Alteração retroativa não autorizada.

Resultado esperado:

```text
Solicitação bloqueada.
```

---

## CT-ADM-006-005

Alteração salarial fora da faixa.

Resultado esperado:

```text
Erro de política salarial.
```

---

# Métricas

* Alterações contratuais por período
* Alterações por tipo
* Promoções realizadas
* Reajustes salariais
* Mudanças organizacionais
* Tempo médio de aprovação

---

# Observações Arquiteturais

A entidade **EmploymentContract** nunca deve ser atualizada diretamente sem geração de histórico.

Toda alteração deve gerar:

```text
EmploymentContractChange
→ Aprovação (quando aplicável)
→ Histórico
→ Evento de Domínio
→ Integrações
```

Este fluxo será reutilizado posteriormente nos módulos:

* UC-CAR (Cargos e Salários)
* UC-PER (Performance)
* UC-WFL (Workflow)
* UC-ESO (eSocial)
* UC-BI (Analytics)
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido como a camada de alteracao formal do vinculo depois da criacao base e da formalizacao contratual. Ele preserva historico, vigencia e impacto nos modulos dependentes.
