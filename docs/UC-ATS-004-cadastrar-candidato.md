# UC-ATS-004

## Cadastrar Candidato

### Objetivo

Permitir o cadastro de candidatos com dados basicos, origem e consentimentos aplicaveis.

---

# Atores

## Primarios

* Recrutador

## Secundarios

* ATS
* Auditoria

---

# Pre-condicoes

* Vaga existente ou origem externa reconhecida.
* Usuario autenticado.

---

# Gatilho

O processo inicia quando um candidato e cadastrado no ATS.

---

# Fluxo Principal

### Etapa 1

Usuario informa nome, contato e origem.

### Etapa 2

Sistema valida duplicidade basica.

### Etapa 3

Sistema grava o candidato.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Possivel duplicidade

### Condicao

Existe candidato similar.

### Fluxo

* Sistema sinaliza a duplicidade e permite revisao.

---

# Pos-condicoes

* Candidato criado ou sinalizado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O candidato deve ficar vinculado ao tenant.
* Dados pessoais devem seguir LGPD.

---

# Entidades Envolvidas

## Candidate

```text
id
tenant_id
full_name
email
phone
source
status
```

---

# Casos Relacionados

* UC-ATS-005 - Triar Curriculo
* UC-ATS-006 - Movimentar Candidato no Pipeline
