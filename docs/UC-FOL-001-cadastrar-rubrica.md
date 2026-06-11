# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FOL-001 - Cadastrar Rubrica

### Versao

1.0

---

# Objetivo

Permitir o cadastro e a manutencao de rubricas de folha, com codigo unico, classificacao funcional, incidencias e historico versionado, garantindo compatibilidade com folha, eSocial e demais reflexos legais.

---

# Atores

- Analista de Folha
- Analista de RH
- Administrador do Sistema
- Contabilidade autorizada

---

# Pre-condicoes

- Empresa configurada para folha.
- Usuario autenticado.
- Usuario com permissao para cadastrar rubricas.
- Codigo interno da rubrica ainda nao utilizado na mesma empresa.

---

# Gatilho

O processo inicia quando a area de folha precisa criar uma nova rubrica ou ajustar uma rubrica existente para refletir uma regra remuneratoria, desconto ou incidencia especifica.

---

# Fluxo Principal

1. Usuario acessa Folha de Pagamento > Rubricas > Nova Rubrica.
2. Sistema apresenta o formulario de cadastro.
3. Usuario informa codigo, descricao, tipo e classificacao da rubrica.
4. Usuario informa incidencias fiscais, previdenciarias e de eSocial.
5. Usuario define vigencia e observacoes de negocio.
6. Usuario confirma o cadastro.
7. Sistema valida unicidade, classificacao e obrigatoriedade das incidencias.
8. Sistema cria a rubrica e registra historico.
9. Sistema disponibiliza a rubrica para processamento da folha e demais modulos dependentes.
10. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Codigo duplicado

Sistema bloqueia o cadastro e informa a duplicidade.

## FA-02 - Incidencias obrigatorias ausentes

Sistema bloqueia ou marca pendencia, conforme politica.

## FA-03 - Classificacao incompatível

Sistema impede a gravacao e solicita ajuste.

---

# Pos-condicoes

- Rubrica criada ou atualizada.
- Historico registrado.
- Rubrica disponivel para calculos e integracoes.

---

# Regras de Negocio Relacionadas

- Toda rubrica deve possuir codigo interno unico por empresa.
- Alteracoes em rubricas devem manter historico.
- Toda rubrica deve possuir incidencias compatíveis com INSS, FGTS, IRRF e eSocial quando aplicavel.
- A rubrica deve manter classificacao coerente com a natureza do evento.
- Rubricas inativas nao podem ser utilizadas em novos calculos.

---

# Entidades Envolvidas

## PayrollRubric

```text
id
company_id
code
description
rubric_type
status
valid_from
valid_to
```

## PayrollRubricIncidence

```text
id
rubric_id
inss
fgts
irrf
esocial_classification
```

## PayrollRubricHistory

```text
id
rubric_id
change_type
changed_by
changed_at
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Codigo da rubrica | Obrigatorio |
| Descricao | Obrigatorio |
| Incidencias | Obrigatorias conforme a natureza |
| Vigencia | Obrigatoria |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Criar e editar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/payroll/rubrics
```

```http
GET /api/v1/payroll/rubrics/{id}
```

```http
PUT /api/v1/payroll/rubrics/{id}
```

---

# Eventos de Dominio

```text
PayrollRubricCreated
PayrollRubricUpdated
PayrollRubricActivated
PayrollRubricInactivated
```

---

# Integracoes Impactadas

- Folha de pagamento
- eSocial
- BI
- Auditoria

---

# Casos de Teste

## CT-FOL-001-001

Cadastrar rubrica valida.

Resultado esperado:

```text
Rubrica criada com sucesso.
```

## CT-FOL-001-002

Cadastrar com codigo duplicado.

Resultado esperado:

```text
Sistema bloqueia a duplicidade.
```

## CT-FOL-001-003

Cadastrar sem incidencias obrigatorias.

Resultado esperado:

```text
Validacao obrigatoria exibida.
```

---

# Metricas

- Rubricas ativas
- Rubricas por tipo
- Alteracoes de rubrica por periodo
- Rubricas com incidencia incompleta
