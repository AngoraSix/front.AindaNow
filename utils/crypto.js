import crypto from 'crypto';

export function encrypt(text, cryptoConfig) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    cryptoConfig.alg,
    Buffer.from(cryptoConfig.key, 'hex'),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encrypted: encrypted.toString('hex') };
}

export function decrypt(encryptedPassword, cryptoConfig) {
  let iv = Buffer.from(encryptedPassword.iv, 'hex');
  let encryptedText = Buffer.from(encryptedPassword.encrypted, 'hex');
  let decipher = crypto.createDecipheriv(
    cryptoConfig.alg,
    Buffer.from(cryptoConfig.key, 'hex'),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
