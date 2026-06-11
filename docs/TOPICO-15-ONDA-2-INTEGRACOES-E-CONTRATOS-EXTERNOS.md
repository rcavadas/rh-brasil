# Sistema de RH para o Mercado Brasileiro

# Topico 15 - Onda 2 do Pos-MVP: Integracoes e Contratos Externos

## Objetivo

Detalhar a segunda onda executavel do backlog pos-MVP, transformando as integracoes documentadas em contratos operacionais claros e rastreaveis.

---

## Escopo

Esta onda cobre os contratos externos prioritarios:

- eSocial para admissao e desligamento completo;
- folha de pagamento;
- ERP;
- banco;
- operadora de beneficios;
- provedor de identidade;
- monitoramento, retentativas, DLQ e idempotencia por integracao.

---

## Sequencia de entrega

1. detalhar os contratos de eSocial para admissao e desligamento completo;
2. formalizar integracoes com folha;
3. formalizar integracoes com ERP;
4. formalizar integracoes com banco;
5. formalizar integracoes com operadora de beneficios;
6. formalizar integracoes com provedor de identidade;
7. detalhar monitoramento, retentativas, DLQ e idempotencia por integracao;
8. registrar dependencias e excecoes operacionais por contrato.

---

## Dependencias

- runtime atual validado;
- backlog pos-MVP separado do MVP consolidado;
- politica base de LGPD ja definida;
- auditoria relacional ja existente;
- pacote de ponto ja formalizado como Onda 1;
- documentos de admissao, desligamento, folha, BI, SEC, API e PLT ja catalogados.

---

## Critérios de aceite da onda

- cada integracao precisa ter contrato tecnico minimo claro, com mensagem, estado e responsabilidade definidos;
- falhas transitórias precisam ter retentativa ou DLQ documentada;
- eventos devem ser idempotentes quando houver risco de duplicidade;
- dados sensiveis devem respeitar as politicas de retenção, mascaramento e auditoria ja definidas.

---

## Resultado esperado

Ao final desta onda, as integracoes prioritarias devem estar especificadas como contratos operacionais consistentes, aptos a serem implementados sem ambiguidades de fluxo ou de responsabilidade.
