# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-003 - Calcular Aviso Previo

### Versao

1.0

---

# Objetivo

Calcular aviso previo trabalhado ou indenizado, de acordo com o tipo de desligamento e a politica aplicavel.

---

# Atores

- Analista de Folha
- Analista de RH

---

# Pre-condicoes

- Desligamento definido.
- Motivo classificado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o aviso previo precisa ser apurado.

---

# Fluxo Principal

1. Usuario acessa Rescisao > Aviso Previo.
2. Sistema apresenta dados do desligamento.
3. Usuario confirma o calculo.
4. Sistema apura aviso trabalhado ou indenizado.
5. Sistema registra memoria de calculo.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O aviso deve respeitar o tipo de desligamento.
- A memoria de calculo deve ser preservada.

---

# Entidades Envolvidas

## TerminationNoticeCalculation

```text
id
termination_request_id
notice_type
amount
calculated_at
```

---

# Testes

- Calcular aviso valido.
- Bloquear desligamento sem motivo.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem depois da classificacao do desligamento e antes dos demais calculos rescisorios.
