# Prompt recomendado para encerrar uma sessão no Codex

Leia `AGENTS.md` e encerre a sessão atual preservando contexto.

Atualize obrigatoriamente:

1. `.codex/MEMORY.md`
   - fatos consolidados sobre o projeto;
   - stack real;
   - decisões já tomadas;
   - padrões encontrados;
   - restrições conhecidas.

2. `.codex/HANDOFF.md`
   - resumo curto da sessão;
   - estado atual;
   - arquivos alterados;
   - validações executadas;
   - problemas encontrados;
   - próxima ação recomendada.

3. `.codex/TASKS.md`
   - tarefas concluídas;
   - tarefas pendentes;
   - prioridades;
   - bloqueios.

4. `.codex/OPEN_QUESTIONS.md`
   - dúvidas não resolvidas;
   - hipóteses que precisam de validação.

5. `docs/SESSION_LOG.md`
   - entrada cronológica da sessão.

6. `docs/RISKS.md`
   - novos riscos, pontos de quebra ou alertas.

Não altere código nesta etapa, exceto documentação/memória.
Ao final, mostre um resumo em formato de handoff para a próxima sessão.
