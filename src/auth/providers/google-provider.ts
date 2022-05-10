import axios from 'axios';
import { Provider, UserInfos } from './provider';

interface GoogleAccessToken {
  access_token: string;
}

interface GoogleUserInfos {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USER_INFOS_URL =
  'https://openidconnect.googleapis.com/v1/userinfo';

export class GoogleProvider implements Provider {
  async getToken(code: string): Promise<string> {
    const googleAccessTokenResponse = await axios.post<GoogleAccessToken>(
      GOOGLE_TOKEN_URL,
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
        code,
      }
    );

    return googleAccessTokenResponse.data.access_token;
  }

  async getUserInfos(token: string): Promise<UserInfos> {
    const googleUserInfosResponse = await axios.get<GoogleUserInfos>(
      GOOGLE_USER_INFOS_URL,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const { sub, name, email, picture } = googleUserInfosResponse.data;

    return {
      id: sub,
      name,
      email,
      avatar_url: picture,
    };
  }
}
