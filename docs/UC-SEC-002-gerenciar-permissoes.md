# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-002 - Gerenciar Permissoes

### Versao

1.0

---

# Objetivo

Gerenciar permissoes granulares associadas a perfis, papeis e modulos.

---

# Atores

- Administrador do Sistema
- Gestor de Seguranca

---

# Pre-condicoes

- Perfil cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando uma permissao precisa ser concedida ou revogada.

---

# Fluxo Principal

1. Usuario acessa Seguranca > Permissoes.
2. Sistema apresenta permissoes disponiveis.
3. Usuario seleciona regras.
4. Sistema valida consistencia.
5. Sistema grava a permissão.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- Permissoes devem ser auditaveis.
- Revogacoes nao podem apagar historico.

---

# Entidades Envolvidas

## SecurityPermission

```text
id
profile_id
resource
action
status
```

---

# Testes

- Conceder permissao valida.
- Bloquear inconsistencias.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois dos perfis, porque detalha os acessos granulares por recurso e acao.
