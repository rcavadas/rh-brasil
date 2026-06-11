# Sistema de RH para o Mercado Brasileiro

# Topico 21 - Onda 2: Detalhamento Executavel de Integracoes e Contratos

## Objetivo

Transformar a Onda 2 do pos-MVP em frentes executaveis de contrato tecnico, com foco em integracao rastreavel, operacao previsivel e responsabilidade clara.

---

## Frentes executaveis

### 1. eSocial de admissao e desligamento

- separar eventos, estados e reprocessamento;
- documentar contrato de transmissao e retorno;
- explicitar conciliacao e falhas;
- manter trilha para auditoria e suporte.

### 2. Integracao com folha

- definir entrada, saida e competencia;
- mapear eventos e rubricas;
- explicitar idempotencia;
- documentar dependencias de fechamento.

### 3. Integracao com ERP

- separar leitura, escrita e sincronizacao;
- explicitar limites de dominio;
- registrar conflitos de origem;
- definir retentativa e DLQ quando aplicavel.

### 4. Integracao com banco

- formalizar dados de envio e conciliacao;
- definir responsabilidade por retorno;
- registrar limites de processamento e seguranca;
- documentar consentimento ou base legal quando exigivel.

### 5. Integracao com operadora de beneficios

- estruturar adesao, manutencao e desligamento;
- definir campos obrigatorios e validacoes;
- registrar auditarcao de alteracoes;
- separar o que e operacao do que e consulta.

### 6. Integracao com provedor de identidade

- definir fluxo de provisionamento e desprovisionamento;
- mapear claims e atributos;
- registrar politicas de sincronizacao;
- explicitar fallback e revogacao.

### 7. Monitoramento, retentativas e DLQ

- padronizar eventos de falha e reprocesso;
- definir observabilidade por integracao;
- documentar janelas de retentativa;
- registrar criticos e permanentes em DLQ.

---

## Sequencia recomendada

1. eSocial de admissao e desligamento;
2. integracao com folha;
3. integracao com ERP;
4. integracao com banco;
5. integracao com operadora de beneficios;
6. integracao com provedor de identidade;
7. monitoramento, retentativas e DLQ.

---

## Dependencias

- Onda 2 formalizada no Topico 15;
- backlog pos-MVP consolidado no Topico 13;
- politica base de LGPD ja definida;
- auditoria relacional ja existente;
- runtime atual validado.

---

## Criterios de aceite

- cada integracao precisa de contrato tecnico minimo;
- as falhas precisam ser classificadas e tratadas de forma previsivel;
- dados pessoais e sensiveis devem respeitar as politicas ja definidas;
- responsabilidades entre sistemas precisam ficar explicitadas.

---

## Resultado esperado

Ao final deste detalhamento, a Onda 2 passa a ter uma trilha tecnica concreta para ser implementada sem ambiguidades de contrato ou operacao.
