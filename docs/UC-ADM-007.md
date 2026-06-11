# UC-ADM-007

## Registrar Promoção

### Objetivo

Permitir a gestão formal de promoções de colaboradores, garantindo conformidade com políticas internas de carreira, remuneração, orçamento de pessoal e governança corporativa.

---

# Atores

## Primários

* Analista de RH
* Business Partner
* Gestor

## Secundários

* Diretoria
* Folha de Pagamento
* Analytics
* Workflow
* Plano de Carreira

---

# Pré-Condições

* Colaborador ativo.
* Contrato ativo.
* Cargo destino cadastrado.
* Faixa salarial cadastrada.
* Usuário autorizado.

---

# Gatilho

O processo inicia quando a organização decide promover um colaborador.

---

# Fluxo Principal

### Etapa 1

Gestor solicita promoção.

### Etapa 2

Sistema valida elegibilidade.

### Etapa 3

Sistema apresenta cargo atual.

### Etapa 4

Sistema apresenta cargo destino.

### Etapa 5

Usuário informa:

* Motivo
* Data efetiva
* Cargo destino
* Novo salário
* Justificativa

### Etapa 6

Sistema valida política salarial.

### Etapa 7

Sistema inicia workflow.

### Etapa 8

Aprovadores analisam solicitação.

### Etapa 9

Promoção aprovada.

### Etapa 10

Sistema atualiza contrato.

### Etapa 11

Sistema registra histórico.

### Etapa 12

Sistema dispara integrações.

---

# Tipos de Promoção

## Vertical

Mudança para nível hierárquico superior.

---

## Horizontal

Mudança de especialização.

---

## Mérito

Promoção por desempenho.

---

## Sucessão

Promoção decorrente de plano sucessório.

---

## Estrutural

Promoção decorrente de reorganização.

---

# Fluxos Alternativos

## FA-01 — Salário acima da faixa

Resultado:

```text
Workflow adicional obrigatório.
```

---

## FA-02 — Cargo destino inativo

Resultado:

```text
Promoção bloqueada.
```

---

## FA-03 — Aprovação rejeitada

Resultado:

```text
Solicitação encerrada.
```

---

# Pós-Condições

## Sucesso

* Cargo atualizado.
* Salário atualizado.
* Histórico registrado.
* Indicadores atualizados.

---

# Regras de Negócio

## RN-ADM-PROM-001

Promoções devem possuir justificativa obrigatória.

## RN-ADM-PROM-002

Promoções devem possuir data efetiva.

## RN-ADM-PROM-003

Toda promoção deve gerar histórico permanente.

## RN-ADM-PROM-004

Promoções devem respeitar política salarial.

## RN-ADM-PROM-005

Promoções podem exigir workflow multinível.

---

# Entidades

## Promotion

```text
id
employee_id
old_job_id
new_job_id
old_salary
new_salary
effective_date
reason
status
```

---

## PromotionApproval

```text
id
promotion_id
approver_id
decision
decision_date
```

---

# APIs

```http
POST /api/v1/promotions
GET /api/v1/promotions/{id}
POST /api/v1/promotions/{id}/approve
POST /api/v1/promotions/{id}/reject
```

---

# Eventos

```text
EmployeePromoted
PromotionApproved
PromotionRejected
SalaryChanged
JobChanged
```

---

# Integrações

* Folha
* Cargos e Salários
* Performance
* Analytics
* Workflow

---

# Casos de Teste

## CT-ADM-007-001

Promover colaborador elegível.

Resultado:

```text
Promoção concluída.
```

---

## CT-ADM-007-002

Promover para cargo inexistente.

Resultado:

```text
Operação bloqueada.
```

---

## CT-ADM-007-003

Promoção rejeitada.

Resultado:

```text
Solicitação encerrada.
```

---

# Métricas

* Promoções por período
* Promoções por área
* Promoções por gestor
* Tempo médio de aprovação
* Impacto financeiro das promoções
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois da manutencao contratual, porque representa a evolucao funcional e salarial do colaborador sem quebrar o historico do vinculo.
