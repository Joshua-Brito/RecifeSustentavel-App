-- =====================================================
-- RECIFE SUSTENTÁVEL - CONECTA RECIFE
-- Sistema de Gestão de Resíduos Inteligente
-- Base de Dados PostgreSQL/Supabase
-- =====================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- Para geolocalização

-- =====================================================
-- ENUMS (Tipos enumerados)
-- =====================================================

CREATE TYPE status_conta_enum AS ENUM ('ativo', 'suspenso', 'banido');
CREATE TYPE tipo_residuo_enum AS ENUM ('organico', 'reciclavel', 'eletronico', 'metal', 'vidro', 'outro');
CREATE TYPE status_lixeira_enum AS ENUM ('ativa', 'offline', 'cheia', 'manutencao');
CREATE TYPE tipo_recompensa_enum AS ENUM ('voucher', 'desconto', 'credito', 'evento');
CREATE TYPE status_recompensa_enum AS ENUM ('ativo', 'inativo', 'expirado');
CREATE TYPE tipo_transacao_enum AS ENUM ('ganho', 'resgate', 'ajuste', 'penalidade');
CREATE TYPE tipo_penalidade_enum AS ENUM ('aviso', 'suspensao', 'banimento');
CREATE TYPE status_penalidade_enum AS ENUM ('ativa', 'expirada');

-- =====================================================
-- TABELA: USUARIO
-- Armazena informações dos usuários do sistema
-- =====================================================

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    saldo_capivaras INTEGER DEFAULT 0 CHECK (saldo_capivaras >= 0),
    nivel_penalidade INTEGER DEFAULT 0 CHECK (nivel_penalidade >= 0 AND nivel_penalidade <= 3),
    status_conta status_conta_enum DEFAULT 'ativo',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto_perfil TEXT,
    nivel_usuario VARCHAR(50) DEFAULT 'Iniciante',
    total_descartes INTEGER DEFAULT 0,
    total_capivaras_ganhas INTEGER DEFAULT 0,
    total_capivaras_resgatadas INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_usuario_cpf ON usuario(cpf);
CREATE INDEX idx_usuario_status ON usuario(status_conta);
CREATE INDEX idx_usuario_uuid ON usuario(uuid);

-- Comentários
COMMENT ON TABLE usuario IS 'Tabela de usuários do sistema Recife Sustentável';
COMMENT ON COLUMN usuario.nivel_penalidade IS '0=sem penalidade, 1=aviso, 2=suspensão, 3=banimento';
COMMENT ON COLUMN usuario.saldo_capivaras IS 'Saldo atual de moedas Capivaras do usuário';

-- =====================================================
-- TABELA: LIXEIRA_INTELIGENTE
-- Armazena informações das lixeiras inteligentes
-- =====================================================

CREATE TABLE lixeira_inteligente (
    id_lixeira SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    localizacao VARCHAR(300) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    coordenadas GEOGRAPHY(POINT, 4326), -- PostGIS para queries geoespaciais
    tipo_residuo tipo_residuo_enum NOT NULL,
    capacidade_maxima INTEGER NOT NULL DEFAULT 100,
    capacidade_atual INTEGER DEFAULT 0 CHECK (capacidade_atual >= 0 AND capacidade_atual <= 100),
    status status_lixeira_enum DEFAULT 'ativa',
    ultima_validacao TIMESTAMP,
    ultima_manutencao TIMESTAMP,
    total_descartes INTEGER DEFAULT 0,
    peso_total_kg DECIMAL(10, 2) DEFAULT 0,
    codigo_identificacao VARCHAR(50) UNIQUE,
    endereco_completo TEXT,
    bairro VARCHAR(100),
    cidade VARCHAR(100) DEFAULT 'Recife',
    estado VARCHAR(2) DEFAULT 'PE',
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização
CREATE INDEX idx_lixeira_status ON lixeira_inteligente(status);
CREATE INDEX idx_lixeira_tipo ON lixeira_inteligente(tipo_residuo);
CREATE INDEX idx_lixeira_coordenadas ON lixeira_inteligente USING GIST(coordenadas);
CREATE INDEX idx_lixeira_localizacao ON lixeira_inteligente(localizacao);

-- Comentários
COMMENT ON TABLE lixeira_inteligente IS 'Lixeiras inteligentes com scanner AI';
COMMENT ON COLUMN lixeira_inteligente.capacidade_atual IS 'Percentual de ocupação (0-100)';

-- =====================================================
-- TABELA: DESCARTE
-- Registra todos os descartes realizados
-- =====================================================

CREATE TABLE descarte (
    id_descarte SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_lixeira INTEGER NOT NULL REFERENCES lixeira_inteligente(id_lixeira) ON DELETE CASCADE,
    tipo_residuo tipo_residuo_enum NOT NULL,
    peso_estimado DECIMAL(10, 3), -- em kg
    volume_estimado DECIMAL(10, 2), -- em litros
    valido BOOLEAN NOT NULL,
    capivaras_geradas INTEGER DEFAULT 0,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagem_registro TEXT, -- URL da imagem
    motivo_invalidacao TEXT,
    confianca_ia DECIMAL(5, 2), -- Percentual de confiança da IA (0-100)
    tempo_processamento_ms INTEGER, -- Tempo de processamento da IA
    latitude_descarte DECIMAL(10, 8),
    longitude_descarte DECIMAL(11, 8),
    metadata JSONB, -- Dados adicionais da IA
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização
CREATE INDEX idx_descarte_usuario ON descarte(id_usuario);
CREATE INDEX idx_descarte_lixeira ON descarte(id_lixeira);
CREATE INDEX idx_descarte_data ON descarte(data_hora DESC);
CREATE INDEX idx_descarte_valido ON descarte(valido);
CREATE INDEX idx_descarte_tipo ON descarte(tipo_residuo);

-- Comentários
COMMENT ON TABLE descarte IS 'Registro de todos os descartes realizados no sistema';
COMMENT ON COLUMN descarte.confianca_ia IS 'Nível de confiança da IA na classificação (0-100%)';

-- =====================================================
-- TABELA: RECOMPENSA
-- Catálogo de recompensas disponíveis
-- =====================================================

CREATE TABLE recompensa (
    id_recompensa SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    valor_capivaras INTEGER NOT NULL CHECK (valor_capivaras > 0),
    parceiro VARCHAR(200),
    validade DATE,
    tipo tipo_recompensa_enum NOT NULL,
    status status_recompensa_enum DEFAULT 'ativo',
    quantidade_disponivel INTEGER,
    quantidade_resgatada INTEGER DEFAULT 0,
    imagem_url TEXT,
    termos_condicoes TEXT,
    codigo_promocional VARCHAR(50),
    categoria VARCHAR(100),
    prioridade INTEGER DEFAULT 0, -- Para ordenação
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_recompensa_status ON recompensa(status);
CREATE INDEX idx_recompensa_tipo ON recompensa(tipo);
CREATE INDEX idx_recompensa_valor ON recompensa(valor_capivaras);
CREATE INDEX idx_recompensa_validade ON recompensa(validade);

-- Comentários
COMMENT ON TABLE recompensa IS 'Catálogo de recompensas que podem ser resgatadas com Capivaras';

-- =====================================================
-- TABELA: TRANSACAO
-- Histórico de todas as transações de Capivaras
-- =====================================================

CREATE TABLE transacao (
    id_transacao SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_descarte INTEGER REFERENCES descarte(id_descarte) ON DELETE SET NULL,
    id_recompensa INTEGER REFERENCES recompensa(id_recompensa) ON DELETE SET NULL,
    tipo tipo_transacao_enum NOT NULL,
    valor INTEGER NOT NULL, -- Positivo para ganho, negativo para resgate
    saldo_anterior INTEGER NOT NULL,
    saldo_novo INTEGER NOT NULL,
    descricao TEXT,
    metadata JSONB, -- Informações adicionais
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_transacao_usuario ON transacao(id_usuario);
CREATE INDEX idx_transacao_tipo ON transacao(tipo);
CREATE INDEX idx_transacao_data ON transacao(data_hora DESC);
CREATE INDEX idx_transacao_descarte ON transacao(id_descarte);
CREATE INDEX idx_transacao_recompensa ON transacao(id_recompensa);

-- Comentários
COMMENT ON TABLE transacao IS 'Histórico completo de transações de Capivaras';
COMMENT ON COLUMN transacao.valor IS 'Valor da transação (positivo=ganho, negativo=resgate)';

-- =====================================================
-- TABELA: RESGATE_RECOMPENSA
-- Controle de resgates realizados
-- =====================================================

CREATE TABLE resgate_recompensa (
    id_resgate SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_recompensa INTEGER NOT NULL REFERENCES recompensa(id_recompensa) ON DELETE CASCADE,
    id_transacao INTEGER NOT NULL REFERENCES transacao(id_transacao) ON DELETE CASCADE,
    codigo_resgate VARCHAR(100) UNIQUE NOT NULL,
    data_resgate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_utilizacao TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pendente', -- pendente, utilizado, expirado, cancelado
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_resgate_usuario ON resgate_recompensa(id_usuario);
CREATE INDEX idx_resgate_codigo ON resgate_recompensa(codigo_resgate);
CREATE INDEX idx_resgate_status ON resgate_recompensa(status);

-- =====================================================
-- TABELA: PENALIDADE
-- Registro de penalidades aplicadas
-- =====================================================

CREATE TABLE penalidade (
    id_penalidade SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_descarte_origem INTEGER REFERENCES descarte(id_descarte) ON DELETE SET NULL,
    tipo tipo_penalidade_enum NOT NULL,
    motivo TEXT NOT NULL,
    duracao_dias INTEGER DEFAULT 0,
    data_aplicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    status status_penalidade_enum DEFAULT 'ativa',
    aplicada_por INTEGER, -- ID do admin que aplicou (futuro)
    revogada_por INTEGER, -- ID do admin que revogou (futuro)
    data_revogacao TIMESTAMP,
    motivo_revogacao TEXT,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_penalidade_usuario ON penalidade(id_usuario);
CREATE INDEX idx_penalidade_tipo ON penalidade(tipo);
CREATE INDEX idx_penalidade_status ON penalidade(status);
CREATE INDEX idx_penalidade_expiracao ON penalidade(data_expiracao);

-- Comentários
COMMENT ON TABLE penalidade IS 'Registro de penalidades aplicadas aos usuários';

-- =====================================================
-- TABELA: NOTIFICACAO
-- Sistema de notificações
-- =====================================================

CREATE TABLE notificacao (
    id_notificacao SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    mensagem TEXT NOT NULL,
    tipo VARCHAR(50), -- info, sucesso, aviso, erro
    lida BOOLEAN DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_leitura TIMESTAMP,
    link TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_notificacao_usuario ON notificacao(id_usuario);
CREATE INDEX idx_notificacao_lida ON notificacao(lida);
CREATE INDEX idx_notificacao_data ON notificacao(data_criacao DESC);

-- =====================================================
-- TABELA: AUDITORIA
-- Log de ações importantes no sistema
-- =====================================================

CREATE TABLE auditoria (
    id_auditoria SERIAL PRIMARY KEY,
    tabela VARCHAR(100) NOT NULL,
    operacao VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    id_registro INTEGER,
    id_usuario INTEGER,
    dados_antigos JSONB,
    dados_novos JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_auditoria_tabela ON auditoria(tabela);
CREATE INDEX idx_auditoria_usuario ON auditoria(id_usuario);
CREATE INDEX idx_auditoria_data ON auditoria(data_hora DESC);

-- =====================================================
-- VIEWS (Visões úteis)
-- =====================================================

-- View: Estatísticas de usuários
CREATE VIEW vw_estatisticas_usuario AS
SELECT 
    u.id_usuario,
    u.nome,
    u.email,
    u.saldo_capivaras,
    u.status_conta,
    COUNT(DISTINCT d.id_descarte) as total_descartes,
    COUNT(DISTINCT CASE WHEN d.valido = TRUE THEN d.id_descarte END) as descartes_validos,
    COUNT(DISTINCT CASE WHEN d.valido = FALSE THEN d.id_descarte END) as descartes_invalidos,
    COALESCE(SUM(CASE WHEN t.tipo = 'ganho' THEN t.valor ELSE 0 END), 0) as total_ganho,
    COALESCE(SUM(CASE WHEN t.tipo = 'resgate' THEN ABS(t.valor) ELSE 0 END), 0) as total_resgatado,
    COUNT(DISTINCT p.id_penalidade) as total_penalidades
FROM usuario u
LEFT JOIN descarte d ON u.id_usuario = d.id_usuario
LEFT JOIN transacao t ON u.id_usuario = t.id_usuario
LEFT JOIN penalidade p ON u.id_usuario = p.id_usuario
GROUP BY u.id_usuario, u.nome, u.email, u.saldo_capivaras, u.status_conta;

-- View: Estatísticas de lixeiras
CREATE VIEW vw_estatisticas_lixeira AS
SELECT 
    l.id_lixeira,
    l.localizacao,
    l.tipo_residuo,
    l.status,
    l.capacidade_atual,
    COUNT(d.id_descarte) as total_descartes,
    COUNT(CASE WHEN d.valido = TRUE THEN 1 END) as descartes_validos,
    COALESCE(SUM(d.peso_estimado), 0) as peso_total_kg,
    COALESCE(SUM(d.capivaras_geradas), 0) as capivaras_geradas
FROM lixeira_inteligente l
LEFT JOIN descarte d ON l.id_lixeira = d.id_lixeira
GROUP BY l.id_lixeira, l.localizacao, l.tipo_residuo, l.status, l.capacidade_atual;

-- View: Ranking de usuários
CREATE VIEW vw_ranking_usuarios AS
SELECT 
    u.id_usuario,
    u.nome,
    u.nivel_usuario,
    u.saldo_capivaras,
    COUNT(DISTINCT d.id_descarte) as total_descartes,
    COALESCE(SUM(d.capivaras_geradas), 0) as total_capivaras_ganhas,
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(d.capivaras_geradas), 0) DESC) as ranking
FROM usuario u
LEFT JOIN descarte d ON u.id_usuario = d.id_usuario AND d.valido = TRUE
WHERE u.status_conta = 'ativo'
GROUP BY u.id_usuario, u.nome, u.nivel_usuario, u.saldo_capivaras
ORDER BY total_capivaras_ganhas DESC;

-- =====================================================
-- FUNCTIONS (Funções úteis)
-- =====================================================

-- Função: Calcular Capivaras por tipo de resíduo
CREATE OR REPLACE FUNCTION calcular_capivaras(tipo tipo_residuo_enum, peso DECIMAL)
RETURNS INTEGER AS $$
BEGIN
    RETURN CASE tipo
        WHEN 'eletronico' THEN 50
        WHEN 'metal' THEN 30
        WHEN 'vidro' THEN 25
        WHEN 'reciclavel' THEN 20
        WHEN 'organico' THEN 15
        ELSE 10
    END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Função: Atualizar nível do usuário
CREATE OR REPLACE FUNCTION atualizar_nivel_usuario(p_id_usuario INTEGER)
RETURNS VARCHAR AS $$
DECLARE
    v_total_descartes INTEGER;
    v_novo_nivel VARCHAR(50);
BEGIN
    SELECT COUNT(*) INTO v_total_descartes
    FROM descarte
    WHERE id_usuario = p_id_usuario AND valido = TRUE;
    
    v_novo_nivel := CASE
        WHEN v_total_descartes >= 200 THEN 'Eco-Lenda'
        WHEN v_total_descartes >= 100 THEN 'Eco-Herói'
        WHEN v_total_descartes >= 50 THEN 'Guardião Verde'
        WHEN v_total_descartes >= 10 THEN 'Reciclador'
        ELSE 'Iniciante'
    END;
    
    UPDATE usuario
    SET nivel_usuario = v_novo_nivel,
        updated_at = CURRENT_TIMESTAMP
    WHERE id_usuario = p_id_usuario;
    
    RETURN v_novo_nivel;
END;
$$ LANGUAGE plpgsql;

-- Função: Buscar lixeiras próximas
CREATE OR REPLACE FUNCTION buscar_lixeiras_proximas(
    p_latitude DECIMAL,
    p_longitude DECIMAL,
    p_raio_km DECIMAL DEFAULT 5,
    p_tipo_residuo tipo_residuo_enum DEFAULT NULL
)
RETURNS TABLE (
    id_lixeira INTEGER,
    localizacao VARCHAR,
    tipo_residuo tipo_residuo_enum,
    status status_lixeira_enum,
    distancia_km DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.id_lixeira,
        l.localizacao,
        l.tipo_residuo,
        l.status,
        ROUND(
            ST_Distance(
                l.coordenadas,
                ST_SetSRID(ST_MakePoint(p_longitude, p_latitude), 4326)::geography
            )::DECIMAL / 1000, 
            2
        ) as distancia_km
    FROM lixeira_inteligente l
    WHERE 
        l.status = 'ativa'
        AND (p_tipo_residuo IS NULL OR l.tipo_residuo = p_tipo_residuo)
        AND ST_DWithin(
            l.coordenadas,
            ST_SetSRID(ST_MakePoint(p_longitude, p_latitude), 4326)::geography,
            p_raio_km * 1000
        )
    ORDER BY distancia_km;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS (Gatilhos automáticos)
-- =====================================================

-- Trigger: Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usuario_updated_at BEFORE UPDATE ON usuario
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lixeira_updated_at BEFORE UPDATE ON lixeira_inteligente
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recompensa_updated_at BEFORE UPDATE ON recompensa
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Atualizar coordenadas PostGIS ao inserir/atualizar lixeira
CREATE OR REPLACE FUNCTION atualizar_coordenadas()
RETURNS TRIGGER AS $$
BEGIN
    NEW.coordenadas := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_coordenadas
BEFORE INSERT OR UPDATE OF latitude, longitude ON lixeira_inteligente
FOR EACH ROW EXECUTE FUNCTION atualizar_coordenadas();

-- Trigger: Registrar transação ao criar descarte válido
CREATE OR REPLACE FUNCTION criar_transacao_descarte()
RETURNS TRIGGER AS $$
DECLARE
    v_saldo_anterior INTEGER;
    v_saldo_novo INTEGER;
BEGIN
    IF NEW.valido = TRUE THEN
        -- Buscar saldo anterior
        SELECT saldo_capivaras INTO v_saldo_anterior
        FROM usuario
        WHERE id_usuario = NEW.id_usuario;
        
        -- Calcular novo saldo
        v_saldo_novo := v_saldo_anterior + NEW.capivaras_geradas;
        
        -- Atualizar saldo do usuário
        UPDATE usuario
        SET saldo_capivaras = v_saldo_novo,
            total_descartes = total_descartes + 1,
            total_capivaras_ganhas = total_capivaras_ganhas + NEW.capivaras_geradas
        WHERE id_usuario = NEW.id_usuario;
        
        -- Criar transação
        INSERT INTO transacao (
            id_usuario,
            id_descarte,
            tipo,
            valor,
            saldo_anterior,
            saldo_novo,
            descricao
        ) VALUES (
            NEW.id_usuario,
            NEW.id_descarte,
            'ganho',
            NEW.capivaras_geradas,
            v_saldo_anterior,
            v_saldo_novo,
            'Descarte de ' || NEW.tipo_residuo || ' válido'
        );
        
        -- Atualizar lixeira
        UPDATE lixeira_inteligente
        SET total_descartes = total_descartes + 1,
            peso_total_kg = peso_total_kg + COALESCE(NEW.peso_estimado, 0),
            ultima_validacao = CURRENT_TIMESTAMP
        WHERE id_lixeira = NEW.id_lixeira;
        
    ELSE
        -- Descarte inválido - incrementar nível de penalidade
        UPDATE usuario
        SET nivel_penalidade = nivel_penalidade + 1,
            total_descartes = total_descartes + 1
        WHERE id_usuario = NEW.id_usuario;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_criar_transacao_descarte
AFTER INSERT ON descarte
FOR EACH ROW EXECUTE FUNCTION criar_transacao_descarte();

-- Trigger: Aplicar penalidade automática
CREATE OR REPLACE FUNCTION aplicar_penalidade_automatica()
RETURNS TRIGGER AS $$
DECLARE
    v_tipo_penalidade tipo_penalidade_enum;
    v_duracao INTEGER;
    v_motivo TEXT;
BEGIN
    IF NEW.nivel_penalidade > OLD.nivel_penalidade THEN
        -- Determinar tipo de penalidade
        CASE NEW.nivel_penalidade
            WHEN 1 THEN
                v_tipo_penalidade := 'aviso';
                v_duracao := 0;
                v_motivo := 'Primeiro descarte incorreto - Aviso';
            WHEN 2 THEN
                v_tipo_penalidade := 'suspensao';
                v_duracao := 7;
                v_motivo := 'Segundo descarte incorreto - Suspensão de 7 dias';
                NEW.status_conta := 'suspenso';
            WHEN 3 THEN
                v_tipo_penalidade := 'suspensao';
                v_duracao := 30;
                v_motivo := 'Terceiro descarte incorreto - Suspensão de 30 dias';
                NEW.status_conta := 'suspenso';
            ELSE
                v_tipo_penalidade := 'banimento';
                v_duracao := 0;
                v_motivo := 'Reincidência - Banimento permanente';
                NEW.status_conta := 'banido';
        END CASE;
        
        -- Inserir penalidade
        INSERT INTO penalidade (
            id_usuario,
            tipo,
            motivo,
            duracao_dias,
            data_expiracao,
            status
        ) VALUES (
            NEW.id_usuario,
            v_tipo_penalidade,
            v_motivo,
            v_duracao,
            CASE WHEN v_duracao > 0 THEN CURRENT_TIMESTAMP + (v_duracao || ' days')::INTERVAL ELSE NULL END,
            'ativa'
        );
        
        -- Criar notificação
        INSERT INTO notificacao (
            id_usuario,
            titulo,
            mensagem,
            tipo
        ) VALUES (
            NEW.id_usuario,
            'Penalidade aplicada',
            v_motivo,
            'aviso'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_penalidade_automatica
BEFORE UPDATE OF nivel_penalidade ON usuario
FOR EACH ROW EXECUTE FUNCTION aplicar_penalidade_automatica();

-- Trigger: Expirar penalidades automaticamente
CREATE OR REPLACE FUNCTION expirar_penalidades()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.data_expiracao IS NOT NULL AND NEW.data_expiracao <= CURRENT_TIMESTAMP THEN
        NEW.status := 'expirada';
        
        -- Atualizar status do usuário se não houver outras penalidades ativas
        UPDATE usuario u
        SET status_conta = 'ativo'
        WHERE u.id_usuario = NEW.id_usuario
        AND NOT EXISTS (
            SELECT 1 FROM penalidade p
            WHERE p.id_usuario = NEW.id_usuario
            AND p.status = 'ativa'
            AND p.id_penalidade != NEW.id_penalidade
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_expirar_penalidades
BEFORE UPDATE ON penalidade
FOR EACH ROW EXECUTE FUNCTION expirar_penalidades();

-- =====================================================
-- POLÍTICAS RLS (Row Level Security) para Supabase
-- =====================================================

-- Habilitar RLS
ALTER TABLE usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE descarte ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE resgate_recompensa ENABLE ROW LEVEL SECURITY;
ALTER TABLE penalidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificacao ENABLE ROW LEVEL SECURITY;

-- Políticas para USUARIO
CREATE POLICY "Usuários podem ver seu próprio perfil"
    ON usuario FOR SELECT
    USING (auth.uid()::text = uuid::text);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
    ON usuario FOR UPDATE
    USING (auth.uid()::text = uuid::text);

-- Políticas para DESCARTE
CREATE POLICY "Usuários podem ver seus próprios descartes"
    ON descarte FOR SELECT
    USING (id_usuario IN (SELECT id_usuario FROM usuario WHERE uuid::text = auth.uid()::text));

CREATE POLICY "Usuários podem inserir descartes"
    ON descarte FOR INSERT
    WITH CHECK (id_usuario IN (SELECT id_usuario FROM usuario WHERE uuid::text = auth.uid()::text));

-- Políticas para TRANSACAO
CREATE POLICY "Usuários podem ver suas próprias transações"
    ON transacao FOR SELECT
    USING (id_usuario IN (SELECT id_usuario FROM usuario WHERE uuid::text = auth.uid()::text));

-- Políticas para RECOMPENSA
-- Recompensas são públicas
ALTER TABLE recompensa DISABLE ROW LEVEL SECURITY;

-- Políticas para LIXEIRA
-- Lixeiras são públicas
ALTER TABLE lixeira_inteligente DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
