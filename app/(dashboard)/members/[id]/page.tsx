export default function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Member Details
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Viewing member #{params.id}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Member Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Member ID
            </label>
            <p className="text-zinc-900 dark:text-white font-medium">
              {params.id}
            </p>
          </div>
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Name
            </label>
            <p className="text-zinc-900 dark:text-white font-medium">
              Loading...
            </p>
          </div>
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Email
            </label>
            <p className="text-zinc-900 dark:text-white font-medium">
              Loading...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
