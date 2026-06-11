# UC-PLT-007

## Executar Backup

### Objetivo

Permitir a execucao de backup da plataforma ou de componentes especificos.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Operacao
* Auditoria

---

# Pre-condicoes

* Politica de backup definida.

---

# Gatilho

O processo inicia quando o backup e executado.

---

# Fluxo Principal

### Etapa 1

Sistema identifica os componentes.

### Etapa 2

Sistema cria o snapshot.

### Etapa 3

Sistema grava o manifesto.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Origem indisponivel

### Condicao

Um componente nao responde.

### Fluxo

* Sistema sinaliza a falha.

---

# Pos-condicoes

* Backup executado ou sinalizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O backup precisa ser testavel e previsivel.
* A integridade do snapshot deve ser preservada.

---

# Entidades Envolvidas

## BackupJob

```text
id
scope
status
created_at
```

---

# Casos Relacionados

* UC-PLT-006 - Monitorar Disponibilidade
* UC-PLT-008 - Executar Restauracao
