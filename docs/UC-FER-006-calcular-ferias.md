# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-006 - Calcular Ferias

### Versao

1.0

---

# Objetivo

Permitir o calculo de ferias, medias e verbas correlatas, com memoria de calculo, controle de vigencia e reflexo em folha.

---

# Atores

- Analista de Folha
- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Solicitacao de ferias aprovada.
- Usuario autenticado.
- Permissao para calcular ferias.

---

# Gatilho

O processo inicia quando o RH precisa calcular o valor de ferias de um colaborador.

---

# Fluxo Principal

1. Usuario acessa Ferias > Calcular.
2. Sistema apresenta dados da solicitacao.
3. Usuario confirma o calculo.
4. Sistema consolida bases e medias.
5. Sistema calcula valores e reflexos aplicaveis.
6. Sistema registra memoria de calculo.
7. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados incompletos

Sistema bloqueia o calculo.

## FA-02 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Ferias calculadas.
- Memoria de calculo registrada.

---

# Regras de Negocio Relacionadas

- O calculo deve respeitar o periodo concedido.
- A memoria de calculo deve ser preservada.

---

# Entidades Envolvidas

## VacationCalculation

```text
id
request_id
gross_amount
discount_amount
net_amount
calculated_at
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/requests/{id}/calculation
```

---

# Testes

- Calcular ferias validas.
- Bloquear sem dados.
- Preservar memoria de calculo.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso consome a solicitacao aprovada e prepara o reflexo financeiro do periodo concedido.
