# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-004 - Calcular Saldo de Salario

### Versao

1.0

---

# Objetivo

Calcular o saldo salarial proporcional da competencia de desligamento.

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

O processo inicia quando o saldo salarial precisa ser apurado.

---

# Fluxo Principal

1. Usuario acessa Rescisao > Saldo Salarial.
2. Sistema consolida os dias trabalhados da competencia.
3. Sistema calcula o saldo proporcional.
4. Sistema registra memoria de calculo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O saldo deve respeitar a data de desligamento.
- O calculo deve ser auditavel.

---

# Entidades Envolvidas

## TerminationSalaryBalance

```text
id
termination_request_id
amount
calculated_at
```

---

# Testes

- Calcular saldo valido.
- Bloquear sem desligamento.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso integra a camada de calculo rescisorio e depende da data de desligamento e do historico da competencia.
