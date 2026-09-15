import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-50 to-blue-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
