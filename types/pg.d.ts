declare module 'pg' {
  import { EventEmitter } from 'events';

  export interface PoolConfig {
    connectionString?: string;
    ssl?: boolean | { rejectUnauthorized?: boolean };
    max?: number;
    idleTimeoutMillis?: number;
    connectionTimeoutMillis?: number;
  }

  export interface QueryResult<T = any> {
    rows: T[];
    rowCount: number;
  }

  export class Pool extends EventEmitter {
    constructor(config?: PoolConfig);
    query<T = any>(text: string, values?: any[]): Promise<QueryResult<T>>;
    end(): Promise<void>;
  }
}
