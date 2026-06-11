# UC-ONB-008

## Solicitar Equipamentos

### Objetivo

Permitir a solicitacao de equipamentos e recursos de trabalho para o novo colaborador.

---

# Atores

## Primarios

* Onboarding

## Secundarios

* Facilities / TI
* Auditoria

---

# Pre-condicoes

* Processo de onboarding ativo.
* Politica de recursos definida.

---

# Gatilho

O processo inicia quando os equipamentos sao solicitados.

---

# Fluxo Principal

### Etapa 1

Usuario informa os itens necessarios.

### Etapa 2

Sistema valida elegibilidade e disponibilidade.

### Etapa 3

Sistema registra a solicitacao.

### Etapa 4

Sistema encaminha para atendimento.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Item indisponivel

### Condicao

O recurso nao esta disponivel.

### Fluxo

* Sistema sinaliza indisponibilidade e segue com a fila.

---

# Pos-condicoes

* Solicitacao registrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Os recursos devem seguir a politica do tenant.
* A solicitacao precisa ter rastreabilidade.

---

# Entidades Envolvidas

## EquipmentRequest

```text
id
onboarding_process_id
item
status
created_at
```

---

# Casos Relacionados

* UC-ONB-007 - Solicitar Provisionamento de Acessos
* UC-ONB-009 - Atribuir Treinamentos Iniciais
