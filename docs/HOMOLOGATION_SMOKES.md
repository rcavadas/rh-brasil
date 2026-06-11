# Smokes de Homologacao

## Objetivo

Validar a stack publicada no Portainer por servico, com comandos e criterios claros de sucesso.

## Base

- [docs/HOMOLOGATION_CHECKLIST.md](/F:/projetos/RH/docs/HOMOLOGATION_CHECKLIST.md)
- [docs/HOMOLOGATION_PUBLICATION.md](/F:/projetos/RH/docs/HOMOLOGATION_PUBLICATION.md)
- [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md)
- [infra/docker-compose.homologation.yml](/F:/projetos/RH/infra/docker-compose.homologation.yml)
- [infra/.env.homologation.example](/F:/projetos/RH/infra/.env.homologation.example)

## Services

### Postgres

- Comando:
  - `pg_isready -U rh -d rh`
- Validação esperada:
  - resposta `accepting connections`
  - container em `healthy` no Portainer

### Redis

- Comando:
  - `redis-cli ping`
- Validação esperada:
  - resposta `PONG`
  - container em `healthy` no Portainer

### Keycloak

- Comando:
  - `curl -fsS <KEYCLOAK_BROWSER_URL>/realms/rh/.well-known/openid-configuration`
- Validação esperada:
  - JSON de discovery OIDC disponível
  - issuer e JWKS apontando para a homologacao

### MinIO

- Comando:
  - `curl -fsS <MINIO_PUBLIC_URL>/minio/health/ready`
- Validação esperada:
  - resposta de readiness positiva
  - serviço pronto para o portal e a API

### API

- Comando:
  - `curl -fsS <API_PUBLIC_URL>/api/health`
  - `curl -fsS <API_PUBLIC_URL>/api/v1/platform/telemetry`
- Validação esperada:
  - `status: ok` no health
  - telemetria operacional disponível

### Web

- Comando:
  - `curl -fsS <WEB_PUBLIC_URL>/health`
- Validação esperada:
  - `status: ok` ou `degraded` apenas quando o Redis do portal estiver indisponível
  - `GET /api/session` acessível após login

### Fluxo OIDC

- Comando:
  - abrir `<WEB_PUBLIC_URL>` no navegador
  - executar login com o IdP publicado da homologacao
- Validação esperada:
  - redirecionamento para o portal sem loop de autenticação
  - cookie HttpOnly emitido pelo BFF
  - tenant ativo carregado após a sessão

## Ordem recomendada

1. `postgres`
2. `redis`
3. `keycloak`
4. `minio`
5. `api`
6. `web`
7. fluxo OIDC no navegador

## Criterio de aceite

- Todos os services críticos respondem.
- O discovery OIDC está disponível.
- O portal abre e autentica.
- O tenant ativo é carregado.
- O summary do tenant responde.

## Criterio de falha

- Health indisponível.
- Discovery OIDC indisponível.
- O login OIDC falha ou entra em loop.
- O portal não consegue acessar a API.
- O tenant ativo não é carregado.

## Observacao

- Substituir os placeholders `<KEYCLOAK_BROWSER_URL>`, `<MINIO_PUBLIC_URL>`, `<API_PUBLIC_URL>` e `<WEB_PUBLIC_URL>` pelos endpoints publicados no Portainer.
- Substituir os placeholders usando o mapa em [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md) para evitar misturar endpoint interno e endpoint publicado.
