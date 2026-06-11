# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-011 — Fechar Período de Ponto

### Versão

1.0

---

# Objetivo

Permitir o fechamento formal do período de ponto, consolidando marcações, ajustes e cálculos correlatos, bloqueando alterações ordinárias após validação e preparando a competência para integrações com folha, banco de horas, espelho de ponto e auditoria.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Gestor
- Folha de Pagamento
- Auditor

---

# Pré-condições

- Período de ponto disponível para fechamento.
- Marcações tratadas ou justificadas conforme política da empresa.
- Inconsistências críticas resolvidas ou formalmente aceitas.
- Usuário autenticado.
- Usuário com permissão para fechamento.

---

# Gatilho

O processo inicia quando a empresa encerra a apuração do período de ponto e precisa congelar os dados para cálculo e integração.

---

# Fluxo Principal

1. Usuário acessa o período de ponto a ser fechado.
2. Sistema apresenta resumo de marcações, ajustes, inconsistências e totais calculados.
3. Usuário revisa a competência.
4. Usuário confirma o fechamento.
5. Sistema valida se existem pendências impeditivas.
6. Sistema bloqueia novas alterações ordinárias no período.
7. Sistema registra o fechamento da competência.
8. Sistema consolida a base para espelho, banco de horas e folha.
9. Sistema registra auditoria.
10. Sistema disponibiliza o período como fechado para os módulos dependentes.

---

# Fluxos Alternativos

## FA-01 — Pendências impeditivas

Sistema bloqueia o fechamento e lista as pendências que precisam ser resolvidas.

## FA-02 — Período já fechado

Sistema informa que o período já foi fechado.

## FA-03 — Usuário sem permissão

Sistema bloqueia a operação e registra tentativa de acesso.

---

# Pós-Condições

- Período fechado.
- Alterações ordinárias bloqueadas.
- Base consolidada para folha, banco de horas e espelho.
- Histórico e auditoria registrados.

---

# Regras de Negócio Relacionadas

- O período fechado não pode receber alterações ordinárias.
- O fechamento deve respeitar a competência vigente.
- O fechamento deve considerar marcações, ajustes e pendências formalizadas.
- O fechamento deve ser auditável.
- A reabertura depende de processo próprio e autorização especial.

---

# Entidades Envolvidas

## TimeSheetClosure

```text
id
employee_id
period_start
period_end
closed_at
closed_by
status
```

## TimeSheetClosureHistory

```text
id
closure_id
event_type
event_date
performed_by
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Período | Obrigatório |
| Status | Obrigatório |
| Responsável pelo fechamento | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Fechar |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/timesheets/{id}/close
```
```http
GET /api/v1/timesheets/{id}
```

---

# Eventos de Domínio

```text
TimeSheetClosingRequested
TimeSheetClosed
TimeSheetClosureBlocked
```

---

# Integrações Impactadas

- Espelho de ponto
- Banco de horas
- Folha de pagamento
- Gestão documental
- Auditoria

---

# Casos de Teste

## CT-JOR-011-001

Fechar período sem pendências impeditivas

Resultado esperado:

```text
Período fechado com sucesso.
```

## CT-JOR-011-002

Fechar período com pendências impeditivas

Resultado esperado:

```text
Fechamento bloqueado.
```

## CT-JOR-011-003

Fechar período já fechado

Resultado esperado:

```text
Sistema informa estado atual.
```

---

# Métricas

- Períodos fechados
- Tempo médio de fechamento
- Fechamentos bloqueados por pendência

---

# Observações Arquiteturais

O fechamento deve ser um marco de integridade do período de ponto.

Após o fechamento, qualquer correção relevante deve seguir fluxo de reabertura formal ou ajuste excepcional auditável.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois da geracao do espelho e da consolidacao do periodo, porque encerra formalmente a janela de alteracoes do ponto.
