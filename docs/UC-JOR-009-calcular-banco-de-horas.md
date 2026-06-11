# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-009 — Calcular Banco de Horas

### Versão

1.0

---

# Objetivo

Permitir a apuração de créditos, débitos, saldos, vencimentos e compensações do banco de horas, com regras parametrizáveis por empresa, acordo coletivo ou colaborador.

---

# Atores

- Analista de RH
- Gestor
- Colaborador
- Folha de Pagamento

---

# Pré-Condições

- Ponto tratado
- Regra de banco de horas configurada
- Colaborador elegível ao banco de horas

---

# Gatilho

O processo inicia no fechamento ou recálculo do ponto, ou quando há compensação manual aprovada.

---

# Fluxo Principal

1. Sistema identifica horas excedentes e faltantes
2. Sistema aplica regra de banco de horas
3. Sistema registra créditos
4. Sistema registra débitos
5. Sistema calcula saldo atualizado
6. Sistema controla vencimento
7. Sistema identifica horas vencidas
8. Sistema disponibiliza saldo ao colaborador
9. Sistema disponibiliza saldo ao gestor
10. Sistema registra auditoria

---

# Fluxos Alternativos

## FA-01 — Colaborador não elegível

Sistema direciona horas para pagamento/desconto conforme regra.
## FA-02 — Saldo vencido

Sistema gera pendência de pagamento ou ajuste.
## FA-03 — Banco negativo acima do limite

Sistema gera alerta.

---

# Pós-Condições

- Saldo atualizado
- Movimentações registradas
- Pendências geradas quando necessário

---

# Regras de Negócio Relacionadas

- Movimentações devem possuir origem
- Saldos devem ser recalculáveis
- Horas vencidas devem seguir regra definida
- Colaborador deve consultar saldo

---

# Entidades Envolvidas

## TimeBankAccount

```text
id
employee_id
policy_id
current_balance_minutes
status
```
## TimeBankTransaction

```text
id
account_id
transaction_type
minutes
origin
expires_at
```
## TimeBankPolicy

```text
id
company_id
name
expiration_months
negative_limit_minutes
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Colaborador | Obrigatório |
| Política | Obrigatório |
| Movimentação | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Gerenciar |
| Gestor | Consulta equipe |
| Colaborador | Consulta própria |

---

# APIs Sugeridas

```http
POST /api/v1/time-bank/calculate
```
```http
GET /api/v1/employees/{id}/time-bank
```
```http
POST /api/v1/time-bank/transactions
```

---

# Eventos de Domínio

```text
TimeBankCalculated
TimeBankCredited
TimeBankDebited
TimeBankExpired
```

---

# Integrações Impactadas

- Folha
- Portal do Colaborador
- Portal do Gestor
- Analytics

---

# Casos de Teste

## CT-JOR-009-001

Gerar crédito

Resultado esperado:

```text
Saldo positivo atualizado.
```
## CT-JOR-009-002

Gerar débito

Resultado esperado:

```text
Saldo negativo atualizado.
```
## CT-JOR-009-003

Identificar vencimento

Resultado esperado:

```text
Pendência gerada.
```

---

# Métricas

- Saldo médio
- Créditos por período
- Débitos por período
- Horas vencidas
---

# Sequenciamento no Catalogo Mestre

Este caso de uso deve ser lido depois da apuracao de horas e da validacao do ponto, porque transforma o saldo de jornada em credito ou debito controlado.
