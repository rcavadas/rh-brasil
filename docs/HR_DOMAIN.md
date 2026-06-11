# Domínio de RH

## Regras confirmadas

- Pessoa e a entidade raiz do dominio.
- VinculoTrabalhista representa a relacao entre Pessoa e Empresa.
- Todo vinculo pertence a uma empresa.
- Todo evento relevante gera historico e auditoria.
- Historico e imutavel.
- Integracoes nao podem alterar o historico de forma retroativa.
- No MVP, `Employee` e a projecao operacional de `VinculoTrabalhista`; o conceito fica reservado para a evolucao posterior do modelo.

## Módulos

### Colaboradores

- Baseados em Pessoa e VinculoTrabalhista, com campos pessoais, historico e relacoes com empresa.

### Admissão

- A documentacao inclui coleta documental, contrato, assinatura e eSocial.

### Férias

- Faz parte do ciclo de vida operacional e deve respeitar controle historico.

### Ponto e jornada

- Existe pacote especifico de jornada, ponto, banco de horas, horas extras e espelho de ponto.

### Benefícios

- Previsto como modulo de operacao e relacionamento do colaborador.

### Avaliações

- Previstas como parte da operacao e do ciclo de desenvolvimento.

### Relatórios

- Incluem uso gerencial e auditoria, ainda sem regras finais consolidadas.

## Hipóteses a validar

- Quais regras sao apenas produto e quais exigem validacao juridica/contabil?
- Quais partes do dominio entram no MVP.
- Qual nivel de detalhe historico e auditoria sera exigido por modulo.
