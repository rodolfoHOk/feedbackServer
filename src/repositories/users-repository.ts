import { Role, User } from '@prisma/client';

export interface UserCreateData {
  social_id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: Role;
  created_at: Date;
  last_access: Date;
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<User>;
  findBySocialId: (socialId: string) => Promise<User | null>;
  updateLastAccess: (id: string) => Promise<User>;
}
