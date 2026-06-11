# UC-GED-007

## Consultar Prontuario Eletronico

### Objetivo

Permitir a consulta consolidada do prontuario do colaborador com filtros, controle de acesso e auditoria.

---

# Atores

## Primarios

* Gestor documental

## Secundarios

* Portal administrativo
* GED
* Auditoria

---

# Pre-condicoes

* Colaborador existente.
* Usuario autenticado.
* Permissao de consulta habilitada.

---

# Gatilho

O processo inicia quando o usuario abre o prontuario do colaborador.

---

# Fluxo Principal

### Etapa 1

Usuario seleciona o colaborador.

### Etapa 2

Sistema apresenta os documentos agrupados.

### Etapa 3

Usuario filtra por tipo, status ou periodo.

### Etapa 4

Sistema exibe o prontuario consolidado.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Documento protegido

### Condicao

Alguns anexos nao podem ser visualizados por aquele perfil.

### Fluxo

* Sistema omite os itens protegidos.

---

# Pos-condicoes

* Prontuario consultado.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* O acesso deve respeitar finalidade e perfil.
* O prontuario e uma visao consolidada, nao um espelho irrestrito.

---

# Entidades Envolvidas

## EmployeeDossier

```text
id
employee_id
document_count
last_updated_at
```

---

# Casos Relacionados

* UC-GED-002 - Anexar Documento ao Colaborador
* UC-ONB-004 - Coletar Documentos Admissionais
