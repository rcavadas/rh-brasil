# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-007 - Calcular Abono Pecuniario

### Versao

1.0

---

# Objetivo

Permitir o calculo do abono pecuniario quando o colaborador optar pela conversao parcial de ferias em abono.

---

# Atores

- Analista de Folha
- Analista de RH

---

# Pre-condicoes

- Solicitacao de ferias com abono.
- Usuario autenticado.
- Permissao para calcular abono.

---

# Gatilho

O processo inicia quando a opcao de abono pecuniario precisa ser calculada.

---

# Fluxo Principal

1. Usuario acessa o calculo de ferias com abono.
2. Sistema identifica a parte convertida em abono.
3. Sistema calcula o valor correspondente.
4. Sistema registra memoria de calculo.
5. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Opcao de abono nao informada

Sistema bloqueia o calculo.

## FA-02 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Abono calculado.
- Memoria de calculo registrada.

---

# Regras de Negocio Relacionadas

- O abono deve respeitar o limite legal e a solicitacao aprovada.
- O calculo deve ser auditavel.

---

# Entidades Envolvidas

## VacationCashOut

```text
id
vacation_request_id
amount
calculated_at
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/requests/{id}/cash-out
```

---

# Testes

- Calcular abono valido.
- Bloquear sem opcao de abono.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o calculo de ferias quando ha conversao parcial em abono.
