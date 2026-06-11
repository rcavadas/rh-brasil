# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-002 - Cadastrar Riscos Ocupacionais

### Versao

1.0

---

# Objetivo

Cadastrar riscos ocupacionais associados a ambientes de trabalho.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- Ambiente cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando riscos precisam ser mapeados.

---

# Fluxo Principal

1. Usuario acessa SST > Riscos.
2. Sistema apresenta os ambientes.
3. Usuario informa os riscos.
4. Sistema valida a consistencia.
5. Sistema grava o mapeamento.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O risco deve estar vinculado ao ambiente.
- Historico deve ser preservado.

---

# Entidades Envolvidas

## OccupationalRisk

```text
id
environment_id
name
severity
status
```

---

# Testes

- Cadastrar risco valido.
- Bloquear sem ambiente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois do ambiente e estabelece o mapa de riscos do dominio.
