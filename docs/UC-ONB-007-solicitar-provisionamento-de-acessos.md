# UC-ONB-007

## Solicitar Provisionamento de Acessos

### Objetivo

Permitir a solicitacao de acessos corporativos para o novo colaborador.

---

# Atores

## Primarios

* Onboarding

## Secundarios

* TI / IAM
* Auditoria

---

# Pre-condicoes

* Processo de pre-admissao ou admissao ativo.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando os acessos sao solicitados.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona os acessos necessarios.

### Etapa 2

Sistema valida a politica do tenant.

### Etapa 3

Sistema registra a solicitacao.

### Etapa 4

Sistema encaminha para o provedor de acessos.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Acesso nao permitido

### Condicao

O recurso solicitado nao e permitido.

### Fluxo

* Sistema bloqueia a solicitacao.

---

# Pos-condicoes

* Solicitacao criada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A concessao deve seguir segregacao de papeis.
* A solicitacao precisa ser rastreavel.

---

# Entidades Envolvidas

## AccessProvisionRequest

```text
id
onboarding_process_id
resource
status
created_at
```

---

# Casos Relacionados

* UC-SEC-002 - Gerenciar Permissoes
* UC-ONB-008 - Solicitar Equipamentos
