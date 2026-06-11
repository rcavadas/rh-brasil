# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-007 - Executar Backup

### Versao

1.0

---

# Objetivo

Executar backup da plataforma com escopo, rastreabilidade e artefatos preservados.

---

# Atores

- Gestor de Plataforma
- Administrador do Sistema

---

# Pre-condicoes

- Ambiente disponivel.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando um backup precisa ser gerado.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Backup.
2. Sistema apresenta o escopo.
3. Usuario confirma a execucao.
4. Sistema gera o backup.
5. Sistema registra o manifesto.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O backup deve ser rastreavel.
- O manifesto deve ser preservado.

---

# Entidades Envolvidas

## PlatformBackupSnapshot

```text
id
tenant_scope
artifact_ref
status
created_at
```

---

# Testes

- Executar backup valido.
- Bloquear sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso formaliza a capacidade minima de recuperacao da plataforma.
