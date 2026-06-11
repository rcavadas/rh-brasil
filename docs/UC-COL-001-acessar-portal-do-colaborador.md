# UC-COL-001

## Acessar Portal do Colaborador

### Objetivo

Permitir que o colaborador acesse o portal com autenticacao segura, carregue o contexto ativo do tenant e visualize rapidamente suas informacoes e acoes disponiveis.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* Provedor de identidade OIDC
* BFF do portal
* Portal do Colaborador
* Auditoria

---

# Pre-condicoes

* Colaborador cadastrado e com acesso habilitado.
* Usuario autenticado ou apto a autenticar via OIDC.
* Tenant ativo disponivel para o colaborador.
* Sessao valida ou passivel de renovacao.

---

# Gatilho

O processo inicia quando o colaborador abre o portal do colaborador no navegador.

---

# Fluxo Principal

### Etapa 1

Colaborador acessa o portal do colaborador.

### Etapa 2

Sistema redireciona para autenticacao quando nao ha sessao valida.

### Etapa 3

Colaborador autentica-se no provedor de identidade.

### Etapa 4

BFF valida a sessao, o subject e o tenant ativo permitido.

### Etapa 5

Sistema carrega o contexto do colaborador, incluindo dados basicos, situacao funcional e atalhos disponiveis.

### Etapa 6

Sistema apresenta as entradas principais do portal, como dados cadastrais, holerite, ferias, banco de horas, beneficios e documentos.

### Etapa 7

Sistema registra auditoria de acesso.

---

# Fluxos Alternativos

## FA-01 - Sessao expirada

### Condicao

A sessao nao pode ser renovada.

### Fluxo

* Sistema encerra o contexto.
* Sistema redireciona para novo login.

## FA-02 - Tenant nao autorizado

### Condicao

O tenant ativo nao pertence mais ao conjunto de acessos do colaborador.

### Fluxo

* Sistema limpa o tenant ativo.
* Sistema solicita nova selecao de contexto ou novo login.

## FA-03 - Usuario sem acesso

### Condicao

O subject autenticado nao possui permissao para o portal.

### Fluxo

* Sistema bloqueia a entrada.
* Sistema registra tentativa de acesso.

---

# Pos-condicoes

* Sessao de portal estabelecida ou negada com registro de auditoria.
* Contexto de tenant validado para o colaborador.
* Portal pronto para as consultas e solicitacoes do colaborador.

---

# Regras de Negocio Relacionadas

* O portal nao pode expor tokens ao navegador.
* O tenant ativo precisa ser revalidado contra os acessos correntes.
* A entrada no portal deve gerar trilha de auditoria.
* O colaborador somente enxerga dados autorizados ao seu contexto.

---

# Entidades Envolvidas

## Person

```text
id
name
document
email
phone
```

## Employee

```text
id
person_id
company_id
tenant_id
status
```

## TenantAccess

```text
id
tenant_id
subject
role
granted_at
revoked_at
```

## PortalSession

```text
id
subject
tenant_id
expires_at
last_seen_at
```

---

# Casos Relacionados

* UC-COL-002 - Consultar Dados Cadastrais
* UC-SEC-004 - Configurar SSO
* UC-SEC-003 - Configurar MFA
* UC-PLT-004 - Configurar Isolamento de Dados
