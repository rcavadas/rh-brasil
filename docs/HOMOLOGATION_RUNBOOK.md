# Runbook de Homologacao

## Objetivo

Dar um caminho curto para publicar, validar e diagnosticar a stack de homologacao no Portainer sem precisar recompor toda a trilha documental.

## Quando usar

- Quando a stack precisa ser publicada ou revalidada rapidamente.
- Quando houver incidente em homologacao e for preciso identificar o ponto de falha.
- Quando a homologacao estiver saudavel, mas precisar de uma confirmacao de rotina.

## Entrada

- [docs/HOMOLOGATION_PUBLICATION.md](/F:/projetos/RH/docs/HOMOLOGATION_PUBLICATION.md)
- [docs/HOMOLOGATION_CHECKLIST.md](/F:/projetos/RH/docs/HOMOLOGATION_CHECKLIST.md)
- [docs/HOMOLOGATION_SMOKES.md](/F:/projetos/RH/docs/HOMOLOGATION_SMOKES.md)
- [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md)
- [infra/docker-compose.homologation.yml](/F:/projetos/RH/infra/docker-compose.homologation.yml)
- [infra/.env.homologation.example](/F:/projetos/RH/infra/.env.homologation.example)

## Sequencia curta

1. Abrir o Portainer em `172.17.0.3:9443`.
2. Confirmar que a stack RH existe e esta ativa.
3. Confirmar os endpoints publicados e as variaveis da stack.
4. Usar o mapa de endpoints em [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md).
5. Verificar `postgres`, `redis`, `keycloak` e `minio`.
6. Verificar `api` e `web`.
7. Executar o login OIDC.
8. Confirmar `GET /api/session`.
9. Confirmar `GET /api/v1/tenants/:tenantId/summary`.
10. Executar `npm run smoke:sst` para validar a trilha basal de SST.

## Diagnostico rapido

### Se a stack nao sobe

- Verificar variaveis obrigatorias.
- Verificar portas publicadas.
- Verificar volumes persistentes.
- Verificar imagens e build da stack.

### Se o login OIDC falha

- Verificar `WEB_PUBLIC_ORIGIN`.
- Verificar `KEYCLOAK_BROWSER_URL`.
- Verificar `KC_HOSTNAME`.
- Verificar `OIDC_ISSUER_URL` e `OIDC_JWKS_URL`.

### Se a API nao responde

- Verificar health do `api`.
- Verificar conexao com `postgres` e `redis`.
- Verificar `CORS_ORIGINS`.

### Se o portal nao responde

- Verificar health do `web`.
- Verificar `WEB_REDIS_URL`.
- Verificar sessao e cookie HttpOnly.

### Se o smoke de SST falha

- Verificar `API_PUBLIC_URL`.
- Verificar se a stack `rh` ainda esta ativa no endpoint `10`.
- Reexecutar `npm run smoke:sst` e comparar o tenant retornado com a ultima execucao.
- Se o erro for de retry de eSocial SST, revisar o recurso pai informado na rota.
- Se precisar reproduzir o ramo de retry com transmissao falha, usar o endpoint `POST /api/v1/tenants/:tenantId/sst/{environments|cats|exams}/:subjectId/esocial-transmissions/:transmissionId/mark-failed` antes do retry.

## Decisao

- Se o problema e de publicacao, voltar para [docs/HOMOLOGATION_PUBLICATION.md](/F:/projetos/RH/docs/HOMOLOGATION_PUBLICATION.md).
- Se o problema e de validacao, voltar para [docs/HOMOLOGATION_CHECKLIST.md](/F:/projetos/RH/docs/HOMOLOGATION_CHECKLIST.md).
- Se o problema e de detalhe por servico, voltar para [docs/HOMOLOGATION_SMOKES.md](/F:/projetos/RH/docs/HOMOLOGATION_SMOKES.md).
