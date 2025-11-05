# Utilitários de Formatação

Funções para formatar e validar dados comuns brasileiros.

## Formatação de CPF

```typescript
import { formatCPF, unformatCPF, isValidCPF } from './formatters';

// Formatação automática conforme o usuário digita
const handleCPFChange = (value: string) => {
  const formatted = formatCPF(value);
  setCpf(formatted);
};

// Exemplos:
formatCPF('12345678901')    // Retorna: "123.456.789-01"
formatCPF('123456789')      // Retorna: "123.456.789"
formatCPF('123')            // Retorna: "123"

// Remover formatação para enviar ao backend
unformatCPF('123.456.789-01')  // Retorna: "12345678901"

// Validação simples (verifica apenas o comprimento)
isValidCPF('123.456.789-01')   // Retorna: true
isValidCPF('123.456')          // Retorna: false
```

## Formatação de Telefone

```typescript
import { formatPhone, unformatPhone, isValidPhone } from './formatters';

// Formatação automática conforme o usuário digita
const handlePhoneChange = (value: string) => {
  const formatted = formatPhone(value);
  setPhone(formatted);
};

// Exemplos:
formatPhone('11999887766')   // Retorna: "(11) 99988-7766"
formatPhone('1133334444')    // Retorna: "(11) 3333-4444"
formatPhone('119998')        // Retorna: "(11) 9998"
formatPhone('11')            // Retorna: "(11"

// Remover formatação para enviar ao backend
unformatPhone('(11) 99988-7766')  // Retorna: "11999887766"

// Validação simples (aceita 10 ou 11 dígitos)
isValidPhone('(11) 99988-7766')   // Retorna: true (11 dígitos)
isValidPhone('(11) 3333-4444')    // Retorna: true (10 dígitos)
isValidPhone('(11) 9998')         // Retorna: false
```

## Uso em Componentes

### Input com formatação em tempo real

```tsx
import { useState } from 'react';
import { formatCPF, formatPhone } from '../utils/formatters';
import { Input } from './ui/input';

function MyForm() {
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <form>
      <Input
        placeholder="000.000.000-00"
        value={cpf}
        onChange={(e) => setCpf(formatCPF(e.target.value))}
        maxLength={14}
      />
      
      <Input
        placeholder="(81) 99999-9999"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        maxLength={15}
      />
    </form>
  );
}
```

### Validação visual

```tsx
<Input
  value={cpf}
  onChange={(e) => setCpf(formatCPF(e.target.value))}
  maxLength={14}
  className={cpf.length === 14 ? 'border-primary' : ''}
/>
{cpf.length > 0 && cpf.length < 14 && (
  <p className="text-xs text-muted-foreground">
    Digite os 11 dígitos do CPF
  </p>
)}
```

## Notas

- **CPF**: Formato brasileiro padrão XXX.XXX.XXX-XX (11 dígitos)
- **Telefone**: Formato brasileiro (XX) XXXXX-XXXX (11 dígitos com 9 na frente) ou (XX) XXXX-XXXX (10 dígitos para fixo)
- As funções de formatação removem automaticamente caracteres não numéricos
- As validações são básicas (apenas verificam comprimento). Para validação completa de CPF (dígitos verificadores), seria necessário implementar o algoritmo completo
