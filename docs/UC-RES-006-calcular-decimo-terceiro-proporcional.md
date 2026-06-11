# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-006 - Calcular Decimo Terceiro Proporcional

### Versao

1.0

---

# Objetivo

Calcular o decimo terceiro proporcional e seus reflexos na rescisao.

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

O processo inicia quando o 13o proporcional precisa ser apurado na rescisao.

---

# Fluxo Principal

1. Usuario acessa Rescisao > 13o Proporcional.
2. Sistema identifica avos e medias aplicaveis.
3. Sistema calcula valores proporcionais.
4. Sistema registra memoria de calculo.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O calculo deve ser coerente com a competencia de desligamento.
- O historico de avos deve ser preservado.

---

# Entidades Envolvidas

## TerminationThirteenthCalculation

```text
id
termination_request_id
amount
calculated_at
```

---

# Testes

- Calcular 13o proporcional valido.
- Bloquear sem base.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a camada de calculo proporcional antes do FGTS rescisorio e dos documentos.
