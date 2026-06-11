# Sistema de RH para o Mercado Brasileiro

# Pacote UC-FOL - Folha de Pagamento

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao do processamento da folha, incluindo rubricas, incidencias, folha mensal, folha complementar, adiantamento, encargos, holerite e fechamento.
O runtime executavel tambem possui uma camada funcional completa de 13o salario para a Onda 6, com calculo anual, memoria de avos, medias variaveis, encargos, aprovacao auditavel e ponte para folha.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-FOL-001 - Cadastrar Rubrica | UC-FOL-001-cadastrar-rubrica.md |
| UC-FOL-002 - Configurar Incidencias da Rubrica | Parametrizacao fiscal, previdenciaria e eSocial. |
| UC-FOL-003 - Processar Folha Mensal | Calculo e conferencias da competencia mensal. |
| UC-FOL-004 - Processar Folha Complementar | Calculo complementar e ajustes retroativos. |
| UC-FOL-005 - Processar Adiantamento Salarial | Adiantamento e deducao futura. |
| UC-FOL-006 - Calcular INSS | Base, teto e memoria previdenciaria. |
| UC-FOL-007 - Calcular FGTS | Base fundiaria e preparacao para FGTS Digital. |
| UC-FOL-008 - Calcular IRRF | Base tributavel e deducoes legais. |
| UC-FOL-009 - Gerar Holerite | Consolidacao e disponibilizacao do holerite. |
| UC-FOL-010 - Fechar Folha de Pagamento | Fechamento formal e congelamento da competencia. |

---

# Escopo Funcional

- Rubricas e incidencias
- Folha mensal e complementar
- Adiantamento salarial
- Encargos previdenciarios e tributarios
- Holerite
- Fechamento da competencia
- Integracao com eSocial, FGTS Digital, beneficios e BI

---

## Analise de Sequenciamento

O `UC-FOL` consolida a cadeia legal do pagamento e depende diretamente de `UC-ADM` e `UC-JOR`. A decomposicao por casos de uso deve seguir a dependencia economica e fiscal do dominio:

1. `UC-FOL-001` - Cadastrar Rubrica.
2. `UC-FOL-002` - Configurar Incidencias da Rubrica.
3. `UC-FOL-003` - Processar Folha Mensal.
4. `UC-FOL-004` - Processar Folha Complementar.
5. `UC-FOL-005` - Processar Adiantamento Salarial.
6. `UC-FOL-006` - Calcular INSS.
7. `UC-FOL-007` - Calcular FGTS.
8. `UC-FOL-008` - Calcular IRRF.
9. `UC-FOL-009` - Gerar Holerite.
10. `UC-FOL-010` - Fechar Folha de Pagamento.

## Prioridade de Analise

- A primeira camada deve fechar o cadastro estrutural das rubricas e suas incidencias.
- A segunda camada deve tratar a folha mensal e a folha complementar, porque elas absorvem os eventos de ponto e demais verbas.
- A terceira camada deve consolidar os encargos e o adiantamento salarial.
- A ultima camada deve tratar holerite e fechamento formal da competencia.
- O runtime atual ja possui 13o salario em camada funcional completa, entao o pacote FOL precisa alinhar os calculos regulares e os artefatos de fechamento com esse fluxo ja existente.

## Pontos de Atencao

- Rubricas e incidencias devem ser versionadas e manter historico.
- A folha nao deve fechar com bases obrigatorias inconsistentes.
- O processamento mensal deve ser compatível com ponto, beneficios, ferias, afastamentos e rescisao.
- Holerites e memoria de calculo precisam permanecer auditaveis.
- Fechamento da competencia deve bloquear alteracoes indevidas sem apagar historico.
