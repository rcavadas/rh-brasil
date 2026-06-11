# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-002 - Gerenciar Certificado Digital

### Versao

1.0

---

# Objetivo

Gerenciar certificados digitais usados nas transmissoes do eSocial.

---

# Atores

- Administrador do Sistema
- Gestor de Seguranca

---

# Pre-condicoes

- Ambiente configurado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o certificado precisa ser cadastrado ou renovado.

---

# Fluxo Principal

1. Usuario acessa eSocial > Certificado.
2. Sistema apresenta a validade.
3. Usuario informa o certificado.
4. Sistema valida o arquivo e a vigencia.
5. Sistema grava a configuracao.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O certificado deve ter validade monitorada.
- Segredos nao podem ser expostos.

---

# Entidades Envolvidas

## EsocialDigitalCertificate

```text
id
tenant_id
expires_at
status
```

---

# Testes

- Registrar certificado valido.
- Bloquear certificado expirado.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso vem logo depois do ambiente e habilita a autenticacao criptografica das transmissoes.

---

# Estado de Implementacao

O runtime executavel atual depende de um certificado valido para o fluxo governamental, mas o contrato de gerencia de validade, renovacao e rotacao ainda precisa permanecer explicitado como caso de uso próprio.
