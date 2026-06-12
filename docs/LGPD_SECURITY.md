# LGPD e seguranca

## Dados pessoais e sensiveis

- CPF, nome, contato e dados cadastrais aparecem como base do dominio.
- Documentos anexados, dados salariais, afastamentos, avaliacoes, saude e disciplina sao categorias de alto risco.

## Controle de acesso

- Existe matriz de perfis em documentacao e o runtime ja aplica auth/RBAC hibrida com escopo por tenant.
- Precisa haver refinamento continuo por empresa, papel e escopo para os fluxos sensiveis.

## Auditoria

- O dominio exige historico imutavel e auditoria de eventos relevantes.
- O runtime ja registra auditoria relacional para tenant, cadastro, admissao, desligamento, rescisao e outras operacoes criticas.
- As trilhas devem registrar o suficiente para rastreio sem replicar dados sensiveis desnecessarios.
- A minimizacao de dados em auditoria e logs e requisito permanente, nao um ajuste pontual.

## Logs

- Logs devem evitar CPF, salario, documentos, saude e outras informacoes sensiveis.
- O worker e o backend ja foram ajustados para reduzir detalhes operacionais em logs, mas o padrao de logging ainda precisa ser endurecido.

## Retencao e descarte

- A politica de retencao passa a ser orientada por classe de dado, finalidade, obrigacao legal/regulatoria e necessidade operacional.
- Nenhum dado deve ser mantido alem do necessario para a finalidade original, salvo quando houver obrigacao legal, ordem, auditoria autorizada ou legal hold.
- Regra base: dados operacionais ficam restritos ao ciclo de vida ativo; trilhas de auditoria mantem apenas metadados essenciais; documentos sensiveis seguem a exigencia de guarda aplicavel; dados sem necessidade atual devem ser anonimizados, bloqueados ou eliminados conforme o caso.
- Remocoes destrutivas exigem trilha, autorizacao e verificacao de que nao existe dependencia legal pendente.
- Nao existe um prazo numerico unico para todo o produto; o prazo de retencao deve ser definido por classe de dado, finalidade e base legal, com politica versionada antes da execucao.
- Classes de referencia:
  - dados cadastrais e operacionais ativos: retencao enquanto houver relacao ativa ou necessidade operacional valida;
  - trilhas de auditoria: retencao enquanto houver finalidade de rastreio, defesa, compliance ou legal hold;
  - documentos rescisorios e contratuais: retencao conforme a natureza documental e a obrigacao legal aplicavel;
  - artefatos temporarios de exportacao: retencao curta, apenas para disponibilizacao segura e descarte automatico.
- Runtime minimo atual:
  - anonimização executavel para `person` e `employee-dependent`, com trilha de auditoria;
  - aplicacao de regra de retencao persistida em `retention_rules`;
  - bloqueio de aplicacao quando `legal hold` estiver ativo.

## Exportacao de dados

- Exportacoes devem ser controladas por perfil, finalidade, escopo e janela de disponibilidade.
- Pacotes exportados devem ser gerados sob demanda, com trilha de auditoria, mascaramento do que for excessivo e expurgo automatico do artefato temporario.
- O exportador nao deve incluir secrets, tokens, credenciais, dados de saude ou outros campos nao autorizados pela finalidade.
- Formatos permitidos para exportacao operacional:
  - `json` para integracoes e portabilidade controlada;
  - `csv` para planilhas e conferencias tabulares;
  - `pdf` para evidencias humanas e dossies documentais;
  - `zip` para pacotes multiartefato.
- O formato escolhido deve respeitar o principio de minimizacao: exportar somente o necessario para a finalidade autorizada.
- Exportacoes de auditoria e dossies devem mascarar campos sensiveis quando o valor integral nao for necessario.
- Formatos e escopos finais continuam sujeitos a validacao operacional, mas o comportamento esperado ja e de exportacao controlada e rastreavel.

## Niveis de mascaramento

- `strict`: padrao para trilhas de auditoria sensiveis e exportacoes externas. Remove CPF, CNPJ, salario, dados bancarios, dados de saude, notas livres, anexos brutos, tokens, secrets e outros identificadores desnecessarios.
- `controlled`: usado quando a finalidade exige contexto operacional mais rico, como suporte juridico ou conferencias internas limitadas. Mantem nomes, ids operacionais e timestamps, mas continua ocultando dados excessivos.
- `aggregate`: usado para BI e analitica. Retorna apenas consolidados, contagens e recortes anonimizados ou agregados.

## Mapa de uso

- `UC-JOR-020` exporta espelho e trilhas de ponto com mascaramento `controlled` para espelho e comprovantes e `strict` para trilhas exportadas.
- `UC-SEC-010` exporta auditoria de acessos e operacoes com mascaramento `strict` por padrao.
- Exportacoes para BI devem usar `aggregate`.

## Riscos

- Risco alto de divergencia entre regra de produto e exigencia legal sem validacao externa.
- Risco alto de vazamento por ausencia de implementacao confirmada.
