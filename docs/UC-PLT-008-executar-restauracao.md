# UC-PLT-008

## Executar Restauracao

### Objetivo

Permitir a restauracao de backups de plataforma ou componentes.

---

# Atores

## Primarios

* Administrador da plataforma

## Secundarios

* Operacao
* Auditoria

---

# Pre-condicoes

* Backup valido disponivel.

---

# Gatilho

O processo inicia quando a restauracao e executada.

---

# Fluxo Principal

### Etapa 1

Sistema identifica o snapshot.

### Etapa 2

Sistema valida o manifesto.

### Etapa 3

Sistema executa a restauracao.

### Etapa 4

Sistema registra o estado final.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Snapshot invalido

### Condicao

O backup nao e consistente.

### Fluxo

* Sistema bloqueia a restauracao.

---

# Pos-condicoes

* Restauracao executada ou bloqueada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A restauracao deve ser previsivel e sem perda fora do escopo.
* O historico precisa ser preservado.

---

# Entidades Envolvidas

## RestoreJob

```text
id
backup_job_id
status
restored_at
```

---

# Casos Relacionados

* UC-PLT-007 - Executar Backup
* UC-PLT-010 - Auditar Governanca da Plataforma
