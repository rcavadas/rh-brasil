# UC-ADM-001

## Cadastrar Colaborador

### Objetivo

Permitir o cadastro de um novo colaborador na plataforma, criando o cadastro-base da pessoa e do colaborador, com dados pessoais, organizacionais e de admissão inicial, deixando a formalização do vínculo contratual para o UC-ADM-005.

---

# Atores

## Primários

* Analista de RH
* Assistente de RH
* Administrador do Sistema

## Secundários

* eSocial
* Portal do Colaborador
* SST
* Benefícios
* Folha de Pagamento

---

# Pré-Condições

* Empresa cadastrada.
* Filial cadastrada.
* Cargo cadastrado.
* Centro de custo cadastrado.
* Usuário com permissão para cadastro.
* CPF não existente na mesma empresa.

---

# Gatilho

O processo inicia quando o RH recebe autorização para admissão do colaborador.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Colaboradores
→ Novo Colaborador
```

### Etapa 2

Sistema apresenta formulário cadastral.

### Etapa 3

Usuário informa:

* Nome completo
* CPF
* RG
* Data de nascimento
* Sexo
* Estado civil
* Nacionalidade
* Endereço
* E-mail
* Telefone

### Etapa 4

Usuário informa dados cadastrais e funcionais iniciais:

* Empresa
* Filial
* Cargo
* Função
* Centro de custo
* Gestor
* Data de admissão
* Jornada

### Etapa 5

Usuário confirma cadastro.

### Etapa 6

Sistema valida informações.

### Etapa 7

Sistema cria colaborador e cadastro-base de admissão.

### Etapa 8

Sistema registra histórico de admissão.

### Etapa 9

Sistema disponibiliza cadastro-base para a formalização do vínculo contratual e para os demais módulos dependentes.

### Etapa 10

Sistema registra trilha de auditoria.

---

# Fluxos Alternativos

## FA-01 — CPF já cadastrado

### Condição

CPF já existente.

### Ação

Sistema bloqueia criação.

### Resultado

Cadastro não realizado.

---

## FA-02 — Dados obrigatórios ausentes

### Condição

Campos obrigatórios não preenchidos.

### Ação

Sistema exibe inconsistências.

### Resultado

Usuário deve corrigir.

---

## FA-03 — Cargo inexistente

### Condição

Cargo não localizado.

### Ação

Sistema impede gravação.

### Resultado

Cadastro não realizado.

---

# Pós-Condições

## Sucesso

* Colaborador criado.
* Histórico registrado.
* Cadastro-base disponível para formalização do vínculo contratual.
* Disponível para SST.
* Disponível para benefícios.
* Disponível para eSocial após a formalização do vínculo.

## Falha

Nenhuma informação persistida.

---

# Regras de Negócio Relacionadas

* O cadastro-base do colaborador não formaliza o vínculo contratual.
* O vínculo contratual deve ser formalizado no UC-ADM-005.
* O CPF deve ser único por empresa.
* Todo cadastro deve gerar histórico.
* Toda criação deve gerar trilha de auditoria.

---

# Entidades Envolvidas

## Employee

```text
id
employee_number
full_name
cpf
birth_date
status
```

## EmployeeAdmission

```text
id
employee_id
company_id
branch_id
job_id
cost_center_id
manager_id
admission_date
status
```

## OrganizationUnit

```text
id
name
type
parent_id
```

---

# Campos Obrigatórios

| Campo         | Obrigatório |
| ------------- | ----------- |
| Nome          | Sim         |
| CPF           | Sim         |
| Data Admissão | Sim         |
| Empresa       | Sim         |
| Filial        | Sim         |
| Cargo         | Sim         |
| Jornada       | Sim         |

---

# Permissões

| Perfil      | Permissão |
| ----------- | --------- |
| RH Admin    | Total     |
| RH Operação | Criar     |
| Gestor      | Não       |
| Colaborador | Não       |

---

# APIs Sugeridas

## Criar colaborador

```http
POST /api/v1/employees
```

## Consultar colaborador

```http
GET /api/v1/employees/{id}
```

## Atualizar colaborador

```http
PUT /api/v1/employees/{id}
```

---

# Eventos de Domínio

```text
EmployeeCreated
EmployeeActivated
EmployeeAdmissionRegistered
```

---

# Casos de Teste

## CT-ADM-001-001

Cadastrar colaborador válido.

Resultado esperado:

```text
Colaborador criado com sucesso.
```

---

## CT-ADM-001-002

Cadastrar CPF duplicado.

Resultado esperado:

```text
Erro de duplicidade.
```

---

## CT-ADM-001-003

Cadastrar sem cargo.

Resultado esperado:

```text
Validação obrigatória.
```

---

# Métricas

* Tempo médio de cadastro
* Cadastros por período
* Cadastros por usuário
* Taxa de rejeição de cadastro
---

# Estado de Implementacao

O runtime executavel atual ja cobre o cadastro-base do colaborador e a etapa 1 de admissao, com trilha auditavel e disponibilidade para os modulos dependentes.
O que ainda precisa evoluir neste caso de uso e a formalizacao completa do fluxo de cadastro, o fechamento da relacao com o vinculo contratual em `UC-ADM-005` e a consistencia fina entre dados cadastrais, historico e dependencias operacionais.
