# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-002 - Definir Motivo de Desligamento

### Versao

1.0

---

# Objetivo

Classificar o motivo do desligamento e aplicar as regras associadas ao encerramento do vinculo.

---

# Atores

- Analista de RH
- Business Partner
- Administrador do Sistema

---

# Pre-condicoes

- Desligamento registrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o motivo do desligamento precisa ser definido ou ajustado.

---

# Fluxo Principal

1. Usuario acessa o desligamento em aberto.
2. Sistema apresenta os motivos disponiveis.
3. Usuario seleciona o motivo.
4. Sistema valida a classificacao.
5. Sistema registra o motivo e historico.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O motivo deve ser rastreavel.
- O motivo deve ser coerente com o tipo de desligamento.

---

# Entidades Envolvidas

## TerminationReason

```text
id
termination_request_id
reason_code
description
```

---

# Testes

- Definir motivo valido.
- Bloquear classificacao invalida.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o registro do desligamento ao classificar o motivo e habilitar os calculos subsequentes.
