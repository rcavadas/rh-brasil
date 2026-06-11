# Sistema de RH para o Mercado Brasileiro

# Pacote UC-SST - Saude e Seguranca do Trabalho

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao de SST, cobrindo ambiente de trabalho, riscos ocupacionais, PGR, PCMSO, LTCAT, exames, ASO, CAT, EPI e treinamentos obrigatorios.

O runtime ja possui a primeira base executavel do dominio, com ambientes de trabalho, riscos ocupacionais, PGR, PCMSO, CAT, EPI, exames ocupacionais, ASO, treinamentos obrigatorios e transmissoes eSocial SST versionados por tenant.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-SST-001 - Cadastrar Ambiente de Trabalho | Cadastro de ambiente e contexto ocupacional. |
| UC-SST-002 - Cadastrar Riscos Ocupacionais | Mapeamento de riscos por ambiente. |
| UC-SST-003 - Gerenciar PGR | Programa de Gerenciamento de Riscos. |
| UC-SST-004 - Gerenciar PCMSO | Programa de Controle Medico. |
| UC-SST-005 - Gerenciar LTCAT | Laudo tecnico de condicoes ambientais. |
| UC-SST-006 - Registrar Exame Ocupacional | Controle de exames e resultados. |
| UC-SST-007 - Emitir ASO | Emissao do atestado de saude ocupacional. |
| UC-SST-008 - Registrar CAT | Comunicacao de acidente de trabalho. |
| UC-SST-009 - Controlar Entrega de EPI | Controle de entrega e ciencia. |
| UC-SST-010 - Controlar Treinamentos Obrigatorios de SST | Treinamentos e vencimentos obrigatorios. |

---

# Escopo Funcional

- Ambiente e riscos
- PGR, PCMSO e LTCAT
- Exames e ASO
- CAT
- EPI
- Treinamentos obrigatorios
- Integracao com eSocial SST

---

## Analise de Sequenciamento

O `UC-SST` consolida o mapa ocupacional e os artefatos de seguranca do trabalho que alimentam outros dominios e o eSocial. A decomposicao por casos de uso deve seguir a dependencia documental e de compliance:

1. `UC-SST-001` - Cadastrar Ambiente de Trabalho.
2. `UC-SST-002` - Cadastrar Riscos Ocupacionais.
3. `UC-SST-003` - Gerenciar PGR.
4. `UC-SST-004` - Gerenciar PCMSO.
5. `UC-SST-005` - Gerenciar LTCAT.
6. `UC-SST-006` - Registrar Exame Ocupacional.
7. `UC-SST-007` - Emitir ASO.
8. `UC-SST-008` - Registrar CAT.
9. `UC-SST-009` - Controlar Entrega de EPI.
10. `UC-SST-010` - Controlar Treinamentos Obrigatorios de SST.

## Prioridade de Analise

- A primeira camada deve fechar ambiente de trabalho e mapeamento de riscos.
- A segunda camada deve consolidar os programas e laudos regulatorios.
- A terceira camada deve cobrir exames, ASO, CAT e EPI.
- A ultima camada deve cobrir treinamentos obrigatorios e sua vigencia.
- O runtime atual ja possui a primeira base executavel do dominio, entao os gaps prioritarios estao em governanca documental, vigencia e consistencia entre artefatos de SST e os eventos enviados ao eSocial.

## Pontos de Atencao

- Ambientes e riscos precisam ser versionados por tenant.
- PGR, PCMSO e LTCAT devem manter rastreabilidade documental.
- Exames, ASO e CAT carregam dados sensiveis e exigem controle LGPD.
- EPI e treinamentos precisam refletir obrigatoriedade, entrega e vencimento sem perder historico.
- O alinhamento com eSocial SST deve evitar divergencia entre cadastro local e eventos transmitidos.
