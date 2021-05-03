class Server {
  constructor(env) {
    this.port = env.PORT || 80;
    this.morgan = {
      format: env.MORGAN_FORMAT || 'dev',
      stream: env.MORGAN_LEVEL_LOGGING || 'info',
    };
  }
}

export default Server;
