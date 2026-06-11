# UC-API-010

## Monitorar Integracoes

### Objetivo

Permitir o monitoramento do estado, tentativas e falhas das integracoes.

---

# Atores

## Primarios

* Administrador de integracoes

## Secundarios

* Auditoria

---

# Pre-condicoes

* Integracoes registradas.

---

# Gatilho

O processo inicia quando o monitoramento e consultado.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona a integracao.

### Etapa 2

Sistema apresenta o estado consolidado.

### Etapa 3

Sistema exibe tentativas, falhas e pendencias.

### Etapa 4

Sistema registra a consulta quando aplicavel.

---

# Fluxos Alternativos

## FA-01 - Integracao sem eventos

### Condicao

Nao ha atividade recente.

### Fluxo

* Sistema sinaliza inatividade.

---

# Pos-condicoes

* Monitoramento consultado.
* Auditoria registrada quando aplicavel.

---

# Regras de Negocio Relacionadas

* O monitoramento precisa ser auditavel.
* Segredos e dados sensiveis nao podem aparecer no painel.

---

# Entidades Envolvidas

## IntegrationMonitoringSnapshot

```text
id
integration_id
status
attempts
updated_at
```

---

# Casos Relacionados

* UC-API-004 - Publicar Evento
* UC-SEC-010 - Auditar Acessos e Operacoes
