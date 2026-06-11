# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-007 - Calcular FGTS Rescisorio

### Versao

1.0

---

# Objetivo

Calcular o FGTS rescisorio e os reflexos fundiarios do desligamento.

---

# Atores

- Analista de Folha
- Analista de RH

---

# Pre-condicoes

- Desligamento registrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o FGTS rescisorio precisa ser apurado.

---

# Fluxo Principal

1. Usuario acessa Rescisao > FGTS Rescisorio.
2. Sistema identifica bases aplicaveis.
3. Sistema calcula reflexos fundiarios e multa quando cabivel.
4. Sistema registra memoria de calculo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O calculo deve ser coerente com o tipo de desligamento.
- A memoria de calculo deve ser preservada.

---

# Entidades Envolvidas

## TerminationFgtsCalculation

```text
id
termination_request_id
amount
calculated_at
```

---

# Testes

- Calcular FGTS rescisorio valido.
- Bloquear sem base.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra a camada de calculo financeiro antes da geracao dos documentos.
