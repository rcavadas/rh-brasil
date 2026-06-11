# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-012 — Reabrir Período de Ponto

### Versão

1.0

---

# Objetivo

Permitir a reabertura controlada de um período de ponto previamente fechado, mediante justificativa, autorização e rastreabilidade, para viabilizar correções excepcionais e novo fechamento posterior.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Gestor
- Auditor

---

# Pré-condições

- Período de ponto fechado.
- Justificativa formal disponível.
- Usuário autenticado.
- Usuário com permissão para reabertura.
- Regra de reabertura configurada.

---

# Gatilho

O processo inicia quando uma inconsistência, correção ou revisão excepcional exige a abertura temporária de um período já fechado.

---

# Fluxo Principal

1. Usuário localiza o período fechado.
2. Sistema apresenta resumo do fechamento e motivo da solicitação.
3. Usuário informa justificativa da reabertura.
4. Usuário confirma a solicitação.
5. Sistema valida permissão e política de reabertura.
6. Sistema registra o pedido de reabertura.
7. Sistema altera o status do período para reaberto.
8. Sistema libera as alterações permitidas conforme escopo.
9. Sistema registra auditoria.
10. Sistema notifica os módulos dependentes sobre a reabertura.

---

# Fluxos Alternativos

## FA-01 — Justificativa ausente

Sistema bloqueia a reabertura.

## FA-02 — Usuário sem permissão

Sistema bloqueia a operação.

## FA-03 — Período não está fechado

Sistema informa que a reabertura não se aplica.

---

# Pós-condições

- Período reaberto.
- Alterações excepcionais permitidas conforme política.
- Auditoria registrada.
- Necessidade de novo fechamento sinalizada.

---

# Regras de Negócio Relacionadas

- Reabertura deve ser exceção e não operação rotineira.
- Reabertura deve possuir justificativa.
- Reabertura deve ser auditável.
- Reabertura deve respeitar alçada e política da empresa.
- Após correção, o período deve ser fechado novamente.

---

# Entidades Envolvidas

## TimeSheetReopenRequest

```text
id
timesheet_id
reason
requested_by
requested_at
status
```

## TimeSheetReopenHistory

```text
id
reopen_request_id
event_type
event_date
performed_by
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Período | Obrigatório |
| Justificativa | Obrigatório |
| Responsável pela solicitação | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Solicitar e executar conforme política |
| Gestor | Solicitar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/timesheets/{id}/reopen
```
```http
GET /api/v1/timesheets/{id}
```

---

# Eventos de Domínio

```text
TimeSheetReopenRequested
TimeSheetReopened
TimeSheetReopenBlocked
```

---

# Integrações Impactadas

- Espelho de ponto
- Banco de horas
- Folha de pagamento
- Workflow
- Auditoria

---

# Casos de Teste

## CT-JOR-012-001

Reabrir período com justificativa válida

Resultado esperado:

```text
Período reaberto com sucesso.
```

## CT-JOR-012-002

Reabrir sem justificativa

Resultado esperado:

```text
Reabertura bloqueada.
```

## CT-JOR-012-003

Reabrir período não fechado

Resultado esperado:

```text
Sistema informa estado incompatível.
```

---

# Métricas

- Reaberturas por período
- Reaberturas por usuário
- Tempo médio entre fechamento e reabertura

---

# Observações Arquiteturais

A reabertura deve preservar o histórico do fechamento original e registrar claramente o motivo da exceção.

Depois de corrigido o período, um novo fechamento deve ser executado para restabelecer a integridade da competência.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso e a excecao ao fechamento do periodo. Ele deve ser lido depois do fechamento porque depende de autorizacao, rastreabilidade e impacto controlado sobre o periodo ja encerrado.
