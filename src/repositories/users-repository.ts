import { Role, User } from '@prisma/client';

export interface UserCreateData {
  name: string;
  email: string;
  avatar_url: string;
  role: Role;
  created_at: Date;
  last_access: Date;
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  updateLastAccess: (id: string) => Promise<User>;
}
