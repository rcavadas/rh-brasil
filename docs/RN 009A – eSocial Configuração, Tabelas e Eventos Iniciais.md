# Sistema de RH para o Mercado Brasileiro

# Regras de Negócio (RN)

## Bloco 09A – eSocial: Configuração, Tabelas e Eventos Iniciais

### Versão

1.0

### Objetivo

Este documento descreve as regras de negócio relacionadas à configuração do ambiente eSocial, manutenção das tabelas obrigatórias e transmissão dos eventos iniciais necessários para operação do sistema.

---

# Configuração do Ambiente eSocial

## RN-901

O sistema deve permitir configuração do ambiente de produção do eSocial.

## RN-902

O sistema deve permitir configuração do ambiente de testes do eSocial.

## RN-903

Cada empresa deve possuir configuração independente de ambiente.

## RN-904

O sistema deve permitir utilização de certificado digital compatível com os requisitos governamentais.

## RN-905

O certificado digital deve possuir controle de validade.

## RN-906

O sistema deve alertar sobre vencimento próximo do certificado digital.

## RN-907

O sistema deve impedir transmissões com certificado expirado.

## RN-908

O sistema deve registrar histórico de certificados utilizados.

## RN-909

O sistema deve registrar todas as transmissões realizadas.

## RN-910

Toda configuração deve possuir trilha de auditoria.

---

# Cadastro da Empresa para o eSocial

## RN-911

Toda empresa deve possuir dados cadastrais compatíveis com o eSocial.

## RN-912

O CNPJ informado deve ser validado.

## RN-913

O sistema deve controlar natureza jurídica.

## RN-914

O sistema deve controlar classificação tributária.

## RN-915

O sistema deve controlar informações de produtor rural quando aplicável.

## RN-916

O sistema deve controlar informações de construção civil quando aplicável.

## RN-917

O sistema deve controlar informações de desoneração quando aplicável.

## RN-918

Alterações cadastrais devem manter histórico.

## RN-919

O sistema deve validar obrigatoriedade dos campos.

## RN-920

Toda alteração cadastral deve ser auditável.

---

# Evento S-1000 – Informações do Empregador

## RN-921

O sistema deve permitir geração do evento S-1000.

## RN-922

O evento S-1000 deve utilizar os dados cadastrais vigentes da empresa.

## RN-923

O sistema deve validar todos os campos obrigatórios antes da transmissão.

## RN-924

O sistema deve impedir envio com informações inconsistentes.

## RN-925

O sistema deve armazenar XML transmitido.

## RN-926

O sistema deve armazenar XML de retorno.

## RN-927

O sistema deve registrar recibo retornado pelo governo.

## RN-928

O sistema deve permitir retificação do S-1000 quando aplicável.

## RN-929

O sistema deve controlar histórico de versões transmitidas.

## RN-930

Toda transmissão deve ser auditável.

---

# Evento S-1005 – Tabela de Estabelecimentos

## RN-931

O sistema deve permitir cadastro de estabelecimentos.

## RN-932

Todo estabelecimento deve possuir identificação válida.

## RN-933

O sistema deve controlar matriz e filiais.

## RN-934

O sistema deve permitir geração do evento S-1005.

## RN-935

O sistema deve controlar vigência dos estabelecimentos.

## RN-936

Alterações devem manter histórico.

## RN-937

O sistema deve impedir envio de estabelecimentos inconsistentes.

## RN-938

O sistema deve armazenar recibos de transmissão.

## RN-939

O sistema deve permitir retificação quando aplicável.

## RN-940

Toda movimentação deve ser auditável.

---

# Evento S-1010 – Tabela de Rubricas

## RN-941

Toda rubrica utilizada na folha deve possuir correspondência no eSocial.

## RN-942

O sistema deve permitir geração do evento S-1010.

## RN-943

As incidências tributárias devem ser compatíveis com a legislação vigente.

## RN-944

Rubricas sem parametrização não devem ser transmitidas.

## RN-945

O sistema deve controlar vigência das rubricas.

## RN-946

Alterações devem manter histórico.

## RN-947

O sistema deve permitir inativação de rubricas.

## RN-948

Rubricas utilizadas em eventos transmitidos não podem ser excluídas.

## RN-949

O sistema deve registrar versões enviadas.

## RN-950

Toda alteração deve ser auditável.

---

# Evento S-1020 – Tabela de Lotações Tributárias

## RN-951

O sistema deve permitir cadastro de lotações tributárias.

## RN-952

Toda lotação deve possuir código único.

## RN-953

Toda lotação deve possuir classificação válida.

## RN-954

O sistema deve permitir geração do evento S-1020.

## RN-955

O sistema deve controlar vigência das lotações.

## RN-956

Alterações devem manter histórico.

## RN-957

O sistema deve validar consistência das informações.

## RN-958

O sistema deve registrar recibos de transmissão.

## RN-959

O sistema deve permitir retificação.

## RN-960

Toda alteração deve ser auditável.

---

# Evento S-1030 – Tabela de Cargos

## RN-961

O sistema deve permitir cadastro de cargos.

## RN-962

Todo cargo deve possuir identificação única.

## RN-963

O sistema deve controlar vigência dos cargos.

## RN-964

O sistema deve permitir geração do evento S-1030.

## RN-965

O sistema deve impedir exclusão de cargos utilizados.

## RN-966

Alterações devem manter histórico.

## RN-967

O sistema deve registrar versões transmitidas.

## RN-968

O sistema deve permitir retificação.

## RN-969

O sistema deve armazenar recibos de transmissão.

## RN-970

Toda alteração deve possuir trilha de auditoria.

---

# Evento S-1070 – Processos Administrativos e Judiciais

## RN-971

O sistema deve permitir cadastro de processos administrativos.

## RN-972

O sistema deve permitir cadastro de processos judiciais.

## RN-973

Todo processo deve possuir número identificador.

## RN-974

Todo processo deve possuir vigência.

## RN-975

O sistema deve permitir vinculação de processos a rubricas.

## RN-976

O sistema deve permitir vinculação de processos a tributos.

## RN-977

O sistema deve permitir geração do evento S-1070.

## RN-978

Alterações devem manter histórico.

## RN-979

O sistema deve registrar recibos de transmissão.

## RN-980

Toda movimentação deve ser auditável.

---

# Controle de Vigência

## RN-981

Toda tabela do eSocial deve possuir vigência inicial.

## RN-982

O sistema deve permitir vigência final quando aplicável.

## RN-983

Registros com vigência encerrada não devem ser utilizados em novos eventos.

## RN-984

O sistema deve validar sobreposição de vigências.

## RN-985

O sistema deve impedir inconsistências cronológicas.

## RN-986

Toda alteração de vigência deve manter histórico.

## RN-987

O sistema deve registrar usuário responsável pela alteração.

## RN-988

Toda alteração deve possuir data e hora registradas.

## RN-989

O sistema deve permitir consulta histórica das vigências.

## RN-990

Toda movimentação deve ser auditável.

---

# Validação e Consistência

## RN-991

O sistema deve validar obrigatoriedade de campos antes da transmissão.

## RN-992

O sistema deve validar integridade referencial entre tabelas.

## RN-993

O sistema deve validar dependências entre eventos.

## RN-994

O sistema deve impedir transmissão fora da sequência exigida.

## RN-995

Eventos rejeitados devem permanecer pendentes.

## RN-996

O sistema deve registrar motivo da rejeição.

## RN-997

O sistema deve permitir correção dos dados.

## RN-998

O sistema deve permitir retransmissão dos eventos corrigidos.

## RN-999

Toda rejeição deve ser auditável.

## RN-1000

Todo processamento do eSocial deve possuir trilha completa de auditoria.

---

# Resumo do Bloco

Este bloco contempla:

* Configuração do ambiente eSocial
* Certificados digitais
* Cadastro do empregador
* S-1000
* S-1005
* S-1010
* S-1020
* S-1030
* S-1070
* Controle de vigência
* Validações
* Consistência de dados
* Auditoria regulatória

---

# Próximo Bloco

## Bloco 09B – eSocial: Eventos Trabalhistas e Periódicos

Faixa prevista:

**RN-1001 a RN-1150**

Abrangendo:

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
* Reabertura
* Retificações
* Exclusões
