# Sistema de RH para o Mercado Brasileiro

# Topico 07 - SST, Medicina Ocupacional e Compliance

## Objetivo

Definir a base tecnica dos dominios de Saude e Seguranca do Trabalho, medicina ocupacional e compliance trabalhista, incluindo riscos, exames, EPI, PGR, PCMSO, LTCAT e eventos SST do eSocial.

O runtime ja iniciou a materializacao deste dominio com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissoes eSocial SST versionados por tenant.

---

# Contexto

O produto ja possui regras detalhadas para:

- SST;
- medicina ocupacional;
- eventos S-2210, S-2220 e S-2240;
- compliance trabalhista;
- auditoria regulatoria.

Este tópico organiza o conjunto como um dominio de risco e conformidade, e nao apenas como cadastro de laudos e exames.

---

# Principio Central

SST precisa operar como base regulatória e operacional para:

- ambiente de trabalho;
- riscos ocupacionais;
- exames ocupacionais;
- ASO;
- CAT;
- EPI;
- treinamentos obrigatórios;
- eventos regulatórios eSocial;
- alertas de conformidade.

---

# Escopo Do Tópico

## Inclui

- ambientes de trabalho;
- riscos ocupacionais;
- PGR;
- PCMSO;
- LTCAT;
- exames admissionais, periodicos, retorno, mudanca e demissional;
- ASO;
- CAT;
- controle de EPI;
- treinamentos obrigatorios;
- medicina ocupacional como agenda e controle de vencimentos;
- compliance trabalhista e alertas.

## Nao inclui

- folha de pagamento;
- beneficios;
- portais;
- workflow generico;
- gestao documental completa.

---

# Fluxo Conceitual

## 1. Cadastro do ambiente e dos riscos

Define-se o contexto ocupacional, os riscos e as exposições.

## 2. Programas e laudos

O sistema controla PGR, PCMSO e LTCAT com vigencia, revisao e historico.

## 3. Exames ocupacionais

Agenda, vencimento, resultado e aptidao sao mantidos para cada colaborador.

## 4. ASO e CAT

O sistema emite ASO e registra CAT com trilha de auditoria.

## 5. EPI e treinamentos

Entrega, validade, devolucao e treinamentos obrigatorios sao controlados como eventos.

## 6. Eventos eSocial SST

Eventos SST sao preparados e transmitidos com rastreabilidade.

## 7. Compliance

Regras de conformidade e alertas acompanham pendencias, vencimentos e inconsistencias.

---

# Entidades Relevantes

- AmbienteDeTrabalho
- RiscoOcupacional
- PGR
- PCMSO
- LTCAT
- ExameOcupacional
- ASO
- CAT
- EPI
- TreinamentoObrigatorio
- EventoSST
- AlertaDeCompliance

---

# Regras De Negocio

## 1. Tudo precisa de vigencia

Ambientes, riscos, laudos, exames e treinamentos precisam ser versionados por periodo.

## 2. Apto e inapto precisam ser rastreaveis

ASO nao pode ser um texto livre sem estrutura.

## 3. CAT e eventos SST precisam de evidencia

Ocorrencias e transmissões precisam manter documentos e historico.

## 4. Compliance e um motor de alertas

O sistema deve sinalizar vencimentos, ausencias de exame, treinamentos pendentes e inconsistencias.

## 5. Eventos SST seguem o fluxo regulatorio

S-2210, S-2220 e S-2240 devem ser tratados como eventos auditaveis e reprocessaveis.

---

# Recomendacao Tecnica

- manter dados ocupacionais separados da folha e do cadastro;
- usar agenda de vencimentos e alertas;
- versionar laudos e programas;
- preservar documentos e evidencias;
- integrar com eSocial por fila e status;
- consolidar compliance em um painel e em registros auditaveis.

---

# Riscos

- tratar SST como simples checklist;
- perder vigencia de laudos e exames;
- misturar dado medico com dado operacional sem controle de acesso;
- não rastrear EPI e treinamentos;
- ignorar a diferença entre cadastros internos e eventos regulatórios;
- expor dados sensiveis em alertas ou relatórios.

---

# Relacao Com Outros Tópicos

## Com o tópico 3

- a base do colaborador alimenta controles ocupacionais e elegibilidade de exames.

## Com o tópico 4

- eventos iniciais podem depender da aptidao ocupacional.

## Com o tópico 9

- compliance e auditoria vão consolidar evidencias e indicadores.

---

# Proximo Passo

Depois de SST, medicina ocupacional e compliance, a ordem tecnica deve seguir para:

1. portais, workflow e documentos;
2. BI, LGPD, integracoes e auditoria;
3. consolidacao tecnica final do MVP.
