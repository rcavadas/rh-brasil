# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-005 - Configurar Parametrizacoes por Tenant

### Versao

1.0

---

# Objetivo

Configurar parametros operacionais por tenant sem violar o isolamento entre clientes.

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

O processo inicia quando um parametro por tenant precisa ser criado ou alterado.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Parametrizacoes.
2. Sistema apresenta os parametros.
3. Usuario altera o valor.
4. Sistema valida o escopo.
5. Sistema grava a parametrizacao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- Parametros devem ser versionados.
- O escopo deve respeitar o tenant.

---

# Entidades Envolvidas

## PlatformTenantSetting

```text
id
tenant_id
setting_key
setting_value
status
```

---

# Testes

- Configurar parametro valido.
- Bloquear escopo fora do tenant.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso consolida a variabilidade permitida por tenant sem quebrar o isolamento.
