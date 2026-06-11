# UC-COL-010

## Assinar Documento Eletronico

### Objetivo

Permitir que o colaborador revise e assine documentos eletronicamente no portal, com controle de autenticacao, versao, prazo e trilha de auditoria.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Portal do Colaborador
* BFF do portal
* Gestao Documental
* Provedor de assinatura
* Auditoria

---

# Pre-condicoes

* Colaborador autenticado.
* Tenant ativo validado.
* Documento disponivel para assinatura.
* Tipo documental permite assinatura eletronica pelo colaborador.

---

# Gatilho

O processo inicia quando o colaborador seleciona um documento pendente de assinatura.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa a lista de documentos pendentes.

### Etapa 2

Sistema apresenta o documento, sua versao e o tipo de assinatura exigida.

### Etapa 3

Colaborador revisa o conteudo do documento.

### Etapa 4

Sistema solicita confirmacao de assinatura.

### Etapa 5

Sistema coleta a assinatura eletronica conforme politica do documento.

### Etapa 6

Sistema registra a assinatura, a versao assinada e o carimbo de auditoria.

### Etapa 7

Sistema atualiza o status do documento para assinado.

---

# Fluxos Alternativos

## FA-01 - Documento expirado

### Condicao

O documento nao pode mais ser assinado por expurgo, revogacao ou expiração.

### Fluxo

* Sistema bloqueia a assinatura.
* Sistema orienta a solicitacao de nova versao.

## FA-02 - Assinatura recusada

### Condicao

O colaborador nao confirma a assinatura.

### Fluxo

* Sistema registra a recusa.
* Sistema mantém o documento pendente.

## FA-03 - Nivel de assinatura insuficiente

### Condicao

O nivel de autenticacao atual nao atende ao tipo documental.

### Fluxo

* Sistema solicita reforco de autenticacao.
* Sistema impede a conclusao.

---

# Pos-condicoes

* Documento assinado ou recusa registrada.
* Versao assinada preservada.
* Auditoria da assinatura registrada.

---

# Regras de Negocio Relacionadas

* O nivel de assinatura depende do tipo documental.
* O documento assinado nao pode ter seu historico sobrescrito.
* A assinatura deve ser auditavel e rastreavel.
* A politica documental define prazos e validade.

---

# Entidades Envolvidas

## Document

```text
id
document_type
version
status
```

## DocumentSignature

```text
id
document_id
signer_subject
signature_level
status
signed_at
```

## DocumentAudit

```text
id
document_id
action
actor_subject
created_at
```

## AuditEvent

```text
id
actor_subject
tenant_id
action
resource_type
resource_id
created_at
```

---

# Casos Relacionados

* UC-COL-001 - Acessar Portal do Colaborador
* UC-GED-005 - Assinar Documento Eletronicamente
* UC-GED-006 - Assinar Documento com ICP-Brasil
* UC-WFL-010 - Auditar Historico do Workflow
