# Prompt recomendado para iniciar uma sessao no Codex

Leia `AGENTS.md` e siga a inicializacao obrigatoria de sessao.

Se existir, leia tambem `.codex/LOCAL_ACCESS_CONTEXT.md` antes de qualquer validacao de runtime. Esse arquivo contem o contexto local do host Docker compartilhado e do Portainer; use-o para evitar o Docker Desktop local do Windows e para escolher o container/stack corretos.

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
