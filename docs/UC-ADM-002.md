# UC-ADM-002

## Alterar Cadastro do Colaborador

### Objetivo

Permitir a atualização controlada dos dados cadastrais e funcionais do colaborador, preservando histórico, rastreabilidade e conformidade com exigências legais, trabalhistas e do eSocial.

---

# Atores

## Primários

* Analista de RH
* Assistente de RH
* Administrador do Sistema

## Secundários

* Colaborador (quando houver workflow de solicitação)
* eSocial
* Folha de Pagamento
* Benefícios
* SST

---

# Pré-Condições

* Colaborador cadastrado.
* Usuário autenticado.
* Usuário com permissão de alteração.
* Colaborador ativo ou com histórico disponível.

---

# Gatilho

O processo inicia quando há necessidade de atualização de informações cadastrais ou contratuais do colaborador.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Colaboradores
→ Pesquisar Colaborador
```

### Etapa 2

Usuário seleciona o colaborador.

### Etapa 3

Sistema apresenta os dados atuais.

### Etapa 4

Usuário altera informações permitidas.

### Etapa 5

Usuário confirma alteração.

### Etapa 6

Sistema executa validações.

### Etapa 7

Sistema grava nova versão das informações.

### Etapa 8

Sistema registra histórico da alteração.

### Etapa 9

Sistema identifica impactos em módulos dependentes.

### Etapa 10

Sistema dispara integrações necessárias.

### Etapa 11

Sistema registra auditoria.

---

# Tipos de Alterações Permitidas

## Dados Pessoais

* Nome
* Estado civil
* Escolaridade
* Endereço
* Telefone
* E-mail

## Dados Funcionais

* Cargo
* Função
* Centro de custo
* Gestor
* Jornada
* Lotação

## Dados Bancários

* Banco
* Agência
* Conta
* PIX

## Dependentes

* Inclusão
* Alteração
* Exclusão

---

# Fluxos Alternativos

## FA-01 — Colaborador inexistente

### Condição

Colaborador não localizado.

### Resultado

Sistema informa inexistência do cadastro.

---

## FA-02 — Alteração não autorizada

### Condição

Usuário sem permissão.

### Resultado

Sistema bloqueia alteração.

---

## FA-03 — Dados inválidos

### Condição

CPF, CEP, e-mail ou dados bancários inválidos.

### Resultado

Sistema impede gravação.

---

## FA-04 — Alteração com impacto legal

### Condição

Mudança exige envio ao eSocial.

### Resultado

Evento fica pendente para transmissão.

---

# Pós-Condições

## Sucesso

* Cadastro atualizado.
* Histórico registrado.
* Integrações atualizadas.
* Eventos regulatórios preparados.

## Falha

* Nenhuma alteração persistida.

---

# Regras de Negócio Relacionadas

* RN-0011
* RN-0012
* RN-0013
* RN-0014
* RN-0015
* RN-0016

---

# Entidades Envolvidas

## Employee

```text
id
full_name
birth_date
marital_status
email
phone
```

## EmployeeAddress

```text
id
employee_id
zip_code
street
number
city
state
```

## EmployeeBankAccount

```text
id
employee_id
bank_code
branch
account
pix_key
```

## EmployeeHistory

```text
id
employee_id
change_type
old_value
new_value
changed_by
changed_at
```

---

# Campos Auditáveis

| Campo           | Histórico Obrigatório |
| --------------- | --------------------- |
| Nome            | Sim                   |
| Endereço        | Sim                   |
| Cargo           | Sim                   |
| Função          | Sim                   |
| Gestor          | Sim                   |
| Centro de Custo | Sim                   |
| Dados Bancários | Sim                   |

---

# Permissões

| Perfil      | Permissão   |
| ----------- | ----------- |
| RH Admin    | Total       |
| RH Operação | Alterar     |
| Gestor      | Restrita    |
| Colaborador | Solicitação |

---

# APIs Sugeridas

## Atualizar colaborador

```http
PUT /api/v1/employees/{id}
```

## Consultar histórico

```http
GET /api/v1/employees/{id}/history
```

## Consultar alterações pendentes

```http
GET /api/v1/employees/{id}/changes
```

---

# Eventos de Domínio

```text
EmployeeUpdated
EmployeeAddressChanged
EmployeeBankAccountChanged
EmployeeManagerChanged
EmployeeJobChanged
```

---

# Integrações Impactadas

## Folha

Reprocessar informações quando necessário.

## Benefícios

Atualizar elegibilidade e cadastros.

## SST

Atualizar lotação e ambiente de trabalho.

## eSocial

Gerar eventos de alteração cadastral quando aplicável.

---

# Casos de Teste

## CT-ADM-002-001

Alterar endereço.

Resultado esperado:

```text
Histórico registrado e endereço atualizado.
```

---

## CT-ADM-002-002

Alterar dados bancários.

Resultado esperado:

```text
Nova conta registrada e auditoria criada.
```

---

## CT-ADM-002-003

Usuário sem permissão.

Resultado esperado:

```text
Acesso negado.
```

---

## CT-ADM-002-004

Alteração com impacto no eSocial.

Resultado esperado:

```text
Evento gerado para transmissão.
```

---

# Métricas

* Alterações cadastrais por período
* Alterações por usuário
* Alterações por tipo
* Alterações com impacto regulatório
* Tempo médio de atualização
---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a manutencao cadastral do colaborador depois da criacao base e da formalizacao do vinculo. Ele deve ser lido como a camada de atualizacao controlada que preserva historico, impactos regulatorios e consistencia com os demais modulos.
