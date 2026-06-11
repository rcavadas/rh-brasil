# Sistema de RH para o Mercado Brasileiro

# Topico 20 - Onda 1: Detalhamento Executavel do Pacote de Ponto

## Objetivo

Transformar a Onda 1 do pos-MVP em um plano executavel mais granular, decompondo o pacote de ponto em frentes concretas de implementacao, validacao e rastreabilidade.

---

## Base de referencia

Esta onda se apoia nos casos de uso:

- UC-JOR-013 - Configurar Calendario de Feriados e Excecoes;
- UC-JOR-014 - Configurar Regras de Tolerancia de Ponto;
- UC-JOR-015 - Registrar e Gerenciar Dispositivos de Ponto;
- UC-JOR-016 - Emitir Comprovante de Marcacao;
- UC-JOR-017 - Calcular Adicional Noturno;
- UC-JOR-018 - Aplicar Regras de DSR e Descanso Semanal;
- UC-JOR-019 - Consolidar Eventos de Ponto para Folha;
- UC-JOR-020 - Exportar Espelho e Trilhas de Auditoria.

---

## Frentes executaveis

### 1. Calendario de feriados e excecoes

- consolidar fonte oficial por localidade;
- registrar vigencia e escopo de aplicacao;
- permitir excecoes corporativas versionadas;
- garantir consumo pelo motor de ponto.

### 2. Regras de tolerancia de ponto

- separar tolerancia por empresa, jornada e perfil;
- resolver precedencia entre configuracoes;
- versionar vigencias e excecoes coletivas;
- refletir a tolerancia no motor de apuracao.

### 3. Dispositivos de ponto

- modelar tipos de origem e cadastro de dispositivos;
- registrar capacidade de uso offline, geolocalizacao e biometria quando aplicavel;
- manter rastreabilidade por vigencia e status;
- restringir acesso a configuracoes sensiveis.

### 4. Comprovante de marcacao

- padronizar o documento principal em PDF;
- definir regras de reemissao e segunda via;
- mascarar dados quando a finalidade nao exigir o valor integral;
- vincular o comprovante a audit trail e origem da marcacao.

### 5. Adicional noturno

- manter baseline legal como referencia;
- aplicar politica versionada por competencia;
- deixar claro o fator, a janela e a regra corporativa quando existirem;
- alinhar reflexo com horas extras e folha.

### 6. DSR e descanso semanal

- versionar regras por empresa, escala e acordo aplicavel;
- preservar faltas, domingos e feriados como insumos auditaveis;
- explicitar a forma de reflexo para competencia;
- evitar calculo silencioso sem origem rastreavel.

### 7. Consolidacao para folha

- manter mapeamento versionado entre eventos e rubricas;
- evitar inferencia silenciosa quando o mapeamento faltar;
- registrar dependencias para fechamento de folha;
- publicar saida concilavel para o fluxo financeiro.

### 8. Exportacao de espelho e trilhas

- aplicar mascaramento por finalidade e perfil;
- separar espelho e trilhas por nivel de exposicao;
- manter formato autorizado conforme politica vigente;
- registrar logs de exportacao para auditoria.

---

## Sequencia recomendada

1. calendario de feriados e excecoes;
2. regras de tolerancia de ponto;
3. dispositivos de ponto;
4. comprovante de marcacao;
5. adicional noturno;
6. DSR e descanso semanal;
7. consolidacao para folha;
8. exportacao de espelho e trilhas.

---

## Dependencias

- Onda 1 formalizada no Topico 14;
- backlog pos-MVP consolidado no Topico 13;
- politica base de LGPD ja definida;
- auditoria relacional ja existente;
- runtime atual validado;
- controles de acesso e contexto multi-tenant ja em uso no slice executavel.

---

## Criterios de aceite

- cada frente precisa ter regras de entrada e saida claras;
- o comportamento nao pode depender de inferencias ocultas;
- as saidas devem ser auditaveis e reconciliaveis com o restante do fluxo;
- dados sensiveis devem respeitar retencao, mascaramento e finalidade.

---

## Resultado esperado

Ao final deste detalhamento, a Onda 1 deixa de ser apenas uma lista de temas e passa a ter um roteiro concreto de implementacao e validacao incremental.
