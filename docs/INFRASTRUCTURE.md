# Infraestrutura

## Ambientes

- Local de desenvolvimento: Docker Compose com api, web, worker, postgres, redis, keycloak e minio.
- O host Docker efetivo usado para essa stack neste ambiente e `172.17.0.3`; nao tratar o Docker Desktop local do Windows como origem autoritativa da validacao.
- Homologação: prevista, ainda sem manifests locais identificados.
- Produção: prevista, ainda sem pipeline e manifests publicados no repositório.

## Docker/containers

- `apps/api/Dockerfile` sobe a API NestJS real com Prisma.
- `apps/web/Dockerfile` builda o portal React/Vite e sobe o servidor BFF do portal.
- `infra/docker-compose.yml` tambem sobe `bff-maintenance`, que executa backup, verify e limpeza de snapshots locais da store do BFF.
- `apps/worker/Dockerfile` executa o worker em Node.
- O Redis local usa `infra/redis/redis.conf`, AOF e volume `redis_data` para persistir a fila e as sessões do BFF entre reinícios.
- A plataforma local agora possui `npm run backup:platform`, `npm run restore:platform` e `npm run report:platform` para snapshot, restore e observabilidade minima do compose.

## Variáveis de ambiente

- Documentadas em `infra/.env.example`.
- Incluem `AUTH_MODE`, parâmetros OIDC, `CORS_ORIGINS`, URLs internas/externas do BFF, Redis e credenciais locais de infraestrutura.

## Secrets

- Devem permanecer fora do repositório.

## Deploy

- Não documentado para produção.
- O caminho atual valida apenas a base local em compose.

## Backup/restore

- `npm run backup:bff-sessions` exporta o snapshot das sessões do BFF para JSON, incluindo TTL restante e valores.
- `npm run restore:bff-sessions` recria o índice `rh:web:sessions` e restaura as chaves do BFF no Redis.
- O Redis local usa volume persistente com AOF; o snapshot exportado serve para restore manual ou auditoria operacional.
- `npm run backup:platform` cria um bundle local com dump do Postgres, dados do MinIO e backup das sessões do BFF.
- `npm run restore:platform` restaura o bundle da plataforma em modo seguro por padrão e só aplica alterações com `--apply`.
- `npm run lint` e `npm run typecheck` agora validam as quatro workspaces com checagens reais, e `@rh/shared` passou a concentrar helpers puros reutilizados pela operação local.

## Política Redis

- Ambiente local: Redis com `infra/redis/redis.conf`, AOF, `appendfsync everysec` e volume `redis_data`.
- Store do BFF: TTL por inatividade e expiração natural do cookie continuam sendo o limite funcional da sessão.
- Backup da store do BFF: exportação diária ou sob demanda com `npm run backup:bff-sessions`.
- Restore da store do BFF: restauração manual com `npm run restore:bff-sessions` e validação posterior em `/health` e `/api/session-store`.
- Retenção mínima recomendada para snapshots locais: 7 dias.
- Drill de restore recomendado: semanal no ambiente local ou em pipeline de validação.
- Em ambiente alvo compartilhado, o Redis da plataforma deve ter política própria de backup/restore/observabilidade; o snapshot do BFF cobre apenas a store de sessão do portal.
- A retenção local é aplicada pelo daemon `bff-maintenance`, que preserva os snapshots mais recentes definidos por `BFF_SESSION_BACKUP_RETENTION_COUNT`.
- O comando `npm run check:redis-platform` valida a política mínima do Redis do ambiente local.
- O comando `npm run report:platform` gera um snapshot de observabilidade com o status do compose e os healthchecks da API, do portal, do Keycloak e do MinIO.
- O comando `npm run test:platform` valida o contrato dos helpers de telemetria da plataforma sem depender do Docker para o parsing.
- O comando `npm run test:platform` também valida o formato do snapshot de backup da plataforma local.
- O comando `npm run test:platform` também valida o contrato de dry-run do restore da plataforma local.
- O comando `npm run test:platform` também valida a política do Redis local e a lógica de retenção/intervalo da manutenção do BFF.

## Operação agendada

- Backup diário sugerido via cron ou pipeline:
  - `npm run backup:bff-sessions`
- Verificação semanal sugerida via cron ou pipeline:
  - `npm run verify:bff-sessions`
- Operação contínua local sugerida:
  - `npm run maintenance:bff-sessions`
- Verificação da política do Redis local:
  - `npm run check:redis-platform`
- Restore de verificação recomendado em ambiente de validação antes de promover mudanças operacionais.
- O comando `verify:bff-sessions` executa backup, restauração em prefixo temporário e conferência do índice e das chaves restauradas.

## Observabilidade

- A API, o worker e o BFF agora emitem logs estruturados em JSON para eventos operacionais e falhas.
- O `@rh/api` expõe `GET /api/v1/platform/telemetry` para snapshot operacional.
- O comando `npm run check:platform-alerts` valida health do compose, health da API, health do portal, discovery do Keycloak, readiness do MinIO e a telemetria da plataforma.
- O próximo passo para a expansão de observabilidade fora do compose local continua sendo OpenTelemetry, Prometheus e Grafana.

## Atualização técnica

- Ambiente local recomendado: Docker Compose com api, web, worker, banco, redis, storage e auth.
- Ambientes previstos: local, homologação e produção.
- Secrets devem permanecer fora do repositório.
- Deploy proposto: GitHub Actions com etapa de CI em `pull_request`/`push` e fluxo manual de promocao entre ambientes via `workflow_dispatch`.
- O repositório agora contém os workflows `.github/workflows/ci.yml` e `.github/workflows/promote.yml`.
- Backup/restore devem ser testados periodicamente.
- Observabilidade local validada: logs estruturados, telemetria de plataforma, check automatizado de alertas e health do Keycloak/MinIO.
- Observabilidade proposta para o ambiente alvo: OpenTelemetry, Prometheus e Grafana.

## Checklist mínimo da próxima etapa

### Base local

- `Dockerfile` para `api`, `web` e `worker`.
- `docker-compose.yml` com `api`, `web`, `worker`, `postgres`, `redis`, `keycloak` e `minio`.
- arquivo `.env.example` com variáveis sem segredos, incluindo `AUTH_MODE`, `CORS_ORIGINS` e parâmetros OIDC.
- import local de realm em `infra/keycloak/rh-realm.json`.
- healthchecks para os serviços principais.
- banco Postgres para o slice inicial via Prisma.

### Aplicação

- bootstrap do monorepo.
- configuração de TypeScript compartilhado.
- configuração de logging estruturado.
- configuração inicial de auth e tenant.
- configuração inicial de migrations e seed.

### Operação

- pipeline de CI com lint, teste e build.
- volume persistente para banco e storage.
- estratégia mínima de backup local.
- observabilidade básica para API e worker.
- separação entre configuração local, homologação e produção.

### Status atual

- Bootstrap local executável criado para `api`, `web` e `worker` com runtime mínimo em Node.
- A stack final em TypeScript/NestJS/React já está consolidada no monorepo local.
- As dependências reais do monorepo foram instaladas e os workspaces `api`, `web` e `worker` passaram em build e typecheck.
- `api` respondeu em `http://127.0.0.1:3000/api/health` e `web` respondeu em `http://127.0.0.1:5173` em smoke test local.
- O slice inicial da API usa Prisma + PostgreSQL no código e foi validado em runtime com o Postgres do compose.
- A API já possui auth híbrida com suporte a Bearer OIDC/JWKS e fallback por headers no modo misto.
- O compose agora provisiona um realm local do Keycloak com roles e clientes iniciais.
- O portal web usa Authorization Code + PKCE com Keycloak local, e a sessão do BFF é persistida em Redis para sobreviver a reinícios.
- O BFF recarrega a sessão do Redis sob demanda quando o container reinicia e o cookie ainda existe.
- O health do portal valida Redis; se o Redis estiver indisponível, o `/health` do BFF responde como degradado.
- O endpoint `GET /api/session-store` permite checar o snapshot operacional sem depender de login.
- O BFF expõe backup e restore da store com `npm run backup:bff-sessions` e `npm run restore:bff-sessions`.
- O workspace agora também expõe `npm run verify:bff-sessions` para validar o round-trip backup/restore sem tocar na store real.
