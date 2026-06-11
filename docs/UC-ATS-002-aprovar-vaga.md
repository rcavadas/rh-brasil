# UC-ATS-002

## Aprovar Vaga

### Objetivo

Permitir a aprovacao ou reprova da requisicao de vaga antes da publicacao.

---

# Atores

## Primarios

* Gestor aprovador

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Requisicao de vaga existente.
* Usuario autenticado.
* Permissao de aprovacao habilitada.

---

# Gatilho

O processo inicia quando a requisicao entra em avaliacao.

---

# Fluxo Principal

### Etapa 1

Gestor abre a requisicao.

### Etapa 2

Sistema apresenta os dados da vaga.

### Etapa 3

Gestor aprova ou reprova.

### Etapa 4

Sistema registra decisao e justificativa.

### Etapa 5

Sistema atualiza o status.

### Etapa 6

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Reprovacao

### Condicao

A vaga e reprovada.

### Fluxo

* Sistema encerra a requisicao ou devolve para revisao.

---

# Pos-condicoes

* Vaga aprovada ou reprovada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A aprovacao depende de alçada.
* A justificativa deve ser armazenada quando aplicavel.

---

# Entidades Envolvidas

## VacancyRequestApproval

```text
id
vacancy_request_id
approver_subject
decision
reason
decided_at
```

---

# Casos Relacionados

* UC-ATS-001 - Criar Requisicao de Vaga
* UC-WFL-005 - Executar Aprovacao Sequencial
