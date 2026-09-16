'use client';

import { useState, useEffect } from 'react';
import { apiClient, AuditLog } from '@/lib/api/client';

interface EntityAuditLogProps {
  entityType: string;
  entityId: number;
  showTitle?: boolean;
}

export default function EntityAuditLog({
  entityType,
  entityId,
  showTitle = true,
}: EntityAuditLogProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.getAuditLogsByEntity(entityType, entityId);

        if (response.error) {
          setError(response.error);
          return;
        }

        if (response.data) {
          setLogs(response.data.logs);
        }
      } catch (err) {
        setError('Failed to fetch audit logs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [entityType, entityId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionBadgeColor = (action: string) => {
    const colors: Record<string, string> = {
      CREATE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      UPDATE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      LOGIN: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      LOGOUT: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      VIEW: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      EXPORT: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      APPROVE: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      REJECT: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    };
    return colors[action] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
        {showTitle && (
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Audit History
          </h3>
        )}
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-zinc-900 dark:border-white"></div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
        {showTitle && (
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Audit History
          </h3>
        )}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
      {showTitle && (
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Audit History
        </h3>
      )}

      {logs.length === 0 ? (
        <p className="text-center text-zinc-600 dark:text-zinc-400 py-8">
          No audit logs found for this entity
        </p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionBadgeColor(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {formatDate(log.createdAt)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {log.userName || 'System'}
                  </div>
                  {log.userEmail && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {log.userEmail}
                    </div>
                  )}
                </div>
              </div>

              {/* Display changes */}
              {log.action === 'UPDATE' && log.oldValues && log.newValues && (
                <div className="mt-3 space-y-2">
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Changes:
                  </div>
                  {Object.keys(log.newValues).map((key) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 gap-4 text-xs bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded"
                    >
                      <div>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          {key}:
                        </span>
                        <div className="text-red-600 dark:text-red-400 line-through">
                          {JSON.stringify(log.oldValues[key])}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">→</span>
                        <div className="text-green-600 dark:text-green-400">
                          {JSON.stringify(log.newValues[key])}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Display created values */}
              {log.action === 'CREATE' && log.newValues && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Created with:
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded">
                    <pre className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                      {JSON.stringify(log.newValues, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Display deleted values */}
              {log.action === 'DELETE' && log.oldValues && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Deleted data:
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded">
                    <pre className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                      {JSON.stringify(log.oldValues, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Display IP address if available */}
              {log.ipAddress && (
                <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  IP: {log.ipAddress}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
