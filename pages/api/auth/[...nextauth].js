import NextAuth from 'next-auth';
import oauthConfig from '../../../config/oauth';

export default NextAuth({
  providers: [
    oauthConfig
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL || 'mongodb://localhost:27017/a6-front',
})