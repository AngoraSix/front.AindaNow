import NextAuth from 'next-auth';
import oauthConfig, { oauthFrameworkConfig } from '../../../config/oauth';

export default NextAuth({
  providers: [oauthConfig],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL || 'mongodb://localhost:27017/a6-front',
  ...oauthFrameworkConfig,
});
