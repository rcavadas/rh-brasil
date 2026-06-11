# Checklist de Homologacao

## Objetivo

Publicar a stack do RH no Portainer de forma previsivel e validar o runtime compartilhado sem confundir com o ambiente local de desenvolvimento.

## Pre-requisitos

- Acesso ao host compartilhado `172.17.0.3`.
- Acesso ao Portainer na porta `9443`.
- Mapa de endpoints publicados em [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md).
- Stack base em [infra/docker-compose.homologation.yml](/F:/projetos/RH/infra/docker-compose.homologation.yml).
- Variáveis base em [infra/.env.homologation.example](/F:/projetos/RH/infra/.env.homologation.example).

## Ordem de subida

1. Subir `postgres`.
2. Subir `redis`.
3. Subir `keycloak`.
4. Subir `minio`.
5. Subir `api`.
6. Subir `worker`.
7. Subir `web`.

## Configuracao

- Ajustar `WEB_PUBLIC_ORIGIN` para o host publicado da homologacao.
- Ajustar `KEYCLOAK_BROWSER_URL` e `KC_HOSTNAME` para o host publicado.
- Confirmar `OIDC_ISSUER_URL` e `OIDC_JWKS_URL` apontando para o host da homologacao.
- Confirmar `CORS_ORIGINS` apenas com a origem publicada da homologacao.
- Usar [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md) para distinguir endpoint interno de endpoint publicado.
- Manter segredos fora do repositório e fora dos manifests exportados.

## Smoke minimo

1. Verificar health da `api`.
2. Verificar health do `web`.
3. Confirmar discovery do Keycloak.
4. Confirmar readiness do MinIO.
5. Autenticar com o fluxo OIDC do portal.
6. Consultar `GET /api/session`.
7. Selecionar tenant ativo.
8. Consultar `GET /api/v1/tenants/:tenantId/summary`.

## Critério de aceite

- A API responde em health.
- O portal responde em health.
- O login OIDC completa.
- O tenant ativo é carregado sem erro.
- O summary do tenant retorna dados válidos.
- O Portainer mostra a stack como saudável após a subida.

## Critério de falha

- Falha de login OIDC.
- Falha de resolução do host publicado.
- Falha de health em qualquer serviço crítico.
- Erro de conexão com Postgres, Redis, Keycloak ou MinIO.
- Divergência entre os endpoints publicados e os valores do template de homologação.

## Observacoes

- Este checklist nao substitui a validacao local em compose.
- O objetivo da homologacao e validar a stack compartilhada, nao o Docker Desktop local do Windows.
