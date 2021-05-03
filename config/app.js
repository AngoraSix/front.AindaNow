class App {
  constructor(env) {
    this.roles = {
      master: env.MASTER_ROLE || 'hoc.master',
    };
  }
}

export default App;
