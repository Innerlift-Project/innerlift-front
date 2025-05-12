import api from '@/utils/api';
import { UUID } from 'crypto';

interface CreateUserRequest {
  name: string;
  id: UUID;
}

export const createUser = async (userData: CreateUserRequest) => {
  const response = await api.post('/public/users', userData);
  return response.data;
};