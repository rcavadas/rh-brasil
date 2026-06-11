# Sistema de RH para o Mercado Brasileiro

# Topico 12 - Vertical Slice do Primeiro Release

## Objetivo

Definir o primeiro fluxo ponta a ponta a ser implementado para validar a arquitetura, o dominio e a operacao minima do produto.

---

# Contexto

A especificacao catalogada, os topicos tecnicos e o MVP proposto permitem escolher um caminho de entrega pequeno, mas representativo.

Este slice representa a primeira onda executavel do MVP consolidado nos topicos 10 e 11.

O primeiro slice precisa provar:

- stack executavel;
- autenticao;
- tenant;
- cadastro;
- admissao;
- ponto;
- folha;
- auditoria.

---

# Slice Recomendado

## Fluxo de ponta a ponta

1. criar tenant e empresa;
2. autenticar usuario;
3. cadastrar pessoa e colaborador;
4. formalizar vinculo basico;
5. executar admissao digital simplificada;
6. registrar uma marcacao de ponto;
7. consolidar evento de ponto;
8. gerar calculo simples de folha;
9. disponibilizar holerite ou demonstrativo basico;
10. registrar auditoria de todo o fluxo.

---

# Objetivo Do Slice

O slice nao precisa entregar cobertura total do dominio.

Ele precisa confirmar que:

- o sistema persiste dados corretamente;
- o tenant isola os registros;
- o fluxo de admissao funciona;
- o fluxo de ponto alimenta a folha;
- a auditoria registra cada evento;
- o resultado pode ser consultado por um usuario real.

---

# Componentes Necessarios

- backend com endpoints minimos;
- frontend com telas essenciais;
- banco com migrations;
- fila para tarefas assicronas simples;
- auth OIDC localmente provisionada;
- storage para documentos basicos;
- auditoria funcional;
- testes de integração do fluxo.

---

# Entregaveis Do Slice

## 1. Cadastro e identidade

- tenant;
- empresa;
- pessoa;
- colaborador;
- vinculo.

## 2. Operacao

- admissao simplificada;
- ponto minimo;
- consolidacao;
- calculo basico;
- holerite ou demonstrativo.

## 3. Governanca

- logs;
- auditoria;
- permissao por perfil;
- segregacao por tenant.

---

# Criterios De Aceite

- o fluxo deve rodar do inicio ao fim em ambiente local;
- o resultado deve ser reprodutivel;
- a falha em um passo nao pode corromper o historico;
- o tenant deve permanecer isolado;
- a auditoria deve registrar o caminho completo;
- o sistema deve permitir reexecucao controlada.

---

# O Que Fica Fora Do Primeiro Slice

- benefícios completos;
- férias completas;
- 13o completo;
- rescisao completa;
- BI avançado;
- integracoes externas complexas;
- workflow generico;
- GED completo;
- SST completo.

---

# Riscos

- tentar validar o produto inteiro de uma vez;
- fazer o slice sem auth ou tenant;
- ignorar auditoria;
- incluir muitos modulos transversais antes de fechar o fluxo principal;
- criar UI sem backend validado;
- fazer o calculo de folha sem consolidacao clara.

---

# Proximo Passo

Depois do vertical slice, a ordem de trabalho deve seguir para:

1. decomposicao em épicos e tarefas;
2. implementacao do backend;
3. implementacao do frontend;
4. testes de integração.
