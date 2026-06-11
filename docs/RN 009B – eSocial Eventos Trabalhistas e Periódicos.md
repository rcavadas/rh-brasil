# Sistema de RH para o Mercado Brasileiro

# Regras de Negócio (RN)

## Bloco 09B – eSocial: Eventos Trabalhistas e Periódicos

### Versão

1.0

### Objetivo

Este documento descreve as regras de negócio relacionadas aos eventos trabalhistas e periódicos do eSocial, incluindo admissões, alterações contratuais, afastamentos, desligamentos, remuneração, pagamentos, fechamento e totalizadores.

---

# Evento S-2190 – Admissão Preliminar

## RN-1001

O sistema deve permitir geração do evento S-2190 quando utilizado processo de admissão preliminar.

## RN-1002

O S-2190 deve possuir os dados mínimos exigidos pelo eSocial.

## RN-1003

O sistema deve validar os campos obrigatórios antes da transmissão.

## RN-1004

O sistema deve impedir envio de colaborador já admitido.

## RN-1005

O S-2190 deve ser convertido posteriormente em S-2200.

## RN-1006

O sistema deve controlar prazo de complementação cadastral.

## RN-1007

O sistema deve armazenar XML enviado.

## RN-1008

O sistema deve armazenar XML de retorno.

## RN-1009

O sistema deve registrar recibo retornado.

## RN-1010

Toda transmissão deve ser auditável.

---

# Evento S-2200 – Admissão

## RN-1011

Toda admissão efetivada deve gerar evento S-2200.

## RN-1012

O evento deve utilizar os dados vigentes do colaborador.

## RN-1013

O sistema deve validar CPF.

## RN-1014

O sistema deve validar categoria do trabalhador.

## RN-1015

O sistema deve validar cargo.

## RN-1016

O sistema deve validar lotação tributária.

## RN-1017

O sistema deve validar jornada de trabalho.

## RN-1018

O sistema deve impedir envio de admissões inconsistentes.

## RN-1019

O sistema deve registrar recibo retornado.

## RN-1020

Toda transmissão deve possuir trilha de auditoria.

---

# Evento S-2205 – Alteração Cadastral

## RN-1021

O sistema deve gerar S-2205 quando ocorrer alteração cadastral relevante.

## RN-1022

O sistema deve identificar automaticamente alterações elegíveis.

## RN-1023

Alterações devem possuir vigência.

## RN-1024

O sistema deve manter histórico cadastral.

## RN-1025

O sistema deve impedir exclusão de histórico transmitido.

## RN-1026

O sistema deve registrar versão enviada.

## RN-1027

O sistema deve armazenar recibo.

## RN-1028

O sistema deve permitir retificação.

## RN-1029

Toda alteração deve ser auditável.

## RN-1030

Toda transmissão deve possuir rastreabilidade.

---

# Evento S-2206 – Alteração Contratual

## RN-1031

O sistema deve gerar S-2206 quando houver alteração contratual.

## RN-1032

O sistema deve suportar alterações salariais.

## RN-1033

O sistema deve suportar alterações de cargo.

## RN-1034

O sistema deve suportar alterações de jornada.

## RN-1035

O sistema deve suportar alterações de lotação.

## RN-1036

Toda alteração deve possuir vigência.

## RN-1037

O sistema deve manter histórico contratual.

## RN-1038

O sistema deve registrar versões transmitidas.

## RN-1039

O sistema deve armazenar recibo retornado.

## RN-1040

Toda transmissão deve ser auditável.

---

# Evento S-2230 – Afastamentos

## RN-1041

O sistema deve gerar evento S-2230 para afastamentos obrigatórios.

## RN-1042

O sistema deve suportar afastamentos previdenciários.

## RN-1043

O sistema deve suportar licença-maternidade.

## RN-1044

O sistema deve suportar licença-paternidade.

## RN-1045

O sistema deve suportar acidentes de trabalho.

## RN-1046

O sistema deve suportar afastamentos disciplinares.

## RN-1047

O sistema deve registrar data de início.

## RN-1048

O sistema deve registrar data de retorno.

## RN-1049

O sistema deve registrar motivo do afastamento.

## RN-1050

Toda movimentação deve ser auditável.

---

# Evento S-2299 – Desligamento

## RN-1051

Toda rescisão deve gerar evento S-2299 quando aplicável.

## RN-1052

O motivo de desligamento deve ser compatível com as tabelas do eSocial.

## RN-1053

O sistema deve validar verbas rescisórias antes da transmissão.

## RN-1054

O sistema deve validar datas da rescisão.

## RN-1055

O sistema deve validar aviso prévio informado.

## RN-1056

O sistema deve registrar recibo retornado.

## RN-1057

O sistema deve permitir retificação quando aplicável.

## RN-1058

O sistema deve permitir exclusão quando legalmente possível.

## RN-1059

Toda transmissão deve ser auditável.

## RN-1060

Toda movimentação deve possuir rastreabilidade completa.

---

# Evento S-2399 – Trabalhadores Sem Vínculo

## RN-1061

O sistema deve permitir geração do evento S-2399 quando aplicável.

## RN-1062

O sistema deve validar categoria do trabalhador.

## RN-1063

O sistema deve validar motivo do término.

## RN-1064

O sistema deve registrar data de encerramento.

## RN-1065

O sistema deve registrar recibo retornado.

## RN-1066

O sistema deve armazenar XML enviado.

## RN-1067

O sistema deve armazenar XML de retorno.

## RN-1068

O sistema deve permitir retificação.

## RN-1069

Toda transmissão deve ser auditável.

## RN-1070

Toda movimentação deve possuir rastreabilidade.

---

# Evento S-1200 – Remuneração

## RN-1071

Toda folha fechada deve gerar evento S-1200 quando aplicável.

## RN-1072

O sistema deve consolidar rubricas da competência.

## RN-1073

O sistema deve considerar incidências previdenciárias.

## RN-1074

O sistema deve considerar incidências fundiárias.

## RN-1075

O sistema deve considerar incidências tributárias.

## RN-1076

Rubricas inconsistentes devem bloquear a transmissão.

## RN-1077

O sistema deve registrar recibo retornado.

## RN-1078

O sistema deve permitir retificação.

## RN-1079

O sistema deve manter histórico das versões transmitidas.

## RN-1080

Toda transmissão deve ser auditável.

---

# Evento S-1210 – Pagamentos

## RN-1081

Todo pagamento realizado deve gerar evento S-1210 quando aplicável.

## RN-1082

O sistema deve registrar data efetiva do pagamento.

## RN-1083

O sistema deve registrar valor líquido pago.

## RN-1084

O sistema deve registrar forma de pagamento.

## RN-1085

O sistema deve validar consistência com a remuneração transmitida.

## RN-1086

O sistema deve registrar recibo retornado.

## RN-1087

O sistema deve permitir retificação.

## RN-1088

O sistema deve manter histórico das transmissões.

## RN-1089

Toda transmissão deve possuir rastreabilidade.

## RN-1090

Toda movimentação deve ser auditável.

---

# Evento S-1299 – Fechamento

## RN-1091

O sistema deve permitir fechamento da competência.

## RN-1092

O fechamento somente poderá ocorrer após transmissão dos eventos obrigatórios.

## RN-1093

Eventos pendentes devem impedir fechamento.

## RN-1094

Eventos rejeitados devem impedir fechamento.

## RN-1095

O sistema deve registrar data e hora do fechamento.

## RN-1096

O sistema deve armazenar recibo retornado.

## RN-1097

O sistema deve permitir consulta histórica dos fechamentos.

## RN-1098

O sistema deve impedir alterações após fechamento sem reabertura formal.

## RN-1099

Toda operação deve ser auditável.

## RN-1100

Toda transmissão deve possuir rastreabilidade completa.

---

# Totalizadores

## RN-1101

O sistema deve importar totalizadores retornados pelo eSocial.

## RN-1102

O sistema deve armazenar totalizadores históricos.

## RN-1103

O sistema deve conciliar totalizadores com a folha.

## RN-1104

Diferenças devem gerar alertas.

## RN-1105

Diferenças devem gerar relatórios de inconsistência.

## RN-1106

O sistema deve permitir reprocessamento.

## RN-1107

O sistema deve registrar histórico de conciliações.

## RN-1108

Toda divergência deve possuir rastreabilidade.

## RN-1109

Toda correção deve ser auditável.

## RN-1110

Toda conciliação deve possuir histórico.

---

# Reabertura, Retificação e Exclusão

## RN-1111

O sistema deve permitir reabertura da competência quando legalmente permitido.

## RN-1112

A reabertura deve exigir justificativa.

## RN-1113

O sistema deve permitir retificação de eventos transmitidos.

## RN-1114

O sistema deve permitir exclusão de eventos quando previsto pelo leiaute.

## RN-1115

Toda retificação deve manter histórico.

## RN-1116

Toda exclusão deve manter histórico.

## RN-1117

O sistema deve registrar usuário responsável.

## RN-1118

O sistema deve registrar data e hora da operação.

## RN-1119

Toda operação deve ser auditável.

## RN-1120

Toda movimentação deve possuir trilha completa de auditoria.

---

# Compliance Operacional

## RN-1121

O sistema deve monitorar eventos pendentes.

## RN-1122

O sistema deve monitorar eventos rejeitados.

## RN-1123

O sistema deve monitorar eventos em processamento.

## RN-1124

O sistema deve gerar alertas automáticos de inconsistência.

## RN-1125

O sistema deve gerar indicadores de conformidade.

## RN-1126

O sistema deve permitir consulta por competência.

## RN-1127

O sistema deve permitir consulta por colaborador.

## RN-1128

O sistema deve permitir consulta por evento.

## RN-1129

O sistema deve permitir exportação dos dados.

## RN-1130

Toda exportação deve respeitar permissões de acesso.

---

# Resumo do Bloco

Este bloco contempla:

* S-2190
* S-2200
* S-2205
* S-2206
* S-2230
* S-2299
* S-2399
* S-1200
* S-1210
* S-1299
* Totalizadores
* Fechamento
* Retificações
* Exclusões
* Reabertura
* Compliance operacional

---

# Próximo Bloco

## Bloco 09C – eSocial: SST, Fiscalização, Compliance e Auditoria Regulatória

Faixa prevista:

**RN-1131 a RN-1250**

Abrangendo:

* S-2210
* S-2220
* S-2240
* Fiscalizações
* Auditorias
* LGPD aplicada ao eSocial
* Trilhas regulatórias
* Monitoramento de conformidade
* Gestão de evidências
* Compliance trabalhista
* Compliance previdenciário
