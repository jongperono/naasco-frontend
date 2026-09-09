"use client";

import { useState } from "react";

export default function LoanForm() {
  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
    interestRate: "",
    duration: "",
    purpose: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Loan form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="memberId"
          className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
        >
          Member ID
        </label>
        <input
          id="memberId"
          type="text"
          value={formData.memberId}
          onChange={(e) =>
            setFormData({ ...formData, memberId: e.target.value })
          }
          required
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
          placeholder="M-12345"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
          >
            Loan Amount
          </label>
          <input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="10000"
          />
        </div>

        <div>
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
          >
            Interest Rate (%)
          </label>
          <input
            id="interestRate"
            type="number"
            step="0.01"
            value={formData.interestRate}
            onChange={(e) =>
              setFormData({ ...formData, interestRate: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="5.5"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
        >
          Duration (months)
        </label>
        <input
          id="duration"
          type="number"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          required
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
          placeholder="12"
        />
      </div>

      <div>
        <label
          htmlFor="purpose"
          className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
        >
          Loan Purpose
        </label>
        <textarea
          id="purpose"
          value={formData.purpose}
          onChange={(e) =>
            setFormData({ ...formData, purpose: e.target.value })
          }
          required
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
          placeholder="Business expansion, home improvement, etc."
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:ring-offset-2 transition-all"
        >
          Submit Loan
        </button>
        <button
          type="button"
          className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:ring-offset-2 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
