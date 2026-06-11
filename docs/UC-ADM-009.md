# UC-ADM-009

## Registrar Afastamento

### Objetivo

Permitir o registro, controle, acompanhamento e encerramento dos afastamentos dos colaboradores, garantindo conformidade legal, atualização dos eventos governamentais, cálculo correto da folha de pagamento e rastreabilidade completa do processo.

---

# Atores

## Primários

* Analista de RH
* Assistente de RH
* Administrador do Sistema

## Secundários

* Gestor
* SST
* Folha de Pagamento
* INSS
* eSocial
* Jurídico

---

# Pré-Condições

* Colaborador ativo.
* Contrato ativo.
* Usuário autorizado.
* Motivo de afastamento cadastrado.

---

# Gatilho

O processo inicia quando ocorre uma situação que afasta temporariamente o colaborador de suas atividades laborais.

---

# Tipos de Afastamento

## Doença Comum

Auxílio por incapacidade temporária.

---

## Acidente de Trabalho

Afastamento decorrente de acidente laboral.

---

## Doença Ocupacional

Afastamento decorrente de doença relacionada ao trabalho.

---

## Licença Maternidade

Conforme legislação vigente.

---

## Licença Paternidade

Conforme legislação vigente.

---

## Serviço Militar

Afastamento obrigatório.

---

## Mandato Sindical

Afastamento para exercício sindical.

---

## Licença Não Remunerada

Afastamento sem remuneração.

---

## Prisão

Quando previsto em legislação aplicável.

---

## Outros Motivos Legais

Conforme parametrização da empresa.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text id="3pp6hs"
Administração de Pessoal
→ Afastamentos
→ Novo Afastamento
```

### Etapa 2

Usuário seleciona colaborador.

### Etapa 3

Sistema apresenta vínculo ativo.

### Etapa 4

Usuário seleciona motivo do afastamento.

### Etapa 5

Usuário informa:

* Data início
* Data prevista retorno
* Motivo
* Observações
* Número do benefício (quando aplicável)

### Etapa 6

Usuário anexa documentos comprobatórios.

### Etapa 7

Sistema valida informações.

### Etapa 8

Sistema registra afastamento.

### Etapa 9

Sistema atualiza status do colaborador.

### Etapa 10

Sistema gera eventos regulatórios.

### Etapa 11

Sistema atualiza folha e SST.

### Etapa 12

Sistema registra auditoria.

---

# Fluxo de Retorno

### Etapa 1

Usuário localiza afastamento ativo.

### Etapa 2

Usuário informa retorno.

### Etapa 3

Sistema valida documentação.

### Etapa 4

Sistema encerra afastamento.

### Etapa 5

Sistema reativa situação funcional.

### Etapa 6

Sistema atualiza integrações.

### Etapa 7

Sistema registra histórico.

---

# Fluxos Alternativos

## FA-01 — Colaborador sem contrato ativo

### Resultado

```text id="y0s6g4"
Registro bloqueado.
```

---

## FA-02 — Data inválida

### Resultado

```text id="axmowf"
Validação obrigatória.
```

---

## FA-03 — Documento obrigatório ausente

### Resultado

```text id="ljn5s8"
Afastamento pendente.
```

---

## FA-04 — Retorno anterior ao início

### Resultado

```text id="nvjljw"
Operação bloqueada.
```

---

# Pós-Condições

## Sucesso

* Afastamento registrado.
* Status atualizado.
* Eventos gerados.
* Histórico preservado.

## Falha

* Nenhuma alteração persistida.

---

# Regras de Negócio

## RN-ADM-AFA-001

Todo afastamento deve possuir motivo formal.

---

## RN-ADM-AFA-002

Todo afastamento deve possuir data de início.

---

## RN-ADM-AFA-003

Afastamentos previdenciários devem permitir registro do benefício.

---

## RN-ADM-AFA-004

Afastamentos por acidente devem possuir integração com CAT.

---

## RN-ADM-AFA-005

Licença maternidade deve respeitar regras legais vigentes.

---

## RN-ADM-AFA-006

O sistema deve controlar afastamentos simultâneos não permitidos.

---

## RN-ADM-AFA-007

O sistema deve registrar histórico integral.

---

## RN-ADM-AFA-008

Toda movimentação deve ser auditável.

---

# Entidades Envolvidas

## EmployeeLeave

```text id="xgfd9i"
id
employee_id
leave_type
start_date
expected_return_date
actual_return_date
status
```

---

## EmployeeLeaveBenefit

```text id="ptcvxv"
id
leave_id
benefit_number
benefit_type
grant_date
```

---

## EmployeeLeaveDocument

```text id="s8krv7"
id
leave_id
document_type
file_id
uploaded_at
```

---

## EmployeeLeaveHistory

```text id="m4kwye"
id
leave_id
event_type
event_date
performed_by
```

---

# Campos Obrigatórios

| Campo       | Obrigatório |
| ----------- | ----------- |
| Colaborador | Sim         |
| Motivo      | Sim         |
| Data Início | Sim         |
| Status      | Sim         |

---

# Permissões

| Perfil      | Permissão         |
| ----------- | ----------------- |
| RH Admin    | Total             |
| RH Operação | Total             |
| SST         | Consulta e Gestão |
| Gestor      | Consulta          |
| Auditor     | Consulta          |

---

# APIs Sugeridas

## Criar afastamento

```http id="i1d1pc"
POST /api/v1/leaves
```

---

## Consultar afastamento

```http id="6v4ff6"
GET /api/v1/leaves/{id}
```

---

## Registrar retorno

```http id="v3n6gu"
POST /api/v1/leaves/{id}/return
```

---

## Encerrar afastamento

```http id="1c40gb"
PATCH /api/v1/leaves/{id}/close
```

---

# Eventos de Domínio

```text id="jlwm1z"
EmployeeLeaveStarted
EmployeeLeaveUpdated
EmployeeLeaveClosed
EmployeeReturnedFromLeave
WorkAccidentRegistered
```

---

# Integrações Impactadas

## Folha

* Suspensão de pagamentos quando aplicável
* Benefícios previdenciários
* Encargos

---

## SST

* Acidentes
* CAT
* Indicadores ocupacionais

---

## eSocial

### Possíveis eventos

```text id="m9aqk6"
S-2230
S-2210
```

Dependendo da natureza do afastamento.

---

## Analytics

* Absenteísmo
* Indicadores de saúde
* Turnover indireto
* Custos de afastamento

---

# Casos de Teste

## CT-ADM-009-001

Registrar afastamento médico.

Resultado esperado:

```text id="s0lyzw"
Afastamento criado com sucesso.
```

---

## CT-ADM-009-002

Registrar acidente de trabalho.

Resultado esperado:

```text id="x52u5e"
CAT vinculada e evento gerado.
```

---

## CT-ADM-009-003

Registrar sem motivo.

Resultado esperado:

```text id="5w6n3k"
Validação obrigatória.
```

---

## CT-ADM-009-004

Registrar retorno.

Resultado esperado:

```text id="i4d1z8"
Colaborador reativado.
```

---

# Métricas

* Quantidade de afastamentos
* Dias afastados
* Absenteísmo
* Afastamentos por motivo
* Afastamentos por unidade
* Afastamentos previdenciários
* Acidentes de trabalho
* Tempo médio de afastamento

---

# Observações Arquiteturais

O afastamento não deve alterar diretamente o contrato de trabalho.

O fluxo recomendado é:

```text id="4dkg8z"
LeaveRequest
→ Validation
→ Registration
→ Domain Events
→ eSocial
→ Payroll
→ SST
→ Analytics
```

Toda alteração de status deve ser historizada e auditável.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois do cadastro e das movimentacoes contratuais, porque interrompe temporariamente o ciclo operacional do colaborador e pode impactar ponto, folha, benefícios e eSocial.
