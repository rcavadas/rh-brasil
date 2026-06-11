# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-004 - Configurar Isolamento de Dados

### Versao

1.0

---

# Objetivo

Configurar o isolamento de dados entre tenants, empresas e dominios sensiveis.

---

# Atores

- Gestor de Plataforma
- Administrador do Sistema

---

# Pre-condicoes

- Tenant cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a politica de isolamento precisa ser definida ou ajustada.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Isolamento.
2. Sistema apresenta as opcoes.
3. Usuario define a politica.
4. Sistema valida o contrato.
5. Sistema grava a configuracao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O isolamento deve ser verificavel em runtime.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## PlatformIsolationPolicy

```text
id
tenant_id
policy_type
status
```

---

# Testes

- Configurar isolamento valido.
- Bloquear politica inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso reforca a fronteira de segregacao entre tenants e dominios sensiveis.
