import NextAuth from 'next-auth';
import oauthConfig, { oauthFrameworkConfig } from '../../../config/oauth';

export default NextAuth({
  providers: [oauthConfig],
  session: {
    jwt: true,
  },
  callbacks: {
    jwt(token, user, account, claims, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (account) {
        token.uid = account.id;
      }    
      return token;
    },
    session(session, user) {      
      session.user.id = user.uid;
      return session;
    },
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL || 'mongodb://localhost:27017/a6-front',
  ...oauthFrameworkConfig,
});
