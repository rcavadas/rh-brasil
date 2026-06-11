# UC-ONB-003

## Coletar Dados Cadastrais

### Objetivo

Permitir a coleta e validacao de dados pessoais e bancarios do candidato.

---

# Atores

## Primarios

* Candidato

## Secundarios

* Onboarding
* Auditoria

---

# Pre-condicoes

* Processo de pre-admissao ativo.
* Convite aceito ou acesso liberado.

---

# Gatilho

O processo inicia quando o candidato preenche os dados cadastrais.

---

# Fluxo Principal

### Etapa 1

Candidato acessa o formulario.

### Etapa 2

Sistema coleta dados pessoais e bancarios.

### Etapa 3

Sistema valida consistencia basica.

### Etapa 4

Sistema grava as informacoes.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dado invalido

### Condicao

Algum campo obrigatorio e invalido.

### Fluxo

* Sistema bloqueia o envio.

---

# Pos-condicoes

* Dados coletados ou recusados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Dados pessoais devem seguir LGPD.
* Campos bancarios exigem validacao minima.

---

# Entidades Envolvidas

## PreAdmissionProfile

```text
id
pre_admission_id
full_name
email
bank_account_masked
updated_at
```

---

# Casos Relacionados

* UC-ONB-004 - Coletar Documentos Admissionais
* UC-SEC-005 - Registrar Consentimento
