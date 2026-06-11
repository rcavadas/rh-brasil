# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-005 - Gerenciar LTCAT

### Versao

1.0

---

# Objetivo

Gerenciar o laudo tecnico de condicoes ambientais do trabalho com vigencia e historico.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- Ambiente e riscos cadastrados.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o LTCAT precisa ser criado ou atualizado.

---

# Fluxo Principal

1. Usuario acessa SST > LTCAT.
2. Sistema apresenta os dados.
3. Usuario informa a vigencia.
4. Sistema valida o escopo.
5. Sistema grava o laudo.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O laudo deve ser versionado.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## LtcatReport

```text
id
tenant_id
valid_from
valid_to
status
```

---

# Testes

- Gerenciar LTCAT valido.
- Bloquear sem riscos.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso formaliza o laudo tecnico que sustenta obrigações correlatas.
