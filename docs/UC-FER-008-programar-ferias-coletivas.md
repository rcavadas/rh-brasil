# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-FER-008 - Programar Ferias Coletivas

### Versao

1.0

---

# Objetivo

Permitir a programacao de ferias coletivas por empresa ou unidade, com abrangencia, periodo e auditoria.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Gestao autorizada

---

# Pre-condicoes

- Parametrizacao de ferias coletivas disponivel.
- Usuario autenticado.
- Permissao para programar ferias coletivas.

---

# Gatilho

O processo inicia quando a empresa decide programar ferias coletivas para um grupo de colaboradores.

---

# Fluxo Principal

1. Usuario acessa Ferias > Coletivas.
2. Sistema apresenta parametros e historico.
3. Usuario define periodo e abrangencia.
4. Sistema valida impacto sobre os colaboradores.
5. Sistema registra a programacao.
6. Sistema disponibiliza notificacoes e auditoria.

---

# Fluxos Alternativos

## FA-01 - Abrangencia invalida

Sistema bloqueia a programacao.

## FA-02 - Usuario sem permissao

Sistema bloqueia a operacao.

---

# Pos-condicoes

- Ferias coletivas programadas.
- Historico e auditoria preservados.

---

# Regras de Negocio Relacionadas

- A programacao coletiva deve respeitar politica da empresa.
- A programacao deve preservar rastreabilidade por unidade e competencia.

---

# Entidades Envolvidas

## VacationCollectiveSchedule

```text
id
company_id
unit_scope
start_date
end_date
status
```

---

# APIs Sugeridas

```http
POST /api/v1/vacations/collective-schedules
```

---

# Testes

- Programar ferias coletivas validas.
- Bloquear abrangencia invalida.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso trata uma variante coletiva que depende das mesmas bases individuais de periodo e saldo.
