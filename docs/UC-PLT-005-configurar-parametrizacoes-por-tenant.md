# UC-PLT-005

## Configurar Parametrizacoes por Tenant

### Objetivo

Permitir a configuracao de parametrizacoes operacionais por tenant.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Portal administrativo
* Auditoria

---

# Pre-condicoes

* Tenant existente.

---

# Gatilho

O processo inicia quando as parametrizacoes sao definidas.

---

# Fluxo Principal

### Etapa 1

Usuario ajusta as preferencias.

### Etapa 2

Sistema valida consistencia.

### Etapa 3

Sistema grava a configuracao.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Parametro invalido

### Condicao

O parametro viola a politica.

### Fluxo

* Sistema bloqueia o salvamento.

---

# Pos-condicoes

* Parametrizacoes atualizadas.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* As parametrizacoes precisam ser reversiveis.
* O historico deve ser preservado.

---

# Entidades Envolvidas

## TenantSettings

```text
id
tenant_id
key
value
updated_at
```

---

# Casos Relacionados

* UC-PLT-004 - Configurar Isolamento de Dados
* UC-PLT-006 - Monitorar Disponibilidade
