# Sistema de RH para o Mercado Brasileiro

# Topico 11 - Stack e Arquitetura Executavel

## Objetivo

Definir uma stack concreta e uma arquitetura executavel minima para transformar a especificacao documental em produto real.

---

# Decisao Sugerida

## Estilo arquitetural

Monolito modular no inicio, com fronteiras internas claras.

## Stack recomendada

- Backend: TypeScript + NestJS
- Frontend: React + Vite
- Banco principal: PostgreSQL
- Cache e fila: Redis + BullMQ
- Storage de documentos: MinIO ou storage S3 compatível
- Autenticacao e SSO: Keycloak via OIDC/OAuth2
- ORM e acesso a dados: Prisma ou equivalente com migrations controladas
- Testes: Jest, testes de integração e testes e2e
- Containers: Docker e Docker Compose
- CI/CD: GitHub Actions
- Observabilidade: OpenTelemetry, Prometheus, Grafana e logs estruturados

---

# Razoes Para A Stack

## 1. Consistencia tecnica

TypeScript unifica backend e frontend, reduzindo custo cognitivo e acelerando entrega.

## 2. Produtividade

NestJS e React permitem modularidade, testes e organização para um produto SaaS complexo.

## 3. Dominio transacional

PostgreSQL sustenta integridade, historico, vigencia e consultas relacionais fortes.

## 4. Processos assincronos

Redis e BullMQ cobrem filas, reprocessamento e tarefas de integracao.

## 5. Identidade e governanca

Keycloak cobre OIDC, OAuth2, SSO e MFA sem reinventar infraestrutura de seguranca.

## 6. Operacao

Docker, observabilidade e CI/CD permitem uma base executavel previsivel desde cedo.

---

# Estrutura Sugerida De Repositorio

## Monorepo

- `apps/api`
- `apps/web`
- `apps/worker`
- `packages/shared`
- `infra`
- `docs`

---

# Contratos Minimos

## Backend

- APIs REST versionadas;
- autenticacao e autorizacao centralizadas;
- auditoria funcional;
- eventos e filas;
- migrations e seed;
- validacao de dominio.

## Frontend

- portal do colaborador;
- portal do gestor;
- backoffice de RH;
- telas responsivas e acessiveis.

## Infraestrutura

- ambiente local via compose;
- homologacao espelhada;
- segredos fora do repositorio;
- logs estruturados;
- backup e restore planejados.

---

# Modelo De Implantacao Inicial

## Ambiente local

- API, web, banco, redis, storage e auth em compose.

## Homologacao

- mesma topologia, com configuracao de integrações sandbox.

## Producao

- isolamento tenant;
- backup;
- monitoramento;
- trilha de auditoria;
- logs centralizados.

---

# Riscos

- escolher stack excessivamente complexa;
- fragmentar o produto cedo demais em servicos separados;
- deixar auth, fila e storage para depois;
- criar dependencias sem contratos;
- perder rastreabilidade por falta de logs e auditoria;
- manter o monorepo sem fronteiras claras.

---

# Proximo Passo

Depois da stack e da arquitetura executavel, a ordem pratica deve seguir para:

1. vertical slice inicial;
2. decomposicao em tarefas;
3. inicio da implementacao.
