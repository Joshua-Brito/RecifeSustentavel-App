// Sistema de armazenamento local de usuários
// Simula um banco de dados usando localStorage do navegador

import { UserData } from '../App';

const USERS_STORAGE_KEY = 'recife_sustentavel_users';

/**
 * Busca todos os usuários cadastrados
 */
export const getAllUsers = (): UserData[] => {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

/**
 * Salva um novo usuário no banco de dados local
 */
export const saveUser = (userData: UserData): boolean => {
  try {
    const users = getAllUsers();
    
    // Verifica se o email já existe
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingUser) {
      console.warn('Usuário com este email já existe');
      return false;
    }
    
    // Adiciona o novo usuário
    users.push(userData);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return false;
  }
};

/**
 * Busca um usuário pelo email
 */
export const getUserByEmail = (email: string): UserData | null => {
  try {
    const users = getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
};

/**
 * Atualiza os dados de um usuário existente
 */
export const updateUser = (email: string, updatedData: Partial<UserData>): boolean => {
  try {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex === -1) {
      console.warn('Usuário não encontrado');
      return false;
    }
    
    // Atualiza o usuário mantendo o que não foi alterado
    users[userIndex] = { ...users[userIndex], ...updatedData };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return false;
  }
};

/**
 * Remove um usuário pelo email
 */
export const deleteUser = (email: string): boolean => {
  try {
    const users = getAllUsers();
    const filteredUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    
    if (filteredUsers.length === users.length) {
      console.warn('Usuário não encontrado');
      return false;
    }
    
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredUsers));
    return true;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return false;
  }
};

/**
 * Valida credenciais de login (email e senha)
 * Nota: Esta é uma implementação básica. Em produção, nunca armazene senhas em texto puro!
 */
export const validateCredentials = (email: string, password: string): UserData | null => {
  // Por enquanto, vamos apenas verificar se o usuário existe
  // Em produção, você deve verificar a senha com hash
  return getUserByEmail(email);
};

/**
 * Limpa todos os usuários (útil para desenvolvimento/reset)
 */
export const clearAllUsers = (): void => {
  try {
    localStorage.removeItem(USERS_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar usuários:', error);
  }
};

/**
 * Conta total de usuários cadastrados
 */
export const getUsersCount = (): number => {
  return getAllUsers().length;
};

/**
 * Verifica se um email já está cadastrado
 */
export const emailExists = (email: string): boolean => {
  return getUserByEmail(email) !== null;
};

/**
 * Cria usuários de exemplo (para desenvolvimento)
 */
export const seedExampleUsers = (): void => {
  const exampleUsers: UserData[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(81) 99999-9999',
      cpf: '123.456.789-01',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(81) 98888-8888',
      cpf: '987.654.321-09',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      phone: '(81) 97777-7777',
      cpf: '456.789.123-45',
    },
  ];

  // Limpa e adiciona os exemplos
  clearAllUsers();
  exampleUsers.forEach(user => saveUser(user));
  
  console.log('✅ Usuários de exemplo criados:', getUsersCount());
};
