# Sistema de RH para o Mercado Brasileiro

# Topico 09 - BI, LGPD, Integracoes e Auditoria

## Objetivo

Definir a camada transversal de analise, privacidade, integracao e auditoria do produto, garantindo que dados operacionais possam ser consumidos com governanca e rastreabilidade.

---

# Contexto

O produto ja possui pacotes e regras para:

- BI;
- LGPD, seguranca e governanca;
- integracoes e APIs;
- plataforma SaaS;
- auditoria de eventos em diversos modulos.

Este tópico consolida a camada transversal que permite operar o produto com confianca, sem vazar dados nem perder historico.

---

# Principio Central

Dados de RH nao podem ser consumidos de forma crua e desgovernada.

O sistema precisa garantir:

- agregacao;
- anonimização quando aplicavel;
- controle de acesso;
- auditabilidade;
- contratos de integracao;
- rastreabilidade de eventos;
- observabilidade operacional.

---

# Escopo Do Tópico

## Inclui

- indicadores e analytics;
- BI operacional e executivo;
- LGPD;
- consentimento;
- direitos do titular;
- retencao;
- anonimização;
- controles de acesso;
- integracoes e APIs;
- webhooks;
- eventos;
- monitoramento;
- auditoria funcional e tecnica;
- exportacoes autorizadas.

## Nao inclui

- calculos de folha;
- admissao;
- jornada;
- SST;
- portais;
- workflow.

---

# Fluxo Conceitual

## 1. Coleta e consolidação

Eventos e dados operacionais são consolidados em camadas aptas para analise.

## 2. BI e indicadores

As consultas priorizam headcount, turnover, absenteísmo, custos, recrutamento, treinamento, desempenho e SST.

## 3. LGPD

Consentimento, retenção, anonimização, exportação e direitos do titular são controlados por política.

## 4. Integracoes

APIs, webhooks e eventos trocam dados com sistemas externos por contratos claros.

## 5. Auditoria

Todo acesso, consulta, exportação, transmissão e reprocessamento relevante deixa trilha.

---

# Entidades Relevantes

- Indicador
- DashBoard
- PoliticaLGPD
- Consentimento
- SolicitaçãoDoTitular
- EventoDeIntegracao
- Webhook
- API
- LogDeAuditoria
- ExportacaoAutorizada

---

# Regras De Negocio

## 1. BI opera sobre dados controlados

Relatórios e dashboards devem respeitar agregação e escopo de acesso.

## 2. LGPD e politica transversal

Consentimento, retenção, anonimização e exportação devem ser políticas do produto, nao improvisos de tela.

## 3. Integração é contrato

Toda integração precisa de idempotência, rastreabilidade, reprocessamento e status.

## 4. Auditoria é permanente

A trilha deve cobrir operação humana e integração máquina-a-máquina.

## 5. Exportação requer finalidade

Não existe exportação livre de dados de RH sem justificativa, escopo e autorização.

---

# Recomendacao Tecnica

- operar BI sobre views/agregações e não sobre dados soltos;
- anonimizar quando o caso exigir;
- separar log tecnico de auditoria funcional;
- adotar contratos de integração com versionamento;
- manter DLQ, retry e monitoramento;
- registrar origem, destino e finalidade das trocas.

---

# Riscos

- expor dados pessoais em dashboards;
- confundir log técnico com trilha de auditoria;
- integrar sistemas sem contrato estável;
- perder rastreabilidade de exportações;
- descumprir LGPD por excesso de acesso;
- misturar métricas operacionais e dados sensíveis.

---

# Relacao Com Outros Tópicos

## Com o tópico 8

- portais e workflow geram eventos e dados de uso para BI e auditoria.

## Com o tópico 1

- a fundação precisa prever observabilidade, eventos e governanca desde o início.

## Com o tópico 6

- benefícios, férias, 13o e rescisão alimentam indicadores e relatórios controlados.

---

# Proximo Passo

Depois de BI, LGPD, integracoes e auditoria, a ordem tecnica deve seguir para:

1. consolidacao tecnica final do MVP;
2. definicao da base executavel;
3. decomposicao em épicos e implementacao.
