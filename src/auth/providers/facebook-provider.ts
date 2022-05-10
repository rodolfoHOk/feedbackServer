import axios from 'axios';
import { Provider, UserInfos } from './provider';

interface FacebookAccessToken {
  access_token: string;
}

interface FacebookPicture {
  data: {
    url: string;
  };
}

interface FacebookUserInfos {
  id: string;
  name: string;
  email: string;
  picture: FacebookPicture;
}

const FACEBOOK_TOKEN_URL = 'https://graph.facebook.com/oauth/access_token';
const FACEBOOK_USER_INFOS_URL = 'https://graph.facebook.com/me';

export class FacebookProvider implements Provider {
  async getToken(code: string): Promise<string> {
    const facebookAccessTokenResponse = await axios.get<FacebookAccessToken>(
      FACEBOOK_TOKEN_URL,
      {
        params: {
          client_id: process.env.FACEBOOK_CLIENT_ID,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return facebookAccessTokenResponse.data.access_token;
  }

  async getUserInfos(token: string): Promise<UserInfos> {
    const facebookUserInfosResponse = await axios.get<FacebookUserInfos>(
      FACEBOOK_USER_INFOS_URL,
      {
        params: {
          fields: ['id', 'name', 'email', 'picture'].join(','),
          access_token: token,
        },
      }
    );

    const { id, name, email, picture } = facebookUserInfosResponse.data;

    return {
      id,
      name,
      email,
      avatar_url: picture.data.url,
    };
  }
}
