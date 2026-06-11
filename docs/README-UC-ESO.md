# Sistema de RH para o Mercado Brasileiro

# Pacote UC-ESO - eSocial

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao do motor de eventos do eSocial, cobrindo configuracao, tabelas, eventos iniciais, trabalhistas, de folha e conciliacao de totalizadores.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-ESO-001 - Configurar Ambiente eSocial | Parametrizacao inicial do ambiente. |
| UC-ESO-002 - Gerenciar Certificado Digital | Certificados, validade e uso. |
| UC-ESO-003 - Transmitir Evento S-1000 | Evento inicial do empregador. |
| UC-ESO-004 - Transmitir Evento S-1005 | Tabela de estabelecimentos e lotacoes. |
| UC-ESO-005 - Transmitir Evento S-1010 | Tabela de rubricas. |
| UC-ESO-006 - Transmitir Evento S-2200 | Admissao e vinculacao. |
| UC-ESO-007 - Transmitir Evento S-1200 | Remuneracao e folha. |
| UC-ESO-008 - Transmitir Evento S-1210 | Pagamentos e rendimentos. |
| UC-ESO-009 - Transmitir Evento S-1299 | Fechamento do periodo. |
| UC-ESO-010 - Conciliar Totalizadores do eSocial | Conciliacao e tratamento de divergencias. |

---

# Escopo Funcional

- Configuracao inicial
- Certificado digital
- Eventos iniciais, tabelas e periodicos
- Fechamento
- Conciliacao
- Motor proprio de eventos e trilha de auditoria

---

## Analise de Sequenciamento

O `UC-ESO` e a camada regulatoria de transmissao e conciliacao que recebe dados de admissao, folha, SST e desligamento. A decomposicao por casos de uso deve seguir o contrato do ambiente e a ordem dos eventos governamentais:

1. `UC-ESO-001` - Configurar Ambiente eSocial.
2. `UC-ESO-002` - Gerenciar Certificado Digital.
3. `UC-ESO-003` - Transmitir Evento S-1000.
4. `UC-ESO-004` - Transmitir Evento S-1005.
5. `UC-ESO-005` - Transmitir Evento S-1010.
6. `UC-ESO-006` - Transmitir Evento S-2200.
7. `UC-ESO-007` - Transmitir Evento S-1200.
8. `UC-ESO-008` - Transmitir Evento S-1210.
9. `UC-ESO-009` - Transmitir Evento S-1299.
10. `UC-ESO-010` - Conciliar Totalizadores do eSocial.

## Prioridade de Analise

- A primeira camada deve fechar configuracao do ambiente e certificado digital.
- A segunda camada deve consolidar os eventos iniciais e tabelas, porque eles habilitam os eventos posteriores.
- A terceira camada deve cobrir admissao, remuneracao e pagamentos.
- A quarta camada deve fechar o periodo e tratar divergencias de totalizadores.
- O runtime atual ja possui transmissao minima para admissao e desligamento, alem de reprocessamento explicito, entao os gaps prioritarios estao na completude do motor, na conciliacao e nas tabelas auxiliares do dominio.

## Pontos de Atencao

- Certificados digitais precisam de validade, rotação e controle de acesso.
- Eventos do eSocial devem preservar ordem, dependencias e rastreabilidade.
- A conciliacao precisa detectar divergencia sem corromper o historico local.
- A transmissao deve respeitar o estado do contrato, da folha e do SST.
- O motor de eventos nao deve expor dados sensiveis fora do escopo exigido.
