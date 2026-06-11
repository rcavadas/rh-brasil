# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-010 — Gerar Espelho de Ponto

### Versão

1.0

---

# Objetivo

Permitir a geração, consulta, conferência e assinatura do espelho de ponto do colaborador, consolidando marcações, ajustes, horas trabalhadas, extras, faltas, banco de horas e ocorrências.

---

# Atores

- Analista de RH
- Colaborador
- Gestor
- Auditor

---

# Pré-Condições

- Período de ponto processado
- Marcações disponíveis
- Usuário autorizado

---

# Gatilho

O processo inicia no fechamento do período de ponto ou quando um usuário autorizado solicita o espelho.

---

# Fluxo Principal

1. Selecionar colaborador ou grupo
2. Selecionar período
3. Sistema consolida marcações
4. Sistema consolida ajustes
5. Sistema calcula totais
6. Sistema apresenta ocorrências
7. Sistema gera documento do espelho
8. Sistema disponibiliza consulta ao colaborador
9. Sistema registra ciência ou assinatura quando configurado
10. Sistema arquiva documento

---

# Fluxos Alternativos

## FA-01 — Período com pendências

Sistema gera espelho preliminar ou bloqueia conforme configuração.
## FA-02 — Colaborador discorda

Sistema permite abertura de solicitação de revisão.
## FA-03 — Espelho já assinado

Sistema impede alteração sem reabertura formal.

---

# Pós-Condições

- Espelho gerado
- Documento arquivado
- Consulta registrada
- Assinatura coletada quando aplicável

---

# Regras de Negócio Relacionadas

- Espelho deve preservar dados consolidados do período
- Alterações após assinatura devem exigir reabertura
- Consulta e assinatura devem ser auditáveis
- Espelho deve estar disponível ao colaborador

---

# Entidades Envolvidas

## TimeSheetMirror

```text
id
employee_id
period_start
period_end
status
generated_at
```
## TimeSheetMirrorItem

```text
id
mirror_id
date
expected_hours
worked_hours
occurrences
```
## TimeSheetMirrorSignature

```text
id
mirror_id
signed_by
signed_at
signature_type
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Colaborador | Obrigatório |
| Período | Obrigatório |
| Status | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Gerar |
| Gestor | Consulta equipe |
| Colaborador | Consulta e assinatura |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/timesheet-mirrors/generate
```
```http
GET /api/v1/timesheet-mirrors/{id}
```
```http
POST /api/v1/timesheet-mirrors/{id}/sign
```

---

# Eventos de Domínio

```text
TimeSheetMirrorGenerated
TimeSheetMirrorSigned
TimeSheetMirrorReopened
```

---

# Integrações Impactadas

- Gestão Documental
- Portal do Colaborador
- Portal do Gestor
- Folha
- Auditoria

---

# Casos de Teste

## CT-JOR-010-001

Gerar espelho sem pendências

Resultado esperado:

```text
Documento gerado.
```
## CT-JOR-010-002

Gerar com pendências bloqueantes

Resultado esperado:

```text
Sistema bloqueia.
```
## CT-JOR-010-003

Assinar espelho

Resultado esperado:

```text
Assinatura registrada.
```

---

# Métricas

- Espelhos gerados
- Espelhos assinados
- Pendências por período
- Reaberturas de espelho

---

# Observações Arquiteturais

O espelho de ponto deve ser tratado como documento consolidado e versionado, especialmente quando houver assinatura eletrônica.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois da apuracao e consolidacao do ponto, porque materializa a visao formal do periodo para conferencia e auditoria.
