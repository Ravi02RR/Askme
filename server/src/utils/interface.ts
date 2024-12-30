export interface DatabaseStats {
  collections: number;
  avgObjSize: number;
  dataSize: number;
  indexes: number;
  [key: string]: any;
}

export interface DatabaseHealth {
  status: string;
  ping?: { ok: number };
  statistics?: DatabaseStats;
  error?: string;
  metrics?: {
    collections: number;
    avgObjSize: number;
    dataSize: number;
    indexes: number;
  };
}

export interface ServiceHealth {
  server: string;
  database: DatabaseHealth;
  api: string;
}

export interface HealthStatus {
  uptime: number;
  timestamp: string;
  memory: NodeJS.MemoryUsage;
  status: string;
  services: ServiceHealth;
}
