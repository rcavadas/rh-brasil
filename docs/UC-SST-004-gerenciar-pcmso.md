# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-004 - Gerenciar PCMSO

### Versao

1.0

---

# Objetivo

Gerenciar o Programa de Controle Medico de Saude Ocupacional com vigencia e historico.

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

O processo inicia quando o PCMSO precisa ser criado ou ajustado.

---

# Fluxo Principal

1. Usuario acessa SST > PCMSO.
2. Sistema apresenta o programa.
3. Usuario informa a vigencia.
4. Sistema valida a consistencia.
5. Sistema grava o PCMSO.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O PCMSO deve ser versionado.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## PcmsoProgram

```text
id
tenant_id
valid_from
valid_to
status
```

---

# Testes

- Gerenciar PCMSO valido.
- Bloquear sem ambiente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa o PGR com o programa medico ocupacional.
