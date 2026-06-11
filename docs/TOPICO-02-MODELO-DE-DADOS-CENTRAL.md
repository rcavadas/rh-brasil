# Sistema de RH para o Mercado Brasileiro

# Topico 02 - Modelo de Dados Central

## Objetivo

Definir o modelo de dados central do produto, com as entidades que sustentam todos os modulos de RH, a relacao entre elas e as regras de historico, vigencia, auditoria e segregacao por tenant.

---

# Contexto

O sistema foi descrito como uma plataforma SaaS multiempresa para RH brasileiro, com foco no ciclo de vida do colaborador.

O dominio ja confirma alguns principios:

- Pessoa e a entidade raiz do dominio.
- VinculoTrabalhista representa a relacao entre Pessoa e Empresa.
- Todo vinculo pertence a uma empresa.
- Todo evento relevante gera historico e auditoria.
- Historico e imutavel.
- Integracoes nao podem alterar o historico retroativamente.

Esse tópico existe para transformar esses principios em um esqueleto de dados consistente.

---

# Mapeamento Do MVP

O slice executavel atual materializa o dominio com as seguintes entidades fisicas:

- `Tenant`
- `Company`
- `Person`
- `Employee`
- `PointMark`
- `AuditEvent`
- `TenantAccess`

Neste MVP, `Employee` e a projecao operacional de `VinculoTrabalhista`.
Ele materializa a relacao entre `Pessoa` e `Empresa` com os campos operacionais que o primeiro release ja precisa consultar e auditar.

`VinculoTrabalhista` continua valido como conceito de dominio para a evolucao futura, quando o modelo precisar carregar atributos contratuais mais ricos, vigencias especificas e movimentacoes trabalhistas completas.

---

# Principios De Modelagem

## 1. Entidade raiz

Sugestao:

- `Pessoa` deve ser a raiz para atributos civis e pessoais.
- `VinculoTrabalhista` deve ser a raiz operacional para a relacao de trabalho.
- `Empresa` deve ser a raiz organizacional e de tenancy funcional.

## 2. Historico por vigencia

Qualquer dado que muda ao longo do tempo precisa ser tratado com:

- vigencia inicial;
- vigencia final;
- versionamento;
- evento de alteracao;
- rastreabilidade do autor e da origem.

## 3. Imutabilidade pratica

O modelo deve evitar sobrescrita destrutiva em:

- cadastro pessoal sensivel;
- dados contratuais;
- estrutura organizacional;
- rubricas e incidencias;
- eventos legais;
- auditoria funcional.

## 4. Separacao entre cadastro e evento

O mesmo dado nao deve acumular:

- identidade estrutural;
- movimento historico;
- estado operacional final.

Exemplo:

- `Rubrica` nao e o mesmo que a sua configuracao de incidencias.
- `Pessoa` nao e o mesmo que `VinculoTrabalhista`.
- `Documento` nao e o mesmo que sua versao ou assinatura.

---

# Entidades Centrais

## 1. Tenant

Representa a unidade de isolamento da plataforma.

Campos sugeridos:

- id
- nome
- status
- criado_em
- atualizado_em

## 2. Empresa

Representa a pessoa juridica ou estrutura corporativa principal.

Campos sugeridos:

- id
- tenant_id
- razao_social
- nome_fantasia
- cnpj
- status
- criado_em
- atualizado_em

## 3. Filial

Representa uma unidade operacional vinculada a uma empresa.

Campos sugeridos:

- id
- empresa_id
- cnpj
- nome
- endereco
- status

## 4. Estabelecimento

Representa o local formal de operacao para fins legais e administrativos.

Campos sugeridos:

- id
- empresa_id
- filial_id
- codigo
- nome
- status

## 5. Unidade de Negocio

Representa uma divisao funcional ou operacional.

## 6. Departamento

Representa agrupamento funcional e organizacional.

## 7. Centro de Custo

Representa o destino contabil ou gerencial de custos.

## 8. Lotacao

Representa a alocacao formal de pessoas ou equipes.

## 9. Cargo

Representa a posicao estruturada na organizacao.

## 10. Funcao

Representa o conjunto funcional ou descritivo associado ao cargo.

## 11. Gestor

Representa a relacao de lideranca e aprovacao na hierarquia.

## 12. Pessoa

Representa a pessoa fisica como entidade raiz.

Campos sugeridos:

- id
- nome_completo
- cpf
- data_nascimento
- estado_civil
- nacionalidade
- naturalidade
- documentos civis
- contatos

## 13. VinculoTrabalhista

Representa a relacao entre Pessoa e Empresa.

Campos sugeridos:

- id
- pessoa_id
- empresa_id
- filial_id
- cargo_id
- funcao_id
- gestor_id
- tipo_contrato
- data_admissao
- data_desligamento
- status
- jornada_padrao
- salario_base

No MVP executavel, essa relacao esta materializada pela entidade `Employee`.
O conceito `VinculoTrabalhista` fica preservado como modelo de dominio para a expansao posterior.

## 14. Dependente

Representa dependentes para IRRF, salario-familia, plano de saude e outros fins.

## 15. Documento

Representa o artefato documental versionado e assinavel.

## 16. Evento

Representa qualquer fato de negocio com efeito historico.

## 17. Competencia

Representa a janela temporal de processamento operacional, especialmente para folha e ponto.

## 18. Auditoria

Representa a trilha funcional e tecnica do sistema.

---

# Relacoes Essenciais

- Uma `Tenant` possui varias `Empresa`.
- Uma `Empresa` possui varias `Filial`, `Estabelecimento`, `Departamento`, `CentroDeCusto`, `Lotacao`, `Cargo` e `Funcao`.
- Uma `Pessoa` pode possuir varios `VinculoTrabalhista` ao longo do tempo, embora o comportamento principal do produto deva ser controlado por vigencia e status.
- Um `VinculoTrabalhista` referencia `Pessoa`, `Empresa`, `Filial`, `Cargo`, `Funcao` e `Gestor`.
- Um `VinculoTrabalhista` gera eventos e historico.
- Um `Documento` pode ser associado a `Pessoa`, `VinculoTrabalhista`, `Empresa` ou a eventos especificos.
- Uma `Competencia` agrega eventos operacionais, calculos e fechamento.

---

# Regras De Integridade

## 1. Chaves e unicidade

- CPF deve ser unico por pessoa, considerando regras de normalizacao.
- CNPJ deve ser unico por empresa dentro do escopo aplicavel.
- Codigos internos de rubrica, cargo e outros cadastros estruturais devem respeitar unicidade por tenant ou empresa, conforme o dominio.

## 2. Vigencia

- Toda alteracao com efeito temporal precisa ter vigencia.
- Mudancas retroativas devem gerar novo evento, nunca sobrescrever silenciosamente.

## 3. Status

- Entidades podem ter status ativo, inativo, pendente, suspenso ou equivalente.
- Status nao deve substituir historico.

## 4. Escopo por tenant

- Toda consulta operacional deve respeitar tenant.
- Nada de dados compartilhados sem regra explicita de isolamento.

## 5. Auditoria

- Alteracao de dados sensiveis deve gerar auditoria funcional.
- Logs tecnicos nao devem substituir auditoria de negocio.

---

# Modelo Recomendo Para O MVP

## Camada 1

- Tenant
- Empresa
- Filial
- Estabelecimento
- Pessoa
- VinculoTrabalhista
- Departamento
- Centro de Custo
- Cargo
- Funcao

## Mapa De Implementacao Atual

- `Tenant`
- `Company`
- `Person`
- `Employee` como projecao operacional de `VinculoTrabalhista`
- `PointMark`
- `AuditEvent`
- `TenantAccess`

## Camada 2

- Dependente
- Documento
- Evento
- Competencia
- Auditoria

## Camada 3

- Estruturas de carreira
- Hierarquia funcional
- Trilhas de sucessao
- Beneficios
- Fases da admissao
- Movimentacoes contratuais

---

# Decisoes Tecnicas Sugeridas

## 1. Modelo relacional como base

O dominio exige consistencia forte, relacao entre entidades, vigencia e auditoria. O modelo relacional deve ser a base principal.

## 2. Historico por tabela complementar ou evento

Cada entidade importante deve ter:

- tabela principal;
- tabela de historico;
- ou evento equivalente.

## 3. ID global e tenant_id

Cada tabela operacional deve carregar `tenant_id` e identificadores estaveis.

## 4. Normalizacao pragmatica

Evitar excesso de desnormalizacao no inicio. Primeiro garantir coerencia de dominio.

---

# Riscos

- criar um modelo unico demais e acoplar tudo de forma rigida;
- tratar `Pessoa` e `VinculoTrabalhista` como a mesma coisa;
- deixar `Empresa` sem papel claro de tenancy;
- misturar dado atual com historico;
- esquecer vigencia em cargos, lotacoes, rubricas e contratos;
- permitir sobrescrita de estados que deveriam ser eventos.

---

# Proximo Passo

Depois do modelo de dados central, a ordem tecnica deve seguir para:

1. cadastro e vinculo do colaborador;
2. admissao digital e eSocial;
3. jornada, ponto e folha.
