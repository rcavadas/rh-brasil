# Kit Codex para sistema de RH corporativo

## Instalação

Descompacte este pacote na raiz do projeto.

```bash
unzip codex-hr-starter.zip
```

## Uso interativo recomendado

```bash
codex
```

Dentro da sessão, envie:

```txt
Leia AGENTS.md e inicialize a sessão usando .codex/SESSION_START_PROMPT.md
```

Se a sessão envolver runtime, garanta que `.codex/LOCAL_ACCESS_CONTEXT.md` seja lido antes de qualquer validação.

Para checagem rápida dos acessos de desenvolvimento e homologação, use `scripts/session-access-check.ps1`.

Para encerrar:

```txt
Encerre a sessão preservando memória usando .codex/SESSION_END_PROMPT.md
```

## Uso direto por comando

```bash
codex "$(cat .codex/SESSION_START_PROMPT.md)"
```

```bash
codex "$(cat .codex/SESSION_END_PROMPT.md)"
```

## Aliases opcionais

Bash ou ZSH:

```bash
alias cx='codex'
alias cx-start='codex "$(cat .codex/SESSION_START_PROMPT.md)"'
alias cx-end='codex "$(cat .codex/SESSION_END_PROMPT.md)"'
```

## Regra principal

A memória do projeto fica no repositório, não na sessão do Codex. Sempre atualize `.codex/` e `docs/` antes de encerrar.
