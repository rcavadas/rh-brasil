
# Entidades do Domínio

## Pessoa
Entidade raiz do domínio.

### Responsabilidades
- Armazenar dados pessoais
- Servir de base para vínculos
- Permitir histórico de relacionamento com empresas

### Campos Principais
- id
- cpf
- nome_completo
- nome_social
- data_nascimento
- email
- telefone

## VinculoTrabalhista

Representa a relação entre Pessoa e Empresa.

### Categorias
- CLT
- Aprendiz
- Estagiário
- PCD
- Temporário
- Terceirizado
- PJ

### Estados
- Pré-admissão
- Ativo
- Afastado
- Licença
- Suspenso
- Desligado

## Empresa
Tenant proprietário dos dados.

## Cargo
Define responsabilidades e enquadramento organizacional.

## Departamento
Agrupador organizacional.

## Documento
Armazena documentos vinculados à pessoa ou vínculo.

## Movimentacao
Registra promoções, transferências e alterações.
