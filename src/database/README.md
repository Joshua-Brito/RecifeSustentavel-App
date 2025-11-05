# Base de Dados - Recife Sustentável

Sistema completo de gerenciamento de resíduos inteligente com gamificação.

## 📋 Estrutura

### Tabelas Principais

#### 1. **USUARIO**
Armazena dados dos usuários do sistema.
- **Campos principais**: nome, cpf, email, saldo_capivaras, nivel_penalidade, status_conta
- **Gamificação**: nivel_usuario (Iniciante → Reciclador → Guardião Verde → Eco-Herói → Eco-Lenda)
- **Segurança**: senha_hash (bcrypt), UUID para integração com Supabase Auth

#### 2. **LIXEIRA_INTELIGENTE**
Registro de lixeiras com scanner AI e geolocalização.
- **Geolocalização**: latitude, longitude, coordenadas (PostGIS GEOGRAPHY)
- **Tipos**: orgânico, reciclável, eletrônico, metal, vidro
- **Status**: ativa, offline, cheia, manutenção
- **Métricas**: capacidade atual (%), total de descartes, peso total

#### 3. **DESCARTE**
Registro de cada descarte validado pela IA.
- **Validação IA**: confianca_ia (%), tempo_processamento_ms, metadata (JSONB)
- **Rastreamento**: imagem_registro, geolocalização do descarte
- **Recompensa**: capivaras_geradas calculadas automaticamente

#### 4. **RECOMPENSA**
Catálogo de benefícios resgatáveis.
- **Tipos**: voucher, desconto, crédito, evento
- **Controle**: quantidade_disponivel, quantidade_resgatada
- **Parceiros**: cinemas, transporte, shopping, restaurantes, etc.

#### 5. **TRANSACAO**
Histórico completo de movimentação de Capivaras.
- **Tipos**: ganho, resgate, ajuste, penalidade
- **Auditoria**: saldo_anterior, saldo_novo
- **Rastreamento**: vinculado a descarte ou recompensa

#### 6. **PENALIDADE**
Sistema progressivo de penalidades.
- **Níveis**: aviso → suspensão 7 dias → suspensão 30 dias → banimento
- **Automação**: Triggers aplicam penalidades automaticamente
- **Expiração**: Penalidades expiram automaticamente

#### 7. **RESGATE_RECOMPENSA**
Controle de resgates realizados.
- **Código único**: Para validação do parceiro
- **Status**: pendente, utilizado, expirado, cancelado

#### 8. **NOTIFICACAO**
Sistema de notificações para usuários.
- **Tipos**: info, sucesso, aviso, erro
- **Tracking**: lida, data_leitura

#### 9. **AUDITORIA**
Log de alterações importantes no sistema.
- **Tracking**: operação (INSERT/UPDATE/DELETE), dados antigos e novos (JSONB)

---

## 🔧 Funcionalidades Avançadas

### Enums (Tipos Enumerados)
```sql
status_conta_enum: 'ativo', 'suspenso', 'banido'
tipo_residuo_enum: 'organico', 'reciclavel', 'eletronico', 'metal', 'vidro', 'outro'
status_lixeira_enum: 'ativa', 'offline', 'cheia', 'manutencao'
tipo_recompensa_enum: 'voucher', 'desconto', 'credito', 'evento'
status_recompensa_enum: 'ativo', 'inativo', 'expirado'
tipo_transacao_enum: 'ganho', 'resgate', 'ajuste', 'penalidade'
tipo_penalidade_enum: 'aviso', 'suspensao', 'banimento'
status_penalidade_enum: 'ativa', 'expirada'
```

### Views Otimizadas

#### `vw_estatisticas_usuario`
Estatísticas completas por usuário:
- Total de descartes (válidos/inválidos)
- Total de Capivaras ganhas/resgatadas
- Número de penalidades

#### `vw_estatisticas_lixeira`
Métricas por lixeira:
- Total de descartes
- Peso acumulado
- Capivaras geradas

#### `vw_ranking_usuarios`
Ranking dos usuários por Capivaras ganhas

### Funções Úteis

#### `calcular_capivaras(tipo, peso)`
Calcula Capivaras baseado no tipo de resíduo:
- Eletrônico: 50 Capivaras
- Metal: 30 Capivaras
- Vidro: 25 Capivaras
- Reciclável: 20 Capivaras
- Orgânico: 15 Capivaras

#### `atualizar_nivel_usuario(id_usuario)`
Atualiza o nível do usuário baseado em descartes:
- 0-9: Iniciante
- 10-49: Reciclador
- 50-99: Guardião Verde
- 100-199: Eco-Herói
- 200+: Eco-Lenda

#### `buscar_lixeiras_proximas(lat, lng, raio_km, tipo?)`
Busca lixeiras próximas usando PostGIS:
- Retorna distância em km
- Filtra por tipo de resíduo (opcional)
- Ordena por proximidade

### Triggers Automáticos

#### `update_updated_at_column()`
Atualiza automaticamente o campo `updated_at` em:
- usuario
- lixeira_inteligente
- recompensa

#### `atualizar_coordenadas()`
Atualiza automaticamente as coordenadas PostGIS ao inserir/atualizar lixeira

#### `criar_transacao_descarte()`
Ao criar um descarte válido:
1. Cria transação de ganho
2. Atualiza saldo do usuário
3. Incrementa contadores
4. Atualiza estatísticas da lixeira

Se descarte for inválido:
- Incrementa nivel_penalidade

#### `aplicar_penalidade_automatica()`
Sistema progressivo de penalidades:
- 1º descarte incorreto: Aviso
- 2º descarte incorreto: Suspensão 7 dias
- 3º descarte incorreto: Suspensão 30 dias
- 4º+ descarte incorreto: Banimento permanente

Também cria notificação automática

#### `expirar_penalidades()`
Expira penalidades automaticamente e reativa conta do usuário

---

## 🔐 Segurança (Row Level Security - Supabase)

### Políticas RLS Implementadas

**USUARIO**
- Usuários podem ver apenas seu próprio perfil
- Usuários podem atualizar apenas seu próprio perfil

**DESCARTE**
- Usuários veem apenas seus descartes
- Usuários podem inserir descartes

**TRANSACAO**
- Usuários veem apenas suas transações

**RECOMPENSA e LIXEIRA_INTELIGENTE**
- Públicas (todos podem visualizar)

---

## 📊 Índices para Performance

### Índices Principais
```sql
-- Usuário
idx_usuario_email, idx_usuario_cpf, idx_usuario_status, idx_usuario_uuid

-- Lixeira
idx_lixeira_status, idx_lixeira_tipo, idx_lixeira_coordenadas (GIST)

-- Descarte
idx_descarte_usuario, idx_descarte_lixeira, idx_descarte_data (DESC)

-- Transação
idx_transacao_usuario, idx_transacao_tipo, idx_transacao_data (DESC)

-- Penalidade
idx_penalidade_usuario, idx_penalidade_status, idx_penalidade_expiracao
```

---

## 🚀 Instalação

### 1. PostgreSQL Local
```bash
# Criar base de dados
createdb recife_sustentavel

# Executar schema
psql recife_sustentavel < database/schema.sql

# Inserir dados de exemplo
psql recife_sustentavel < database/seed.sql
```

### 2. Supabase

#### Via Dashboard:
1. Acesse SQL Editor no Supabase Dashboard
2. Cole o conteúdo de `schema.sql`
3. Execute
4. Cole o conteúdo de `seed.sql`
5. Execute

#### Via CLI:
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ao projeto
supabase link --project-ref seu-projeto-id

# Executar migrations
supabase db push

# Popular com dados de exemplo
psql $DATABASE_URL < database/seed.sql
```

---

## 📈 Queries Úteis

### Estatísticas Gerais
```sql
-- Dashboard resumido
SELECT 
    (SELECT COUNT(*) FROM usuario WHERE status_conta = 'ativo') as usuarios_ativos,
    (SELECT COUNT(*) FROM descarte WHERE valido = TRUE) as descartes_validos,
    (SELECT COUNT(*) FROM lixeira_inteligente WHERE status = 'ativa') as lixeiras_ativas,
    (SELECT SUM(saldo_capivaras) FROM usuario) as capivaras_circulacao;
```

### Top 10 Usuários
```sql
SELECT * FROM vw_ranking_usuarios LIMIT 10;
```

### Lixeiras que precisam de manutenção
```sql
SELECT * FROM lixeira_inteligente 
WHERE capacidade_atual > 80 OR status = 'offline'
ORDER BY capacidade_atual DESC;
```

### Descartes nas últimas 24h
```sql
SELECT u.nome, d.tipo_residuo, d.capivaras_geradas, d.data_hora
FROM descarte d
JOIN usuario u ON d.id_usuario = u.id_usuario
WHERE d.data_hora >= NOW() - INTERVAL '24 hours'
AND d.valido = TRUE
ORDER BY d.data_hora DESC;
```

### Usuários com penalidades ativas
```sql
SELECT u.nome, u.email, p.tipo, p.motivo, p.data_expiracao
FROM penalidade p
JOIN usuario u ON p.id_usuario = u.id_usuario
WHERE p.status = 'ativa'
ORDER BY p.data_aplicacao DESC;
```

---

## 🔄 Manutenção

### Backup
```bash
# Backup completo
pg_dump recife_sustentavel > backup_$(date +%Y%m%d).sql

# Backup apenas dados
pg_dump --data-only recife_sustentavel > data_backup_$(date +%Y%m%d).sql
```

### Restore
```bash
psql recife_sustentavel < backup_20251023.sql
```

### Limpeza de dados antigos
```sql
-- Remover notificações lidas com mais de 30 dias
DELETE FROM notificacao 
WHERE lida = TRUE 
AND data_leitura < NOW() - INTERVAL '30 days';

-- Arquivar descartes com mais de 1 ano
-- (Implementar tabela descarte_arquivo)
```

---

## 📝 Notas Importantes

1. **PostGIS**: Necessário para funcionalidades de geolocalização
2. **UUID**: Usado para integração com Supabase Auth
3. **JSONB**: Campos metadata permitem extensibilidade
4. **Triggers**: Automatizam lógica de negócio crítica
5. **RLS**: Essencial para segurança em Supabase

---

## 🎯 Próximos Passos

- [ ] Implementar tabela de conquistas/badges
- [ ] Sistema de rankings por bairro/cidade
- [ ] Histórico de níveis do usuário
- [ ] Relatórios mensais automatizados
- [ ] API REST com PostgREST
- [ ] Webhooks para eventos importantes
- [ ] Analytics e métricas avançadas

---

## 📞 Suporte

Para questões sobre a base de dados:
- Documentação PostgreSQL: https://www.postgresql.org/docs/
- Documentação Supabase: https://supabase.com/docs
- PostGIS: https://postgis.net/documentation/
