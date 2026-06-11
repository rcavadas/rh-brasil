# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BEN-009 - Importar Coparticipacao

### Versao

1.0

---

# Objetivo

Importar valores de coparticipacao e rateios relacionados aos beneficios.

---

# Atores

- Analista de Folha
- Analista de RH

---

# Pre-condicoes

- Dados de coparticipacao disponiveis.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a coparticipacao precisa ser importada.

---

# Fluxo Principal

1. Usuario acessa Beneficios > Coparticipacao.
2. Sistema apresenta arquivo ou lote disponivel.
3. Usuario confirma a importacao.
4. Sistema valida valores e rateios.
5. Sistema registra a importacao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A importacao deve ser rastreavel.
- O valor importado deve ser consistente com o beneficio.

---

# Entidades Envolvidas

## BenefitCopayImport

```text
id
benefit_id
source_reference
status
imported_at
```

---

# Testes

- Importar coparticipacao valida.
- Bloquear arquivo inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a camada de entrada financeira do pacote de beneficios.
