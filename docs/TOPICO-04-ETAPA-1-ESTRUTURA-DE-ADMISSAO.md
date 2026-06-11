# Sistema de RH para o Mercado Brasileiro

# Topico 04 - Etapa 1 - Estrutura de Admissao

## Objetivo

Definir o primeiro backlog executavel de admissao digital, com foco em criar a estrutura minima rastreavel da solicitacao de admissao sem acoplar ainda o envio eSocial, o checklist documental completo ou o desligamento.

---

# Contexto

O runtime executavel atual ja possui:

- tenant;
- company;
- person;
- `Employee` como projecao operacional de `VinculoTrabalhista`;
- ponto;
- resumo;
- auditoria;
- acesso multi-tenant.

O pacote UC-ADM e o Topico 04 continuam como especificacao funcional.
Esta etapa traduz apenas a primeira fatia em backlog executavel.

## Estado De Implementacao

O backend do `@rh/api` ja implementa a solicitacao de admissao da etapa 1:

- `POST /api/v1/tenants/:tenantId/admissions`
- `GET /api/v1/tenants/:tenantId/admissions`
- `GET /api/v1/tenants/:tenantId/admissions/:admissionId`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/cancel`

O contrato minimo ja persiste rascunho, estados basicos, auditoria e cancelamento controlado.
O checklist documental minimo tambem ja entrou no runtime com:

- `GET /api/v1/tenants/:tenantId/admissions/:admissionId/checklist`
- `POST /api/v1/tenants/:tenantId/admissions/:admissionId/checklist/:checklistItemId/receive`

A admissao agora se move de `draft` para `pending_documents` e `under_review` conforme os itens sao recebidos.
Assinatura continua fora desta etapa. O desligamento administrativo minimo e a trilha minima de eSocial ja entraram no runtime como fluxos adjacentes.

---

# Escopo Da Etapa 1

## Inclui

- solicitacao de admissao;
- rascunho de admissao por tenant;
- vinculacao da admissao a `Person`, `Company` e `Employee`;
- estados basicos de fluxo;
- trilha de auditoria de criacao e transicao;
- consulta da admissao criada;
- cancelamento controlado do rascunho;
- validacao de permissao e tenant.

## Nao inclui

- checklist documental completo;
- assinatura digital;
- contrato governamental final de eSocial e sua conciliacao integral;
- persistencia de XML e recibos do contrato final;
- alteracoes cadastrais S-2205;
- alteracoes contratuais S-2206;
- desligamento administrativo completo;
- rescisao;
- offboarding.

---

# Modelo Minimo Proposto

## AdmissaoRequest

Representa a solicitacao inicial de admissao.

Campos sugeridos:

- `id`
- `tenantId`
- `personId`
- `companyId`
- `employeeId`
- `status`
- `requestedBy`
- `requestedAt`
- `createdAt`
- `updatedAt`

## AdmissaoHistory

Representa a trilha de alteracoes do fluxo.

Campos sugeridos:

- `id`
- `tenantId`
- `admissionId`
- `eventType`
- `fromStatus`
- `toStatus`
- `actor`
- `occurredAt`
- `details`

---

# Estados Minimos

- `draft`
- `under_review`
- `pending_documents`
- `ready_for_contract`
- `cancelled`

Observacao:

- o estado `completed` nao deve ser usado nesta etapa sem checklist documental e formalizacao contratual;
- `completed` so faz sentido depois que a etapa 2 e a etapa 3 estiverem implementadas.

---

# Ordem De Implementacao

## 1. Persistencia

- criar schema Prisma para a solicitacao de admissao;
- criar schema Prisma para o checklist documental minimo;
- criar migration;
- garantir escopo por tenant;
- registrar auditoria inicial.

## 2. API

- expor endpoints de criacao, consulta, listagem basica e cancelamento;
- validar permissao por perfil;
- validar tenant do token/contexto;
- impedir conflito com tenant acessivel.

## 3. Regras De Fluxo

- impedir criacao sem `Person` e `Company`;
- impedir criacao sem `Employee` associado quando o cadastro-base ja existir;
- impedir cancelamento apos transicao irreversivel;
- registrar cada mudanca de estado.

## 4. Testes

- cobrir criacao, consulta e cancelamento;
- cobrir isolamento por tenant;
- cobrir autenticao/autorizacao;
- cobrir auditoria de transicao.

## 5. Checklist documental minimo

- criar checklist inicial com documentos obrigatorios;
- registrar recebimento item a item;
- mover o fluxo para pendencia ou revisao conforme o andamento;
- registrar auditoria de recebimento e prontidao para contrato.

---

# Contrato Sugerido

## Criar admissao

```http
POST /api/v1/tenants/{tenantId}/admissions
```

## Consultar admissao

```http
GET /api/v1/tenants/{tenantId}/admissions/{admissionId}
```

## Listar admissoes

```http
GET /api/v1/tenants/{tenantId}/admissions
```

## Cancelar rascunho

```http
POST /api/v1/tenants/{tenantId}/admissions/{admissionId}/cancel
```

---

# Dependencias

- `Person` e `Company` ja persistidos;
- `Employee` ja como projeao operacional do vinculo;
- auth/RBAC hibrida ja existente;
- `tenant_access` ja materializado;
- trilha de auditoria ja existente;
- banco relacional ja validado.

---

# Riscos

- confundir a solicitacao com o contrato;
- marcar admissao como concluida sem checklist ou legalizacao;
- deixar o rascunho sem audit trail;
- permitir cruzamento entre tenants;
- introduzir status finais cedo demais.

---

# CritÃ©rios De Aceite

- admissao pode ser criada por tenant;
- admissao referencia pessoa, empresa e employee;
- o estado inicial e persistido;
- o usuario pode consultar a admissao criada;
- o cancelamento gera historico;
- o checklist minimo pode ser consultado e receber itens individualmente;
- a admissao avanca de `draft` para `pending_documents` e `under_review` conforme os itens sao recebidos;
- o fluxo nao expõe o contrato governamental final de eSocial ainda;
- o desligamento administrativo completo continua fora desta etapa.

---

# Proximo Passo

Com a etapa 1, o checklist documental minimo e a formalizacao contratual separada ja estao no runtime.
O restante da ordem tecnica segue para:

1. fila assicrona de transmissao legal;
2. desligamento administrativo;
3. evolucao contratual e aditivos quando a trilha final do eSocial entrar no fluxo;
4. desligamento administrativo completo quando sair do escopo minimo.
