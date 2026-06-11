# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-013 - Configurar Calendario de Feriados e Excecoes

### Versao

1.0

---

# Objetivo

Permitir o cadastro, a manutencao e a publicacao de calendarios de feriados e excecoes operacionais por empresa, filial, localidade ou abrangencia equivalente, garantindo vigencia, rastreabilidade e uso consistente pelo motor de ponto, pela jornada, pelas horas extras, pelo banco de horas, pelo fechamento de periodo e pelas integracoes correlatas.

Baseline operacional:

- feriados nacionais seguem a legislação federal vigente;
- feriados estaduais e municipais seguem a norma oficial da respectiva esfera/localidade;
- excecoes corporativas ou locais devem ser versionadas no calendario da empresa;
- alteracoes posteriores mantem rastreabilidade por origem e vigencia.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Gestor
- Auditor

---

# Pre-condicoes

- Empresa configurada.
- Usuario autenticado.
- Usuario com permissao para configurar calendario de ponto.
- Jornada e escala existentes ou em configuracao.
- Regra corporativa para feriados e excecoes disponivel.

---

# Gatilho

O processo inicia quando a empresa precisa registrar feriados nacionais, estaduais, municipais, corporativos ou excecoes locais que afetem a apuracao de ponto e os calculos correlatos.

---

# Fluxo Principal

1. Usuario acessa Jornada e Ponto > Calendarios > Novo Calendario.
2. Sistema apresenta o formulario de configuracao de calendario.
3. Usuario informa nome, abrangencia, vigencia e criterio de aplicacao.
4. Usuario cadastra feriados e excecoes do periodo.
5. Usuario define se a regra e fixa, recorrente ou vinculada a competencia especifica.
6. Usuario informa eventual referencia a acordo, norma interna ou parametro coletivo.
7. Sistema valida conflitos com outros calendarios ativos.
8. Sistema valida duplicidade de data, abrangencia e tipo de evento.
9. Usuario confirma o cadastro.
10. Sistema grava o calendario e registra a versao inicial.
11. Sistema publica o calendario para o motor de ponto e para os modulos dependentes.
12. Sistema registra auditoria da criacao.

---

# Fluxos Alternativos

## FA-01 - Data duplicada

Sistema bloqueia o salvamento e informa a sobreposicao.

## FA-02 - Calendario em conflito

Sistema solicita ajuste de abrangencia, vigencia ou excepcao.

## FA-03 - Usuario sem permissao

Sistema bloqueia o acesso e registra tentativa de operacao.

## FA-04 - Alteracao de calendario vigente

Sistema exige nova versao ou reabertura controlada conforme politica.

---

# Pos-condicoes

- Calendario de feriados e excecoes cadastrado.
- Versao e vigencia registradas.
- Motor de ponto apto a consumir a nova configuracao.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- Todo calendario deve possuir vigencia.
- O sistema deve preservar historico de alteracoes em calendarios publicados.
- Feriados e excecoes devem respeitar a abrangencia informada.
- Alteracoes em calendarios vigentes devem gerar nova versao ou fluxo controlado de excecao.
- O calendario deve ser consumido pelo motor de ponto, pela escala, pelas horas extras e pelos demais calculos dependentes.
- Excecoes locais devem permanecer rastreaveis por origem, tipo e justificativa.

---

# Entidades Envolvidas

## HolidayCalendar

```text
id
company_id
name
scope_type
scope_reference
valid_from
valid_to
status
source_type
created_at
created_by
updated_at
updated_by
```

## HolidayCalendarItem

```text
id
holiday_calendar_id
event_date
event_type
description
recurrence_rule
origin_reference
status
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Nome do calendario | Obrigatorio |
| Abrangencia | Obrigatorio |
| Vigencia | Obrigatorio |
| Itens de feriado/excecao | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Criar e editar |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs atuais no runtime

```http
GET /api/v1/tenants/{tenantId}/point-holidays
```

```http
POST /api/v1/tenants/{tenantId}/point-holidays
```

```http
GET /api/v1/tenants/{tenantId}/point-tolerance-rules
```

```http
POST /api/v1/tenants/{tenantId}/point-tolerance-rules
```

```http
GET /api/v1/tenants/{tenantId}/point-devices
```

```http
POST /api/v1/tenants/{tenantId}/point-devices
```

Observacao: o contrato de runtime atual cobre criacao e listagem por tenant. Operacoes de alteracao, exclusao ou publicacao continuam como evolucao futura do dominio.

---

# Eventos de Dominio

```text
HolidayCalendarCreated
HolidayCalendarUpdated
HolidayCalendarPublished
HolidayCalendarDeactivated
```

---

# Integracoes Impactadas

- Ponto
- Jornada
- Escalas
- Horas extras
- Banco de horas
- Fechamento de periodo
- Folha
- Workflow
- Auditoria

---

# Casos de Teste

## CT-JOR-013-001

Cadastrar calendario anual com feriados nacionais.

Resultado esperado:

```text
Calendario criado com sucesso.
```

## CT-JOR-013-002

Cadastrar excecao local com conflito de data.

Resultado esperado:

```text
Sistema bloqueia a sobreposicao.
```

## CT-JOR-013-003

Publicar calendario vigente.

Resultado esperado:

```text
Calendario publicado e consumivel pelos modulos dependentes.
```

---

# Metricas

- Calendarios ativos
- Excecoes por abrangencia
- Conflitos de calendario por competencia

---

# Observacoes Arquiteturais

O calendario de feriados e excecoes deve ser tratado como referencia versionada, nao como simples lista estatica.

Alteracoes posteriores ao uso operacional devem preservar a versao anterior para garantir rastreabilidade, reproducibilidade do calculo e auditoria.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido entre a definicao da jornada/escala e a captura de marcacoes, porque altera o calendario operacional que impacta tolerancias, compensacoes e calculos posteriores.
