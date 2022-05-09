import { Role, User } from '@prisma/client';

export interface UserCreateData {
  github_id: number;
  login: string;
  name: string;
  avatar_url: string;
  role: Role;
  created_at: Date;
  last_access: Date;
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<User>;
  findByGithubId: (githubId: number) => Promise<User | null>;
  updateLastAccess: (id: string) => Promise<User>;
}
