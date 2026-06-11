# Publicacao de Homologacao

## Objetivo

Descrever o fluxo pratico para publicar a stack do RH no Portainer usando o manifesto base de homologacao.

## Entrada

- [docs/HOMOLOGATION_CHECKLIST.md](/F:/projetos/RH/docs/HOMOLOGATION_CHECKLIST.md)
- [docs/HOMOLOGATION_SMOKES.md](/F:/projetos/RH/docs/HOMOLOGATION_SMOKES.md)
- [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md)
- [infra/docker-compose.homologation.yml](/F:/projetos/RH/infra/docker-compose.homologation.yml)
- [infra/.env.homologation.example](/F:/projetos/RH/infra/.env.homologation.example)

## Passo a passo

1. Abrir o Portainer no host `172.17.0.3`.
2. Criar ou atualizar a stack RH a partir do manifesto de homologacao.
3. Carregar as variaveis definidas em `infra/.env.homologation.example`.
4. Ajustar os campos obrigatorios do host publicado conforme [docs/HOMOLOGATION_ENDPOINT_MAP.md](/F:/projetos/RH/docs/HOMOLOGATION_ENDPOINT_MAP.md):
   - `WEB_PUBLIC_ORIGIN`
   - `KEYCLOAK_BROWSER_URL`
   - `KC_HOSTNAME`
   - `OIDC_ISSUER_URL`
   - `OIDC_JWKS_URL`
   - `CORS_ORIGINS`
5. Conferir que os volumes persistentes estao habilitados no Portainer.
6. Publicar a stack.
7. Aguardar a saude dos servicos criticos.
8. Executar o smoke minimo descrito em [docs/HOMOLOGATION_CHECKLIST.md](/F:/projetos/RH/docs/HOMOLOGATION_CHECKLIST.md).
9. Executar os smokes por servico descritos em [docs/HOMOLOGATION_SMOKES.md](/F:/projetos/RH/docs/HOMOLOGATION_SMOKES.md).

## Ordens praticas

- O manifesto base e o contrato.
- O checklist e o criterio de aceite.
- O Portainer e o mecanismo de publicacao.
- O Docker Desktop local do Windows nao faz parte desse fluxo.

## Sinal de sucesso

- A stack aparece saudavel no Portainer.
- A API responde em health.
- O portal responde em health.
- O login OIDC completa.
- O tenant ativo e o summary retornam dados validos.

## Sinal de falha

- O portal nao sobe.
- O Keycloak nao publica o issuer ou o JWKS.
- O host publicado diverge do configurado no template.
- O smoke minimo falha em qualquer etapa.
