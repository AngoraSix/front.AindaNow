export const getEnv = () => {
  const AN_APP_PREFIX = 'AN_PUBLIC_APP_';
  const AN_ENV_KEYS = Object.keys(process.env).filter((key) =>
    key.toLowerCase().startsWith(AN_APP_PREFIX.toLowerCase())
  );

  const AN_ENV = AN_ENV_KEYS.reduce((prev, currentKey) => {
    prev[currentKey] = process.env[currentKey];
    return prev;
  }, {});

  return AN_ENV;
};


const SECRETS_PATTERNS = ['SECRET', 'PASS', 'APIKEY'];

export const removeSecrets = (env) => {
  const safeEnvEntries = Object.entries(env).filter(([key]) => {
    return !SECRETS_PATTERNS.some(secretKeyPattern => key.toLowerCase().includes(secretKeyPattern.toLowerCase()))
  });

  // regenerate object from entries
  return Object.fromEntries(safeEnvEntries);
}
