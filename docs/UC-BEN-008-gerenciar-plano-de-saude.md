# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-008 - Gerenciar Plano de Saude

### Versao

1.0

---

# Objetivo

Gerenciar adesao, elegibilidade e coparticipacao de plano de saude.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Beneficio cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o plano de saude precisa ser concedido ou ajustado.

---

# Fluxo Principal

1. Usuario acessa o plano de saude.
2. Sistema apresenta elegibilidade e configuracao.
3. Usuario define adesao ou manutencao.
4. Sistema aplica coparticipacao quando aplicavel.
5. Sistema registra historico e auditoria.

---

# Regras de Negocio Relacionadas

- A adesao deve respeitar elegibilidade.
- A coparticipacao deve ser rastreavel.

---

# Entidades Envolvidas

## HealthPlanAllocation

```text
id
employee_id
benefit_id
copay_enabled
status
```

---

# Testes

- Gerenciar plano de saude valido.
- Bloquear sem elegibilidade.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso cobre um beneficio sensivel que combina elegibilidade, adesao e coparticipacao.
