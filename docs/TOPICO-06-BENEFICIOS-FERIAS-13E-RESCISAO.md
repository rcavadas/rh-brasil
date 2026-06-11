# Sistema de RH para o Mercado Brasileiro

# Topico 06 - Beneficios, Ferias, 13o e Rescisao

## Objetivo

Consolidar os blocos de ciclo de vida do colaborador que possuem reflexo financeiro, documental e legal direto: beneficios, ferias, decimo terceiro e rescisao.

---

# Contexto

O dominio ja possui pacotes e regras especificas para:

- beneficios;
- ferias;
- decimo terceiro;
- rescisao;
- folha de pagamento;
- eSocial;
- FGTS Digital.

Este topico serve para organizar a interdependencia entre esses dominios sem misturar suas regras internas.
O runtime executavel atual ja possui o desligamento administrativo minimo, o offboarding minimo, o eSocial de desligamento minimo e um fluxo minimo de rescisao com memoria de calculo e documentos; este topico continua responsavel pela evolucao completa das verbas, documentos e transmissao governamental de desligamento.
O fluxo minimo de rescisao agora tambem calcula o prazo de pagamento a partir da data de desligamento informada e rastreia assinatura eletronica dos documentos rescisorios antes do fechamento.
A assinatura dos documentos rescisorios no runtime usa `govbr_advanced` como padrao e aceita `icp_brasil` como excecao valida quando exigida.
O runtime executavel atual tambem possui uma camada funcional completa da Onda 6 para beneficios, ferias e 13o salario: catalogo/atribuicao/suspensao/cancelamento de beneficios, saldo/solicitacao/aprovacao/fracionamento/abono/aviso/pagamento/envio para folha/transmissao ao eSocial/cancelamento de ferias com janela concessiva derivada e bloqueio de conflito de datas, e calculo/aprovacao de 13o com memoria de avos, medias variaveis, encargos e ponte para folha.

---

# Principio Central

Cada um desses dominios possui ciclo proprio:

- beneficios operam por elegibilidade e concessao;
- ferias operam por periodo aquisitivo e concessivo;
- 13o opera por avos, parcelas e encargos;
- rescisao opera por desligamento, verbas e transmissao legal.

Eles se conectam entre si e com a folha, mas nao devem ser reduzidos a um unico fluxo.

---

# Escopo Do Tópico

## Inclui

- cadastro e elegibilidade de beneficios;
- concessao, suspensao e cancelamento de beneficios;
- reflexo de beneficios em folha;
- periodo aquisitivo e concessivo de ferias;
- solicitacao, aprovacao, fracionamento e pagamento de ferias;
- abono pecuniario e ferias coletivas;
- apuracao e pagamento de 13o;
- primeira e segunda parcela;
- medias e encargos;
- rescisao por tipos de desligamento;
- verbas rescisorias;
- aviso previo;
- FGTS rescisorio;
- documentos rescisorios;
- transmissao ao eSocial e FGTS Digital.

## Nao inclui

- admissao;
- jornada e ponto;
- SST;
- portais;
- workflow generico;
- GED.

---

# Fluxo Conceitual

## 1. Beneficios

O sistema define elegibilidade, concede beneficios, aplica suspensoes e integra descontos ou eventos para folha.

## 2. Ferias

O sistema controla aquisitivo, concessivo, programacao, calculo e pagamento das ferias, com reflexo em folha e eSocial.

## 3. Decimo terceiro

O sistema apura avos, calcula parcelas, considera medias e encargos, e trata adiantamentos e rescisorio.

## 4. Rescisao

O sistema encerra o vinculo com calculo de verbas, documentos, prazos, assinaturas, descontos e obrigacoes governamentais.

---

# Entidades Relevantes

- Beneficio
- ElegibilidadeDeBeneficio
- PlanoDeBeneficio
- PeriodoAquisitivo
- PeriodoConcessivo
- Ferias
- FeriasColetivas
- DecimoTerceiro
- Rescisao
- VerbaRescisoria
- DocumentoRescisorio
- GuiaFGTS
- EventoESocial

---

# Regras De Negocio

## 1. Beneficios possuem elegibilidade parametrizavel

Cargo, funcao, unidade, sindicato, contrato e tempo de empresa podem influenciar a concessao.

## 2. Ferias possuem estados proprios

Aquisição, concessão, fracionamento, abono e pagamento devem ser rastreados por periodo.

## 3. 13o possui apuracao separada

Avos, primeira parcela, segunda parcela, medias e encargos nao devem ser misturados com a folha mensal comum.

## 4. Rescisao e um processo fechado

Motivo, aviso previo, ferias, 13o, FGTS, descontos e documentos rescisorios precisam ser tratados de forma integrada, mas auditavel.
O prazo de pagamento da rescisao deve ser calculado a partir da data de desligamento informada, e documentos rescisorios assinados devem ser rastreaveis antes do fechamento operacional.

## 5. Tudo que gera pagamento ou desconto precisa de memoria

As apuracoes precisam ser reproduziveis.

---

# Recomendacao Tecnica

- tratar beneficios como catalogo com elegibilidade e eventos;
- tratar ferias como processo de competencia e saldo;
- tratar 13o como competencia anual propria;
- tratar rescisao como processo transacional fechado;
- manter cada dominio com sua memoria de calculo;
- integrar com folha por eventos consolidados, nao por reinterpretação.

---

# Riscos

- misturar beneficio corporativo com beneficio legal;
- perder o historico de ferias;
- pagar 13o sem controle de medias e parcelas;
- calcular rescisao sem memoria;
- integrar tudo diretamente na folha sem camada intermediaria de consolidacao;
- ignorar regras legais por tipo de contrato ou motivo de desligamento.

---

# Relacao Com Outros Tópicos

## Com o tópico 5

- a folha recebe reflexos consolidados de ponto, beneficios, ferias, 13o e rescisao.

## Com o tópico 7

- afastamentos e eventos ocupacionais podem influenciar ferias, 13o e rescisao.

## Com o tópico 8

- documentos e assinaturas suportam todos esses processos.

---

# Proximo Passo

Depois de beneficios, ferias, 13o e rescisao, a ordem tecnica deve seguir para:

1. SST, medicina ocupacional e compliance;
2. portais, workflow e documentos;
3. BI, LGPD, integracoes e auditoria.
