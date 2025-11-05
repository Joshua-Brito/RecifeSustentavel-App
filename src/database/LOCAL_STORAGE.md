# 💾 Sistema de Armazenamento Local

## Visão Geral

O aplicativo Recife Sustentável utiliza **localStorage** do navegador para armazenar dados de usuários localmente. Isso simula um banco de dados para desenvolvimento e demonstração, permitindo que os usuários façam login e cadastro sem necessidade de um servidor backend.

## Como Funciona

### 1. Cadastro de Novo Usuário

```
Usuário preenche o formulário de cadastro:
├─ Nome: "Joshua Miguel"
├─ CPF: "123.456.789-01"
├─ Telefone: "(81) 99999-8888"
├─ Email: "joshuamiguelbrito@gmail.com"
└─ Senha: ••••••••

Sistema verifica:
├─ Email já existe? 
│  ├─ SIM → Mostra erro: "Este email já está cadastrado!"
│  └─ NÃO → Continua
│
└─ Salva no localStorage:
   └─ Key: "recife_sustentavel_users"
      └─ Array de usuários com todos os dados
```

### 2. Login de Usuário Existente

```
Usuário digita email: "joshuamiguelbrito@gmail.com"

Sistema busca no localStorage:
├─ Usuário encontrado?
│  ├─ SIM → Carrega dados salvos
│  │   └─ "Bem-vindo de volta, Joshua! 👋"
│  │
│  └─ NÃO → Cria usuário temporário
│      └─ "Bem-vindo! Faça seu cadastro completo."
```

### 3. Persistência de Dados

Os dados ficam salvos no navegador e **persistem entre sessões**:

- ✅ Fecha o navegador → Dados permanecem
- ✅ Atualiza a página → Dados permanecem
- ✅ Desliga o computador → Dados permanecem
- ❌ Limpa cache do navegador → Dados são perdidos
- ❌ Usa modo anônimo/privado → Dados não são salvos

## Estrutura de Dados

### UserData (Interface)

```typescript
interface UserData {
  id: number;           // ID único do usuário
  name: string;         // Nome completo
  email: string;        // Email (usado como chave única)
  phone: string;        // Telefone formatado: (XX) XXXXX-XXXX
  cpf: string;          // CPF formatado: XXX.XXX.XXX-XX
}
```

### Armazenamento no localStorage

```json
{
  "recife_sustentavel_users": [
    {
      "id": 1730822400000,
      "name": "Joshua Miguel",
      "email": "joshuamiguelbrito@gmail.com",
      "phone": "(81) 99999-8888",
      "cpf": "123.456.789-01"
    },
    {
      "id": 1730822500000,
      "name": "Maria Silva",
      "email": "maria.silva@email.com",
      "phone": "(81) 98888-7777",
      "cpf": "987.654.321-09"
    }
  ]
}
```

## Funções Disponíveis

### Arquivo: `/utils/userStorage.ts`

#### 1. `getAllUsers()`
Retorna todos os usuários cadastrados.

```typescript
const users = getAllUsers();
console.log(`Total: ${users.length} usuários`);
```

#### 2. `saveUser(userData)`
Cadastra um novo usuário.

```typescript
const newUser: UserData = {
  id: Date.now(),
  name: "João Santos",
  email: "joao@email.com",
  phone: "(81) 99999-9999",
  cpf: "111.222.333-44"
};

const success = saveUser(newUser);
if (success) {
  console.log('✅ Usuário cadastrado!');
} else {
  console.log('❌ Email já existe!');
}
```

#### 3. `getUserByEmail(email)`
Busca um usuário pelo email.

```typescript
const user = getUserByEmail("joshuamiguelbrito@gmail.com");

if (user) {
  console.log(`Bem-vindo, ${user.name}!`);
} else {
  console.log('Usuário não encontrado');
}
```

#### 4. `emailExists(email)`
Verifica se um email já está cadastrado.

```typescript
if (emailExists("teste@email.com")) {
  console.log('Este email já está em uso');
}
```

#### 5. `updateUser(email, updatedData)`
Atualiza dados de um usuário.

```typescript
updateUser("joao@email.com", {
  phone: "(81) 98765-4321",
  name: "João Pedro Santos"
});
```

#### 6. `deleteUser(email)`
Remove um usuário.

```typescript
deleteUser("usuario@email.com");
```

#### 7. `getUsersCount()`
Retorna quantidade de usuários cadastrados.

```typescript
console.log(`${getUsersCount()} usuários`);
```

#### 8. `clearAllUsers()`
Remove todos os usuários (útil para desenvolvimento).

```typescript
clearAllUsers();
console.log('Banco de dados limpo!');
```

## Fluxo Completo de Uso

### Cenário 1: Primeiro Acesso - Cadastro

```
1. Usuário acessa o app pela primeira vez
2. Clica em "Cadastrar"
3. Preenche: Joshua Miguel, CPF, telefone, email, senha
4. Sistema salva no localStorage
5. Console: "✅ Novo usuário cadastrado: Joshua Miguel"
6. Console: "💾 Total de usuários: 1"
7. Usuário é logado automaticamente
8. Home: "Bem-vindo de volta, Joshua! 👋"
9. Perfil mostra todos os dados cadastrados
```

### Cenário 2: Segundo Acesso - Login

```
1. Usuário volta ao app (mesmo navegador)
2. Clica em "Entrar"
3. Digita: joshuamiguelbrito@gmail.com
4. Sistema busca no localStorage
5. Encontra usuário "Joshua Miguel"
6. Toast: "Bem-vindo de volta, Joshua! 👋"
7. Home: "Bem-vindo de volta, Joshua! 👋"
8. Perfil mostra dados do cadastro original
```

### Cenário 3: Email Não Cadastrado

```
1. Usuário digita email não cadastrado
2. Sistema não encontra no localStorage
3. Cria usuário temporário com dados básicos
4. Toast: "Bem-vindo! Faça seu cadastro completo."
5. Dados temporários não são salvos
```

## Ferramentas de Debug

Na tela de login, há botões de desenvolvimento:

### Ver Usuários
- Mostra quantidade de usuários cadastrados
- Imprime lista completa no console do navegador
- Toast: "X usuário(s) cadastrado(s)"

### Limpar Dados
- Remove todos os usuários do localStorage
- Útil para testar cadastro do zero
- Toast: "Todos os usuários foram removidos"

### Console do Navegador

Abra o DevTools (F12) e use:

```javascript
// Ver todos os usuários
localStorage.getItem('recife_sustentavel_users')

// Ver formatado
JSON.parse(localStorage.getItem('recife_sustentavel_users'))

// Limpar tudo
localStorage.removeItem('recife_sustentavel_users')

// Ver quantidade
JSON.parse(localStorage.getItem('recife_sustentavel_users')).length
```

## Limitações

### ⚠️ Importante Saber

1. **Dados locais ao navegador**
   - Chrome ≠ Firefox ≠ Safari
   - Dados não sincronizam entre navegadores
   - Cada navegador tem seu próprio banco

2. **Limite de armazenamento**
   - localStorage: ~5-10MB por domínio
   - Suficiente para milhares de usuários

3. **Segurança**
   - ❌ Não armazene senhas em texto puro (estamos fazendo apenas para demo)
   - ❌ Não armazene dados sensíveis
   - ❌ Dados podem ser acessados via JavaScript
   - ✅ Em produção, use um backend real com criptografia

4. **Modo Privado/Anônimo**
   - Dados são apagados ao fechar o navegador
   - localStorage funciona apenas na sessão

## Migração para Produção

Quando integrar com Supabase/Backend real:

### 1. Substituir localStorage por API calls

**Antes (localStorage):**
```typescript
const user = getUserByEmail(email);
```

**Depois (Supabase):**
```typescript
const { data: user } = await supabase
  .from('USUARIO')
  .select('*')
  .eq('email', email)
  .single();
```

### 2. Implementar autenticação real

**Antes:**
```typescript
// Apenas verifica se email existe
const user = getUserByEmail(email);
```

**Depois:**
```typescript
// Verifica email E senha com hash
const { user } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

### 3. Manter sincronização

```typescript
// Ao cadastrar
const userData = {
  name, email, phone, cpf
};

// Salvar no Supabase
await supabase.from('USUARIO').insert(userData);

// Opcional: manter cache local
saveUser(userData); // localStorage como cache
```

## Testes Sugeridos

### ✅ Teste 1: Cadastro Novo
1. Limpe os dados (botão "Limpar dados")
2. Cadastre-se como "Joshua Miguel"
3. Verifique se aparece "Bem-vindo, Joshua!"
4. Feche o app e abra novamente
5. Faça login com o mesmo email
6. Deve aparecer "Bem-vindo de volta, Joshua! 👋"

### ✅ Teste 2: Email Duplicado
1. Cadastre um usuário
2. Tente cadastrar com o mesmo email
3. Deve mostrar erro: "Este email já está cadastrado!"

### ✅ Teste 3: Múltiplos Usuários
1. Cadastre 3 usuários diferentes
2. Clique em "Ver usuários"
3. Deve mostrar: "3 usuário(s) cadastrado(s)"
4. Console deve listar os 3 usuários

### ✅ Teste 4: Persistência
1. Cadastre um usuário
2. Feche completamente o navegador
3. Abra o navegador novamente
4. Faça login
5. Dados devem estar preservados

## Próximos Passos

- [ ] Implementar hash de senha (bcrypt)
- [ ] Adicionar verificação de email
- [ ] Integrar com Supabase para sincronização
- [ ] Adicionar recuperação de senha
- [ ] Implementar sessão/token de autenticação
- [ ] Adicionar foto de perfil ao UserData
- [ ] Migrar para IndexedDB (mais robusto que localStorage)
