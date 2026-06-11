# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-020 - Exportar Espelho e Trilhas de Auditoria

### Versao

1.0

---

# Objetivo

Permitir a exportacao controlada de espelho de ponto, comprovantes, trilhas de auditoria e metadados relacionados para fins de auditoria interna, fiscalizacao, suporte juridico ou uso corporativo autorizado, garantindo controle de acesso, rastreabilidade, escopo e protecao de dados sensiveis.

---

# Atores

- Analista de RH
- Auditor
- Administrador do Sistema
- Gestor autorizado
- Suporte/Juridico

---

# Pre-condicoes

- Espelho de ponto ou trilha de auditoria disponivel.
- Usuario autenticado.
- Usuario com permissao para exportacao.
- Escopo da exportacao definido.
- Politica de retencao e finalidade configuradas.

---

# Gatilho

O processo inicia quando a empresa precisa exportar evidencias e registros do ponto para auditoria, compliance, analise interna ou atendimento a fiscalizacao.

---

# Fluxo Principal

1. Usuario acessa a area de exportacao do modulo de ponto.
2. Sistema apresenta os tipos de exportacao disponiveis.
3. Usuario define periodo, colaboradores, unidades e tipo de documento.
4. Usuario define o formato da exportacao quando aplicavel.
5. Sistema valida permissao, escopo e finalidade.
6. Sistema prepara espelho, trilhas de auditoria e metadados autorizados.
7. Sistema remove ou mascara dados nao autorizados conforme politica.
8. Sistema gera o pacote de exportacao.
9. Sistema registra a exportacao em trilha de auditoria.
10. Sistema disponibiliza o arquivo ou a transferencia controlada.

---

# Fluxos Alternativos

## FA-01 - Escopo excessivo

Sistema bloqueia ou reduz o escopo conforme permissao.

## FA-02 - Exportacao sem finalidade valida

Sistema bloqueia a operacao.

## FA-03 - Usuario sem permissao

Sistema bloqueia o acesso e registra tentativa.

## FA-04 - Dados sensiveis nao autorizados

Sistema mascara ou omite os dados antes da exportacao.

---

# Pos-condicoes

- Exportacao gerada ou bloqueada conforme regra.
- Trilha de auditoria registrada.
- Escopo e finalidade documentados.

---

# Regras de Negocio Relacionadas

- Toda exportacao deve possuir finalidade e escopo.
- Exportacoes devem respeitar controle de acesso e necessidade.
- Dados sensiveis ou desnecessarios devem ser mascarados quando aplicavel.
- Espelho de ponto e comprovantes usam mascaramento `controlled`; trilhas de auditoria exportadas usam mascaramento `strict`; exportacoes para BI ou consolidacao estatistica usam `aggregate`.
- A exportacao deve ser rastreavel por usuario, data e contexto.
- O arquivo exportado nao pode alterar os registros de origem.

---

# Entidades Envolvidas

## TimeSheetExportRequest

```text
id
company_id
requested_by
requested_at
export_type
scope
format
status
purpose
created_at
updated_at
```

## TimeSheetExportLog

```text
id
export_request_id
exported_by
exported_at
file_reference
status
masking_applied
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Periodo | Obrigatorio |
| Escopo | Obrigatorio |
| Finalidade | Obrigatorio |
| Formato | Obrigatorio quando aplicavel |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| Auditor | Exportar conforme politica |
| Gestor | Exportar escopo autorizado |
| Colaborador | Nao |

---

# APIs Sugeridas

```http
POST /api/v1/time-sheet/exports
```

```http
GET /api/v1/time-sheet/exports/{id}
```

```http
GET /api/v1/time-sheet/exports/{id}/download
```

---

# Eventos de Dominio

```text
TimeSheetExportRequested
TimeSheetExportGenerated
TimeSheetExportDenied
```

---

# Integracoes Impactadas

- Auditoria
- Gestão documental
- BI
- Compliance
- Suporte juridico

---

# Casos de Teste

## CT-JOR-020-001

Exportar espelho de periodo autorizado.

Resultado esperado:

```text
Exportacao gerada com sucesso.
```

## CT-JOR-020-002

Exportar com escopo excessivo.

Resultado esperado:

```text
Sistema bloqueia ou reduz o escopo.
```

## CT-JOR-020-003

Exportar trilha com dados sensiveis nao autorizados.

Resultado esperado:

```text
Dados mascarados conforme politica.
```

---

# Metricas

- Exportacoes por periodo
- Exportacoes por perfil
- Exportacoes bloqueadas por politica

---

# Observacoes Arquiteturais

A exportacao deve ser tratada como operacao sensivel e completamente auditavel, com mascaramento e escopo controlado por finalidade.

O nivel de mascaramento varia por finalidade: `controlled` para espelho e comprovantes, `strict` para trilhas de auditoria e `aggregate` para recortes analiticos.

O pacote exportado nao deve ser confundido com o espelho oficial ou com a base operacional de ponto.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra a trilha de ponto para uso externo autorizado. Ele deve ser lido depois do espelho, do fechamento e das politicas de acesso, porque exporta evidencias sob controle de finalidade e escopo.
