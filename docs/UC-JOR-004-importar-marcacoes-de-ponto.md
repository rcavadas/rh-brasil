# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-004 — Importar Marcações de Ponto

### Versão

1.0

---

# Objetivo

Permitir a importação de marcações provenientes de REP, aplicativos, arquivos externos ou integrações, garantindo validação, deduplicação, rastreabilidade e tratamento de erros.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Sistema REP
- Integração Externa

---

# Pré-Condições

- Layout de importação configurado
- Empresa cadastrada
- Colaboradores vinculados
- Usuário autorizado

---

# Gatilho

O processo inicia quando o RH ou integração externa envia lote de marcações.

---

# Fluxo Principal

1. Selecionar arquivo ou integração
2. Sistema identifica layout
3. Sistema valida estrutura
4. Sistema valida colaboradores
5. Sistema identifica duplicidades
6. Sistema importa marcações válidas
7. Sistema separa inconsistências
8. Sistema gera relatório de importação
9. Sistema registra protocolo
10. Sistema disponibiliza marcações para tratamento

---

# Fluxos Alternativos

## FA-01 — Arquivo inválido

Sistema rejeita lote e apresenta erros.
## FA-02 — Colaborador não encontrado

Registro vai para pendência.
## FA-03 — Marcação duplicada

Sistema ignora ou marca como duplicada conforme configuração.

---

# Pós-Condições

- Marcações importadas
- Pendências registradas
- Log de importação criado

---

# Regras de Negócio Relacionadas

- Importações devem preservar origem
- Marcações duplicadas não devem gerar apontamentos duplicados
- Erros devem ser rastreáveis
- Lotes importados devem ser auditáveis

---

# Entidades Envolvidas

## TimePunchImportBatch

```text
id
source
layout
status
imported_by
imported_at
```
## TimePunchImportItem

```text
id
batch_id
employee_identifier
punch_datetime
status
error_message
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Arquivo ou payload | Obrigatório |
| Layout | Obrigatório |
| Origem | Obrigatório |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Importar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-punch-imports
```
```http
GET /api/v1/time-punch-imports/{id}
```
```http
GET /api/v1/time-punch-imports/{id}/errors
```

---

# Eventos de Domínio

```text
TimePunchImportStarted
TimePunchImportCompleted
TimePunchImportFailed
```

---

# Integrações Impactadas

- REP
- Tratamento de ponto
- Auditoria
- Folha

---

# Casos de Teste

## CT-JOR-004-001

Importar arquivo válido

Resultado esperado:

```text
Lote importado.
```
## CT-JOR-004-002

Importar layout inválido

Resultado esperado:

```text
Lote rejeitado.
```
## CT-JOR-004-003

Importar com duplicidade

Resultado esperado:

```text
Duplicidade tratada.
```

---

# Métricas

- Lotes importados
- Registros rejeitados
- Taxa de erro
- Tempo de processamento
---

# Sequenciamento no Catalogo Mestre

Este caso de uso complementa a marcacao nativa e deve ser lido depois da captura manual/online, porque incorpora eventos externos que precisam ser conciliados com a jornada vigente e com as regras de tolerancia.
