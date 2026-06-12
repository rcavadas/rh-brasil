# Prompt recomendado para iniciar uma sessao no Codex

Leia `AGENTS.md` e siga a inicializacao obrigatoria de sessao.

Leia tambem `.codex/LOCAL_ACCESS_CONTEXT.md` antes de qualquer validacao de runtime. Esse arquivo contem o contexto local do host Docker compartilhado e do Portainer; use-o para evitar o Docker Desktop local do Windows e para escolher o container/stack corretos.

Regra obrigatoria de acesso:

1. Sempre carregar o contexto local de acesso antes de tentar qualquer validação de runtime.
2. Tratar o Docker local do workspace como ambiente de desenvolvimento.
3. Tratar `172.17.0.3` como ambiente de homologação.
4. Confirmar que ambos os ambientes estao disponiveis antes de concluir validacoes que dependam de infraestrutura.
5. Se algum acesso falhar, registrar o bloqueio no handoff e no log antes de seguir para outra frente.

Faca uma auditoria inicial do projeto inteiro sem alterar codigo.

Objetivos:

1. Mapear stack, arquitetura, modulos e fluxos principais.
2. Identificar modulos de RH existentes ou planejados.
3. Identificar documentacao existente e divergencias provaveis.
4. Identificar comandos de instalacao, teste, lint, typecheck e build.
5. Mapear riscos de LGPD, seguranca, backend, frontend/UX, dados e infraestrutura.
6. Atualizar `.codex/` e `docs/` com o que for descoberto.
7. Atualizar `.codex/HANDOFF.md` com a proxima acao recomendada.

Nao faca correcoes ainda, exceto documentacao/memoria.
