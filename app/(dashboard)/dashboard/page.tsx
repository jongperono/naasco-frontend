"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your cooperative today
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Stats in Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Your Role</p>
              <p className="text-2xl font-bold capitalize">{user.role}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-300' : 'bg-red-300'}`} />
                <p className="text-2xl font-bold">{user.isActive ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-blue-100 text-sm mb-1">Member Since</p>
              <p className="text-2xl font-bold">2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card - Redesigned */}
        <div className="lg:col-span-1 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {user.firstName?.[0]?.toUpperCase()}
                    {user.lastName?.[0]?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white dark:border-zinc-900" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              {user.email}
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {user.role}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Phone</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-white">
                {user.phoneNumber || 'Not set'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${user.isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Recent Activity
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {/* Activity Item 1 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">New member registered</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">John Doe joined the cooperative</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">2 hours ago</p>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Loan approved</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Loan #1234 has been approved</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">5 hours ago</p>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Payment received</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">$5,000 savings deposit processed</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 - Enhanced */}
        <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +12%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              Total Members
            </p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              1,234
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              +142 this month
            </p>
          </div>
        </div>

        {/* Stat Card 2 - Enhanced */}
        <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-500/5 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +8%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              Active Loans
            </p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              456
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              34 pending approval
            </p>
          </div>
        </div>

        {/* Stat Card 3 - Enhanced */}
        <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +15%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              Total Savings
            </p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              $2.4M
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              $340K deposited today
            </p>
          </div>
        </div>

        {/* Stat Card 4 - Enhanced */}
        <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +23%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              Revenue
            </p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              $89K
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Interest earned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
