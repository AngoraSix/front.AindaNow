import crypto from 'crypto';

class Crypto {
  constructor(env) {
    this.key = env.CRYPTO_KEY || crypto.randomBytes(32).toString('hex');
    this.alg = env.CRYPTO_ALG || 'aes-256-cbc';
  }
}

export default Crypto;
