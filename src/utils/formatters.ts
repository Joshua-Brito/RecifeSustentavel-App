// Funções utilitárias para formatação de dados

/**
 * Formata CPF para o padrão XXX.XXX.XXX-XX
 */
export const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

/**
 * Formata telefone para o padrão (XX) XXXXX-XXXX
 */
export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length === 0) return '';
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

/**
 * Remove formatação de CPF
 */
export const unformatCPF = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Remove formatação de telefone
 */
export const unformatPhone = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Valida CPF (verifica se tem 11 dígitos)
 */
export const isValidCPF = (value: string): boolean => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length === 11;
};

/**
 * Valida telefone (verifica se tem 10 ou 11 dígitos)
 */
export const isValidPhone = (value: string): boolean => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length === 10 || numbers.length === 11;
};
