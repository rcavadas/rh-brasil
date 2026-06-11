# Sistema de RH para o Mercado Brasileiro

# Topico 13 - Backlog Pos-MVP e Decomposicao em Tarefas de Implementacao

## Objetivo

Transformar o recorte ja fechado do MVP em uma trilha executavel de implementacao para as proximas ondas do produto, sem confundir backlog pos-MVP com o primeiro slice ja validado.

---

## Contexto

O MVP ja esta consolidado nos topicos 10, 11 e 12 e o runtime atual ja executa o slice inicial do produto.

O que segue agora nao e mais definicao de MVP. E detalhamento de implementacao, priorizacao e expansao por ondas controladas.

---

## Principio de ordenacao

1. fechar o que faz o slice inicial ficar operavel e auditavel;
2. estabilizar integracoes e governanca transversal;
3. expandir os dominios complementares por ondas pequenas;
4. evitar backlog solto sem uma sequencia clara de entrega.

---

## O que ja esta no runtime

- tenant, empresa, pessoa, colaborador e vinculo operacional;
- admissao com checklist, formalizacao contratual e eSocial minimo;
- desligamento administrativo minimo, offboarding minimo e eSocial de desligamento minimo;
- rescisao minima com memoria de calculo, documentos assinaveis e prazo de pagamento;
- BFF do portal com Redis, backup e restore operacionais;
- auth OIDC/hibrida com tenant_access;
- auditoria relacional e minimizacao de dados sensiveis.

---

## Ondas de implementacao pos-MVP

### Onda 1 - Fechamento do pacote de ponto

Objetivo: deixar o conjunto UC-JOR 013 a 020 pronto para uso consistente no fluxo principal.

Tarefas:

- consolidar calendario de feriados e excecoes por empresa e localidade;
- consolidar tolerancias de ponto por empresa, jornada e perfil;
- validar e rastrear dispositivos de ponto;
- padronizar comprovante de marcacao com mascaramento adequado;
- fechar o adicional noturno com baseline legal e politica versionada;
- fechar DSR e descanso semanal com politica por configuracao;
- consolidar eventos de ponto para folha por mapeamento versionado;
- manter exportacao de espelho e trilhas com mascaramento por finalidade.

### Onda 2 - Integracoes e contratos externos

Objetivo: transformar integracoes documentadas em contratos operacionais claros.

Tarefas:

- detalhar contratos de eSocial para admissao e desligamento completo;
- formalizar integrações com folha;
- formalizar integrações com ERP;
- formalizar integrações com banco;
- formalizar integrações com operadora de beneficios;
- formalizar integracoes com provedor de identidade;
- detalhar monitoramento, retentativas, DLQ e idempotencia por integracao.

### Onda 3 - Plataforma e governanca

Objetivo: endurecer a camada transversal de SaaS.

Tarefas:

- fechar politica operacional do Redis do ambiente alvo;
- formalizar estrategia de backup, restore e observabilidade da plataforma;
- consolidar isolamento multi-tenant em runtime e em carga;
- fechar pipeline de CI/CD e promocao entre ambientes;
- definir estrategia de logs, telemetria e alertas.

### Onda 4 - Portais e workflow

Objetivo: evoluir as superficies de uso e os processos transversais.

Tarefas:

- evoluir portal do colaborador com foco em autosservico e documentos;
- evoluir portal do gestor com aprovacoes e visao de equipe;
- detalhar workflow generico para aprovacoes e trilhas de excecao;
- detalhar gestao documental com retenção e mascaramento;
- fechar UX de formularios longos, tabelas e estados vazios.

### Onda 5 - BI, LGPD e auditoria ampliada

Objetivo: expandir analitica e governanca sem expor dados desnecessarios.

Tarefas:

- fechar consumo analitico por dados agregados;
- detalhar exportacoes autorizadas por finalidade;
- detalhar mascaramento por nivel e por caso de uso;
- reforcar auditoria de consulta, exportacao e alteracao sensivel;
- manter politica de retencao por classe de dado e finalidade.

### Onda 6 - Dominios complementares

Objetivo: expandir o produto apos estabilizar o nucleo principal.

Tarefas:

- beneficios completos;
- ferias completas;
- 13o completo;
- SST completo;
- medicina ocupacional;
- avaliacao de desempenho;
- recrutamento e selecao completo;
- LMS;
- reembolsos e despesas;
- compliance avancado.

---

## Criterios de passagem entre ondas

- o runtime atual da onda anterior precisa estar validado;
- a documentacao deve refletir o comportamento executavel;
- riscos e excecoes precisam estar registrados;
- o backlog nao pode avançar sem manter o tenant, a auditoria e a rastreabilidade.

---

## Resultado esperado

Este documento substitui a ideia abstrata de "backlog pos-MVP" por uma sequencia de entrega legivel, priorizada e evolutiva.
