'use client';

import { useState, useEffect } from 'react';
import { apiClient, AuditStats } from '@/lib/api/client';

export default function AuditStatsPage() {
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getAuditStats(days);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setStats(response.data);
      }
    } catch (err) {
      setError('Failed to fetch audit statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [days]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Audit Statistics
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Overview of system activity and trends
        </p>
      </div>

      {/* Time Period Selector */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4 mb-6">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Time Period
        </label>
        <div className="flex gap-2">
          {[7, 14, 30, 60, 90].map((period) => (
            <button
              key={period}
              onClick={() => setDays(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                days === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600'
              }`}
            >
              {period} Days
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Loading statistics...</p>
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Total Logs
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                {stats.totalLogs.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                All time
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Period Logs
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                {stats.periodLogs.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {stats.period}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Average per Day
              </div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                {Math.round(stats.periodLogs / days)}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                In {stats.period.toLowerCase()}
              </div>
            </div>
          </div>

          {/* Activity by Action */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Activity by Action
            </h2>
            <div className="space-y-3">
              {stats.byAction.map((item) => {
                const percentage = stats.periodLogs > 0
                  ? (item.count / stats.periodLogs) * 100
                  : 0;
                return (
                  <div key={item.action}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {item.action}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {item.count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity by Entity Type */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Activity by Entity Type
            </h2>
            <div className="space-y-3">
              {stats.byEntityType.map((item) => {
                const percentage = stats.periodLogs > 0
                  ? (item.count / stats.periodLogs) * 100
                  : 0;
                return (
                  <div key={item.entityType}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {item.entityType}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {item.count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Most Active Users */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Most Active Users
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {stats.mostActiveUsers.map((user, index) => (
                    <tr key={user.userId}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        #{index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {user.userName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                        {user.userEmail}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-zinc-900 dark:text-zinc-100 font-semibold">
                        {user.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Daily Activity
            </h2>
            <div className="space-y-2">
              {stats.activityByDay.map((item) => {
                const maxCount = Math.max(...stats.activityByDay.map(d => d.count));
                const width = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                return (
                  <div key={item.date} className="flex items-center gap-4">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 w-24">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-6 relative">
                        <div
                          className="bg-purple-600 h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${width}%` }}
                        >
                          {width > 10 && (
                            <span className="text-xs font-medium text-white">
                              {item.count}
                            </span>
                          )}
                        </div>
                        {width <= 10 && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            {item.count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">No statistics available</p>
        </div>
      )}
    </div>
  );
}
