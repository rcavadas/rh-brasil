# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-010 - Auditar Governanca da Plataforma

### Versao

1.0

---

# Objetivo

Auditar a governanca da plataforma, incluindo configuracoes, acessos e eventos operacionais.

---

# Atores

- Gestor de Plataforma
- Gestor de Seguranca
- Administrador do Sistema

---

# Pre-condicoes

- Trilha disponivel.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a governanca da plataforma precisa ser revisada.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Governanca.
2. Sistema apresenta os eventos.
3. Usuario filtra o escopo.
4. Sistema consolida a trilha.
5. Sistema registra auditoria do acesso.

---

# Regras de Negocio Relacionadas

- A trilha deve ser imutavel.
- Exportacoes devem respeitar mascaramento e escopo.

---

# Entidades Envolvidas

## PlatformGovernanceAudit

```text
id
event_type
resource
status
captured_at
```

---

# Testes

- Auditar governanca valida.
- Bloquear sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o pacote ao expor a governanca e auditoria da plataforma.
