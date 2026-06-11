# UC-ADM-004

## Gerenciar Dependentes

### Objetivo

Permitir o cadastro, atualização, consulta, inativação e controle dos dependentes vinculados ao colaborador, garantindo conformidade legal, tributária e previdenciária, além da integração com benefícios, folha de pagamento e eSocial.

---

# Atores

## Primários

* Analista de RH
* Assistente de RH
* Administrador do Sistema

## Secundários

* Colaborador
* Folha de Pagamento
* Benefícios
* eSocial
* Operadoras de Saúde

---

# Pré-Condições

* Colaborador cadastrado.
* Colaborador ativo.
* Usuário autorizado.
* Cadastro do colaborador disponível.

---

# Gatilho

O processo inicia quando há necessidade de inclusão, alteração ou exclusão de dependente.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Colaboradores
→ Dependentes
```

### Etapa 2

Usuário seleciona colaborador.

### Etapa 3

Sistema apresenta lista de dependentes.

### Etapa 4

Usuário seleciona:

* Incluir
* Alterar
* Inativar
* Consultar

### Etapa 5

Usuário informa dados do dependente.

### Etapa 6

Sistema executa validações.

### Etapa 7

Sistema grava informações.

### Etapa 8

Sistema atualiza integrações relacionadas.

### Etapa 9

Sistema registra histórico.

### Etapa 10

Sistema registra auditoria.

---

# Dados do Dependente

## Identificação

* Nome completo
* CPF
* Data de nascimento
* Sexo
* Nacionalidade

---

## Relacionamento

* Filho(a)
* Enteado(a)
* Cônjuge
* Companheiro(a)
* Pai
* Mãe
* Tutelado
* Curatelado
* Dependente judicial

---

## Informações Legais

* Dependente para IRRF
* Dependente para Salário-Família
* Dependente para Plano de Saúde
* Dependente para Benefícios
* Dependente para Pensão

---

## Documentação

* CPF
* Certidão de Nascimento
* Certidão de Casamento
* Termo de Guarda
* Decisão Judicial
* Outros documentos comprobatórios

---

# Fluxos Alternativos

## FA-01 — CPF já cadastrado

### Condição

Dependente já existente para o mesmo colaborador.

### Resultado

Sistema impede duplicidade.

---

## FA-02 — CPF inválido

### Condição

CPF inconsistente.

### Resultado

Cadastro bloqueado.

---

## FA-03 — Documentação obrigatória ausente

### Condição

Falta documento exigido.

### Resultado

Cadastro pendente.

---

## FA-04 — Dependente sem elegibilidade legal

### Condição

Não atende regras legais.

### Resultado

Sistema impede utilização para fins fiscais.

---

# Pós-Condições

## Sucesso

* Dependente cadastrado.
* Histórico registrado.
* Integrações atualizadas.

## Falha

* Nenhuma alteração persistida.

---

# Regras de Negócio Relacionadas

## Dependência Tributária

* Um dependente pode ser elegível para IRRF.
* A elegibilidade deve respeitar legislação vigente.
* O sistema deve controlar vigência da elegibilidade.

---

## Salário-Família

* O sistema deve controlar elegibilidade.
* O sistema deve considerar idade limite.
* O sistema deve controlar invalidez quando aplicável.

---

## Benefícios

* Dependentes podem ser vinculados a benefícios.
* Dependentes podem ser vinculados a planos de saúde.

---

## eSocial

* Alterações devem gerar eventos correspondentes quando exigido.
* O histórico deve permanecer íntegro.

---

# Entidades Envolvidas

## EmployeeDependent

```text
id
employee_id
full_name
cpf
birth_date
relationship_type
status
```

---

## EmployeeDependentDocument

```text
id
dependent_id
document_type
file_id
issue_date
```

---

## EmployeeDependentEligibility

```text
id
dependent_id
irrf
salary_family
health_plan
benefits
valid_from
valid_to
```

---

# Campos Obrigatórios

| Campo              | Obrigatório |
| ------------------ | ----------- |
| Nome               | Sim         |
| CPF                | Sim         |
| Data Nascimento    | Sim         |
| Grau de Parentesco | Sim         |
| Status             | Sim         |

---

# Permissões

| Perfil      | Permissão   |
| ----------- | ----------- |
| RH Admin    | Total       |
| RH Operação | Total       |
| Gestor      | Consulta    |
| Colaborador | Solicitação |
| Auditor     | Consulta    |

---

# APIs Sugeridas

## Criar dependente

```http
POST /api/v1/employees/{id}/dependents
```

---

## Atualizar dependente

```http
PUT /api/v1/employees/{id}/dependents/{dependentId}
```

---

## Consultar dependentes

```http
GET /api/v1/employees/{id}/dependents
```

---

## Inativar dependente

```http
PATCH /api/v1/employees/{id}/dependents/{dependentId}/inactive
```

---

# Eventos de Domínio

```text
DependentCreated
DependentUpdated
DependentInactivated
DependentEligibilityChanged
DependentDocumentAttached
```

---

# Integrações Impactadas

## Folha de Pagamento

* IRRF
* Salário-família

---

## Benefícios

* Inclusão em benefícios
* Exclusão de benefícios

---

## Plano de Saúde

* Inclusão de beneficiários
* Atualização cadastral

---

## eSocial

* Atualização de dados trabalhistas quando aplicável.

---

# Casos de Teste

## CT-ADM-004-001

Cadastrar dependente válido.

Resultado esperado:

```text
Dependente criado com sucesso.
```

---

## CT-ADM-004-002

Cadastrar CPF inválido.

Resultado esperado:

```text
Erro de validação.
```

---

## CT-ADM-004-003

Cadastrar dependente sem documentação obrigatória.

Resultado esperado:

```text
Cadastro pendente.
```

---

## CT-ADM-004-004

Inativar dependente.

Resultado esperado:

```text
Dependente inativado e integrações atualizadas.
```

---

# Métricas

* Dependentes cadastrados
* Dependentes por colaborador
* Dependentes elegíveis para IRRF
* Dependentes elegíveis para benefícios
* Inclusões por período
* Inativações por período
---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o cadastro-base com a informacao de dependentes e suas finalidades legais. Ele deve ser lido depois da base cadastral e do vinculo, porque depende de identidade, relacao familiar e do tratamento correto de dados sensiveis.
