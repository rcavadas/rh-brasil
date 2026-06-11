# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-016 - Emitir Comprovante de Marcacao

### Versao

1.0

---

# Objetivo

Permitir a emissao, consulta e reemissao do comprovante de marcacao de ponto, garantindo integridade da evidencia, vinculo com a marcacao original, rastreabilidade da origem e disponibilidade para colaborador, gestor, RH e auditoria conforme permissao.

Baseline operacional:

- o comprovante deve ser emitido em formato humano legivel, com download em PDF como formato principal;
- a disponibilidade segue a politica de retencao da evidencia e o comprovante pode ser reemitido enquanto a evidência original permanecer elegivel;
- a reemissao gera nova versao rastreavel sem alterar a marcacao original;
- dados sensiveis devem ser mascarados conforme a finalidade e o perfil de acesso.

---

# Atores

- Colaborador
- Analista de RH
- Gestor
- Auditor
- Administrador do Sistema

---

# Pre-condicoes

- Marcacao de ponto existente.
- Usuario autenticado.
- Usuario com permissao para consultar o comprovante.
- Marcacao original disponivel ou com metadados suficientes para emissao.

---

# Gatilho

O processo inicia quando o colaborador ou a area responsavel precisa consultar, imprimir, baixar ou reenviar o comprovante de uma marcacao de ponto realizada.

---

# Fluxo Principal

1. Usuario acessa a consulta de marcacoes ou comprovantes.
2. Sistema localiza a marcacao original.
3. Sistema verifica disponibilidade do comprovante.
4. Sistema monta os dados exibidos no comprovante.
5. Sistema apresenta data, hora, origem, dispositivo, geolocalizacao quando aplicavel e identificador da marcacao.
6. Usuario solicita visualizacao, download ou reemissao.
7. Sistema gera ou recupera o comprovante em formato apropriado.
8. Sistema associa o comprovante a uma versao rastreavel.
9. Sistema disponibiliza o comprovante ao usuario.
10. Sistema registra auditoria da consulta ou emissao.

---

# Fluxos Alternativos

## FA-01 - Comprovante indisponivel

Sistema informa que a marcacao nao possui comprovante elegivel ou que a permissao nao permite a visualizacao.

## FA-02 - Marcacao inexistente

Sistema bloqueia a operacao e informa que a marcacao nao foi localizada.

## FA-03 - Usuario sem permissao

Sistema bloqueia o acesso e registra tentativa de operacao.

## FA-04 - Reemissao com dados atualizados

Sistema gera nova versao sem alterar a marcacao original.

---

# Pos-condicoes

- Comprovante emitido ou consultado.
- Versao rastreavel registrada quando aplicavel.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- O comprovante deve permanecer vinculado a uma marcacao original.
- A marcacao original nao pode ser alterada pela emissao do comprovante.
- A reemissao deve preservar a trilha de auditoria.
- O acesso ao comprovante deve respeitar perfil, finalidade e necessidade.
- O comprovante pode conter metadados sensiveis e deve obedecer politica de seguranca e LGPD.
- A segunda via deve refletir a mesma origem da marcacao, salvo quando houver nova versao formalmente registrada.

---

# Entidades Envolvidas

## TimePunchReceipt

```text
id
punch_id
receipt_code
generated_at
generated_by
receipt_version
status
file_id
```

## TimePunchReceiptAccessLog

```text
id
receipt_id
access_type
accessed_by
accessed_at
reason
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Marcacao | Obrigatorio |
| Codigo do comprovante | Obrigatorio |
| Data e hora | Obrigatorio |
| Origem | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| Colaborador | Consulta da propria marcacao |
| RH | Consulta e reemissao |
| Gestor | Consulta da equipe |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
GET /api/v1/time-punches/{id}/receipt
```

```http
POST /api/v1/time-punches/{id}/receipt/reissue
```

```http
GET /api/v1/time-punch-receipts/{id}
```

---

# Eventos de Dominio

```text
TimePunchReceiptGenerated
TimePunchReceiptReissued
TimePunchReceiptAccessed
```

---

# Integracoes Impactadas

- Portal do colaborador
- Portal do gestor
- Tratamento de ponto
- Gestão documental
- Auditoria

---

# Casos de Teste

## CT-JOR-016-001

Emitir comprovante valido.

Resultado esperado:

```text
Comprovante disponibilizado com sucesso.
```

## CT-JOR-016-002

Consultar marcacao sem comprovante elegivel.

Resultado esperado:

```text
Sistema informa indisponibilidade.
```

## CT-JOR-016-003

Reemitir segunda via.

Resultado esperado:

```text
Nova versao do comprovante gerada.
```

---

# Metricas

- Comprovantes emitidos
- Reemissoes por periodo
- Acessos a comprovantes por perfil

---

# Observacoes Arquiteturais

O comprovante deve ser tratado como evidencia auditavel e versionada, vinculada a uma marcacao original sem alterar seu conteudo primario.

O acesso ao comprovante deve ser logado de forma suficientemente detalhada para suportar auditoria, sem expor dados desnecessarios em logs operacionais.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve vir depois da captura da marcacao e da validacao do periodo, porque emite a evidencia individual do registro de ponto.
