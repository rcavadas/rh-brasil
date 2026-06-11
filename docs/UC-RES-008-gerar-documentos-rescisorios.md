# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-RES-008 - Gerar Documentos Rescisorios

### Versao

1.0

---

# Objetivo

Gerar termos, guias e comprovantes rescisorios com rastreabilidade e vinculo ao desligamento.

---

# Atores

- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Rescisao calculada.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando os documentos rescisorios precisam ser emitidos.

---

# Fluxo Principal

1. Usuario acessa Rescisao > Documentos.
2. Sistema apresenta documentos disponiveis.
3. Usuario confirma a geracao.
4. Sistema produz os documentos.
5. Sistema registra assinatura ou aceite quando aplicavel.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- Os documentos devem refletir os calculos rescisorios.
- A trilha documental deve ser preservada.

---

# Entidades Envolvidas

## TerminationDocument

```text
id
termination_request_id
document_type
file_reference
status
```

---

# Testes

- Gerar documentos validos.
- Bloquear sem calculo.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso formaliza os artefatos da rescisao depois dos calculos e antes do fechamento.
