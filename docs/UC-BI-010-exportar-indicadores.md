# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-BI-010 - Exportar Indicadores

### Versao

1.0

---

# Objetivo

Permitir exportar indicadores de BI em formatos autorizados, com controle de escopo, finalidade, registro de auditoria e mascaramento de dados quando aplicavel.

---

# Atores

- Analista de BI
- Gestor de RH
- Diretor
- Auditor
- Administrador do Sistema

---

# Pre-condicoes

- Usuario autenticado.
- Permissao para exportar indicadores.
- Indicadores consolidados disponiveis.
- Finalidade de exportacao configurada.

---

# Gatilho

O usuario solicita a exportacao de indicadores.

---

# Fluxo Principal

1. Usuario seleciona os indicadores a exportar.
2. Sistema apresenta formatos permitidos.
3. Usuario define periodo, escopo e formato.
4. Sistema valida permissao e finalidade.
5. Sistema exporta os dados autorizados.
6. Sistema registra auditoria e log de exportacao.

---

# Fluxos Alternativos

## FA-01 - Escopo excessivo

Sistema bloqueia ou reduz o escopo.

## FA-02 - Permissao insuficiente

Sistema bloqueia o acesso.

## FA-03 - Formato nao suportado

Sistema solicita novo formato.

---

# Regras de Negocio

- Exportacoes devem ser limitadas por finalidade e perfil.
- Dados pessoais desnecessarios devem ser omitidos ou agregados.
- Toda exportacao deve ser auditavel.

---

# Entidades

- BIExportRequest
- BIExportLog
- BIKpiSnapshot

---

# Permissoes

| Perfil | Permissao |
|---|---|
| RH Admin | Consulta total |
| RH BI | Consulta total |
| Gestor | Consulta restrita |
| Colaborador | Nao |
| Auditor | Consulta |

---

# APIs

```http
POST /api/v1/bi/exports
```

---

# Eventos

```text
BIIndicatorsExportRequested
BIIndicatorsExportGenerated
BIIndicatorsExportDenied
```

---

# Integracoes

- Auditoria
- Data warehouse / analytics
- Gestao documental

---

# Testes

- Exportar indicadores validos.
- Exportar sem permissao.
- Exportar com escopo excessivo.

---

# Metricas

- Exportacoes por periodo
- Exportacoes por perfil
- Exportacoes bloqueadas

