# UC-PLT-004

## Configurar Isolamento de Dados

### Objetivo

Permitir a configuracao do isolamento de dados entre tenants, empresas e filiais.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Auditoria

---

# Pre-condicoes

* Tenant, empresa ou filial existentes.

---

# Gatilho

O processo inicia quando o isolamento e configurado.

---

# Fluxo Principal

### Etapa 1

Usuario define a fronteira.

### Etapa 2

Sistema valida o escopo.

### Etapa 3

Sistema grava a politica.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Escopo inconsistente

### Condicao

O escopo conflita com outra regra.

### Fluxo

* Sistema bloqueia a configuracao.

---

# Pos-condicoes

* Isolamento configurado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O isolamento deve ser verificavel em runtime.
* A politica precisa ser rastreavel.

---

# Entidades Envolvidas

## DataIsolationPolicy

```text
id
tenant_id
scope
status
updated_at
```

---

# Casos Relacionados

* UC-PLT-001 - Cadastrar Tenant
* UC-PLT-005 - Configurar Parametrizacoes por Tenant
