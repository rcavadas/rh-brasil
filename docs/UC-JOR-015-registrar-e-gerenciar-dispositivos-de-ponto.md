# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-JOR-015 - Registrar e Gerenciar Dispositivos de Ponto

### Versao

1.0

---

# Objetivo

Permitir o cadastro, a manutencao, a ativacao, a inativacao e o rastreamento de dispositivos de ponto utilizados para registro de marcacoes, incluindo terminais fisicos, aplicativos, leitores, quiosques ou outros pontos de captura autorizados, garantindo controle de origem, vigencia, confiabilidade e auditoria.

Baseline operacional:

- a primeira versao admite terminal fisico, aplicativo mobile, web/kiosk e integrações de captura autorizadas;
- captura offline, geolocalizacao, biometria e imagem sao opcionais e dependem de politica de seguranca e privacidade;
- o dispositivo deve sempre ter identificacao unica, abrangencia e vigencia;
- mudancas de configuracao exigem historico e rastreabilidade.

---

# Atores

- Analista de RH
- Administrador do Sistema
- Gestor
- Auditor
- Suporte/TI

---

# Pre-condicoes

- Empresa configurada.
- Usuario autenticado.
- Usuario com permissao para administrar dispositivos.
- Politica corporativa de dispositivos definida.
- Integracao ou canal de captura disponivel quando aplicavel.

---

# Gatilho

O processo inicia quando a empresa precisa cadastrar um novo dispositivo de ponto, substituir um dispositivo existente, suspender seu uso ou revisar sua configuracao para fins operacionais e de auditoria.

---

# Fluxo Principal

1. Usuario acessa Jornada e Ponto > Dispositivos > Novo Dispositivo.
2. Sistema apresenta o formulario de cadastro.
3. Usuario informa identificacao, tipo, fabricante/modelo quando aplicavel e finalidade de uso.
4. Usuario define a empresa, filial, localidade ou equipe a que o dispositivo se vincula.
5. Usuario informa dados de rede, credenciais de integracao ou parametros de autenticacao quando aplicavel.
6. Usuario define vigencia e status inicial.
7. Usuario informa se o dispositivo permite captura offline, geolocalizacao, biometria ou imagem quando suportado.
8. Sistema valida unicidade da identificacao interna.
9. Sistema valida conflitos com outros dispositivos ativos na mesma abrangencia.
10. Usuario confirma o cadastro.
11. Sistema grava o dispositivo e registra a versao inicial.
12. Sistema associa o dispositivo ao motor de ponto quando habilitado.
13. Sistema registra auditoria da criacao.

---

# Fluxos Alternativos

## FA-01 - Identificacao duplicada

Sistema bloqueia o salvamento e informa a duplicidade.

## FA-02 - Dispositivo em conflito

Sistema solicita ajuste de abrangencia, vigencia ou status.

## FA-03 - Usuario sem permissao

Sistema bloqueia o acesso e registra tentativa de operacao.

## FA-04 - Dispositivo sem integracao valida

Sistema permite cadastro em modo pendente ou bloqueia conforme politica.

---

# Pos-condicoes

- Dispositivo registrado.
- Vigencia e status controlados.
- Origem das marcacoes rastreavel.
- Auditoria registrada.

---

# Regras de Negocio Relacionadas

- Todo dispositivo deve possuir identificacao unica por empresa.
- Todo dispositivo deve possuir tipo e finalidade de uso.
- Dispositivos inativos nao podem receber novas marcacoes.
- Mudancas de configuracao devem manter historico.
- O dispositivo deve ser associado a uma abrangencia operacional clara.
- A origem de cada marcacao deve permanecer rastreavel ao dispositivo utilizado.
- Regras de geolocalizacao, biometria e captura offline devem respeitar politica de seguranca e privacidade.

---

# Entidades Envolvidas

## TimeSheetDevice

```text
id
company_id
device_code
device_type
name
scope_type
scope_reference
valid_from
valid_to
status
supports_offline_capture
supports_geolocation
supports_biometry
supports_image
integration_status
created_at
created_by
updated_at
updated_by
```

## TimeSheetDeviceHistory

```text
id
device_id
change_type
changed_by
changed_at
snapshot
```

---

# Campos Principais

| Item | Descricao |
|---|---|
| Codigo do dispositivo | Obrigatorio |
| Tipo | Obrigatorio |
| Abrangencia | Obrigatorio |
| Vigencia | Obrigatorio |

---

# Permissoes

| Item | Descricao |
|---|---|
| RH Admin | Total |
| RH Operacao | Criar e editar |
| Suporte/TI | Apoio tecnico |
| Gestor | Consulta |
| Auditor | Consulta |

---

# APIs Sugeridas

```http
POST /api/v1/time-sheet-devices
```

```http
GET /api/v1/time-sheet-devices/{id}
```

```http
PUT /api/v1/time-sheet-devices/{id}
```

```http
PATCH /api/v1/time-sheet-devices/{id}/inactivate
```

---

# Eventos de Dominio

```text
TimeSheetDeviceCreated
TimeSheetDeviceUpdated
TimeSheetDeviceActivated
TimeSheetDeviceInactivated
TimeSheetDeviceAssociationChanged
```

---

# Integracoes Impactadas

- Ponto
- Registro de marcacoes
- Importacao de ponto
- Tratamento de inconsistencias
- Auditoria
- LGPD e seguranca
- Workflow

---

# Casos de Teste

## CT-JOR-015-001

Cadastrar terminal de ponto valido.

Resultado esperado:

```text
Dispositivo criado com sucesso.
```

## CT-JOR-015-002

Cadastrar dispositivo com codigo duplicado.

Resultado esperado:

```text
Sistema bloqueia a gravacao.
```

## CT-JOR-015-003

Inativar dispositivo em uso.

Resultado esperado:

```text
Dispositivo inativado e novas marcacoes bloqueadas.
```

---

# Metricas

- Dispositivos ativos por empresa
- Dispositivos por tipo
- Inativacoes por periodo

---

# Observacoes Arquiteturais

O dispositivo de ponto deve ser tratado como inventario auditavel e versionado, com vinculo claro entre a marcacao e sua origem.

Capturas offline, biometria e geolocalizacao nao devem ser presumidas como disponiveis em todos os dispositivos; a regra deve ser declarada e testavel por equipamento.
---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a base operacional do ponto antes da marcação e da importação. Ele deve ser lido depois da configuracao de jornada, escala, calendario e tolerancia, porque os dispositivos precisam obedecer a politica vigente do tenant.
