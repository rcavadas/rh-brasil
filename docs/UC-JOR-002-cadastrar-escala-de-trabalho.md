# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-002 — Cadastrar Escala de Trabalho

### Versão

1.0

---

# Objetivo

Permitir o cadastro de escalas fixas, rotativas e personalizadas, vinculando padrões de trabalho a colaboradores ou grupos, com controle de vigência e integração com o tratamento de ponto.

---

# Atores

- Analista de RH
- Gestor
- Administrador do Sistema
- Colaborador

---

# Pré-Condições

- Jornada cadastrada
- Usuário autorizado
- Calendário corporativo configurado

---

# Gatilho

O processo inicia quando uma área precisa definir o regime de trabalho de um colaborador ou grupo.

---

# Fluxo Principal

1. Acessar Jornada e Ponto > Escalas > Nova Escala
2. Selecionar tipo de escala
3. Associar jornada base
4. Definir dias trabalhados e dias de descanso
5. Configurar feriados e exceções
6. Definir colaboradores ou grupos vinculados
7. Informar vigência
8. Salvar escala
9. Sistema valida conflitos
10. Sistema disponibiliza escala ao motor de ponto

---

# Fluxos Alternativos

## FA-01 — Escala sem jornada

Sistema bloqueia criação.
## FA-02 — Colaborador em escala conflitante

Sistema exige ajuste de vigência ou aprovação especial.
## FA-03 — Escala 12x36 inválida

Sistema bloqueia se parâmetros mínimos não forem atendidos.

---

# Pós-Condições

- Escala cadastrada
- Colaboradores vinculados
- Calendário de trabalho gerado

---

# Regras de Negócio Relacionadas

- Escalas devem possuir vigência
- Colaborador não deve ter duas escalas conflitantes na mesma data
- Trocas de escala devem manter histórico
- Escalas devem respeitar parâmetros legais e coletivos

---

# Entidades Envolvidas

## WorkScale

```text
id
name
scale_type
valid_from
valid_to
status
```
## WorkScaleAssignment

```text
id
scale_id
employee_id
valid_from
valid_to
```
## WorkScaleDay

```text
id
scale_id
date
expected_work
work_schedule_id
```

---

# Campos Principais

| Item | Descrição |
|---|---|
| Tipo de escala | Obrigatório |
| Jornada base | Obrigatório |
| Vigência | Obrigatório |
| Colaboradores | Opcional |

---

# Permissões

| Item | Descrição |
|---|---|
| RH Admin | Total |
| RH Operação | Criar e editar |
| Gestor | Solicitar |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/work-scales
```
```http
GET /api/v1/work-scales/{id}
```
```http
POST /api/v1/work-scales/{id}/assignments
```

---

# Eventos de Domínio

```text
WorkScaleCreated
WorkScaleAssigned
WorkScaleChanged
```

---

# Integrações Impactadas

- Ponto
- Portal do Gestor
- Folha
- Banco de Horas

---

# Casos de Teste

## CT-JOR-002-001

Cadastrar escala 5x2

Resultado esperado:

```text
Escala criada.
```
## CT-JOR-002-002

Vincular colaborador com conflito

Resultado esperado:

```text
Sistema alerta conflito.
```
## CT-JOR-002-003

Encerrar escala

Resultado esperado:

```text
Vigência final registrada.
```

---

# Métricas

- Escalas ativas
- Colaboradores por escala
- Trocas de escala por período
---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois da jornada, porque organiza a aplicacao operacional da carga horaria sobre grupos, turnos e vigencias no controle de ponto.
