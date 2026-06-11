# Sistema de RH para o Mercado Brasileiro

# Regras de Negócio (RN)

## Bloco 03 – Folha de Pagamento

### Versão

1.0

### Objetivo

Este documento descreve as regras de negócio relacionadas ao processamento da folha de pagamento, rubricas, proventos, descontos, encargos, bases legais, fechamento, integração com eSocial e FGTS Digital.

---

# Estrutura da Folha

## RN-141

Toda folha de pagamento deve possuir competência de apuração.

## RN-142

A competência deve ser representada por mês e ano.

## RN-143

O sistema deve permitir folha mensal.

## RN-144

O sistema deve permitir folha complementar.

## RN-145

O sistema deve permitir folha de adiantamento salarial.

## RN-146

O sistema deve permitir folha de 13º salário.

## RN-147

O sistema deve permitir folha de férias.

## RN-148

O sistema deve permitir folha de rescisão.

## RN-149

Cada colaborador deve possuir cálculo individualizado.

## RN-150

O sistema deve impedir fechamento de folha com cálculo pendente.

---

# Rubricas

## RN-151

Toda rubrica deve possuir código interno único.

## RN-152

Toda rubrica deve possuir descrição.

## RN-153

Toda rubrica deve possuir natureza: provento, desconto, informativa ou base.

## RN-154

Toda rubrica deve possuir incidência de INSS configurada.

## RN-155

Toda rubrica deve possuir incidência de FGTS configurada.

## RN-156

Toda rubrica deve possuir incidência de IRRF configurada.

## RN-157

Toda rubrica deve possuir classificação compatível com o eSocial.

## RN-158

Alterações em rubricas devem manter histórico.

## RN-159

Rubricas utilizadas em folha fechada não podem ser excluídas.

## RN-160

Rubricas inativas não podem ser utilizadas em novos lançamentos.

---

# Proventos

## RN-161

O salário-base deve ser calculado conforme salário contratual vigente.

## RN-162

Alterações salariais devem ser consideradas conforme data de vigência.

## RN-163

Horas extras aprovadas devem ser importadas do módulo de ponto.

## RN-164

Adicional noturno aprovado deve compor a folha quando aplicável.

## RN-165

Comissões devem permitir lançamento manual ou importação externa.

## RN-166

Prêmios e bonificações devem possuir rubrica própria.

## RN-167

Adicionais de insalubridade devem ser calculados conforme parametrização legal ou sindical.

## RN-168

Adicionais de periculosidade devem ser calculados conforme parametrização legal.

## RN-169

DSR deve ser calculado quando houver verba variável aplicável.

## RN-170

Verbas variáveis devem possuir memória de cálculo.

---

# Descontos

## RN-171

Faltas injustificadas devem gerar desconto em folha.

## RN-172

Atrasos não abonados devem gerar desconto em folha.

## RN-173

Saídas antecipadas não abonadas devem gerar desconto em folha.

## RN-174

Descontos de vale-transporte devem respeitar limite legal aplicável.

## RN-175

Descontos de benefícios devem seguir política contratada pela empresa.

## RN-176

Desconto de plano de saúde deve permitir coparticipação.

## RN-177

Pensão alimentícia deve ser calculada conforme ordem judicial cadastrada.

## RN-178

Empréstimos consignados devem respeitar margem consignável quando aplicável.

## RN-179

Contribuições sindicais somente devem ser descontadas quando houver autorização ou base legal aplicável.

## RN-180

Todo desconto deve possuir origem rastreável.

---

# INSS

## RN-181

O sistema deve calcular INSS conforme tabela vigente da competência.

## RN-182

O cálculo de INSS deve considerar faixas progressivas quando aplicável.

## RN-183

Rubricas sem incidência de INSS não devem compor a base previdenciária.

## RN-184

O sistema deve controlar teto previdenciário.

## RN-185

O sistema deve permitir múltiplos vínculos para cálculo previdenciário quando informado.

## RN-186

A base de INSS deve ser armazenada por colaborador e competência.

## RN-187

O valor descontado de INSS deve possuir memória de cálculo.

## RN-188

Diferenças de INSS em folha complementar devem ser recalculadas.

## RN-189

O sistema deve gerar totalizadores previdenciários para conferência.

## RN-190

O sistema deve impedir fechamento quando houver inconsistência de base previdenciária.

---

# FGTS

## RN-191

O sistema deve calcular FGTS conforme base de incidência configurada nas rubricas.

## RN-192

Rubricas sem incidência de FGTS não devem compor a base fundiária.

## RN-193

O percentual de FGTS deve ser parametrizável conforme tipo de vínculo.

## RN-194

O sistema deve calcular FGTS de competências mensais.

## RN-195

O sistema deve calcular FGTS de 13º salário.

## RN-196

O sistema deve calcular FGTS de verbas rescisórias quando aplicável.

## RN-197

A base de FGTS deve ser armazenada por colaborador e competência.

## RN-198

O sistema deve gerar informações compatíveis com o FGTS Digital.

## RN-199

Divergências entre folha e FGTS Digital devem gerar alerta de conferência.

## RN-200

O sistema deve manter memória de cálculo do FGTS.

---

# IRRF

## RN-201

O sistema deve calcular IRRF conforme tabela vigente da competência.

## RN-202

A base de IRRF deve considerar rubricas tributáveis.

## RN-203

Rubricas isentas não devem compor a base de IRRF.

## RN-204

O sistema deve considerar deduções legais aplicáveis.

## RN-205

Dependentes válidos devem ser considerados no cálculo quando aplicável.

## RN-206

Pensão alimentícia deve ser considerada como dedução quando aplicável.

## RN-207

O sistema deve permitir cálculo de IRRF sobre férias.

## RN-208

O sistema deve permitir cálculo de IRRF sobre 13º salário.

## RN-209

O valor de IRRF deve possuir memória de cálculo.

## RN-210

O sistema deve armazenar base tributável por colaborador e competência.

---

# Salário-Família

## RN-211

O sistema deve verificar elegibilidade para salário-família.

## RN-212

A elegibilidade deve considerar remuneração e dependentes válidos.

## RN-213

Dependentes utilizados para salário-família devem possuir documentação exigida.

## RN-214

O valor deve seguir tabela vigente da competência.

## RN-215

O sistema deve registrar memória de cálculo do salário-família.

---

# Afastamentos e Ocorrências

## RN-216

Afastamentos devem impactar a folha conforme tipo e período.

## RN-217

Férias devem ser consideradas conforme período de gozo.

## RN-218

Licença-maternidade deve possuir tratamento específico.

## RN-219

Auxílio-doença deve possuir tratamento específico conforme responsabilidade de pagamento.

## RN-220

Suspensões contratuais devem impactar remuneração conforme período informado.

---

# Integração com Ponto

## RN-221

Horas extras somente devem ser processadas após aprovação.

## RN-222

Banco de horas pago deve gerar rubrica própria.

## RN-223

Faltas importadas do ponto devem ser classificadas como justificadas ou injustificadas.

## RN-224

Atrasos importados do ponto devem possuir critério de tolerância configurável.

## RN-225

Eventos de ponto reprocessados devem gerar alerta para recálculo da folha.

---

# Fechamento da Folha

## RN-226

A folha deve possuir status: aberta, em cálculo, conferida, fechada ou reaberta.

## RN-227

A folha fechada não pode ser alterada sem processo formal de reabertura.

## RN-228

A reabertura da folha deve exigir justificativa.

## RN-229

A reabertura deve registrar usuário, data e motivo.

## RN-230

Após fechamento, o sistema deve gerar resumo financeiro da folha.

## RN-231

Após fechamento, o sistema deve gerar resumo de encargos.

## RN-232

Após fechamento, o sistema deve disponibilizar holerites.

## RN-233

Após fechamento, o sistema deve preparar eventos para o eSocial.

## RN-234

O fechamento deve bloquear alterações em lançamentos utilizados no cálculo.

## RN-235

O sistema deve permitir simulação antes do fechamento.

---

# Holerite

## RN-236

Todo colaborador com remuneração processada deve possuir holerite.

## RN-237

O holerite deve apresentar proventos.

## RN-238

O holerite deve apresentar descontos.

## RN-239

O holerite deve apresentar bases de INSS, FGTS e IRRF.

## RN-240

O holerite deve apresentar valor líquido.

## RN-241

O holerite deve ser disponibilizado no portal do colaborador.

## RN-242

O sistema deve registrar data de disponibilização do holerite.

## RN-243

O sistema deve permitir segunda via do holerite.

## RN-244

O acesso ao holerite deve respeitar controle de permissão.

## RN-245

O holerite deve manter histórico por competência.

---

# Pagamento Bancário

## RN-246

O sistema deve gerar arquivo bancário para pagamento de salários.

## RN-247

O leiaute bancário deve ser parametrizável por banco.

## RN-248

Dados bancários inválidos devem impedir geração do pagamento.

## RN-249

O sistema deve permitir pagamento por conta corrente, conta salário ou PIX quando suportado.

## RN-250

O sistema deve registrar data prevista de pagamento.

## RN-251

O sistema deve registrar status do arquivo bancário.

## RN-252

O sistema deve permitir conciliação de pagamentos.

## RN-253

Pagamentos rejeitados devem gerar pendência.

## RN-254

Reprocessamentos de pagamento devem manter histórico.

## RN-255

O sistema deve proteger dados bancários sensíveis.

---

# eSocial

## RN-256

A folha mensal deve gerar evento S-1200 quando aplicável.

## RN-257

Pagamentos devem gerar evento S-1210 quando aplicável.

## RN-258

O fechamento da folha deve gerar evento S-1299 quando aplicável.

## RN-259

Eventos rejeitados pelo eSocial devem permanecer pendentes de correção.

## RN-260

O recibo retornado pelo eSocial deve ser armazenado.

## RN-261

O sistema deve permitir reenvio de eventos corrigidos.

## RN-262

O sistema deve registrar protocolo de transmissão.

## RN-263

O sistema deve impedir fechamento final com eventos obrigatórios rejeitados.

## RN-264

O sistema deve gerar relatório de inconsistências do eSocial.

## RN-265

Totalizadores retornados pelo eSocial devem ser conciliados com a folha.

---

# Auditoria e Segurança

## RN-266

Todo cálculo de folha deve possuir memória de cálculo.

## RN-267

Toda alteração manual em lançamento deve possuir justificativa.

## RN-268

Toda alteração manual deve registrar usuário, data e hora.

## RN-269

O sistema deve controlar permissões para cálculo, conferência e fechamento.

## RN-270

Usuários sem permissão não podem visualizar valores salariais.

## RN-271

O sistema deve registrar exportações de dados de folha.

## RN-272

O sistema deve proteger dados pessoais e financeiros conforme LGPD.

## RN-273

O sistema deve manter trilha de auditoria completa.

## RN-274

O sistema deve permitir auditoria por competência.

## RN-275

O sistema deve permitir auditoria por colaborador.

---

# Relatórios de Folha

## RN-276

O sistema deve gerar relatório analítico da folha.

## RN-277

O sistema deve gerar relatório sintético da folha.

## RN-278

O sistema deve gerar relatório de encargos.

## RN-279

O sistema deve gerar relatório de líquidos bancários.

## RN-280

O sistema deve gerar relatório de bases legais.

## RN-281

O sistema deve gerar relatório de divergências.

## RN-282

O sistema deve gerar relatório de rubricas por competência.

## RN-283

O sistema deve gerar relatório de provisões quando aplicável.

## RN-284

O sistema deve permitir exportação em formatos abertos.

## RN-285

Toda exportação deve respeitar permissões de acesso.

---

# Resumo do Bloco

Este bloco contempla:

* Estrutura da folha de pagamento
* Rubricas
* Proventos
* Descontos
* INSS
* FGTS
* IRRF
* Salário-família
* Afastamentos
* Integração com ponto
* Fechamento da folha
* Holerite
* Pagamento bancário
* eSocial
* Auditoria
* Relatórios

---

# Próximo Bloco

## Bloco 04 – Benefícios

Faixa prevista:

**RN-286 a RN-340**

Abrangendo:

* Vale-transporte
* Vale-refeição
* Vale-alimentação
* Plano de saúde
* Plano odontológico
* Seguro de vida
* Coparticipação
* Elegibilidade
* Integração com fornecedores
* Descontos em folha
* Auditoria de benefícios
