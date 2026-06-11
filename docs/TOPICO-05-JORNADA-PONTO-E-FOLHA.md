# Sistema de RH para o Mercado Brasileiro

# Topico 05 - Jornada, Ponto e Folha

## Objetivo

Definir a cadeia operacional que conecta jornada, marcação de ponto, apuração de eventos e reflexo em folha, preservando a separação entre registro, cálculo e fechamento.

---

# Contexto

O produto já possui pacotes detalhados para:

- `UC-JOR` - Jornada e Controle de Ponto;
- `UC-FOL` - Folha de Pagamento.

O tópico atual existe para consolidar a visão integrada:

1. a jornada é configurada;
2. o ponto é registrado;
3. eventos são tratados e apurados;
4. os resultados são consolidados;
5. a folha consome os eventos já validados.

---

# Princípio Central

Ponto e folha não devem ser tratados como a mesma coisa.

O modelo técnico precisa separar:

- configuração de jornada e escala;
- registro de marcação;
- cálculo de horas, adicionais e eventos;
- consolidação para folha;
- fechamento da folha.

---

# Escopo Do Tópico

## Inclui

- jornada de trabalho;
- escalas;
- banco de horas;
- registro de ponto;
- importação de marcações;
- inconsistências;
- ajustes e aprovações;
- horas extras;
- adicional noturno;
- DSR e descanso semanal;
- espelho de ponto;
- fechamento e reabertura de período;
- consolidação de eventos para folha;
- reflexo em folha.

## Nao inclui

- cadastro-base do colaborador;
- formalização contratual;
- admissão digital;
- cálculo tributário completo da folha;
- rescisão.

---

# Fluxo Conceitual

## 1. Configuração da jornada

Define-se a jornada contratual, a escala e as regras base de apuração.

## 2. Registro e captura do ponto

O colaborador registra marcações por web, mobile ou outro meio autorizado.

## 3. Tratamento operacional

O sistema trata inconsistências, ajustes, justificativas, tolerâncias e exceções.

## 4. Apuração

O sistema calcula:

- horas trabalhadas;
- horas extras;
- adicional noturno;
- banco de horas;
- DSR;
- compensações;
- eventos correlatos.

## 5. Fechamento do período

O período de ponto é fechado ou reaberto formalmente conforme fluxo de controle.

## 6. Consolidação para folha

Os eventos validados de ponto são transformados em insumos para folha, sem serem calculados novamente de forma independente.

## 7. Reflexo na folha

A folha mensal, complementar ou correlata consome os eventos consolidados e os converte em rubricas, bases e encargos.

---

# Entidades Relevantes

- Jornada
- Escala
- MarcacaoDePonto
- AjusteDePonto
- InconsistenciaDePonto
- BancoDeHoras
- EspelhoDePonto
- Competencia
- EventoDePonto
- Rubrica
- Folha

---

# Regras De Negocio

## 1. O ponto alimenta a folha

Os resultados de apuração devem ser consolidados antes de virar base de folha.

## 2. O fechamento do ponto antecede o fechamento da folha

A folha não deve consumir eventos ainda instáveis sem controle explícito.

## 3. Eventos de ponto precisam de rastreabilidade

Marcações, ajustes e cálculos devem preservar histórico e auditoria.

## 4. O cálculo de ponto é reprocessável

Correções devem permitir reprocessamento controlado.

## 5. A folha não reinterpreta o ponto

A folha consome eventos consolidados; ela não deve recriar a lógica operacional de marcação.

---

# Relações Com Outros Tópicos

## Com o tópico 3

- o vínculo do colaborador define a base para jornada e frequência.

## Com o tópico 4

- a admissão concluída habilita o fluxo operacional de ponto e folha.

## Com o tópico 6

- benefícios podem refletir em folha, mas não alteram a lógica de apuração de ponto.

---

# Recomendação Técnica

- usar motor de apuração por competência;
- manter marcação original imutável;
- registrar ajustes como eventos complementares;
- fechar e reabrir por fluxo controlado;
- consolidar eventos antes de gerar rubricas;
- evitar que folha e ponto compartilhem a mesma rotina de cálculo.

---

# Riscos

- misturar registro e apuração;
- calcular horas na folha como se o ponto não existisse;
- reabrir períodos sem trilha;
- perder vínculo entre marcação original e ajuste;
- acoplar reflexos de folha à captura de ponto;
- deixar eventos sem competência.

---

# Próximo Passo

Depois de jornada, ponto e folha, a ordem técnica deve seguir para:

1. benefícios, férias, 13º e rescisão;
2. SST, medicina ocupacional e compliance;
3. portais, workflow e documentos.
