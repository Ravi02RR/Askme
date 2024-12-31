/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Server,
  Database,
  Activity,
  CheckCircle,
  XCircle,
  BarChart,
} from "lucide-react";
import axios from "axios";

interface DatabaseMetrics {
  collections: number;
  avgObjSize: number;
  dataSize: number;
  indexes: number;
}

interface DatabaseHealth {
  status: string;

  ping?: any;
  statistics?: any;
  metrics?: DatabaseMetrics;
  error?: string;
}

interface HealthStatus {
  uptime: number;
  timestamp: string;
  memory: {
    heapTotal: number;
    heapUsed: number;
    rss: number;
    external: number;
  };
  status: string;
  services: {
    server: string;
    database: DatabaseHealth;
    api: string;
  };
}

const Health = () => {
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://task.devguy.live/api/v1/health");
      setHealthData(response.data);
      setError(null);
    } catch (err) {
      //@ts-expect-error error
      console.log(err.message);
      setError("Failed to fetch health status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse flex items-center justify-center h-64">
            <Activity className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-red-600 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-14 ">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Overall Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            {healthData?.status === "healthy" ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <div>
              <h2 className="text-xl font-semibold">
                System is {healthData?.status}
              </h2>
              <p className="text-gray-500">
                Last updated:{" "}
                {new Date(healthData?.timestamp || "").toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Server Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-5 w-5 text-gray-400" />
              <h3 className="font-semibold">Server</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{healthData?.services.server}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Uptime</p>
                <p className="font-medium">
                  {formatUptime(healthData?.uptime || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-gray-400" />
              <h3 className="font-semibold">Database</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {healthData?.services.database.status}
                </p>
              </div>
              {healthData?.services.database.metrics && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Collections</p>
                    <p className="font-medium">
                      {healthData.services.database.metrics.collections}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Indexes</p>
                    <p className="font-medium">
                      {healthData.services.database.metrics.indexes}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="h-5 w-5 text-gray-400" />
              <h3 className="font-semibold">Memory Usage</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Heap Total</p>
                <p className="font-medium">
                  {formatBytes(healthData?.memory.heapTotal || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Heap Used</p>
                <p className="font-medium">
                  {formatBytes(healthData?.memory.heapUsed || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">RSS</p>
                <p className="font-medium">
                  {formatBytes(healthData?.memory.rss || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
