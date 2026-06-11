# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-009 - Emitir Aviso de Ferias

### Versao

1.0

---

# Objetivo

Permitir a emissao do aviso formal de ferias, com trilha de auditoria e vinculacao ao periodo aprovado.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Ferias aprovadas ou programadas.
- Usuario autenticado.
- Permissao para emitir aviso.

---

# Gatilho

O processo inicia quando o aviso formal de ferias precisa ser gerado.

---

# Fluxo Principal

1. Usuario acessa Ferias > Aviso.
2. Sistema apresenta periodo e dados do colaborador.
3. Usuario confirma a emissao.
4. Sistema gera o aviso.
5. Sistema registra assinatura ou aceite quando aplicavel.
6. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Ferias nao aprovadas

Sistema bloqueia a emissao.

## FA-02 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Aviso emitido.
- Evidencia registrada.

---

# Regras de Negocio Relacionadas

- O aviso deve refletir o periodo aprovado.
- O documento deve ser auditavel.

---

# Entidades Envolvidas

## VacationNotice

```text
id
vacation_request_id
issued_at
issued_by
status
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/requests/{id}/notice
```

---

# Testes

- Emitir aviso valido.
- Bloquear sem aprovacao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso formaliza a comunicacao do periodo aprovado antes da integracao com folha.
