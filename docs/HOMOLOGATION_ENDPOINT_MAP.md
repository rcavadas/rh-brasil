# Mapa de Endpoints de Homologacao

## Objetivo

Mapear os placeholders usados na homologacao para os endpoints publicados pelo Portainer no host `172.17.0.3`.

## Regra geral

- O ambiente de desenvolvimento continua usando `docker compose` local.
- A homologacao usa os servicos publicados no Portainer.
- Os endpoints abaixo usam `https://<homolog-host>:<porta>` como forma padrao de publicacao.
- Substituir `<homolog-host>` pelo host ou DNS publicado na stack homologada.

## Portas publicadas de referencia

- `5173`: portal web.
- `3000`: API.
- `8080`: Keycloak.
- `9000`: MinIO API.
- `9001`: MinIO console.

## Mapa de variaveis

| Variavel | Endpoint esperado | Uso |
| --- | --- | --- |
| `WEB_PUBLIC_ORIGIN` | `https://<homolog-host>:5173` | Origem publica do portal. |
| `KEYCLOAK_BROWSER_URL` | `https://<homolog-host>:8080` | URL de navegacao do IdP para o browser. |
| `KC_HOSTNAME` | `https://<homolog-host>:8080` | Hostname publicado pelo Keycloak. |
| `OIDC_ISSUER_URL` | `https://<homolog-host>:8080/realms/rh` | Issuer OIDC do realm `rh`. |
| `OIDC_JWKS_URL` | `https://<homolog-host>:8080/realms/rh/protocol/openid-connect/certs` | JWKS usado pela API. |
| `CORS_ORIGINS` | `https://<homolog-host>:5173` | Origem permitida para o portal. |
| `API_PUBLIC_URL` | `https://<homolog-host>:3000` | Base publica da API para smokes. |
| `MINIO_PUBLIC_URL` | `https://<homolog-host>:9000` | Base publica do MinIO para readiness. |
| `MINIO_CONSOLE_URL` | `https://<homolog-host>:9001` | Console publica do MinIO. |

## Mapa de uso por documento

- `docs/HOMOLOGATION_PUBLICATION.md`: usar o mapa para preencher a stack publicada.
- `docs/HOMOLOGATION_CHECKLIST.md`: usar o mapa para validar os campos obrigatorios.
- `docs/HOMOLOGATION_SMOKES.md`: usar o mapa para substituir os placeholders de smoke.
- `docs/HOMOLOGATION_RUNBOOK.md`: usar o mapa como referencia rapida de operacao.

## Observacao operacional

- Se a stack publicar um host diferente ou usar um reverse proxy, este mapa deve ser ajustado para refletir a publicacao real.
- O arquivo serve para evitar a mistura entre endpoint interno do container e endpoint publico do ambiente.
