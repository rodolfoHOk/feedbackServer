import axios from 'axios';
import { Provider, UserInfos } from './provider';

interface GithubAccessToken {
  access_token: string;
}

interface GithubUserInfos {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface GithubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_INFOS_URL = 'https://api.github.com/user';

export class GithubProvider implements Provider {
  async getToken(code: string): Promise<string> {
    const githubAccessTokenResponse = await axios.post<GithubAccessToken>(
      GITHUB_TOKEN_URL,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          redirect_uri: process.env.GITHUB_REDIRECT_URI,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return githubAccessTokenResponse.data.access_token;
  }

  async getUserInfos(token: string): Promise<UserInfos> {
    const githubUserInfosResponse = await axios.get<GithubUserInfos>(
      GITHUB_USER_INFOS_URL,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    let { id, name, email, avatar_url } = githubUserInfosResponse.data;

    if (!email) {
      const emailsResponse = await axios.get<GithubEmail[]>(
        'https://api.github.com/user/emails',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const emails = emailsResponse.data;

      if (emails.length > 0) {
        const primaryEmail = emails.find(
          (emailIterator) => emailIterator.primary
        );

        if (primaryEmail) {
          email = primaryEmail.email;
        } else {
          email = emails[0].email;
        }
      }
    }

    return {
      id,
      name,
      email,
      avatar_url,
    };
  }
}
