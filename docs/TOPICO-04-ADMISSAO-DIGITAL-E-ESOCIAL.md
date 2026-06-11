# Sistema de RH para o Mercado Brasileiro

# Topico 04 - Admissao Digital e eSocial

## Objetivo

Definir o fluxo de admissao digital e sua integracao com o eSocial, cobrindo coleta documental, checklist, assinatura, admissao preliminar, admissao efetiva e tratamento das rejeicoes.

---

# Contexto

O dominio ja documenta:

- cadastro-base do colaborador em `UC-ADM-001`;
- formalizacao do vinculo em `UC-ADM-005`;
- requisitos de documentos, dependentes, jornada e estrutura organizacional nas regras de negocio de admissao;
- eventos eSocial iniciais e trabalhistas nos blocos 09A e 09B.

Este tÃ³pico existe para organizar a entrada do colaborador como um processo digital auditavel, e nao como um simples cadastro.

---

# Estado Do MVP

O slice executavel atual ainda nao implementa o fluxo completo de admissao digital nem o contrato governamental final do eSocial, mas ja possui a trilha minima de transmissao assicrona da admissao.

No runtime atual, a base disponivel cobre:

- tenant;
- empresa;
- pessoa;
- `Employee` como projecao operacional do vinculo;
- ponto;
- resumo;
- auditoria;
- controle de acesso.

Admissao digital completa, assinatura, S-2205, S-2206 e desligamento administrativo completo permanecem como especificacao funcional e backlog pos-MVP.
A trilha minima de eSocial da admissao ja existe no runtime e cobre transmissao, retorno, recibo e reprocessamento por estado.

---
# PrincÃ­pio Funcional

A admissao deve ser tratada como uma jornada composta por etapas:

1. recepcao da solicitacao;
2. coleta de dados;
3. coleta documental;
4. validacao e checklist;
5. assinatura digital;
6. formalizacao do cadastro-base;
7. formalizacao do vinculo;
8. transmissao dos eventos legais;
9. tratamento de rejeicoes;
10. conclusao da admissao.

Cada etapa precisa ser rastreavel e reprocessavel.

---

# Escopo Do TÃ³pico

## Inclui

- onboarding documental da admissao;
- checklist documental;
- assinatura eletrÃ´nica ou digital;
- contrato digital como artefato;
- admissao preliminar;
- admissao efetiva;
- eventos S-2190 e S-2200;
- alteracoes cadastrais relevantes S-2205;
- alteracoes contratuais relevantes S-2206;
- armazenamento de XML, retorno e recibos;
- controle de pendencias e rejeicoes;
- auditabilidade integral.

## Nao inclui

- provisionamento de acessos;
- equipamentos;
- treinamento inicial;
- beneficios;
- folha;
- ponto;
- rescisao.

Esses itens pertencem a tÃ³picos seguintes.

---

# Fluxo Conceitual

## 1. Solicitacao de admissao

O RH ou gestor cria a intenÃ§Ã£o de admissÃ£o com base em uma vaga aprovada ou necessidade operacional.

## 2. Coleta de dados e documentos

O candidato ou futuro colaborador fornece:

- dados pessoais;
- contatos;
- documentos obrigatÃ³rios;
- dados complementares;
- dependentes, quando aplicÃ¡vel;
- informaÃ§Ãµes contratuais iniciais.

## 3. Checklist documental

O sistema valida a lista parametrizada de documentos obrigatÃ³rios por empresa, tipo de contrato e categoria.

## 4. Assinatura

O sistema registra a assinatura eletrÃ´nica do contrato e dos documentos correlatos, com trilha de auditoria.

## 5. Cadastro-base

O sistema cria o cadastro-base do colaborador, preparando os dados para a formalizaÃ§Ã£o do vÃ­nculo.

## 6. VÃ­nculo formal

O sistema formaliza o vÃ­nculo trabalhista conforme regras da empresa e do eSocial.

## 7. TransmissÃ£o ao eSocial

O sistema transmite o evento preliminar ou efetivo, conforme o estado da admissÃ£o.

## 8. Tratamento de rejeiÃ§Ãµes

Se o eSocial rejeitar o envio, o sistema deve manter a pendÃªncia, registrar motivo, permitir correÃ§Ã£o e reenvio.

---

# Eventos Legais Relevantes

## S-2190

Usado em admissao preliminar.

## S-2200

Usado em admissao efetivada.

## S-2205

Usado em alteracao cadastral relevante.

## S-2206

Usado em alteracao contratual relevante.

---

# Entidades Relevantes

- Pessoa
- Colaborador
- VinculoTrabalhista
- Documento
- Dependente
- Evento
- Competencia
- Auditoria
- XML de transmissao
- Recibo de retorno

---

# Regras De Negocio

## 1. Admissao nao conclui sem documentos obrigatorios

A lista minima deve ser parametrizavel por empresa e tipo de contrato.

## 2. Admissao preliminar e admissao efetiva sao estados distintos

S-2190 nao substitui S-2200.

## 3. O retorno do governo deve ser persistido

XML enviado, XML retornado e recibo precisam de armazenamento auditavel.

## 4. Rejeicao nao encerra o processo

Eventos rejeitados permanecem pendentes ate correcao ou descarte permitido.

## 5. Mudancas relevantes geram eventos proprios

Alteracoes cadastrais e contratuais nao devem ser reescritas sem evento de historico e sem reenvio quando aplicavel.

## 6. Nada de conclusao silenciosa

A admissao so pode ser marcada como concluida quando as exigencias internas e legais estiverem satisfeitas.

---

# Recomendacoes Tecnicas

- usar um fluxo assicrono para transmissao ao eSocial;
- desacoplar o preenchimento de dados da transmissao governamental;
- manter o contrato digital e os anexos em storage versionado;
- registrar cada transicao do fluxo como evento;
- expor status claro de pendencia, rejeicao, reenviado e concluido.

---

# Riscos

- misturar cadastro-base com envio legal;
- permitir conclusao da admissao sem retorno governamental quando exigido;
- perder motivo de rejeicao;
- sobrescrever XML e recibos em vez de versionar;
- tratar admissao preliminar como equivalente a admissao final;
- deixar o checklist documental sem parametrizacao.

---

# Fronteiras Com Outros Topicos

## Com o topico 3

- usa o cadastro-base do colaborador e a formalizacao do vinculo como base;
- nao redefine a identidade do colaborador.

## Com o topico 5

- a jornada, ponto e folha passam a operar depois da admissao consolidada.

## Com o eSocial

- os eventos de admissao e alteracao devem seguir a sequencia e a consistencia dos blocos de regras 09A e 09B;
- a trilha minima de eSocial ja esta no runtime, mas o contrato governamental final e a conciliacao completa continuam como evolucao posterior.

---

# Proximo Passo

Depois da admissao digital e eSocial, a ordem tecnica deve seguir para:

1. gestao contratual;
2. jornada, ponto e folha;
3. beneficios e ferias.
