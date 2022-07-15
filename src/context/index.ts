import { Database } from './database';

export interface Context {
  dataSources: {
    database: Database;
  };
}

export const dataSources = () => ({
  database: new Database()
});
