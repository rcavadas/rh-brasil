# UC-ONB-002

## Enviar Convite ao Candidato

### Objetivo

Permitir o envio de convite e orientacao inicial ao candidato em pre-admissao.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* Onboarding
* Auditoria

---

# Pre-condicoes

* Processo de pre-admissao ativo.
* Candidato elegivel.

---

# Gatilho

O processo inicia quando o convite e enviado.

---

# Fluxo Principal

### Etapa 1

Usuario prepara o convite.

### Etapa 2

Sistema registra o canal de envio.

### Etapa 3

Sistema envia a orientacao inicial.

### Etapa 4

Sistema atualiza o estado do processo.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Canal indisponivel

### Condicao

O canal de envio nao esta disponivel.

### Fluxo

* Sistema sinaliza a falha e permite reenvio.

---

# Pos-condicoes

* Convite enviado ou pendente.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O convite deve ser rastreavel.
* O canal deve respeitar a politica do tenant.

---

# Entidades Envolvidas

## Invitation

```text
id
onboarding_process_id
channel
status
sent_at
```

---

# Casos Relacionados

* UC-ONB-001 - Criar Processo de Pre-Admissao
* UC-ONB-003 - Coletar Dados Cadastrais
