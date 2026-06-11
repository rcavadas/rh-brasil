# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-005 - Aprovar Ferias

### Versao

1.0

---

# Objetivo

Permitir a aprovacao, rejeicao ou ajuste de solicitacoes de ferias, mantendo trilha de auditoria e coerencia com o periodo concedido.

---

# Atores

- Gestor
- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Solicitacao de ferias existente.
- Usuario autenticado.
- Permissao para aprovar ferias.

---

# Gatilho

O processo inicia quando uma solicitacao de ferias precisa de decisao.

---

# Fluxo Principal

1. Usuario acessa a fila de solicitacoes.
2. Sistema apresenta detalhes da solicitacao.
3. Usuario aprova, rejeita ou ajusta.
4. Sistema valida impacto no saldo e nas datas.
5. Sistema registra a decisao.
6. Sistema atualiza o status da solicitacao.
7. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Solicitacao inconsistente

Sistema bloqueia a aprovacao.

## FA-02 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Solicitacao aprovada, rejeitada ou ajustada.
- Historico preservado.

---

# Regras de Negocio Relacionadas

- Toda aprovacao deve ser auditavel.
- Ajustes devem respeitar saldo e janela concessiva.

---

# Entidades Envolvidas

## VacationApproval

```text
id
request_id
approved_by
status
decision_at
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/requests/{id}/approval
```

---

# Testes

- Aprovar solicitacao valida.
- Rejeitar solicitacao.
- Bloquear sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a decisao operacional da solicitacao antes do calculo, do aviso e da integracao com folha.
