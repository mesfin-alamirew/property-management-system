import { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {action && <div className="flex justify-center pt-2">{action}</div>}
      </div>
    </div>
  );
}
