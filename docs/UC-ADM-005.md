# UC-ADM-005

## Registrar Vínculo Contratual

### Objetivo

Permitir a formalização, manutenção e controle dos vínculos contratuais dos colaboradores, garantindo conformidade trabalhista, previdenciária, fiscal e integração com os demais módulos da plataforma.

---

# Atores

## Primários

* Analista de RH
* Assistente de RH
* Administrador do Sistema

## Secundários

* Folha de Pagamento
* eSocial
* SST
* Benefícios
* Portal do Colaborador
* Analytics

---

# Pré-Condições

* Colaborador cadastrado.
* Cadastro-base previamente criado no UC-ADM-001.
* Empresa cadastrada.
* Cargo cadastrado.
* Jornada cadastrada.
* Usuário autorizado.

---

# Gatilho

O processo inicia quando é necessário formalizar ou alterar um vínculo contratual de trabalho.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Colaboradores
→ Contratos
→ Novo Contrato
```

### Etapa 2

Sistema apresenta formulário contratual.

### Etapa 3

Usuário seleciona colaborador.

### Etapa 4

Usuário informa dados contratuais.

### Etapa 5

Sistema executa validações legais.

### Etapa 6

Sistema formaliza o vínculo contratual.

### Etapa 7

Sistema registra histórico contratual.

### Etapa 8

Sistema disponibiliza contrato para módulos dependentes.

### Etapa 9

Sistema registra trilha de auditoria.

---

# Tipos de Contrato Suportados

## CLT Prazo Indeterminado

Contrato tradicional regido pela CLT.

---

## CLT Prazo Determinado

Contrato com data final previamente definida.

---

## Contrato de Experiência

Contrato com prazo determinado para avaliação do colaborador.

---

## Aprendiz

Contrato regido pela Lei da Aprendizagem.

---

## Estágio

Contrato conforme Lei nº 11.788/2008.

---

## Trabalho Intermitente

Contrato conforme Art. 443 da CLT.

---

## Trabalho Temporário

Contrato temporário conforme legislação específica.

---

## Cooperado

Vínculo cooperativo quando aplicável.

---

## Terceirizado

Controle de trabalhadores terceirizados.

---

## Prestador de Serviço (PJ)

Quando a organização desejar controlar prestadores externos.

---

# Dados Contratuais

## Identificação

* Número do contrato
* Colaborador
* Empresa
* Filial

---

## Dados Funcionais

* Cargo
* Função
* Gestor
* Centro de custo
* Unidade organizacional

---

## Dados Trabalhistas

* Tipo de contrato
* Data de início
* Data prevista de término
* Jornada
* Regime de trabalho

---

## Dados Remuneratórios

* Salário base
* Faixa salarial
* Benefícios elegíveis

---

# Fluxos Alternativos

## FA-01 — Contrato duplicado

### Condição

Contrato ativo já existente.

### Resultado

Sistema bloqueia operação.

---

## FA-02 — Dados obrigatórios ausentes

### Condição

Campos obrigatórios não preenchidos.

### Resultado

Sistema impede gravação.

---

## FA-03 — Cargo incompatível

### Condição

Cargo inválido ou inativo.

### Resultado

Sistema bloqueia criação.

---

## FA-04 — Jornada inexistente

### Condição

Jornada não cadastrada.

### Resultado

Sistema impede continuidade.

---

# Pós-Condições

## Sucesso

* Contrato criado.
* Histórico registrado.
* Disponível para demais módulos.

## Falha

* Nenhuma informação persistida.

---

# Regras de Negócio Relacionadas

## Contrato Ativo

Um colaborador não pode possuir mais de um contrato ativo simultâneo para o mesmo vínculo empregatício.

---

## Vigência

Todo contrato deve possuir vigência controlada.

---

## Histórico

Nenhum contrato poderá ser excluído fisicamente após ativação.

---

## Auditoria

Toda alteração contratual deve gerar registro histórico.

---

## eSocial

Contratos elegíveis devem gerar eventos obrigatórios.

---

# Entidades Envolvidas

## EmploymentContract

```text
id
employee_id
contract_number
contract_type
status
start_date
end_date
```

---

## EmploymentContractAssignment

```text
id
contract_id
job_id
function_id
manager_id
cost_center_id
```

---

## EmploymentCompensation

```text
id
contract_id
salary
salary_band_id
effective_date
```

---

## EmploymentContractHistory

```text
id
contract_id
event_type
old_value
new_value
changed_by
changed_at
```

---

# Campos Obrigatórios

| Campo            | Obrigatório |
| ---------------- | ----------- |
| Colaborador      | Sim         |
| Empresa          | Sim         |
| Cargo            | Sim         |
| Tipo de Contrato | Sim         |
| Data Início      | Sim         |
| Jornada          | Sim         |
| Salário          | Sim         |

---

# Permissões

| Perfil      | Permissão |
| ----------- | --------- |
| RH Admin    | Total     |
| RH Operação | Total     |
| Gestor      | Consulta  |
| Colaborador | Consulta  |
| Auditor     | Consulta  |

---

# APIs Sugeridas

## Criar contrato

```http
POST /api/v1/contracts
```

---

## Consultar contrato

```http
GET /api/v1/contracts/{id}
```

---

## Atualizar contrato

```http
PUT /api/v1/contracts/{id}
```

---

## Encerrar contrato

```http
PATCH /api/v1/contracts/{id}/terminate
```

---

# Eventos de Domínio

```text
EmploymentContractCreated
EmploymentContractUpdated
EmploymentContractActivated
EmploymentContractSuspended
EmploymentContractTerminated
```

---

# Integrações Impactadas

## Folha

* Base de cálculo salarial
* Encargos
* Benefícios

---

## eSocial

* Admissão
* Alterações contratuais
* Desligamento

---

## SST

* Ambiente de trabalho
* Exposição ocupacional

---

## Analytics

* Headcount
* Custos de pessoal
* Turnover

---

# Casos de Teste

## CT-ADM-005-001

Criar contrato CLT válido.

Resultado esperado:

```text
Contrato criado com sucesso.
```

---

## CT-ADM-005-002

Criar contrato sem cargo.

Resultado esperado:

```text
Validação obrigatória.
```

---

## CT-ADM-005-003

Criar contrato duplicado.

Resultado esperado:

```text
Operação bloqueada.
```

---

## CT-ADM-005-004

Encerrar contrato.

Resultado esperado:

```text
Contrato encerrado e histórico atualizado.
```

---

# Métricas

* Contratos ativos
* Contratos por tipo
* Contratos por empresa
* Contratos encerrados
* Tempo médio de permanência
* Evolução de vínculos por período
---

# Estado de Implementacao

O runtime executavel atual ja possui a formalizacao contratual separada como snapshot proprio, com transicao da admissao para `completed` e trilha auditavel do vinculo.
O que ainda precisa evoluir neste caso de uso e a cobertura completa das variacoes contratuais, das reclassificacoes e da consistencia fina com folha, eSocial, SST e beneficios.
