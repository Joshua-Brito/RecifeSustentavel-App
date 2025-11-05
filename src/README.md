# 🌿 Recife Sustentável - Conecta Recife

> Aplicativo gamificado de gestão de resíduos com lixeiras inteligentes e sistema de recompensas

## 📱 Sobre o Projeto

O **Recife Sustentável** é um sistema completo de gestão de resíduos que incentiva o descarte correto através de:

- 🤖 **Lixeiras inteligentes** com scanner AI
- 🪙 **Sistema de moedas Capivaras** por boas ações
- 🎁 **Recompensas** trocáveis por benefícios
- ⚠️ **Penalidades automáticas** para descartes incorretos
- 📱 **App mobile** para usuários
- 💻 **Painel web** para administradores

## 🎨 Design System

- **Cores principais**: 
  - Verde primário: `#2E8B57`
  - Verde secundário: `#8BC34A`
  - Laranja de destaque: `#D9774A`
- **Tipografia**: Inter
- **Estilo**: Limpo e acessível

## 🚀 Como Usar

### 1. Primeiro Acesso - Cadastro

```
1. Acesse a tela de login
2. Clique em "Cadastrar"
3. Preencha seus dados:
   - Nome completo
   - CPF (formatação automática)
   - Telefone (formatação automática)
   - Email
   - Senha
4. Clique em "Criar conta"
5. Você será logado automaticamente! 🎉
```

### 2. Login em Acessos Posteriores

```
1. Digite seu email cadastrado
2. Digite sua senha
3. Clique em "Entrar"
4. Bem-vindo de volta! 👋
```

### 3. Navegação no App Mobile

**Menu Inferior:**
- 🏠 **Início**: Dashboard com saldo e estatísticas
- 📷 **Scanner**: Escanear QR code das lixeiras
- 🎁 **Prêmios**: Catálogo de recompensas
- 👤 **Perfil**: Dados pessoais e configurações

**Funcionalidades:**
- Ver saldo de Capivaras 🌿
- Histórico de descartes
- Mapa de lixeiras próximas
- Carteira digital
- Sistema de penalidades
- Resgatar recompensas

## 💾 Sistema de Armazenamento

### localStorage - Banco de Dados Local

O app utiliza **localStorage** do navegador para armazenar dados localmente:

✅ **Vantagens:**
- Funciona offline
- Dados persistem entre sessões
- Não requer servidor

⚠️ **Limitações:**
- Dados locais ao navegador
- Não sincroniza entre dispositivos
- Limite de ~5-10MB

### Dados Armazenados

```typescript
interface UserData {
  id: number;
  name: string;         // "Joshua Miguel"
  email: string;        // "joshua@email.com"
  phone: string;        // "(81) 99999-8888"
  cpf: string;          // "123.456.789-01"
}
```

## 🛠️ Tecnologias

- **React** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Motion (Framer Motion)** - Animações
- **Lucide React** - Ícones
- **Shadcn/ui** - Componentes
- **Sonner** - Notificações toast
- **Recharts** - Gráficos

## 📁 Estrutura do Projeto

```
recife-sustentavel/
├── components/
│   ├── mobile/           # Telas do app mobile
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   ├── Scanner.tsx
│   │   └── ...
│   ├── admin/           # Painel administrativo
│   │   ├── Dashboard.tsx
│   │   ├── UsersManagement.tsx
│   │   └── ...
│   ├── ui/              # Componentes Shadcn
│   ├── Login.tsx        # Tela de login/cadastro
│   ├── MobileApp.tsx    # Container do app mobile
│   └── AdminPanel.tsx   # Container do painel admin
│
├── utils/
│   ├── formatters.ts    # Formatação CPF/Telefone
│   ├── userStorage.ts   # Gerenciamento de usuários
│   ├── README.md
│   └── EXAMPLES.md
│
├── database/
│   ├── schema.sql       # Estrutura do banco (Supabase)
│   ├── seed.sql         # Dados de exemplo
│   ├── README.md
│   └── LOCAL_STORAGE.md
│
├── styles/
│   └── globals.css      # Estilos globais
│
├── App.tsx              # Componente raiz
├── QUICK_START.md       # Guia rápido de uso
├── FORMATTING_GUIDE.md  # Guia de formatação
└── README.md           # Este arquivo
```

## 🔧 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- [x] Cadastro de usuários
- [x] Login com email
- [x] Validação de email único
- [x] Logout
- [x] Dados persistentes
- [x] Login de administrador

### ✅ Formatação Automática
- [x] CPF: `XXX.XXX.XXX-XX`
- [x] Telefone: `(XX) XXXXX-XXXX`
- [x] Validação visual em tempo real
- [x] Feedback de campos completos

### ✅ App Mobile
- [x] Tela Home com dashboard
- [x] Scanner de QR code
- [x] Histórico de descartes
- [x] Carteira de Capivaras
- [x] Catálogo de recompensas
- [x] Sistema de penalidades
- [x] Mapa de lixeiras
- [x] Perfil do usuário

### ✅ Painel Administrativo
- [x] Dashboard com métricas
- [x] Gerenciamento de usuários
- [x] Gerenciamento de lixeiras
- [x] Gerenciamento de recompensas
- [x] Relatórios e analytics
- [x] Gestão de penalidades

### ✅ Design e UX
- [x] Design responsivo
- [x] Animações suaves
- [x] Paleta de cores personalizada
- [x] Componentes acessíveis
- [x] Navegação intuitiva
- [x] Feedback visual

## 📚 Documentação

### Para Usuários
- [QUICK_START.md](./QUICK_START.md) - Como usar o app
- [FORMATTING_GUIDE.md](./FORMATTING_GUIDE.md) - Formatação de dados

### Para Desenvolvedores
- [utils/README.md](./utils/README.md) - Funções utilitárias
- [utils/EXAMPLES.md](./utils/EXAMPLES.md) - Exemplos de código
- [database/LOCAL_STORAGE.md](./database/LOCAL_STORAGE.md) - Sistema de armazenamento
- [database/README.md](./database/README.md) - Estrutura do banco de dados

## 🧪 Como Testar

### Teste 1: Cadastro e Login

```bash
1. Limpe os dados (botão "Limpar dados" na tela de login)
2. Cadastre-se:
   - Nome: Joshua Miguel
   - CPF: 12345678901 (será formatado automaticamente)
   - Telefone: 81999998888 (será formatado automaticamente)
   - Email: joshua@email.com
   - Senha: teste123
3. Verifique:
   - Toast: "Bem-vindo, Joshua! +50 Capivaras 🎉"
   - Home: "Bem-vindo de volta, Joshua! 👋"
4. Faça logout
5. Faça login novamente com o mesmo email
6. Verifique:
   - Toast: "Bem-vindo de volta, Joshua! 👋"
   - Perfil mostra todos os dados cadastrados
```

### Teste 2: Persistência

```bash
1. Cadastre um usuário
2. Feche completamente o navegador
3. Abra novamente
4. Faça login
5. Dados devem estar preservados ✓
```

### Teste 3: Validação

```bash
1. Cadastre um usuário
2. Tente cadastrar com o mesmo email
3. Deve mostrar erro: "Este email já está cadastrado!" ✓
```

## 🛠️ Ferramentas de Debug

### Botões de Debug (Tela de Login)

**Ver Usuários (X)**
- Mostra quantidade de usuários cadastrados
- Imprime lista no console

**Limpar Dados**
- Remove todos os usuários
- Útil para resetar o app

### Console do Navegador (F12)

```javascript
// Ver todos os usuários
JSON.parse(localStorage.getItem('recife_sustentavel_users'))

// Ver quantidade
JSON.parse(localStorage.getItem('recife_sustentavel_users')).length

// Limpar tudo
localStorage.removeItem('recife_sustentavel_users')
```

## 🔐 Segurança

### ⚠️ Importante

Este é um **projeto de demonstração**. Em produção:

- ❌ Não armazene senhas em texto puro
- ❌ Não use localStorage para dados sensíveis
- ❌ Não confie apenas em validação client-side
- ✅ Use HTTPS
- ✅ Implemente autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Validação server-side
- ✅ Rate limiting
- ✅ CORS configurado

## 🚀 Próximos Passos

### Integração com Supabase

```typescript
// Em vez de localStorage
const { data: user } = await supabase
  .from('USUARIO')
  .select('*')
  .eq('email', email)
  .single();
```

### Melhorias Planejadas

- [ ] Autenticação JWT
- [ ] Upload de foto de perfil
- [ ] Push notifications
- [ ] Integração com APIs de mapas
- [ ] Sistema de ranking
- [ ] Compartilhamento social
- [ ] Modo offline completo
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 📊 Database Schema

O projeto possui um schema SQL completo em `/database/schema.sql`:

### Tabelas Principais

1. **USUARIO** - Dados dos usuários
2. **LIXEIRA_INTELIGENTE** - Lixeiras IoT
3. **DESCARTE** - Registros de descartes
4. **RECOMPENSA** - Catálogo de prêmios
5. **TRANSACAO** - Histórico de Capivaras
6. **PENALIDADE** - Infrações registradas
7. **RESGATE** - Recompensas resgatadas
8. **NOTIFICACAO** - Alertas e mensagens
9. **AUDITORIA** - Logs do sistema

## 🎯 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Joshua Miguel** - Desenvolvedor principal

## 🙏 Agradecimentos

- Prefeitura do Recife
- Comunidade de desenvolvedores
- Usuários beta testers

---

## 💡 Dicas Rápidas

### Ver usuários cadastrados
```javascript
console.log(JSON.parse(localStorage.getItem('recife_sustentavel_users')))
```

### Cadastrar usuário de teste
```javascript
import { saveUser } from './utils/userStorage';
saveUser({
  id: Date.now(),
  name: "Teste",
  email: "teste@email.com",
  phone: "(81) 99999-9999",
  cpf: "123.456.789-01"
});
```

### Resetar tudo
```javascript
localStorage.clear();
location.reload();
```

---

<div align="center">
  
**🌿 Recife Sustentável - Por um futuro mais verde! 🌿**

[Documentação](./QUICK_START.md) • [Exemplos](./utils/EXAMPLES.md) • [Database](./database/README.md)

</div>
