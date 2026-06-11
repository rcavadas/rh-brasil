# Sistema de RH para o Mercado Brasileiro

# Pacote UC-SEC - LGPD, Seguranca e Governanca

## Versao

1.0

## Objetivo

Este pacote contem os casos de uso detalhados do modulo UC-SEC, cobrindo perfis, permissoes, MFA, SSO, consentimento, titular, anonimização, retencao, incidentes e auditoria.

---

# Arquivos

| Caso de Uso | Arquivo |
|---|---|
| UC-SEC-001 - Gerenciar Perfis de Acesso | UC-SEC-001-gerenciar-perfis-de-acesso.md |
| UC-SEC-002 - Gerenciar Permissoes | UC-SEC-002-gerenciar-permissoes.md |
| UC-SEC-003 - Configurar MFA | UC-SEC-003-configurar-mfa.md |
| UC-SEC-004 - Configurar SSO | UC-SEC-004-configurar-sso.md |
| UC-SEC-005 - Registrar Consentimento | UC-SEC-005-registrar-consentimento.md |
| UC-SEC-006 - Atender Solicitacao do Titular | UC-SEC-006-atender-solicitacao-do-titular.md |
| UC-SEC-007 - Anonimizar Dados | UC-SEC-007-anonimizar-dados.md |
| UC-SEC-008 - Aplicar Politica de Retencao | UC-SEC-008-aplicar-politica-de-retencao.md |
| UC-SEC-009 - Registrar Incidente de Seguranca | UC-SEC-009-registrar-incidente-de-seguranca.md |
| UC-SEC-010 - Auditar Acessos e Operacoes | UC-SEC-010-auditar-acessos-e-operacoes.md |

---

# Escopo Funcional

- Perfis de acesso
- Permissoes granulares
- MFA
- SSO
- Consentimento
- Direitos do titular
- Anonimizacao
- Retencao
- Incidentes de seguranca
- Auditoria de acessos e operacoes

---

## Analise de Sequenciamento

O `UC-SEC` e a camada transversal de seguranca, privacidade e governanca que protege todos os demais modulos. A decomposicao por casos de uso deve seguir a dependencia de identidade, controle de acesso e obrigações LGPD:

1. `UC-SEC-001` - Gerenciar Perfis de Acesso.
2. `UC-SEC-002` - Gerenciar Permissoes.
3. `UC-SEC-003` - Configurar MFA.
4. `UC-SEC-004` - Configurar SSO.
5. `UC-SEC-005` - Registrar Consentimento.
6. `UC-SEC-006` - Atender Solicitacao do Titular.
7. `UC-SEC-007` - Anonimizar Dados.
8. `UC-SEC-008` - Aplicar Politica de Retencao.
9. `UC-SEC-009` - Registrar Incidente de Seguranca.
10. `UC-SEC-010` - Auditar Acessos e Operacoes.

## Prioridade de Analise

- A primeira camada deve consolidar perfis, permissoes, MFA e SSO.
- A segunda camada deve cobrir consentimento e atendimento ao titular, que sao a base LGPD.
- A terceira camada deve tratar anonimização e retencao por finalidade.
- A quarta camada deve cobrir incidentes e auditoria operacional.
- O runtime atual ja possui uma politica base de LGPD por classe de dado, exportacao controlada e expurgo de artefatos temporarios, entao os gaps prioritarios estao na formalizacao dos fluxos e na automacao da governanca.

## Pontos de Atencao

- Perfis e permissões sao a fronteira de defesa do produto.
- MFA e SSO precisam ser coerentes com o portal e o BFF.
- Consentimento e solicitacoes do titular devem ser rastreaveis e auditaveis.
- Anonimizacao e retencao exigem finalidade, escopo e versionamento.
- Incidentes e auditoria devem preservar a trilha sem expor dados sensiveis indevidos.
