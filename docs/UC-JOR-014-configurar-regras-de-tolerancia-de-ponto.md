# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-014 - Configurar Regras de Tolerancia de Ponto

### Versao

1.0

---

# Objetivo

Permitir o cadastro, a manutencao e a publicacao de regras de tolerancia de ponto por empresa, filial, equipe, jornada ou perfil, definindo limites de atraso, saida antecipada, arredondamento e criterios de aplicacao para o tratamento de ponto, para as horas extras e para os calculos correlatos.

Baseline operacional:

- nao existe tolerancia global unica para todo o produto;
- a regra deve ser configurada por empresa, jornada, equipe, unidade ou perfil, com precedencia explicita;
- limites e arredondamento sao definidos pela politica corporativa ou coletiva aplicavel;
- quando houver conflito, a versao mais especifica e vigente prevalece conforme politica.

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
- Usuario com permissao para configurar regras de ponto.
- Jornada e calendario de feriados/excecoes disponiveis quando aplicavel.
- Politica corporativa ou coletiva para tolerancias definida.

---

# Gatilho

O processo inicia quando a empresa precisa parametrizar tolerancias de ponto para atrasos, saidas antecipadas, extrapolacoes minimas ou regras de arredondamento usadas na apuracao.

---

# Fluxo Principal

1. Usuario acessa Jornada e Ponto > Regras > Tolerancias.
2. Sistema apresenta o formulario de configuracao.
3. Usuario informa nome, abrangencia e vigencia da regra.
4. Usuario define limites de atraso, saida antecipada e tolerancia por dia.
5. Usuario define se a regra aplica por jornada, equipe, unidade ou perfil.
6. Usuario informa criterio de arredondamento, se houver.
7. Usuario informa eventual referencia a acordo, norma interna ou parametro coletivo.
8. Sistema valida conflitos com regras vigentes.
9. Sistema valida sobreposicao de vigencia e precedencia.
10. Usuario confirma o cadastro.
11. Sistema grava a regra e registra a versao inicial.
12. Sistema publica a regra para o motor de ponto e para os modulos dependentes.
13. Sistema registra auditoria da criacao.

---

# Fluxos Alternativos

## FA-01 - Limite invalido

Sistema bloqueia o salvamento quando o limite informado for inconsistente.

## FA-02 - Regra em conflito

Sistema solicita ajuste de abrangencia, vigencia ou precedencia.

## FA-03 - Usuario sem permissao

Sistema bloqueia o acesso e registra tentativa de operacao.

## FA-04 - Alteracao de regra vigente

Sistema exige nova versao ou fluxo controlado de excecao.

---

# Pos-condicoes

- Regra de tolerancia cadastrada.
- Versao e vigencia registradas.
- Motor de ponto apto a consumir a nova configuracao.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- Toda regra de tolerancia deve possuir vigencia.
- O sistema deve preservar historico de alteracoes em regras publicadas.
- A regra de tolerancia deve ser aplicada sem sobrescrever a marcacao original.
- A regra de tolerancia deve ser consumida pelo tratamento de ponto e pelos calculos correlatos.
- Alteracoes em regras vigentes devem gerar nova versao ou fluxo controlado de excecao.
- A precedencia entre regras por empresa, unidade, jornada e perfil deve ser explicitada.

---

# Entidades Envolvidas

## TimeSheetToleranceRule

```text
id
company_id
name
scope_type
scope_reference
valid_from
valid_to
status
rounding_policy
created_at
created_by
updated_at
updated_by
```

## TimeSheetToleranceItem

```text
id
tolerance_rule_id
event_type
limit_minutes
day_type
precedence
origin_reference
status
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Nome da regra | Obrigatorio |
| Abrangencia | Obrigatorio |
| Vigencia | Obrigatorio |
| Limites de tolerancia | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Criar e editar |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-sheet-tolerance-rules
```

```http
GET /api/v1/time-sheet-tolerance-rules/{id}
```

```http
PUT /api/v1/time-sheet-tolerance-rules/{id}
```

```http
POST /api/v1/time-sheet-tolerance-rules/{id}/publish
```

---

# Eventos de Dominio

```text
TimeSheetToleranceRuleCreated
TimeSheetToleranceRuleUpdated
TimeSheetToleranceRulePublished
TimeSheetToleranceRuleDeactivated
```

---

# Integracoes Impactadas

- Ponto
- Jornada
- Horas extras
- Banco de horas
- Tratamento de inconsistencias
- Folha
- Workflow
- Auditoria

---

# Casos de Teste

## CT-JOR-014-001

Cadastrar tolerancia para atraso de entrada.

Resultado esperado:

```text
Regra criada com sucesso.
```

## CT-JOR-014-002

Cadastrar regra com conflito de vigencia.

Resultado esperado:

```text
Sistema bloqueia a sobreposicao.
```

## CT-JOR-014-003

Publicar regra vigente.

Resultado esperado:

```text
Regra publicada e consumivel pelos modulos dependentes.
```

---

# Metricas

- Regras de tolerancia ativas
- Conflitos de precedencia por competencia
- Alteracoes de tolerancia por periodo

---

# Observacoes Arquiteturais

A regra de tolerancia deve ser tratada como configuracao versionada e auditavel, com precedencia clara por abrangencia.

Os limites de tolerancia nao devem ser confundidos com a jornada base nem com o calendario de feriados e excecoes.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso completa a camada de configuracao do ponto antes da captacao de marcacoes. Ele deve ser lido depois da jornada, escala e calendario, porque define os limites aceitos para atrasos, antecipacoes e tratamento de excecoes.
