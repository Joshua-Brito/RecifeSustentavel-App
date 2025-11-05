# 📱 Guia de Formatação - Recife Sustentável

## ✅ Formatação Implementada

### CPF
- **Formato**: `XXX.XXX.XXX-XX`
- **Exemplo**: `123.456.789-01`
- **Validação**: Aceita apenas números e formata automaticamente
- **Feedback visual**: Borda verde quando completo (14 caracteres)

### Telefone
- **Formato**: `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX`
- **Exemplo**: `(81) 99999-8888` ou `(81) 3355-0000`
- **Validação**: Aceita apenas números e formata automaticamente
- **Feedback visual**: Borda verde quando completo (14-15 caracteres)

## 🎯 Fluxo de Uso

### 1. Cadastro de Novo Usuário
```
1. Usuário acessa "Cadastrar"
2. Preenche o formulário:
   - Nome: "Joshua Silva"
   - CPF: Digita "12345678901" → automaticamente formatado para "123.456.789-01"
   - Telefone: Digita "81999998888" → automaticamente formatado para "(81) 99999-8888"
   - Email: "joshua@email.com"
   - Senha: ••••••••

3. Ao clicar em "Criar conta":
   - Toast: "Bem-vindo, Joshua! +50 Capivaras de boas-vindas 🎉"
   - Usuário é logado automaticamente
```

### 2. Tela Inicial (Home)
```
Exibe: "Bem-vindo de volta, Joshua! 👋"
```

### 3. Perfil do Usuário
```
┌─────────────────────────────────┐
│         [Foto Perfil]           │
│        Joshua Silva             │
│        🏆 Eco-Herói             │
│    Membro desde 11/2025         │
├─────────────────────────────────┤
│  📧 Email                       │
│     joshua@email.com            │
│                                 │
│  📞 Telefone                    │
│     (81) 99999-8888            │
│                                 │
│  💳 CPF                         │
│     123.456.789-01             │
└─────────────────────────────────┘
```

## 🔧 Como Funciona

### Formatação em Tempo Real
À medida que o usuário digita, os números são automaticamente formatados:

**CPF:**
```
Digitando: "1" → "1"
Digitando: "123" → "123"
Digitando: "1234" → "123.4"
Digitando: "123456" → "123.456"
Digitando: "1234567" → "123.456.7"
Digitando: "123456789" → "123.456.789"
Digitando: "1234567890" → "123.456.789-0"
Digitando: "12345678901" → "123.456.789-01" ✓
```

**Telefone:**
```
Digitando: "8" → "(8"
Digitando: "81" → "(81"
Digitando: "819" → "(81) 9"
Digitando: "81999" → "(81) 999"
Digitando: "8199999" → "(81) 99999"
Digitando: "819999988" → "(81) 99999-8"
Digitando: "81999998888" → "(81) 99999-8888" ✓
```

### Validação Visual

Os campos mostram feedback visual em tempo real:

- **Campo vazio**: Borda padrão
- **Campo incompleto**: Borda padrão + mensagem helper
- **Campo completo**: Borda verde (primary color)

Exemplo de mensagens helper:
- CPF: "Digite os 11 dígitos do CPF"
- Telefone: "Digite o número completo"

## 📊 Dados no Sistema

Os dados são armazenados e transmitidos **formatados**:

```typescript
// Interface UserData
{
  id: number;
  name: "Joshua Silva";
  email: "joshua@email.com";
  phone: "(81) 99999-8888";  // ← Armazenado formatado
  cpf: "123.456.789-01";      // ← Armazenado formatado
}
```

**Benefícios:**
- ✅ Exibição consistente em toda a aplicação
- ✅ Não precisa formatar em cada exibição
- ✅ Interface sempre apresentável

**Para integração com backend:**
- Use `unformatCPF()` e `unformatPhone()` antes de enviar ao servidor
- O backend deve armazenar apenas números
- Formate novamente ao receber do backend

## 🎨 Exemplos de Uso

### Componente com Formatação
```tsx
import { formatCPF, formatPhone } from '../utils/formatters';

function MyForm() {
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <>
      <Input
        value={cpf}
        onChange={(e) => setCpf(formatCPF(e.target.value))}
        maxLength={14}
        className={cpf.length === 14 ? 'border-primary' : ''}
      />
      
      <Input
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        maxLength={15}
        className={phone.length >= 14 ? 'border-primary' : ''}
      />
    </>
  );
}
```

## 📝 Notas Importantes

1. **Apenas números**: As funções automaticamente removem letras e símbolos
2. **maxLength**: Sempre defina para evitar entrada excessiva
3. **Validação backend**: Implemente validação completa no servidor
4. **CPF válido**: As funções atuais não validam dígitos verificadores
5. **Telefone**: Suporta tanto celular (11 dígitos) quanto fixo (10 dígitos)

## 🚀 Próximas Melhorias Sugeridas

- [ ] Validação completa de CPF (dígitos verificadores)
- [ ] Validação de DDD válido para telefone
- [ ] Formatação de outros campos (CEP, CNPJ, etc.)
- [ ] Mensagens de erro customizadas
- [ ] Integração com react-hook-form para validação completa
- [ ] Máscara de input visual (mostrar formato antes de digitar)
