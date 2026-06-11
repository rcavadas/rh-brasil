# UC-ADM-003

## Consultar Histórico Cadastral

### Objetivo

Permitir a consulta completa e auditável do histórico cadastral e funcional do colaborador, incluindo alterações de dados pessoais, contratuais, organizacionais e remuneratórios ao longo de todo o vínculo empregatício.

---

# Atores

## Primários

* Analista de RH
* Assistente de RH
* Administrador do Sistema
* Auditor Interno

## Secundários

* Compliance
* Jurídico
* Auditoria Externa
* Controladoria

---

# Pré-Condições

* Colaborador cadastrado.
* Histórico existente.
* Usuário autenticado.
* Usuário autorizado para consulta.

---

# Gatilho

O processo inicia quando um usuário autorizado necessita consultar a evolução histórica dos dados de um colaborador.

---

# Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Administração de Pessoal
→ Colaboradores
→ Histórico Cadastral
```

### Etapa 2

Usuário pesquisa colaborador.

### Etapa 3

Sistema localiza cadastro.

### Etapa 4

Sistema apresenta linha do tempo completa.

### Etapa 5

Usuário aplica filtros.

### Etapa 6

Sistema exibe alterações encontradas.

### Etapa 7

Usuário seleciona evento específico.

### Etapa 8

Sistema apresenta detalhes da alteração.

### Etapa 9

Sistema exibe responsável pela alteração.

### Etapa 10

Sistema exibe data, hora e origem da alteração.

### Etapa 11

Sistema registra auditoria da consulta.

---

# Informações Consultáveis

## Dados Pessoais

* Nome
* Estado civil
* Escolaridade
* Nacionalidade
* Endereço
* Contatos

---

## Dados Contratuais

* Admissão
* Tipo de contrato
* Jornada
* Lotação
* Centro de custo

---

## Dados Organizacionais

* Cargo
* Função
* Gestor
* Unidade
* Filial

---

## Dados Remuneratórios

* Salário
* Promoções
* Progressões
* Ajustes salariais

---

## Eventos Trabalhistas

* Admissão
* Alterações contratuais
* Férias
* Afastamentos
* Rescisão

---

# Tipos de Visualização

## Linha do Tempo

Visualização cronológica completa.

---

## Histórico por Categoria

Agrupamento por tipo de informação.

---

## Comparação de Versões

Comparação entre estado anterior e atual.

---

## Auditoria

Consulta detalhada da origem das alterações.

---

# Fluxos Alternativos

## FA-01 — Colaborador não localizado

### Condição

Cadastro inexistente.

### Resultado

Sistema informa colaborador não encontrado.

---

## FA-02 — Usuário sem permissão

### Condição

Perfil sem autorização.

### Resultado

Consulta bloqueada.

---

## FA-03 — Histórico inexistente

### Condição

Nenhuma alteração registrada.

### Resultado

Sistema apresenta apenas cadastro inicial.

---

# Pós-Condições

## Sucesso

* Histórico apresentado.
* Consulta registrada em auditoria.

## Falha

* Nenhuma informação exibida.

---

# Regras de Negócio Relacionadas

* RN-0017
* RN-0018
* RN-0019
* RN-0020
* RN-0021
* RN-0022

---

# Entidades Envolvidas

## EmployeeHistory

```text
id
employee_id
event_type
event_date
changed_by
source
```

---

## EmployeeHistoryDetail

```text
id
history_id
field_name
old_value
new_value
```

---

## AuditLog

```text
id
user_id
action
entity
entity_id
created_at
```

---

# Filtros Disponíveis

| Filtro              | Obrigatório |
| ------------------- | ----------- |
| Período             | Não         |
| Tipo de Evento      | Não         |
| Usuário Responsável | Não         |
| Empresa             | Não         |
| Filial              | Não         |
| Cargo               | Não         |

---

# Permissões

| Perfil      | Consulta |
| ----------- | -------- |
| RH Admin    | Completa |
| RH Operação | Completa |
| Auditor     | Completa |
| Jurídico    | Completa |
| Gestor      | Restrita |
| Colaborador | Restrita |

---

# APIs Sugeridas

## Consultar histórico completo

```http
GET /api/v1/employees/{id}/history
```

---

## Consultar eventos

```http
GET /api/v1/employees/{id}/history/events
```

---

## Consultar detalhes

```http
GET /api/v1/employees/{id}/history/{historyId}
```

---

# Eventos de Domínio

```text
EmployeeHistoryCreated
EmployeeHistoryViewed
EmployeeChangeTracked
```

---

# Auditoria Obrigatória

O sistema deve registrar:

* Usuário consultante
* Data e hora
* Endereço IP
* Colaborador consultado
* Tipo de consulta
* Dados exportados

---

# Casos de Teste

## CT-ADM-003-001

Consultar histórico completo.

Resultado esperado:

```text
Linha do tempo exibida corretamente.
```

---

## CT-ADM-003-002

Filtrar alterações salariais.

Resultado esperado:

```text
Somente alterações remuneratórias exibidas.
```

---

## CT-ADM-003-003

Usuário sem permissão.

Resultado esperado:

```text
Acesso negado.
```

---

## CT-ADM-003-004

Exportar histórico.

Resultado esperado:

```text
Arquivo gerado e auditoria registrada.
```

---

# Métricas

* Consultas realizadas
* Consultas por usuário
* Exportações realizadas
* Consultas por colaborador
* Consultas relacionadas à auditoria
* Consultas relacionadas à LGPD
---

# Sequenciamento no Catalogo Mestre

Este caso de uso consolida a trilha de alteracoes e exportacoes do cadastro do colaborador. Ele deve vir depois da criacao, do vinculo e das atualizacoes cadastrais, porque depende do historico anterior para produzir auditoria util e rastreavel.
