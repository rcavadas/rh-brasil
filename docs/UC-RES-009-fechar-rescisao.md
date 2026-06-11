# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-009 - Fechar Rescisao

### Versao

1.0

---

# Objetivo

Permitir o fechamento operacional do processo de rescisao depois da validacao dos calculos e documentos.

---

# Atores

- Analista de RH
- Analista de Folha

---

# Pre-condicoes

- Rescisao calculada.
- Documentos gerados.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a rescisao precisa ser encerrada formalmente.

---

# Fluxo Principal

1. Usuario acessa Rescisao > Fechar.
2. Sistema valida pendencias.
3. Usuario confirma o fechamento.
4. Sistema bloqueia a rescisao para novas alteracoes.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O fechamento nao pode apagar historico.
- Reaberturas devem seguir fluxo autorizado.

---

# Entidades Envolvidas

## TerminationClosure

```text
id
termination_request_id
closed_at
closed_by
status
```

---

# Testes

- Fechar rescisao valida.
- Bloquear sem calculo.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso bloqueia a rescisao depois dos calculos e documentos, preparando a transmissao final.
