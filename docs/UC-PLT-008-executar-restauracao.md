# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-008 - Executar Restauracao

### Versao

1.0

---

# Objetivo

Executar restauracao da plataforma com controle de escopo e validacao do manifesto.

---

# Atores

- Gestor de Plataforma
- Administrador do Sistema

---

# Pre-condicoes

- Backup disponivel.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a plataforma precisa ser restaurada.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Restauracao.
2. Sistema apresenta backups disponiveis.
3. Usuario seleciona o snapshot.
4. Sistema valida o manifesto.
5. Sistema executa a restauracao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A restauracao deve ser controlada.
- O manifesto deve ser validado.

---

# Entidades Envolvidas

## PlatformRestoreJob

```text
id
snapshot_ref
status
started_at
```

---

# Testes

- Executar restauracao valida.
- Bloquear manifesto inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o backup ao validar a restauracao do ambiente.
