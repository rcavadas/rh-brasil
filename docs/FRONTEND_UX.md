# Frontend e UX

## Stack

`@rh/web` usa React + Vite, mas roda apoiado por um BFF no mesmo processo de entrega. O navegador fala com o proprio portal, que faz login no Keycloak local, mantém a sessao em cookie HttpOnly e injeta a autenticacao nas chamadas ao backend.

## Fluxos principais

- A documentacao cobre recrutamento, admissao, cadastro, ponto, ferias, beneficios, avaliacao, desligamento, portal do colaborador e portal do gestor.
- A interface atual destaca o tenant ativo, lista tenants acessiveis via `GET /api/v1/tenants/me/access` e permite alternar o contexto sem expor tokens ao browser.
- A tela de contexto autentica no Keycloak local, o BFF troca o `code` por token, carrega os tenants acessiveis e exibe orientacao para o grant `POST /api/v1/tenants/:tenantId/access-grants` quando nao houver tenant disponivel.
- A sessao do portal renova automaticamente no servidor antes do vencimento, expira por inatividade configurada no Redis, recarrega o contexto apos restart do BFF e usa logout com redirecionamento para o IdP local quando o usuario encerra a sessao.
- Os tokens OIDC ficam no servidor; o navegador recebe apenas cookie HttpOnly e o contexto de tenant ativo.
- O portal agora tem um workspace operacional que resume colaborador, gestor, documentos, excecoes e trilha de workflow a partir do contexto ativo.
- O workspace consulta admissoes, desligamentos, offboardings, rescissoes, monitoramento de integracoes, comprovante de ponto e snapshot contratual recente sem exigir navegacao para telas separadas.
- O workspace tambem mostra uma visao de BI/LGPD/auditoria com headcount, pressao de fluxo, auditoria, integracoes e politica de exportacao do tenant ativo.
- O workspace tambem expõe uma trilha de roadmap para os dominios complementares da Onda 6, deixando a sequencia de expansao visivel no portal.

## Componentes

- Hero de contexto.
- Painel de conexao com Keycloak local via BFF.
- Lista de tenants acessiveis.
- Cartoes de resumo com tenant ativo, persistencia de contexto no Redis, timeout por inatividade e operacao por grant.
- Workspace do portal com cards de colaborador, gestor, documentos, excecoes e timeline de workflow.

## Estados de tela

- Sessao inativa.
- Login em processamento.
- Carregando sessao e tenants acessiveis.
- Renovando sessao no servidor.
- Lista vazia sem grant ou sem token.
- Tenant ativo selecionado.
- Erro de carregamento da lista de tenants.
- Workspace carregando dados do tenant ativo.
- Workspace pronto com trilha operacional e documentos recentes.
- Workspace pronto com indicadores de BI e sinais de LGPD/auditoria.
- Workspace pronto com roadmap da Onda 6.

## Acessibilidade

- O login usa redirecionamento OIDC e evita captura manual de senha ou token.
- O portal tenta renovar a sessao antes do vencimento no servidor, atualiza o uso ativo para manter o timeout e repete a chamada de tenant em caso de `401` no proxy.
- O refresh token nao fica persistido no navegador; o cookie HttpOnly reduz a exposicao a scripts.
- O health do portal reflete o estado do Redis e ajuda a detectar indisponibilidade do store de sessao.
- O endpoint GET /api/session-store serve como snapshot operacional para diagnosticar drift entre indice, memoria e persistencia.
- Os tenants sao apresentados como botoes acionaveis com indicacao visual do tenant ativo.
- O layout responsivo reduz a dificuldade de selecao em telas menores.
- O workspace usa cards e timeline responsivos para manter o contexto de RH legivel tanto em desktop quanto em telas menores.
- A faixa de BI usa os mesmos cards responsivos para destacar headcount, risco de workflow e sinais de exportacao/retencao.
- O roadmap da Onda 6 usa a timeline existente para manter a sequencia de expansao legivel sem introduzir interacao destrutiva.

## Pontos de melhoria

- Definir navegacao persistente apos o tenant ativo ser escolhido.
- Expor o tenant ativo em rotas e barras de contexto quando o portal crescer.
- Priorizar formularios longos, mascaras brasileiras e prevencao de acoes destrutivas.
- Evoluir o workspace para acoes operacionais diretas quando o motor de workflow ganhar contratos mais ricos.
- Evoluir os painéis de BI para consultas agregadas e exportacoes versionadas por finalidade.
- Evoluir a Onda 6 para virar dominio funcional, e nao apenas roadmap, quando os modelos e contratos ficarem prontos.




