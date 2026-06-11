# UC-GST-010

## Exportar Dados Autorizados da Equipe

### Objetivo

Permitir que o gestor exporte dados autorizados da equipe, com controle de finalidade, mascaramento e trilha de auditoria.

---

# Atores

## Primarios

* Gestor

## Secundarios

* Portal do Gestor
* API de BI
* Auditoria

---

# Pre-condicoes

* Gestor autenticado.
* Tenant ativo validado.
* Dados autorizados para exportacao.
* Permissao de exportacao habilitada.

---

# Gatilho

O processo inicia quando o gestor solicita exportacao de dados da equipe.

---

# Fluxo Principal

### Etapa 1

Gestor acessa:

```text
Portal do Gestor
→ Exportar Dados da Equipe
```

### Etapa 2

Sistema apresenta os formatos e recortes permitidos.

### Etapa 3

Gestor define periodo, formato e finalidade.

### Etapa 4

Sistema aplica mascaramento e filtragem de acordo com a politica.

### Etapa 5

Sistema gera o arquivo autorizado.

### Etapa 6

Sistema registra auditoria da exportacao.

---

# Fluxos Alternativos

## FA-01 - Finalidade invalida

### Condicao

A finalidade informada nao e permitida.

### Fluxo

* Sistema bloqueia a exportacao.

## FA-02 - Dados sensiveis sem autorizacao

### Condicao

O recorte inclui informacoes nao permitidas.

### Fluxo

* Sistema remove ou mascara os dados.
* Sistema segue apenas com o recorte autorizado.

---

# Pos-condicoes

* Exportacao gerada ou recusada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Exportacao deve respeitar LGPD e politica interna.
* Dados pessoais sensiveis devem ser mascarados quando necessario.
* A exportacao precisa de trilha e finalidade declarada.

---

# Entidades Envolvidas

## ExportJob

```text
id
manager_id
format
purpose
status
created_at
```

## ExportArtifact

```text
id
job_id
file_name
status
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

* UC-BI-010 - Exportar Indicadores
* UC-SEC-008 - Aplicar Politica de Retencao
* UC-SEC-010 - Auditar Acessos e Operacoes
