# Sistema de RH para o Mercado Brasileiro

# Topico 03 - Cadastro e Vinculo do Colaborador

## Objetivo

Definir a base funcional e tecnica para o cadastro do colaborador e a formalizacao do vinculo trabalhista, separando claramente o cadastro-base da pessoa, a admissao operacional e o contrato formal.

---

# Contexto

O repositorio ja consolidou uma decisao importante:

- `UC-ADM-001` e o cadastro-base do colaborador;
- `UC-ADM-005` formaliza o vinculo contratual;
- o modelo de dados central separa `Pessoa` de `VinculoTrabalhista`.

Esse tópico existe para conectar esses tres niveis:

1. cadastro civil e pessoal;
2. cadastro operacional do colaborador;
3. formalizacao do vinculo contratual.

---

# Mapa Do MVP

No MVP executavel, o cadastro operacional do colaborador e persistido como `Employee`.
Essa entidade funciona como a projecao operacional do `VinculoTrabalhista` no slice atual.

---

# Principio Central

O colaborador nao deve ser tratado como um unico registro atomico.

O sistema precisa separar:

- a pessoa fisica;
- o cadastro-base do colaborador;
- o vinculo formal com a empresa;
- os dependentes;
- os documentos;
- o historico funcional.

Isso evita misturar identidade, contrato, admissao e relacoes legais em um unico ponto de escrita.

---

# Escopo Do Tópico

## Inclui

- cadastro pessoal do colaborador;
- dados de contato;
- dados bancarios;
- dependentes;
- documentos pessoais e admissionais;
- cadastro-base de admissao;
- formalizacao do vinculo;
- mudancas contratuais basicas;
- referencias a empresa, filial, cargo, funcao, centro de custo e gestor;
- trilha de historico e auditoria.

## Nao inclui

- assinatura eletronica do contrato final;
- checklist documental completo;
- transmissao de eventos legais;
- provisionamento de acessos;
- calculos de folha;
- movimentacoes contratuais avancadas;
- encerramento do vinculo.

Esses itens pertencem aos topicos e modulos seguintes.

---

# Fluxo Conceitual

## 1. Registro da pessoa

O sistema cria ou identifica a `Pessoa` com os dados civis e pessoais essenciais.

Campos tipicos:

- nome completo;
- CPF;
- RG;
- data de nascimento;
- estado civil;
- nacionalidade;
- naturalidade;
- contatos;
- enderecos.

## 2. Cadastro-base do colaborador

O sistema cria o cadastro-base operacional do colaborador, associando a pessoa ao contexto da empresa.

Dados tipicos:

- empresa;
- filial;
- cargo;
- funcao;
- centro de custo;
- gestor;
- jornada;
- data de admissao prevista ou base inicial;
- status do cadastro.

No MVP, essa operacao grava `Employee` como projecao persistida do vinculo operacional.

## 3. Dependentes e dados complementares

O sistema registra dependentes e relacoes auxiliares para fins legais e operacionais.

Categorias:

- dependentes de IRRF;
- dependentes de salario-familia;
- dependentes de plano de saude;
- outros dependentes autorizados pela politica interna.

## 4. Formalizacao do vinculo

O vinculo contratual e criado como ato separado, com vigencia, tipo de contrato e dados trabalhistas.

Esse passo transforma o cadastro-base em relacao formal de trabalho.

## 5. Historico e auditoria

Cada etapa deve registrar:

- historico;
- autor da alteracao;
- data e hora;
- origem da operacao;
- escopo do tenant.

---

# Entidades Relevantes

## Pessoa

Identidade civil da pessoa fisica.

## Employee / Colaborador

Representacao operacional do cadastro-base no contexto da empresa.

No slice atual, `Employee` e a entidade fisica usada para ligar `Pessoa` e `Empresa`.
O conceito formal de `VinculoTrabalhista` permanece no dominio para a evolucao posterior do modelo.

## VinculoTrabalhista

Relacao formal entre pessoa e empresa.

## Dependente

Relacao derivada do colaborador para fins legais, fiscais e assistenciais.

## Documento

Artefato cadastral, admissional ou contratual que deve ser versionado e auditavel.

## Empresa / Filial / Cargo / Funcao / CentroDeCusto / Gestor

Entidades de referencia para o cadastro-base e para o vinculo.

---

# Regras De Negocio

## 1. Cadastro-base nao equivale a contrato

O cadastro-base do colaborador nao formaliza por si so o vinculo trabalhista.

## 2. Vínculo depende de cadastro minimo

Nao deve existir vinculo formal sem:

- pessoa identificada;
- empresa definida;
- cargo ou funcao definida conforme politica;
- jornada inicial definida quando aplicavel.

## 3. Unicidade de pessoa

CPF deve ser unico por pessoa no contexto de negocio aplicavel.

## 4. Historico imutavel

Atualizacoes de cadastro devem preservar a trilha de alteracoes.

## 5. Dependentes sao entidades proprias

Dependente nao deve ser apenas um campo solto dentro do cadastro principal.

## 6. Documentos sao anexos versionados

Os documentos associados ao colaborador ou ao vinculo precisam de versao, status e auditoria.

---

# Fronteiras Com Outros Topicos

## Com o topico 2

- usa o modelo de dados central como base;
- herda `Pessoa`, `Empresa`, `VinculoTrabalhista`, `Documento` e `Auditoria`.

## Com o topico 4

- a admissao digital completa a entrada documental e legal;
- a formalizacao do contrato e a transmissao de eventos ficam no próximo passo.

## Com o eSocial

- o cadastro-base pode preparar eventos;
- o vinculo formal e a referencia para transmissao legal.

---

# Recomendacao Tecnica

- separar tela, comando e persistencia para cadastro-base e para formalizacao do vinculo;
- manter cadastros pessoais em fluxo proprio;
- tratar dependentes como agregado independente;
- gravar qualquer mudanca como evento ou historico;
- evitar consolidar admissao e contrato em um unico request de escrita.

---

# Riscos

- confundir cadastro-base com formalizacao contratual;
- duplicar pessoa por falha de unicidade;
- esconder dependentes dentro de estruturas nao auditaveis;
- deixar documentos sem versionamento;
- misturar dados cadastrais, contratuais e admissionais no mesmo endpoint.

---

# Proximo Passo

Depois do cadastro e vinculo do colaborador, a ordem tecnica deve seguir para:

1. admissao digital e eSocial;
2. gestao contratual;
3. jornada, ponto e folha.
