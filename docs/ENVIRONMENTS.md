# Ambientes

## Objetivo

Separar explicitamente o ambiente de desenvolvimento do ambiente de homologação para evitar confusao de alvo em testes e validacoes.

## Desenvolvimento

- Base operacional: Docker local com `docker compose` dentro do workspace.
- Uso: execucao diaria, build, testes, smoke local e iteracao rapida.
- Contrato: o compose local e a referencia para desenvolvimento de codigo e validacao funcional imediata.
- Nome do projeto Compose: `rh-dev`.
- Template de variaveis: [infra/.env.development.example](/F:/projetos/RH/infra/.env.development.example).
- Comandos principais: `npm run compose:dev`, `npm run compose:dev:down` e `npm run compose:dev:ps`.
- Servicos esperados: `api`, `web`, `worker`, `postgres`, `redis`, `keycloak` e `minio`.
- Banco do DEV: `rh_app` para a API/worker e `rh_keycloak` para o Keycloak, ambos no mesmo Postgres local.

## Homologacao

- Base operacional: stack gerenciada no Portainer.
- Host operacional: `172.17.0.3`.
- Uso: smoke runtime da stack compartilhada e validacao do comportamento em ambiente mais proximo de pre-producao.
- Contrato: o Portainer e a referencia para o ambiente compartilhado, nao o Docker Desktop local do Windows.
- Template de variaveis: [infra/.env.homologation.example](/F:/projetos/RH/infra/.env.homologation.example).
- Stack base: [infra/docker-compose.homologation.yml](/F:/projetos/RH/infra/docker-compose.homologation.yml).
- Checklist: [docs/HOMOLOGATION_CHECKLIST.md](/F:/projetos/RH/docs/HOMOLOGATION_CHECKLIST.md).
- Mapa de endpoints: [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md).
- Smokes por serviço: [docs/HOMOLOGATION_SMOKES.md](/F:/projetos/RH/docs/HOMOLOGATION_SMOKES.md).
- Guia de publicacao: [docs/HOMOLOGATION_PUBLICATION.md](/F:/projetos/RH/docs/HOMOLOGATION_PUBLICATION.md).
- Runbook rapido: [docs/HOMOLOGATION_RUNBOOK.md](/F:/projetos/RH/docs/HOMOLOGATION_RUNBOOK.md).
- Comando de acesso: o smoke e operacional via Portainer no host compartilhado; nao existe comando local equivalente que substitua a homologacao.

## Regras

- Nao usar o Docker Desktop local do Windows como alvo autoritativo para smokes da stack.
- Nao misturar comando de desenvolvimento com validacao de homologacao.
- Se o objetivo for reproduzir bug ou iterar em codigo, usar o compose local.
- Se o objetivo for validar runtime compartilhado, usar o Portainer no host homologado.
