# Sistema de RH para o Mercado Brasileiro

# Matriz Tecnica de Evolucao do Esboco

## Objetivo

Transformar o esboço funcional em uma trilha de decisão técnica, com prioridade de arquitetura, domínio e implementação.

---

# Ordem Recomendada

1. Fundação da plataforma.
2. Modelo de dados central.
3. Cadastro e vínculo do colaborador.
4. Admissão digital e eSocial.
5. Jornada, ponto e folha.
6. Benefícios, férias, 13º e rescisão.
7. SST, medicina ocupacional e compliance.
8. Portais, workflow e documentos.
9. BI, LGPD, integrações e auditoria.

---

# Tópicos e Direção Técnica

| Tópico | Direção técnica sugerida |
|---|---|
| Cadastro Corporativo e Estrutura Organizacional | Modelar empresa, filial, estabelecimento, unidade, departamento, centro de custo, lotação, cargo, função e gestor como entidades centrais com vigência e histórico. |
| Cadastro de Colaboradores | Tratar Pessoa e VinculoTrabalhista como núcleo do domínio, com dados pessoais, bancários, dependentes e documentos versionados. |
| Admissão Digital | Implementar fluxo assíncrono com checklist documental, assinatura eletrônica, contrato digital e eventos legais. |
| Gestão Contratual | Registrar alterações contratuais como eventos históricos, nunca como edição destrutiva. |
| Controle de Jornada e Ponto | Definir motor de apuração por competência com suporte a web, mobile, geolocalização, biometria e trilha de auditoria. |
| Folha de Pagamento | Separar rubricas, incidências, cálculo mensal, complementar, adiantamento, encargos e fechamento em serviços distintos. |
| Benefícios | Parametrizar elegibilidade, concessão, suspensão e integrações sem acoplamento excessivo à folha. |
| Férias | Tratar aquisição, concessão, programação e cálculo como cadeia única de estados. |
| 13º Salário | Separar avos, parcelas, adiantamentos e rescisório por competência. |
| Rescisão | Modelar desligamento como processo fechado com cálculo, documentos e transmissão governamental. |
| SST | Estruturar SST como domínio próprio com PGR, PCMSO, LTCAT, ASO, CAT, EPI e treinamentos obrigatórios. |
| Medicina Ocupacional | Organizar exames e vencimentos como agenda operacional integrada ao ciclo ocupacional. |
| Gestão de Benefícios Legais | Separar benefícios obrigatórios de benefícios corporativos, com regras e descontos próprios. |
| eSocial Completo | Criar motor de eventos com filas, reprocessamento, idempotência, recibos e conciliação. |
| FGTS Digital | Manter integração governamental própria com guias, conciliação e acompanhamento de pagamento. |
| Recrutamento e Seleção | Estruturar ATS com vaga, candidato, pipeline, entrevistas e proposta. |
| Onboarding | Usar onboarding como ponte entre recrutamento e vínculo ativo, com coleta documental e provisionamento. |
| Treinamento e Desenvolvimento | Modelar cursos, trilhas, certificados e reciclagens obrigatórias como domínio próprio. |
| Avaliação de Desempenho | Suportar 90, 180 e 360 graus, metas, competências, feedback e PDI com histórico por ciclo. |
| Gestão de Cargos e Salários | Separar estrutura de carreira, faixas, tabelas, promoção, progressão e sucessão. |
| Compliance Trabalhista | Criar motor de alertas e auditorias baseado em eventos e regras. |
| Portal do Colaborador | Priorizar autosserviço com visões restritas por perfil e finalidade. |
| Portal do Gestor | Focar em aprovações, acompanhamento de equipe e indicadores. |
| Workflow e Aprovações | Implementar motor genérico reutilizável por férias, ponto, admissão, documentos e movimentações. |
| Gestão de Documentos | Tratar documentos como entidades versionadas, assinadas e retidas por política. |
| Reembolsos e Despesas | Definir separação clara entre operacional e financeiro antes de incluir no MVP. |
| Indicadores e Analytics | Operar sobre dados agregados e, quando necessário, anonimizados. |
| LGPD | Projetar consentimento, retenção, anonimização, exportação e acesso desde o início. |
| Integrações Necessárias | Criar camada de integração orientada a eventos, com retry, DLQ, rastreabilidade e idempotência. |
| Arquitetura Recomendada para Produto SaaS | Decidir cedo sobre multi-tenant, isolamento lógico, autenticação, autorização, auditoria, filas, storage e observabilidade. |

---

# Prioridades de Decisão

## Nível 1

- Definir stack e base executável.
- Definir modelo de dados central.
- Definir isolamento multi-tenant.
- Definir autenticação e autorização.

## Tópico 1 detalhado

- [Topico 01 - Fundacao da Plataforma](TOPICO-01-FUNDACAO-DA-PLATAFORMA.md)

## Tópico 2 detalhado

- [Topico 02 - Modelo de Dados Central](TOPICO-02-MODELO-DE-DADOS-CENTRAL.md)

## Tópico 3 detalhado

- [Topico 03 - Cadastro e Vinculo do Colaborador](TOPICO-03-CADASTRO-E-VINCULO-DO-COLABORADOR.md)

## Tópico 4 detalhado

- [Topico 04 - Admissao Digital e eSocial](TOPICO-04-ADMISSAO-DIGITAL-E-ESOCIAL.md)

## Tópico 5 detalhado

- [Topico 05 - Jornada, Ponto e Folha](TOPICO-05-JORNADA-PONTO-E-FOLHA.md)

## Tópico 6 detalhado

- [Topico 06 - Beneficios, Ferias, 13o e Rescisao](TOPICO-06-BENEFICIOS-FERIAS-13E-RESCISAO.md)

## Tópico 7 detalhado

- [Topico 07 - SST, Medicina Ocupacional e Compliance](TOPICO-07-SST-MEDICINA-OCUPACIONAL-E-COMPLIANCE.md)

## Tópico 8 detalhado

- [Topico 08 - Portais, Workflow e Documentos](TOPICO-08-PORTAIS-WORKFLOW-E-DOCUMENTOS.md)

## Tópico 9 detalhado

- [Topico 09 - BI, LGPD, Integracoes e Auditoria](TOPICO-09-BI-LGPD-INTEGRACOES-E-AUDITORIA.md)

## Tópico 10 detalhado

- [Topico 10 - MVP e Base Executavel](TOPICO-10-MVP-E-BASE-EXECUTAVEL.md)

## Nível 2

- Definir recorte do MVP.
- Definir contratos de integração.
- Definir política de auditoria e retenção.
- Definir estratégia de eventos e filas.

## Nível 3

- Refinar módulos operacionais.
- Refinar dashboards e BI.
- Refinar portais e UX.
- Refinar detalhes legais e regulatórios.

---

# Sugestão de Uso

Este documento deve ser usado como roteiro para:

- discussão técnica;
- priorização de MVP;
- definição de arquitetura;
- decomposição de épicos e casos de uso;
- preparação para implementação.

---

# Atualização 2026-06-04

Os tópicos 11 e 12 foram adicionados como continuidade natural da matriz:

- [Topico 11 - Stack e Arquitetura Executavel](TOPICO-11-STACK-E-ARQUITETURA-EXECUTAVEL.md)
- [Topico 12 - Vertical Slice do Primeiro Release](TOPICO-12-VERTICAL-SLICE-PRIMEIRO-RELEASE.md)

Diretriz consolidada:

- adotar monolito modular como base inicial;
- usar TypeScript, NestJS, React, PostgreSQL, Redis, BullMQ, MinIO e Keycloak como stack recomendada;
- limitar o primeiro release a um slice ponta a ponta pequeno, mas representativo;
- manter auditabilidade, isolamento por tenant e fronteiras internas claras desde a primeira entrega.
