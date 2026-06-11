# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-007 - Emitir ASO

### Versao

1.0

---

# Objetivo

Emitir o atestado de saude ocupacional com base no exame e no contexto do colaborador.

---

# Atores

- Medicina Ocupacional
- Analista de SST

---

# Pre-condicoes

- Exame ocupacional registrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o ASO precisa ser emitido.

---

# Fluxo Principal

1. Usuario acessa SST > ASO.
2. Sistema apresenta os exames.
3. Usuario confirma a emissao.
4. Sistema gera o ASO.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O ASO deve ser rastreavel.
- Dados sensiveis devem ser protegidos.

---

# Entidades Envolvidas

## OccupationalHealthCertificate

```text
id
exam_id
status
issued_at
```

---

# Testes

- Emitir ASO valido.
- Bloquear sem exame.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso formaliza o atestado a partir do exame ocupacional.
