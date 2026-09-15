"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Naasco
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent w-64 transition-all"
              />
              <svg
                className="w-5 h-5 text-zinc-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
            <svg
              className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
          </button>

          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 capitalize">
                  {user.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {user.firstName?.[0]?.toUpperCase()}
                {user.lastName?.[0]?.toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
