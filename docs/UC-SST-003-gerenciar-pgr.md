# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-003 - Gerenciar PGR

### Versao

1.0

---

# Objetivo

Gerenciar o Programa de Gerenciamento de Riscos com versao, vigencia e rastreabilidade.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- Riscos cadastrados.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o PGR precisa ser criado ou atualizado.

---

# Fluxo Principal

1. Usuario acessa SST > PGR.
2. Sistema apresenta o programa.
3. Usuario define vigencia e escopo.
4. Sistema valida consistencia.
5. Sistema grava o PGR.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O PGR deve ser versionado.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## PgrProgram

```text
id
tenant_id
valid_from
valid_to
status
```

---

# Testes

- Gerenciar PGR valido.
- Bloquear sem riscos.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso consolida o programa de riscos sobre os ambientes mapeados.
