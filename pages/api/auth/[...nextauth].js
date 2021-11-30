import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import oauthProviderConfig, {
  oauthFrameworkConfig,
  oauthCallbacksConfig,
} from '../../../config/oauth';

export default NextAuth({
  providers: [oauthProviderConfig],
  callbacks: oauthCallbacksConfig,
  adapter: MongoDBAdapter(clientPromise),
  ...oauthFrameworkConfig,
});
