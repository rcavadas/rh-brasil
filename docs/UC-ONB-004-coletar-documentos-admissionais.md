# UC-ONB-004

## Coletar Documentos Admissionais

### Objetivo

Permitir o upload, conferência e vinculacao dos documentos admissionais.

---

# Atores

## Primarios

* Candidato

## Secundarios

* GED
* Onboarding
* Auditoria

---

# Pre-condicoes

* Processo de pre-admissao ativo.
* Lista documental definida.

---

# Gatilho

O processo inicia quando os documentos sao enviados.

---

# Fluxo Principal

### Etapa 1

Candidato envia arquivos.

### Etapa 2

Sistema valida formato e integridade.

### Etapa 3

Sistema vincula os documentos ao prontuario.

### Etapa 4

Sistema marca itens pendentes ou completos.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Documento rejeitado

### Condicao

O arquivo nao atende a politica.

### Fluxo

* Sistema rejeita o documento e sinaliza o motivo.

---

# Pos-condicoes

* Documentos anexados ou rejeitados.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* Documentos devem ser categorizados.
* A validacao precisa preservar rastreabilidade.

---

# Entidades Envolvidas

## AdmissionDocument

```text
id
onboarding_process_id
document_type
status
uploaded_at
```

---

# Casos Relacionados

* UC-ONB-005 - Executar Checklist Admissional
* UC-GED-002 - Anexar Documento ao Colaborador
