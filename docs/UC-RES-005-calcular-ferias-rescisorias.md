# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-005 - Calcular Ferias Rescisorias

### Versao

1.0

---

# Objetivo

Calcular ferias vencidas e proporcionais no contexto da rescisao.

---

# Atores

- Analista de Folha
- Analista de RH

---

# Pre-condicoes

- Desligamento registrado.
- Ferias apuradas.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando as ferias rescisorias precisam ser apuradas.

---

# Fluxo Principal

1. Usuario acessa Rescisao > Ferias Rescisorias.
2. Sistema identifica periodos devidos.
3. Sistema calcula valores proporcionais e vencidos.
4. Sistema registra memoria de calculo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O calculo deve respeitar historico de ferias.
- A memoria de calculo deve ser preservada.

---

# Entidades Envolvidas

## TerminationVacationCalculation

```text
id
termination_request_id
amount
calculated_at
```

---

# Testes

- Calcular ferias rescisorias validas.
- Bloquear sem base de ferias.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o saldo salarial com os periodos de ferias vencidas e proporcionais.
