-- =====================================================
-- RECIFE SUSTENTÁVEL - DADOS DE EXEMPLO (SEED)
-- =====================================================

-- Limpar dados existentes (cuidado em produção!)
TRUNCATE TABLE 
    notificacao,
    resgate_recompensa,
    penalidade,
    transacao,
    descarte,
    recompensa,
    lixeira_inteligente,
    usuario
RESTART IDENTITY CASCADE;

-- =====================================================
-- USUÁRIOS
-- =====================================================

INSERT INTO usuario (nome, cpf, telefone, email, senha_hash, saldo_capivaras, nivel_penalidade, status_conta, nivel_usuario, total_descartes, total_capivaras_ganhas) VALUES
('João Silva', '123.456.789-00', '(81) 99999-0001', 'joao.silva@email.com', '$2a$10$hashedpassword1', 1250, 0, 'ativo', 'Eco-Herói', 156, 3120),
('Maria Santos', '123.456.789-01', '(81) 99999-0002', 'maria.santos@email.com', '$2a$10$hashedpassword2', 890, 0, 'ativo', 'Guardião Verde', 98, 1960),
('Pedro Costa', '123.456.789-02', '(81) 99999-0003', 'pedro.costa@email.com', '$2a$10$hashedpassword3', 2340, 0, 'ativo', 'Eco-Herói', 245, 4900),
('Ana Oliveira', '123.456.789-03', '(81) 99999-0004', 'ana.oliveira@email.com', '$2a$10$hashedpassword4', 450, 2, 'suspenso', 'Iniciante', 45, 900),
('Carlos Lima', '123.456.789-04', '(81) 99999-0005', 'carlos.lima@email.com', '$2a$10$hashedpassword5', 1780, 0, 'ativo', 'Eco-Herói', 189, 3780),
('Juliana Rocha', '123.456.789-05', '(81) 99999-0006', 'juliana.rocha@email.com', '$2a$10$hashedpassword6', 650, 0, 'ativo', 'Guardião Verde', 72, 1440),
('Roberto Alves', '123.456.789-06', '(81) 99999-0007', 'roberto.alves@email.com', '$2a$10$hashedpassword7', 120, 0, 'ativo', 'Iniciante', 12, 240),
('Fernanda Dias', '123.456.789-07', '(81) 99999-0008', 'fernanda.dias@email.com', '$2a$10$hashedpassword8', 0, 4, 'banido', 'Iniciante', 3, 0),
('Lucas Barros', '123.456.789-08', '(81) 99999-0009', 'lucas.barros@email.com', '$2a$10$hashedpassword9', 2890, 0, 'ativo', 'Eco-Lenda', 312, 6240),
('Patricia Melo', '123.456.789-09', '(81) 99999-0010', 'patricia.melo@email.com', '$2a$10$hashedpassword10', 1560, 0, 'ativo', 'Eco-Herói', 178, 3120);

-- =====================================================
-- LIXEIRAS INTELIGENTES (Locais reais do Recife)
-- =====================================================

INSERT INTO lixeira_inteligente (localizacao, latitude, longitude, tipo_residuo, capacidade_maxima, capacidade_atual, status, codigo_identificacao, bairro, endereco_completo) VALUES
('Praça do Derby', -8.052200, -34.895600, 'reciclavel', 100, 75, 'ativa', 'REC-DER-001', 'Derby', 'Praça do Derby, s/n - Derby, Recife - PE'),
('Parque da Jaqueira', -8.038900, -34.898900, 'organico', 100, 45, 'ativa', 'REC-JAQ-002', 'Jaqueira', 'Av. Visconde de Albuquerque - Jaqueira, Recife - PE'),
('Shopping Recife', -8.119400, -34.905000, 'eletronico', 80, 30, 'ativa', 'REC-SHP-003', 'Boa Viagem', 'R. Padre Carapuceiro, 777 - Boa Viagem, Recife - PE'),
('Praia de Boa Viagem', -8.127700, -34.894800, 'reciclavel', 100, 95, 'cheia', 'REC-BOA-004', 'Boa Viagem', 'Av. Boa Viagem - Boa Viagem, Recife - PE'),
('Casa Forte', -8.026500, -34.926400, 'metal', 100, 60, 'ativa', 'REC-CAS-005', 'Casa Forte', 'Praça de Casa Forte - Casa Forte, Recife - PE'),
('Pina', -8.088900, -34.875600, 'vidro', 100, 0, 'offline', 'REC-PIN-006', 'Pina', 'Av. Herculano Bandeira - Pina, Recife - PE'),
('Torre', -8.048900, -34.877600, 'reciclavel', 100, 0, 'manutencao', 'REC-TOR-007', 'Torre', 'Av. Rui Barbosa - Torre, Recife - PE'),
('Boa Vista', -8.062300, -34.880500, 'organico', 100, 55, 'ativa', 'REC-BOV-008', 'Boa Vista', 'Av. Conde da Boa Vista - Boa Vista, Recife - PE'),
('Recife Antigo', -8.063100, -34.871200, 'reciclavel', 100, 40, 'ativa', 'REC-ANT-009', 'Recife', 'Praça do Marco Zero - Recife Antigo, Recife - PE'),
('Parque Dona Lindu', -8.135600, -34.898900, 'organico', 100, 65, 'ativa', 'REC-LIN-010', 'Boa Viagem', 'Av. Boa Viagem - Boa Viagem, Recife - PE'),
('Madalena', -8.053900, -34.910200, 'metal', 100, 50, 'ativa', 'REC-MAD-011', 'Madalena', 'Av. Caxangá - Madalena, Recife - PE'),
('Aflitos', -8.049800, -34.893400, 'vidro', 100, 35, 'ativa', 'REC-AFL-012', 'Aflitos', 'R. Benfica - Aflitos, Recife - PE'),
('Espinheiro', -8.046700, -34.890100, 'eletronico', 80, 20, 'ativa', 'REC-ESP-013', 'Espinheiro', 'Av. Conselheiro Rosa e Silva - Espinheiro, Recife - PE'),
('Encruzilhada', -8.044500, -34.907800, 'reciclavel', 100, 70, 'ativa', 'REC-ENC-014', 'Encruzilhada', 'R. Padre Inglês - Encruzilhada, Recife - PE'),
('Graças', -8.039200, -34.891300, 'organico', 100, 45, 'ativa', 'REC-GRA-015', 'Graças', 'R. das Graças - Graças, Recife - PE');

-- =====================================================
-- RECOMPENSAS
-- =====================================================

INSERT INTO recompensa (titulo, descricao, valor_capivaras, parceiro, validade, tipo, status, quantidade_disponivel, categoria) VALUES
('Vale Cinema', 'Ingresso grátis em salas 2D', 50, 'Cinépolis', '2025-12-31', 'evento', 'ativo', 100, 'Entretenimento'),
('Desconto no Transporte', 'R$ 30 de crédito no cartão VEM', 30, 'Grande Recife Consórcio', '2026-01-31', 'credito', 'ativo', 500, 'Transporte'),
('Vale Shopping', 'R$ 50 de desconto em compras', 50, 'Shopping Recife', '2025-11-30', 'voucher', 'ativo', 200, 'Compras'),
('Desconto Restaurante', '20% de desconto até R$ 40', 40, 'iFood', '2025-12-31', 'desconto', 'ativo', 300, 'Alimentação'),
('Crédito Biblioteca', 'Mensalidade grátis por 1 mês', 80, 'Biblioteca Pública do Estado', '2026-03-31', 'credito', 'ativo', 50, 'Educação'),
('Vale Farmácia', 'R$ 25 em produtos', 25, 'Farmácia Popular', '2025-12-31', 'voucher', 'ativo', 150, 'Saúde'),
('Ingresso Museu', 'Entrada gratuita para 2 pessoas', 35, 'Instituto Ricardo Brennand', '2026-02-28', 'evento', 'ativo', 75, 'Cultura'),
('Vale Livros', 'R$ 40 em livros', 40, 'Livraria Cultura', '2025-12-31', 'voucher', 'ativo', 100, 'Educação'),
('Aula de Yoga', '1 aula gratuita', 45, 'Espaço Yoga Recife', '2026-01-31', 'evento', 'ativo', 60, 'Bem-estar'),
('Vale Academia', '1 semana grátis', 60, 'Smart Fit', '2025-12-31', 'evento', 'ativo', 80, 'Bem-estar'),
('Desconto Petshop', 'R$ 30 em produtos pet', 30, 'Cobasi', '2025-12-31', 'voucher', 'ativo', 120, 'Pet'),
('Passeio de Catamarã', '50% de desconto no passeio', 70, 'Catamarã Tour Recife', '2026-04-30', 'desconto', 'ativo', 40, 'Turismo'),
('Vale Sorvete', '2 sorvetes grátis', 20, 'Sorveteria Bali', '2025-12-31', 'voucher', 'ativo', 200, 'Alimentação'),
('Curso Online', 'Acesso a curso de sustentabilidade', 90, 'Coursera', '2026-06-30', 'credito', 'ativo', 30, 'Educação'),
('Kit Ecológico', 'Kit com produtos sustentáveis', 100, 'Eco Store Recife', '2025-12-31', 'voucher', 'ativo', 50, 'Sustentabilidade');

-- =====================================================
-- DESCARTES
-- =====================================================

-- Descartes do João Silva
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(1, 1, 'reciclavel', 1.2, TRUE, 20, 95.5, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(1, 2, 'organico', 0.8, TRUE, 15, 92.3, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(1, 3, 'eletronico', 2.5, TRUE, 50, 98.7, CURRENT_TIMESTAMP - INTERVAL '2 days');

-- Descartes da Maria Santos
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(2, 1, 'reciclavel', 1.5, TRUE, 20, 94.2, CURRENT_TIMESTAMP - INTERVAL '3 hours'),
(2, 5, 'metal', 3.1, TRUE, 30, 96.8, CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Descartes do Pedro Costa
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(3, 6, 'vidro', 1.7, TRUE, 25, 93.5, CURRENT_TIMESTAMP - INTERVAL '4 hours'),
(3, 2, 'organico', 0.9, TRUE, 15, 91.8, CURRENT_TIMESTAMP - INTERVAL '5 hours'),
(3, 1, 'reciclavel', 2.0, TRUE, 20, 97.2, CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Descarte inválido da Ana Oliveira
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, motivo_invalidacao, data_hora) VALUES
(4, 1, 'outro', 0, FALSE, 0, 45.2, 'Material não reconhecido pela IA', CURRENT_TIMESTAMP - INTERVAL '6 hours');

-- Descartes do Carlos Lima
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(5, 3, 'eletronico', 1.8, TRUE, 50, 99.1, CURRENT_TIMESTAMP - INTERVAL '7 hours'),
(5, 1, 'reciclavel', 1.3, TRUE, 20, 94.7, CURRENT_TIMESTAMP - INTERVAL '8 hours');

-- Descartes da Juliana Rocha
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(6, 2, 'organico', 1.1, TRUE, 15, 93.2, CURRENT_TIMESTAMP - INTERVAL '9 hours'),
(6, 5, 'metal', 2.8, TRUE, 30, 95.6, CURRENT_TIMESTAMP - INTERVAL '2 days');

-- Descartes do Roberto Alves
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(7, 1, 'reciclavel', 0.7, TRUE, 20, 90.4, CURRENT_TIMESTAMP - INTERVAL '10 hours');

-- Descartes inválidos da Fernanda Dias (banida)
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, motivo_invalidacao, data_hora) VALUES
(8, 1, 'outro', 0, FALSE, 0, 38.5, 'Material não reciclável', CURRENT_TIMESTAMP - INTERVAL '15 days'),
(8, 1, 'outro', 0, FALSE, 0, 42.1, 'Descarte incorreto', CURRENT_TIMESTAMP - INTERVAL '10 days'),
(8, 1, 'outro', 0, FALSE, 0, 35.8, 'Material não reconhecido', CURRENT_TIMESTAMP - INTERVAL '5 days');

-- Descartes do Lucas Barros
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(9, 3, 'eletronico', 3.2, TRUE, 50, 98.9, CURRENT_TIMESTAMP - INTERVAL '11 hours'),
(9, 6, 'vidro', 2.1, TRUE, 25, 96.3, CURRENT_TIMESTAMP - INTERVAL '12 hours'),
(9, 5, 'metal', 4.0, TRUE, 30, 97.8, CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Descartes da Patricia Melo
INSERT INTO descarte (id_usuario, id_lixeira, tipo_residuo, peso_estimado, valido, capivaras_geradas, confianca_ia, data_hora) VALUES
(10, 1, 'reciclavel', 1.9, TRUE, 20, 95.1, CURRENT_TIMESTAMP - INTERVAL '13 hours'),
(10, 2, 'organico', 1.4, TRUE, 15, 92.7, CURRENT_TIMESTAMP - INTERVAL '14 hours');

-- =====================================================
-- RESGATES DE RECOMPENSAS
-- =====================================================

INSERT INTO resgate_recompensa (id_usuario, id_recompensa, id_transacao, codigo_resgate, status) VALUES
(1, 1, 4, 'REC-CINEMA-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0'), 'utilizado'),
(3, 2, 8, 'REC-TRANSP-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0'), 'pendente'),
(5, 1, 12, 'REC-CINEMA-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0'), 'pendente');

-- Atualizar transações de resgate manualmente (já que o trigger cria as de ganho)
INSERT INTO transacao (id_usuario, id_recompensa, tipo, valor, saldo_anterior, saldo_novo, descricao) VALUES
(1, 1, 'resgate', -50, 1300, 1250, 'Resgate de Vale Cinema'),
(3, 2, 'resgate', -30, 2370, 2340, 'Resgate de Desconto no Transporte'),
(5, 1, 'resgate', -50, 1830, 1780, 'Resgate de Vale Cinema');

-- =====================================================
-- PENALIDADES
-- =====================================================

INSERT INTO penalidade (id_usuario, tipo, motivo, duracao_dias, data_aplicacao, data_expiracao, status) VALUES
(4, 'aviso', 'Descarte incorreto de resíduo orgânico em lixeira de recicláveis', 0, CURRENT_TIMESTAMP - INTERVAL '15 days', NULL, 'expirada'),
(4, 'suspensao', 'Múltiplos descartes incorretos', 7, CURRENT_TIMESTAMP - INTERVAL '7 days', CURRENT_TIMESTAMP + INTERVAL '1 day', 'ativa'),
(8, 'aviso', 'Primeiro descarte incorreto', 0, CURRENT_TIMESTAMP - INTERVAL '15 days', NULL, 'expirada'),
(8, 'suspensao', 'Segundo descarte incorreto', 7, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'expirada'),
(8, 'banimento', 'Reincidência após suspensão', 0, CURRENT_TIMESTAMP - INTERVAL '5 days', NULL, 'ativa');

-- =====================================================
-- NOTIFICAÇÕES
-- =====================================================

INSERT INTO notificacao (id_usuario, titulo, mensagem, tipo, lida) VALUES
(1, 'Descarte aprovado!', 'Parabéns! Seu descarte de reciclável foi aprovado. +20 Capivaras creditadas.', 'sucesso', TRUE),
(1, 'Nova recompensa disponível!', 'Uma nova recompensa foi adicionada ao catálogo: Vale Shopping.', 'info', FALSE),
(2, 'Meta semanal atingida!', 'Você completou 5 descartes esta semana. Continue assim!', 'sucesso', TRUE),
(3, 'Você subiu de nível!', 'Parabéns! Você agora é um Eco-Herói. Continue contribuindo!', 'sucesso', TRUE),
(4, 'Penalidade aplicada', 'Sua conta foi suspensa por 7 dias devido a múltiplos descartes incorretos.', 'aviso', TRUE),
(5, 'Resgate confirmado', 'Seu resgate de Vale Cinema foi confirmado. Código: REC-CINEMA-123456', 'sucesso', FALSE),
(6, 'Lixeira próxima disponível', 'Há uma lixeira de metal a 500m da sua localização.', 'info', FALSE),
(7, 'Bem-vindo!', 'Bem-vindo ao Recife Sustentável! Ganhe 50 Capivaras de boas-vindas.', 'info', TRUE),
(8, 'Conta banida', 'Sua conta foi banida permanentemente devido a reincidência de descartes incorretos.', 'erro', TRUE),
(9, 'Conquista desbloqueada!', 'Você desbloqueou a conquista Eco-Lenda! +100 Capivaras bônus.', 'sucesso', FALSE),
(10, 'Descarte aprovado!', 'Seu descarte de orgânico foi aprovado. +15 Capivaras creditadas.', 'sucesso', TRUE);

-- =====================================================
-- AUDITORIA (exemplos)
-- =====================================================

INSERT INTO auditoria (tabela, operacao, id_registro, id_usuario, dados_novos) VALUES
('usuario', 'INSERT', 1, NULL, '{"nome": "João Silva", "email": "joao.silva@email.com"}'),
('descarte', 'INSERT', 1, 1, '{"tipo_residuo": "reciclavel", "valido": true, "capivaras_geradas": 20}'),
('penalidade', 'INSERT', 1, NULL, '{"id_usuario": 4, "tipo": "aviso", "motivo": "Descarte incorreto"}');

-- =====================================================
-- ESTATÍSTICAS RESUMIDAS
-- =====================================================

SELECT 'RESUMO DO SISTEMA' as info;
SELECT 'Total de usuários:', COUNT(*) FROM usuario;
SELECT 'Usuários ativos:', COUNT(*) FROM usuario WHERE status_conta = 'ativo';
SELECT 'Total de lixeiras:', COUNT(*) FROM lixeira_inteligente;
SELECT 'Lixeiras ativas:', COUNT(*) FROM lixeira_inteligente WHERE status = 'ativa';
SELECT 'Total de descartes:', COUNT(*) FROM descarte;
SELECT 'Descartes válidos:', COUNT(*) FROM descarte WHERE valido = TRUE;
SELECT 'Total de recompensas:', COUNT(*) FROM recompensa;
SELECT 'Recompensas ativas:', COUNT(*) FROM recompensa WHERE status = 'ativo';
SELECT 'Capivaras em circulação:', SUM(saldo_capivaras) FROM usuario;
SELECT 'Penalidades ativas:', COUNT(*) FROM penalidade WHERE status = 'ativa';

-- =====================================================
-- FIM DOS DADOS DE EXEMPLO
-- =====================================================
