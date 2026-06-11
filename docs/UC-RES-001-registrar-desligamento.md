# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-001 - Registrar Desligamento

### Versao

1.0

---

# Objetivo

Registrar formalmente o inicio do processo de rescisao, vinculando o desligamento ao colaborador e ao contrato ativo.

---

# Atores

- Analista de RH
- Business Partner
- Administrador do Sistema

---

# Pre-condicoes

- Colaborador ativo.
- Contrato ativo.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a organizacao decide encerrar o vinculo ou quando ha evento que exija desligamento.

---

# Fluxo Principal

1. Usuario acessa Rescisao > Registrar Desligamento.
2. Sistema apresenta dados do colaborador e do contrato.
3. Usuario informa o tipo e a data do desligamento.
4. Sistema valida elegibilidade.
5. Sistema registra o desligamento e gera historico.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O desligamento deve permanecer vinculado ao contrato ativo.
- O registro deve ser auditavel.

---

# Entidades Envolvidas

## TerminationRequest

```text
id
employee_id
contract_id
status
termination_date
```

---

# Testes

- Registrar desligamento valido.
- Bloquear colaborador inativo.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre o pacote de rescisao e inicia a trilha de encerramento do colaborador.
