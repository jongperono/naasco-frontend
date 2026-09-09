import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
