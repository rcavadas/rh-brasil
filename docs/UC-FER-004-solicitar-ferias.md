# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-004 - Solicitar Ferias

### Versao

1.0

---

# Objetivo

Permitir a solicitacao de ferias pelo colaborador ou pelo gestor autorizado, com validacao de saldo, periodo e regras operacionais.

---

# Atores

- Colaborador
- Gestor autorizado
- Analista de RH

---

# Pre-condicoes

- Saldo de ferias disponivel.
- Usuario autenticado.
- Permissao para solicitar ferias.

---

# Gatilho

O processo inicia quando o colaborador ou o gestor precisa abrir uma solicitacao de ferias.

---

# Fluxo Principal

1. Usuario acessa Ferias > Solicitar.
2. Sistema apresenta saldo e periodos disponiveis.
3. Usuario informa datas e opcao de abono quando aplicavel.
4. Sistema valida saldo, conflitos e janela concessiva.
5. Sistema registra a solicitacao.
6. Sistema encaminha para aprovacao.
7. Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Saldo insuficiente

Sistema bloqueia a solicitacao.

## FA-02 - Conflito de datas

Sistema bloqueia ou alerta conforme politica.

## FA-03 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Solicitacao criada.
- Fluxo de aprovacao iniciado.

---

# Regras de Negocio Relacionadas

- A solicitacao deve respeitar saldo e janela concessiva.
- A solicitacao deve permanecer auditavel.

---

# Entidades Envolvidas

## VacationRequest

```text
id
employee_id
start_date
end_date
status
with_abono
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/requests
```

---

# Testes

- Solicitar ferias valida.
- Bloquear sem saldo.
- Bloquear conflito de datas.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso inicia a trilha operacional de ferias depois da leitura de saldo e janela concessiva.
