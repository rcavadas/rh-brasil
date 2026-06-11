# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-010 - Auditar Acessos e Operacoes

### Versao

1.0

---

# Objetivo

Consultar trilhas de auditoria de acessos, operacoes e eventos sensiveis com filtros e evidencias autorizadas.

---

# Atores

- Auditor
- Gestor de Seguranca
- Administrador do Sistema

---

# Pre-condicoes

- Trilha de auditoria disponivel.
- Usuario autenticado.

---

# Gatilho

O auditor precisa revisar acessos ou operacoes realizadas.

---

# Fluxo Principal

1. Usuario abre a consulta de auditoria.
2. Sistema apresenta filtros.
3. Usuario seleciona os filtros.
4. Sistema consolida os eventos.
5. Sistema exibe a trilha autorizada.
6. Sistema registra o acesso.

---

# Regras de Negocio Relacionadas

- A trilha deve ser imutavel.
- Exportacoes devem usar mascaramento estrito quando aplicavel.

---

# Entidades Envolvidas

## SecurityAuditEvent

```text
id
subject
action
resource
created_at
```

---

# Testes

- Consultar trilha valida.
- Bloquear sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra a trilha transversal ao expor a auditoria autorizada do sistema.
