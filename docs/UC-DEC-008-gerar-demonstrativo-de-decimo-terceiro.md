# UC-DEC-008

## Gerar Demonstrativo de Decimo Terceiro

### Objetivo

Permitir a geracao do demonstrativo do 13o com memoria e auditoria.

---

# Atores

## Primarios

* Motor de 13o

## Secundarios

* GED
* Auditoria

---

# Pre-condicoes

* Calculos concluídos ou em andamento.

---

# Gatilho

O processo inicia quando o demonstrativo e gerado.

---

# Fluxo Principal

### Etapa 1

Sistema compila os dados.

### Etapa 2

Sistema gera o demonstrativo.

### Etapa 3

Sistema vincula a memoria de calculo.

### Etapa 4

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Dados incompletos

### Condicao

Nao ha base suficiente.

### Fluxo

* Sistema sinaliza a pendencia.

---

# Pos-condicoes

* Demonstrativo gerado ou bloqueado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O demonstrativo deve ser rastreavel.
* A memoria de calculo nao pode ser perdida.

---

# Entidades Envolvidas

## ThirteenthSalaryStatement

```text
id
employee_id
status
document_id
generated_at
```

---

# Casos Relacionados

* UC-GED-003 - Gerar Documento Automaticamente
* UC-DEC-009 - Fechar Folha de Decimo Terceiro
