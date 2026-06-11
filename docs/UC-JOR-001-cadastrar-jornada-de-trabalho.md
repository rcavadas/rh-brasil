# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-001 — Cadastrar Jornada de Trabalho

### Versão

1.0

---

# Objetivo

Permitir o cadastro e manutenção das jornadas de trabalho utilizadas pelos colaboradores, garantindo vigência, histórico, parametrização legal, integração com escalas, ponto, banco de horas e folha de pagamento.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Gestor autorizado
- Folha de Pagamento
- Portal do Gestor

---

# Pré-Condições

- Usuário autenticado
- Usuário com permissão para configurar jornadas
- Empresa e filial cadastradas
- Políticas de jornada definidas

---

# Gatilho

O processo inicia quando o RH precisa criar ou alterar uma jornada de trabalho aplicável a colaboradores ou grupos.

---

# Fluxo Principal

1. Acessar Jornada e Ponto > Jornadas > Nova Jornada
2. Informar nome e descrição da jornada
3. Definir carga horária diária e semanal
4. Configurar horários de entrada, saída e intervalos
5. Definir tolerâncias de atraso e saída antecipada
6. Informar vigência inicial e final quando aplicável
7. Salvar configuração
8. Sistema valida consistência dos horários
9. Sistema grava jornada e gera histórico
10. Sistema disponibiliza jornada para escalas e contratos

---

# Fluxos Alternativos

## FA-01 — Carga horária inconsistente

Sistema bloqueia gravação quando a soma dos horários não corresponde à carga definida.
## FA-02 — Sobreposição de vigência

Sistema alerta quando houver outra jornada equivalente com vigência conflitante.
## FA-03 — Usuário sem permissão

Sistema bloqueia o cadastro e registra tentativa de acesso.

---

# Pós-Condições

- Jornada criada ou atualizada
- Histórico registrado
- Jornada disponível para associação a colaboradores, contratos e escalas

---

# Regras de Negócio Relacionadas

- Toda jornada deve possuir vigência
- Alterações não podem sobrescrever histórico anterior
- A jornada vigente na data deve ser usada no cálculo do ponto
- Jornadas inativas não podem ser associadas a novos contratos

---

# Entidades Envolvidas

## WorkSchedule

```text
id
company_id
name
daily_hours
weekly_hours
valid_from
valid_to
status
```
## WorkSchedulePeriod

```text
id
work_schedule_id
entry_time
exit_time
break_start
break_end
day_of_week
```
## WorkScheduleHistory

```text
id
work_schedule_id
change_type
changed_by
changed_at
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Nome da jornada | Obrigatório |
| Carga horária semanal | Obrigatório |
| Horários | Obrigatório |
| Vigência | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Criar e editar |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/work-schedules
```
```http
GET /api/v1/work-schedules/{id}
```
```http
PUT /api/v1/work-schedules/{id}
```

---

# Eventos de Domínio

```text
WorkScheduleCreated
WorkScheduleUpdated
WorkScheduleActivated
WorkScheduleInactivated
```

---

# Integrações Impactadas

- Contratos de trabalho
- Escalas
- Ponto
- Folha
- Analytics

---

# Casos de Teste

## CT-JOR-001-001

Cadastrar jornada válida

Resultado esperado:

```text
Jornada criada com sucesso.
```
## CT-JOR-001-002

Cadastrar sem carga horária

Resultado esperado:

```text
Validação obrigatória exibida.
```
## CT-JOR-001-003

Alterar jornada com vigência futura

Resultado esperado:

```text
Nova versão criada sem sobrescrever histórico.
```

---

# Métricas

- Quantidade de jornadas ativas
- Jornadas por empresa
- Alterações de jornada por período

---

# Observações Arquiteturais

O cadastro de jornada deve ser versionado por vigência, evitando alteração retroativa indevida em cálculos de ponto e folha.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso e a base da configuracao de jornada. Ele deve ser lido antes da escala, do calendario, das regras de tolerancia e da captura de marcacoes, porque define a referencia funcional usada no restante do pacote JOR.
