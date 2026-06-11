# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-003 — Registrar Marcação de Ponto

### Versão

1.0

---

# Objetivo

Permitir o registro de marcações de ponto por meios autorizados, preservando integridade, origem, data, hora, evidências e rastreabilidade conforme regras legais e operacionais.

---

# Atores

- Colaborador
- Gestor
- Sistema REP
- Aplicativo Mobile
- Portal Web

---

# Pré-Condições

- Colaborador ativo
- Contrato ativo
- Jornada ou escala vigente
- Meio de marcação autorizado

---

# Gatilho

O processo inicia quando o colaborador registra entrada, saída, intervalo ou retorno.

---

# Fluxo Principal

1. Colaborador acessa meio de marcação
2. Sistema identifica colaborador
3. Sistema coleta data e hora oficial
4. Sistema registra origem da marcação
5. Sistema coleta geolocalização quando habilitada
6. Sistema coleta evidência quando configurada
7. Sistema grava marcação original
8. Sistema gera comprovante quando aplicável
9. Sistema disponibiliza marcação para tratamento
10. Sistema registra auditoria

---

# Fluxos Alternativos

## FA-01 — Colaborador sem contrato ativo

Sistema bloqueia marcação.
## FA-02 — Dispositivo não autorizado

Sistema registra tentativa e bloqueia se configurado.
## FA-03 — Falha offline

Sistema permite marcação offline se habilitado e sincroniza posteriormente.

---

# Pós-Condições

- Marcação registrada
- Comprovante gerado
- Registro disponível para tratamento

---

# Regras de Negócio Relacionadas

- Marcações originais não podem ser alteradas
- Correções devem ser complementares
- Toda marcação deve possuir identificador único
- A origem da marcação deve ser preservada

---

# Entidades Envolvidas

## TimePunch

```text
id
employee_id
punch_datetime
punch_type
source
device_id
timezone
created_at
```
## TimePunchEvidence

```text
id
punch_id
latitude
longitude
photo_file_id
ip_address
```
## TimePunchReceipt

```text
id
punch_id
receipt_code
generated_at
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Colaborador | Obrigatório |
| Data e hora | Obrigatório |
| Origem | Obrigatório |
| Tipo de marcação | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| Colaborador | Registrar própria marcação |
| Gestor | Consulta |
| RH | Consulta e tratamento |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-punches
```
```http
GET /api/v1/time-punches/{id}
```
```http
GET /api/v1/employees/{id}/time-punches
```

---

# Eventos de Domínio

```text
TimePunchRegistered
TimePunchSynced
TimePunchRejected
```

---

# Integrações Impactadas

- Tratamento de ponto
- Espelho de ponto
- Banco de horas
- Folha
- Auditoria

---

# Casos de Teste

## CT-JOR-003-001

Registrar entrada válida

Resultado esperado:

```text
Marcação registrada.
```
## CT-JOR-003-002

Marcar com contrato inativo

Resultado esperado:

```text
Registro bloqueado.
```
## CT-JOR-003-003

Registrar offline

Resultado esperado:

```text
Marcação sincronizada posteriormente.
```

---

# Métricas

- Marcações por dia
- Marcações por origem
- Falhas de marcação
- Marcações offline
---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois da configuracao do ponto e representa a origem primaria dos eventos diarios de jornada. Ele depende da jornada, da escala, do calendario, da tolerancia e do device policy vigente.
