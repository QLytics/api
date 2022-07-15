import { IDatabase } from './type-defs';

export interface Context {
  dataSources: {
    database: IDatabase;
  };
}
