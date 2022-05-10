export interface UserInfos {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface Provider {
  getToken: (code: string) => Promise<string>;
  getUserInfos: (token: string) => Promise<UserInfos>;
}
