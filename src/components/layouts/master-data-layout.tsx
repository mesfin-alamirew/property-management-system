import type { ReactNode } from 'react';

type MasterDataLayoutProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function MasterDataLayout({
  title,
  description,
  actions,
  children,
}: MasterDataLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {actions && <div>{actions}</div>}
      </div>

      {/* Content Section */}
      <div>{children}</div>
    </div>
  );
}
