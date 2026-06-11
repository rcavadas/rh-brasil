# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-003 - Configurar MFA

### Versao

1.0

---

# Objetivo

Configurar autenticacao multifator para perfis ou usuarios elegiveis.

---

# Atores

- Gestor de Seguranca
- Administrador do Sistema

---

# Pre-condicoes

- Usuario autenticado.
- Politica de seguranca disponivel.

---

# Gatilho

O processo inicia quando o MFA precisa ser habilitado ou ajustado.

---

# Fluxo Principal

1. Usuario acessa Seguranca > MFA.
2. Sistema apresenta politicas disponiveis.
3. Usuario define a configuracao.
4. Sistema valida a aplicacao.
5. Sistema grava a politica.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- MFA deve ser auditavel.
- Alteracoes devem respeitar politica vigente.

---

# Entidades Envolvidas

## SecurityMfaPolicy

```text
id
scope
method
status
```

---

# Testes

- Configurar MFA valida.
- Bloquear politica inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso reforca a fronteira de autenticacao depois de perfis e permissoes.
