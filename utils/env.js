export const getEnv = () => {
  const AN_APP_PREFIX = 'AN_APP_';
  const AN_ENV_KEYS = Object.keys(process.env).filter((key) =>
    key.toLowerCase().startsWith(AN_APP_PREFIX.toLowerCase())
  );

  const AN_ENV = AN_ENV_KEYS.reduce((prev, currentKey) => {
    prev[currentKey] = process.env[currentKey];
    prev[currentKey.slice(AN_APP_PREFIX.length)] = process.env[currentKey];
    return prev;
  }, {});

  return AN_ENV;
};
