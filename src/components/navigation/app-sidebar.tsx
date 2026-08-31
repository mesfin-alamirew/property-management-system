'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationSections } from './navigation.config';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r bg-background">
      <div className="border-b px-6 py-5">
        <h1 className="text-lg font-semibold">Property Management System</h1>

        <p className="text-xs text-muted-foreground">PMS</p>
      </div>

      <nav className="space-y-6 p-4">
        {navigationSections.map((section, sectionIndex) => (
          <div key={section.title ?? `section-${sectionIndex}`}>
            {section.title && (
              <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </h2>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-muted font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
