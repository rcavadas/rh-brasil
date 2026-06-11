# Sistema de RH para o Mercado Brasileiro

# Topico 08 - Portais, Workflow e Documentos

## Objetivo

Definir a camada de experiencia e operacao do produto: portal do colaborador, portal do gestor, workflow de aprovacoes e gestao documental.

---

# Contexto

O repositorio ja documenta:

- portal do colaborador;
- portal do gestor;
- workflow e aprovacoes;
- gestao documental e assinaturas.

Este tópico organiza esses blocos como uma plataforma de autosservico, aprovacao e prova documental.

---

# Principio Central

Os portais e o workflow nao sao interfaces isoladas.

Eles devem operar como uma camada de transacao humana sobre os processos de RH:

- consulta;
- solicitacao;
- aprovacao;
- assinatura;
- evidencia;
- rastreio;
- notificacao.

---

# Escopo Do Tópico

## Inclui

- portal do colaborador;
- portal do gestor;
- workflow de aprovacoes;
- aprovacoes multinivel;
- SLA e escalonamento;
- delegacao;
- documentos pessoais e corporativos;
- assinaturas eletrônicas;
- assinatura ICP-Brasil;
- versionamento documental;
- retenção e prontuario.

## Nao inclui

- calculos de folha;
- transmissao eSocial;
- apuracao de ponto;
- motor de BI;
- integracoes externas.

---

# Fluxo Conceitual

## 1. Portal do colaborador

O colaborador consulta dados, solicitações, holerites, férias, benefícios e documentos.

## 2. Portal do gestor

O gestor acompanha equipe, aprova itens e consulta indicadores operacionais.

## 3. Workflow

Solicitações seguem fluxo parametrizado com etapas, responsáveis, SLA, escalonamento e delegação.

## 4. Gestao documental

Documentos são gerados, anexados, assinados, versionados, retidos e auditados.

## 5. Auditoria de experiência

Cada ação relevante em portal, workflow e documento precisa de trilha.

---

# Entidades Relevantes

- UsuarioPortal
- PerfilDeAcesso
- Solicitacao
- FluxoDeAprovacao
- EtapaDeWorkflow
- Documento
- Assinatura
- Evidencia
- Comunicacao
- Notificacao

---

# Regras De Negocio

## 1. Portal é por perfil e finalidade

Colaborador e gestor veem apenas o que é permitido por escopo.

## 2. Workflow é parametrizável

Fluxos, etapas, SLA, escalonamento e delegação devem ser configuráveis.

## 3. Documentos precisam de versionamento

Nenhum documento relevante deve ser tratado como arquivo solto sem histórico.

## 4. Assinatura impede alteração indevida

Documento assinado não pode ser alterado silenciosamente.

## 5. Tudo precisa ser auditável

Visualização, aprovação, download, assinatura e notificação precisam deixar trilha.

---

# Recomendacao Tecnica

- criar motor de workflow reutilizável;
- desacoplar UI de regra de aprovacao;
- versionar documentos e assinaturas;
- usar notificacoes por evento;
- preservar histórico completo das solicitações;
- tratar prontuário como agregado documental próprio.

---

# Riscos

- liberar documentos sem controle de acesso;
- misturar aprovação com edição manual;
- deixar workflow hardcoded por modulo;
- não versionar documentos assinados;
- expor dados sensíveis em notificações;
- tratar portal como simples tela sem trilha funcional.

---

# Relacao Com Outros Tópicos

## Com o tópico 4

- admissao usa portal, workflow e documentos para coleta e assinatura.

## Com o tópico 6

- férias, 13o, beneficios e rescisão dependem de documentos e aprovacoes.

## Com o tópico 9

- os portais e workflows geram dados para BI, auditoria e LGPD.

---

# Proximo Passo

Depois de portais, workflow e documentos, a ordem tecnica deve seguir para:

1. BI, LGPD, integracoes e auditoria;
2. consolidacao tecnica final do MVP;
3. definicao da base executavel.
