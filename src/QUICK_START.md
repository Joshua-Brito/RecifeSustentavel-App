# 🚀 Guia Rápido - Recife Sustentável

## Como Testar o Sistema de Login Persistente

### ✅ Teste Completo em 5 Passos

#### 1️⃣ Primeiro Acesso - Cadastro

```
📍 Tela de Login
├─ Clique na aba "Cadastrar"
├─ Preencha:
│  ├─ Nome: Joshua Miguel
│  ├─ CPF: 12345678901 (será formatado para 123.456.789-01)
│  ├─ Telefone: 81999998888 (será formatado para (81) 99999-8888)
│  ├─ Email: joshuamiguelbrito@gmail.com
│  └─ Senha: suasenha123
│
└─ Clique em "Criar conta"

✅ Resultado esperado:
   Toast: "Bem-vindo, Joshua! +50 Capivaras de boas-vindas 🎉"
   Home: "Bem-vindo de volta, Joshua! 👋"
   Console: "✅ Novo usuário cadastrado: Joshua Miguel"
```

#### 2️⃣ Verificar Dados Salvos

```
📍 Navegue até o Perfil
├─ Clique no ícone "Perfil" no menu inferior
│
└─ Verifique se aparecem os dados corretos:
   ├─ Nome: Joshua Miguel
   ├─ Email: joshuamiguelbrito@gmail.com
   ├─ Telefone: (81) 99999-8888
   └─ CPF: 123.456.789-01

✅ Resultado esperado:
   Todos os dados exibidos corretamente formatados
```

#### 3️⃣ Fazer Logout

```
📍 Tela de Perfil
├─ Role até o final
├─ Clique em "Sair da conta" (botão vermelho)
│
└─ Você volta para a tela de login

✅ Resultado esperado:
   Volta para tela de login inicial
```

#### 4️⃣ Login com Email Cadastrado

```
📍 Tela de Login
├─ Aba "Entrar" (já deve estar selecionada)
├─ Digite apenas:
│  ├─ Email: joshuamiguelbrito@gmail.com
│  └─ Senha: qualquercoisa (por enquanto não valida)
│
└─ Clique em "Entrar"

✅ Resultado esperado:
   Toast: "Bem-vindo de volta, Joshua! 👋"
   Home: "Bem-vindo de volta, Joshua! 👋"
   Perfil com TODOS os dados do cadastro original
```

#### 5️⃣ Testar Email Não Cadastrado

```
📍 Faça logout e tente entrar com:
├─ Email: outrouser@email.com
└─ Clique em "Entrar"

✅ Resultado esperado:
   Toast: "Bem-vindo! Faça seu cadastro completo."
   Home: "Bem-vindo de volta, Outrouser! 👋"
   Perfil com dados genéricos (não salvos)
```

---

## 🛠️ Ferramentas de Debug

### Ver Usuários Cadastrados

```
📍 Tela de Login (parte inferior)
└─ Botão: "Ver usuários (X)"
   ├─ Clique para ver quantidade
   └─ Abre console (F12) para ver lista completa
```

### Limpar Todos os Dados

```
📍 Tela de Login (parte inferior)
└─ Botão: "Limpar dados"
   └─ Remove todos os usuários do banco local
      (Útil para começar do zero nos testes)
```

### Console do Navegador (F12)

```javascript
// Ver todos os usuários
console.log(JSON.parse(localStorage.getItem('recife_sustentavel_users')));

// Ver quantos usuários
JSON.parse(localStorage.getItem('recife_sustentavel_users')).length

// Limpar manualmente
localStorage.removeItem('recife_sustentavel_users')
```

---

## 🎯 Casos de Teste

### ✅ Caso 1: Cadastro Duplicado

```
1. Cadastre: joshua@email.com
2. Faça logout
3. Tente cadastrar novamente com joshua@email.com
4. ❌ Deve mostrar erro: "Este email já está cadastrado!"
```

### ✅ Caso 2: Múltiplos Usuários

```
1. Cadastre 3 usuários diferentes:
   - joshua@email.com
   - maria@email.com
   - pedro@email.com

2. Faça logout e login com cada um
3. ✅ Cada um deve ter seus próprios dados
```

### ✅ Caso 3: Persistência entre Sessões

```
1. Cadastre um usuário
2. ⚠️ FECHE COMPLETAMENTE o navegador
3. Abra o navegador novamente
4. Faça login com o mesmo email
5. ✅ Dados devem estar preservados
```

### ✅ Caso 4: Formatação Automática

```
1. No cadastro, digite CPF sem formatação: 12345678901
2. ✅ Campo formata para: 123.456.789-01

3. Digite telefone sem formatação: 81999998888
4. ✅ Campo formata para: (81) 99999-8888
```

---

## 📊 Fluxograma do Sistema

```
                    Usuário acessa o app
                            |
                            v
                    Tela de Login/Cadastro
                            |
                +-----------+-----------+
                |                       |
                v                       v
           Cadastrar                 Entrar
                |                       |
                v                       v
        Preenche dados         Digite email + senha
                |                       |
                v                       v
        Email existe?          Busca no localStorage
         |         |                    |
        Sim       Não          +--------+--------+
         |         |           |                 |
         v         v           v                 v
     ❌ Erro   ✅ Salva    Encontrado?        Não encontrado
                   |           |                 |
                   v           v                 v
              Login auto   Carrega dados    Usuário temp
                   |           |                 |
                   +-----+-----+-----+-----------+
                         |           |
                         v           v
                    App Mobile   Perfil com dados
```

---

## 🔍 Onde Estão os Dados?

### Fisicamente no Computador

**Chrome/Edge:**
```
Windows: 
C:\Users\[USER]\AppData\Local\Google\Chrome\User Data\Default\Local Storage\

Mac: 
~/Library/Application Support/Google/Chrome/Default/Local Storage/
```

**Firefox:**
```
Windows:
C:\Users\[USER]\AppData\Roaming\Mozilla\Firefox\Profiles\[PROFILE]\storage\default\

Mac:
~/Library/Application Support/Firefox/Profiles/[PROFILE]/storage/default/
```

### No DevTools (F12)

```
1. Abra DevTools (F12)
2. Vá para aba "Application" ou "Armazenamento"
3. Expanda "Local Storage"
4. Clique no domínio do app
5. Procure por "recife_sustentavel_users"
```

---

## ⚡ Atalhos Úteis

| Ação | Atalho |
|------|--------|
| Abrir DevTools | `F12` ou `Ctrl+Shift+I` |
| Limpar localStorage | Console: `localStorage.clear()` |
| Ver todos os dados | Console: `localStorage` |
| Recarregar página | `Ctrl+R` ou `F5` |
| Recarregar sem cache | `Ctrl+Shift+R` |

---

## 🚨 Troubleshooting

### Problema: Dados não são salvos

**Possíveis causas:**
- ❌ Navegador em modo privado/anônimo
- ❌ Cookies/localStorage bloqueados
- ❌ Extensões de privacidade bloqueando

**Solução:**
1. Use navegador em modo normal
2. Permita cookies e armazenamento local
3. Desative extensões de privacidade temporariamente

### Problema: "Este email já está cadastrado" mas não vejo o usuário

**Solução:**
```javascript
// No console (F12):
const users = JSON.parse(localStorage.getItem('recife_sustentavel_users'));
console.log(users);
// Verifique a lista de emails
```

### Problema: Dados sumiram

**Possíveis causas:**
- ❌ Limpou cache do navegador
- ❌ Usou modo privado
- ❌ Mudou de navegador

**Solução:**
- Cadastre-se novamente
- Use sempre o mesmo navegador

---

## 📚 Arquivos Relacionados

| Arquivo | Descrição |
|---------|-----------|
| `/utils/userStorage.ts` | Funções de gerenciamento de usuários |
| `/utils/formatters.ts` | Formatação de CPF e telefone |
| `/components/Login.tsx` | Tela de login e cadastro |
| `/database/LOCAL_STORAGE.md` | Documentação técnica completa |
| `/App.tsx` | Gerenciamento de estado do usuário |

---

## 🎉 Pronto para Usar!

Agora você tem um sistema completo de cadastro e login que:

✅ Salva dados localmente  
✅ Formata CPF e telefone automaticamente  
✅ Reconhece usuários cadastrados  
✅ Persiste entre sessões  
✅ Mostra nome personalizado em toda a app  

**Teste agora mesmo seguindo os 5 passos acima!** 🚀
