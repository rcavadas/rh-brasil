# Sistema de RH para o Mercado Brasileiro

# Regras de Negócio (RN)

## Bloco 01 – Admissão e Cadastro

### Versão

1.0

### Objetivo

Este documento descreve as regras de negócio relacionadas ao processo de admissão, cadastro de colaboradores, estrutura organizacional e integração inicial com o eSocial.

---

# Cadastro de Colaboradores

## RN-001

O colaborador deve possuir CPF válido para ser admitido.

## RN-002

Não deve ser permitida a admissão de colaborador com CPF já vinculado a contrato ativo na mesma empresa.

## RN-003

O CPF informado deve ser validado através do algoritmo oficial da Receita Federal.

## RN-004

Todo colaborador deve possuir matrícula única dentro da empresa.

## RN-005

A matrícula não poderá ser reutilizada após desligamento.

## RN-006

A data de admissão não pode ser posterior à data atual.

## RN-007

A data de admissão não pode ser anterior à constituição da empresa.

## RN-008

Toda admissão deve possuir cargo vinculado.

## RN-009

Toda admissão deve possuir lotação vinculada.

## RN-010

Toda admissão deve possuir centro de custo vinculado.

---

# Documentação Obrigatória

## RN-011

O sistema deve impedir conclusão da admissão sem os documentos obrigatórios definidos pela empresa.

## RN-012

A lista mínima de documentos deve ser parametrizável.

## RN-013

Documentos obrigatórios podem variar conforme o tipo de contrato.

## RN-014

O sistema deve registrar data de envio de cada documento.

## RN-015

O sistema deve registrar usuário responsável pela aprovação documental.

---

# Dependentes

## RN-016

Dependentes para IRRF devem possuir CPF quando exigido pela legislação vigente.

## RN-017

Um dependente não poderá ser cadastrado duas vezes para o mesmo colaborador.

## RN-018

Dependentes devem possuir grau de parentesco informado.

## RN-019

O sistema deve registrar início e término da vigência da dependência.

---

# Contratação CLT

## RN-020

Todo contrato CLT deve possuir salário contratual.

## RN-021

Todo contrato CLT deve possuir jornada cadastrada.

## RN-022

Todo contrato CLT deve possuir categoria eSocial.

## RN-023

O tipo de vínculo empregatício deve seguir tabela oficial do eSocial.

## RN-024

O sistema deve impedir admissão sem categoria válida do eSocial.

---

# Contrato de Experiência

## RN-025

Contrato de experiência deve possuir prazo determinado.

## RN-026

O prazo inicial não pode exceder 90 dias.

## RN-027

A soma das prorrogações não pode ultrapassar 90 dias.

## RN-028

A segunda prorrogação deve gerar alerta de risco trabalhista.

---

# Programa de Aprendizagem

## RN-029

Aprendizes devem respeitar os limites de idade previstos na legislação vigente.

## RN-030

Aprendizes devem possuir entidade formadora vinculada.

## RN-031

A jornada do aprendiz deve respeitar os limites legais estabelecidos para a categoria.

---

# Estágio

## RN-032

Estagiários devem possuir instituição de ensino vinculada.

## RN-033

Estagiários devem possuir supervisor responsável.

## RN-034

O estágio deve possuir data de término definida.

## RN-035

O sistema deve alertar automaticamente sobre vencimento do contrato de estágio.

---

# Pessoa com Deficiência (PCD)

## RN-036

O sistema deve permitir classificação de colaborador como Pessoa com Deficiência (PCD).

## RN-037

O tipo de deficiência deve ser informado.

## RN-038

O sistema deve armazenar laudo comprobatório.

## RN-039

Os dados de PCD devem alimentar relatórios legais e indicadores corporativos.

---

# Estrutura Organizacional

## RN-040

Todo colaborador deve estar vinculado a uma unidade organizacional.

## RN-041

Mudanças organizacionais devem manter histórico.

## RN-042

Alterações de cargo não podem sobrescrever registros anteriores.

## RN-043

Toda movimentação organizacional deve possuir data de vigência.

---

# Integração com eSocial

## RN-044

Toda admissão efetivada deve gerar evento S-2200.

## RN-045

Admissões preliminares devem permitir envio do evento S-2190.

## RN-046

Eventos rejeitados pelo eSocial devem permanecer pendentes de regularização.

## RN-047

Eventos rejeitados devem registrar motivo detalhado da rejeição.

## RN-048

Eventos corrigidos devem ser reenviados ao eSocial.

## RN-049

O número do recibo retornado pelo eSocial deve ser armazenado para auditoria.

## RN-050

Nenhuma admissão poderá ser considerada concluída sem confirmação do envio obrigatório ao eSocial quando exigido pela legislação.

---

# Resumo do Bloco

Este bloco contempla:

* Cadastro de colaboradores
* Documentação admissional
* Dependentes
* Contratação CLT
* Contrato de experiência
* Programa Jovem Aprendiz
* Estágio
* Pessoas com Deficiência (PCD)
* Estrutura organizacional
* Integração inicial com o eSocial

---

# Próximo Bloco

**Bloco 02 – Jornada, Controle de Ponto e Banco de Horas**

Faixa prevista de regras:

**RN-051 a RN-120**

Abrangendo:

* Portaria MTP nº 671/2021
* Jornada de trabalho
* Escalas
* Banco de horas
* Horas extras
* Adicional noturno
* Faltas
* Atrasos
* Compensações
* Espelho de ponto
* Aprovações gerenciais
* Auditoria de marcações
