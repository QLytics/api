import { Database } from './database';

export interface Context {
  dataSources: {
    database: Database;
  };
}

export const dataSources = (env: Env) => () => ({
  database: new Database(env)
});
