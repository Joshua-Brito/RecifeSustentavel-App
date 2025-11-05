# 📖 Exemplos Práticos - Sistema de Usuários

## Exemplos de Uso das Funções de userStorage.ts

### 1. Cadastrar um Novo Usuário

```typescript
import { saveUser } from './userStorage';
import { formatCPF, formatPhone } from './formatters';

// Dados do formulário
const formData = {
  name: "Joshua Miguel Brito",
  email: "joshuamiguelbrito@gmail.com",
  cpf: "12345678901",
  phone: "81999998888"
};

// Criar objeto UserData
const newUser = {
  id: Date.now(), // ID único baseado no timestamp
  name: formData.name,
  email: formData.email,
  cpf: formatCPF(formData.cpf),     // 123.456.789-01
  phone: formatPhone(formData.phone) // (81) 99999-8888
};

// Salvar
const success = saveUser(newUser);

if (success) {
  console.log('✅ Usuário cadastrado com sucesso!');
  console.log('Total de usuários:', getUsersCount());
} else {
  console.error('❌ Email já cadastrado!');
}
```

### 2. Fazer Login (Buscar Usuário)

```typescript
import { getUserByEmail } from './userStorage';

function handleLogin(email: string, password: string) {
  // Buscar usuário pelo email
  const user = getUserByEmail(email);
  
  if (user) {
    // Usuário encontrado!
    console.log(`👋 Bem-vindo de volta, ${user.name}!`);
    console.log('Dados do usuário:', user);
    
    // Em produção, verificaria a senha aqui
    // if (checkPassword(password, user.passwordHash)) { ... }
    
    return user;
  } else {
    console.log('❌ Usuário não encontrado');
    return null;
  }
}

// Uso:
const userData = handleLogin('joshua@gmail.com', 'senha123');
if (userData) {
  // Redirecionar para app
  navigateToApp(userData);
}
```

### 3. Verificar se Email Já Existe (antes de cadastrar)

```typescript
import { emailExists } from './userStorage';

function validateRegistration(email: string) {
  if (emailExists(email)) {
    // Email já cadastrado
    showError('Este email já está em uso. Faça login ou use outro email.');
    return false;
  }
  
  // Email disponível
  return true;
}

// Uso no formulário:
const canRegister = validateRegistration('teste@email.com');
if (canRegister) {
  proceedWithRegistration();
}
```

### 4. Atualizar Dados do Usuário

```typescript
import { updateUser, getUserByEmail } from './userStorage';
import { formatPhone } from './formatters';

function updateUserProfile(email: string, newData: any) {
  // Buscar usuário atual
  const currentUser = getUserByEmail(email);
  
  if (!currentUser) {
    console.error('Usuário não encontrado');
    return false;
  }
  
  // Preparar dados atualizados
  const updates = {
    name: newData.name || currentUser.name,
    phone: newData.phone ? formatPhone(newData.phone) : currentUser.phone,
    // CPF e email geralmente não mudam
  };
  
  // Atualizar
  const success = updateUser(email, updates);
  
  if (success) {
    console.log('✅ Perfil atualizado!');
    const updatedUser = getUserByEmail(email);
    console.log('Novos dados:', updatedUser);
  }
  
  return success;
}

// Uso:
updateUserProfile('joshua@gmail.com', {
  name: 'Joshua Miguel de Brito',
  phone: '81988887777'
});
```

### 5. Listar Todos os Usuários (Admin)

```typescript
import { getAllUsers } from './userStorage';

function displayAllUsers() {
  const users = getAllUsers();
  
  console.log(`📊 Total de usuários cadastrados: ${users.length}\n`);
  
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Telefone: ${user.phone}`);
    console.log(`   CPF: ${user.cpf}`);
    console.log(`   ID: ${user.id}\n`);
  });
  
  return users;
}

// Uso:
displayAllUsers();
```

### 6. Deletar um Usuário

```typescript
import { deleteUser, getUserByEmail } from './userStorage';

function removeUser(email: string) {
  // Confirmar que o usuário existe
  const user = getUserByEmail(email);
  
  if (!user) {
    console.error('❌ Usuário não encontrado');
    return false;
  }
  
  // Confirmar exclusão
  const confirmed = confirm(`Deseja realmente excluir ${user.name}?`);
  
  if (confirmed) {
    const success = deleteUser(email);
    
    if (success) {
      console.log(`✅ Usuário ${user.name} foi removido`);
      return true;
    }
  }
  
  return false;
}

// Uso:
removeUser('usuario@email.com');
```

### 7. Limpar Todos os Dados (Reset)

```typescript
import { clearAllUsers, getUsersCount } from './userStorage';

function resetDatabase() {
  const count = getUsersCount();
  
  const confirmed = confirm(
    `⚠️ Isso vai remover ${count} usuário(s).\n` +
    `Tem certeza?`
  );
  
  if (confirmed) {
    clearAllUsers();
    console.log('🗑️ Todos os usuários foram removidos');
    console.log('Usuários restantes:', getUsersCount()); // 0
  }
}

// Uso:
resetDatabase();
```

### 8. Verificar Integridade dos Dados

```typescript
import { getAllUsers } from './userStorage';

function checkDataIntegrity() {
  const users = getAllUsers();
  const issues = [];
  
  users.forEach(user => {
    // Verificar campos obrigatórios
    if (!user.name) issues.push(`ID ${user.id}: Nome vazio`);
    if (!user.email) issues.push(`ID ${user.id}: Email vazio`);
    if (!user.phone) issues.push(`ID ${user.id}: Telefone vazio`);
    if (!user.cpf) issues.push(`ID ${user.id}: CPF vazio`);
    
    // Verificar formato do email
    if (user.email && !user.email.includes('@')) {
      issues.push(`ID ${user.id}: Email inválido (${user.email})`);
    }
    
    // Verificar formato do CPF
    if (user.cpf && user.cpf.length !== 14) {
      issues.push(`ID ${user.id}: CPF com formato incorreto (${user.cpf})`);
    }
  });
  
  if (issues.length > 0) {
    console.warn('⚠️ Problemas encontrados:');
    issues.forEach(issue => console.warn(`  - ${issue}`));
  } else {
    console.log('✅ Todos os dados estão íntegros!');
  }
  
  return issues;
}

// Uso:
checkDataIntegrity();
```

### 9. Exportar Dados (Backup)

```typescript
import { getAllUsers } from './userStorage';

function exportUsers() {
  const users = getAllUsers();
  const json = JSON.stringify(users, null, 2);
  
  // Criar arquivo para download
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `usuarios_backup_${Date.now()}.json`;
  link.click();
  
  console.log(`✅ Exportados ${users.length} usuários`);
}

// Uso:
exportUsers();
```

### 10. Importar Dados (Restaurar Backup)

```typescript
import { saveUser, clearAllUsers } from './userStorage';

function importUsers(jsonData: string) {
  try {
    const users = JSON.parse(jsonData);
    
    if (!Array.isArray(users)) {
      throw new Error('Formato inválido');
    }
    
    // Limpar dados atuais (opcional)
    const confirmClear = confirm(
      'Deseja substituir os dados atuais?'
    );
    
    if (confirmClear) {
      clearAllUsers();
    }
    
    // Importar cada usuário
    let imported = 0;
    users.forEach(user => {
      if (saveUser(user)) {
        imported++;
      }
    });
    
    console.log(`✅ Importados ${imported}/${users.length} usuários`);
    
  } catch (error) {
    console.error('❌ Erro ao importar:', error);
  }
}

// Uso com arquivo:
const fileInput = document.getElementById('file-input');
fileInput?.addEventListener('change', (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      importUsers(e.target?.result as string);
    };
    reader.readAsText(file);
  }
});
```

### 11. Buscar Usuários por Nome

```typescript
import { getAllUsers } from './userStorage';

function searchUsersByName(searchTerm: string) {
  const users = getAllUsers();
  const term = searchTerm.toLowerCase();
  
  const results = users.filter(user => 
    user.name.toLowerCase().includes(term)
  );
  
  console.log(`🔍 Encontrados ${results.length} usuário(s):`);
  results.forEach(user => {
    console.log(`  - ${user.name} (${user.email})`);
  });
  
  return results;
}

// Uso:
searchUsersByName('Joshua'); // Encontra "Joshua Miguel", "Joshua Silva", etc.
```

### 12. Estatísticas de Usuários

```typescript
import { getAllUsers } from './userStorage';

function getUserStatistics() {
  const users = getAllUsers();
  
  // Contar por domínio de email
  const domains = users.reduce((acc, user) => {
    const domain = user.email.split('@')[1];
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Contar por DDD
  const ddds = users.reduce((acc, user) => {
    const ddd = user.phone.match(/\((\d+)\)/)?.[1] || 'Unknown';
    acc[ddd] = (acc[ddd] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const stats = {
    total: users.length,
    domains,
    ddds,
    mostRecentUser: users[users.length - 1],
    oldestUser: users[0]
  };
  
  console.log('📊 Estatísticas:', stats);
  return stats;
}

// Uso:
getUserStatistics();
/*
Output exemplo:
{
  total: 5,
  domains: {
    'gmail.com': 3,
    'email.com': 2
  },
  ddds: {
    '81': 4,
    '11': 1
  },
  mostRecentUser: { ... },
  oldestUser: { ... }
}
*/
```

---

## 🎯 Casos de Uso Reais

### Componente React - Formulário de Cadastro

```tsx
import { useState } from 'react';
import { saveUser, emailExists } from '../utils/userStorage';
import { formatCPF, formatPhone } from '../utils/formatters';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email único
    if (emailExists(formData.email)) {
      setError('Este email já está cadastrado!');
      return;
    }
    
    // Criar usuário
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      cpf: formData.cpf,
      phone: formData.phone
    };
    
    // Salvar
    const success = saveUser(newUser);
    
    if (success) {
      alert('Cadastro realizado com sucesso!');
      // Redirecionar ou fazer login automático
    } else {
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome completo"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      
      <input
        placeholder="CPF"
        value={formData.cpf}
        onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})}
        maxLength={14}
      />
      
      <input
        placeholder="Telefone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: formatPhone(e.target.value)})}
        maxLength={15}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      
      {error && <p className="error">{error}</p>}
      
      <button type="submit">Cadastrar</button>
    </form>
  );
}
```

### Hook Customizado - useUser

```tsx
import { useState, useEffect } from 'react';
import { getUserByEmail } from '../utils/userStorage';
import { UserData } from '../App';

function useUser(email: string | null) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const userData = getUserByEmail(email);
      setUser(userData);
    }
    setLoading(false);
  }, [email]);

  return { user, loading };
}

// Uso:
function UserProfile({ userEmail }: { userEmail: string }) {
  const { user, loading } = useUser(userEmail);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}
```

---

## 💡 Dicas e Boas Práticas

1. **Sempre formatar antes de salvar**
   ```typescript
   const user = {
     cpf: formatCPF(rawCpf),
     phone: formatPhone(rawPhone)
   };
   ```

2. **Verificar email único antes de cadastrar**
   ```typescript
   if (emailExists(email)) {
     // Mostrar erro
     return;
   }
   ```

3. **Usar try-catch para operações críticas**
   ```typescript
   try {
     const success = saveUser(userData);
   } catch (error) {
     console.error('Erro ao salvar:', error);
   }
   ```

4. **Validar dados antes de usar**
   ```typescript
   const user = getUserByEmail(email);
   if (user && user.name && user.email) {
     // Usar dados
   }
   ```

5. **Fazer backup periódico**
   ```typescript
   // A cada X usuários cadastrados
   if (getUsersCount() % 10 === 0) {
     exportUsers(); // Fazer backup
   }
   ```
