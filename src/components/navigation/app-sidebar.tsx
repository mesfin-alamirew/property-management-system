'use client';

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { navigationSections } from './navigation.config';

type AppSidebarProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function AppSidebar({ collapsed = false, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);

  const handleSectionClick = (sectionIndex: number) => {
    if (collapsed) {
      return;
    }

    setOpenSectionIndex((current) =>
      current === sectionIndex ? null : sectionIndex,
    );
  };

  return (
    <aside className="flex min-h-full w-full flex-col bg-surface">
      {/* Brand */}
      <div
        className={[
          'flex min-h-16 shrink-0 items-center border-b border-border',
          'transition-[padding,justify-content] duration-350 ease-out',
          collapsed ? 'justify-center px-2' : 'px-5',
        ].join(' ')}
      >
        <div
          className={[
            'flex min-w-0 items-center',
            'transition-[gap] duration-350 ease-out',
            collapsed ? 'gap-0' : 'gap-3',
          ].join(' ')}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
            PM
          </div>

          <div
            className={[
              'min-w-0 overflow-hidden whitespace-nowrap',
              'transition-[max-width,opacity] duration-350 ease-out',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-48 opacity-100',
            ].join(' ')}
          >
            <h1 className="truncate text-sm font-semibold text-foreground">
              Property Management
            </h1>

            <p className="mt-0.5 text-xs text-muted-foreground">PMS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={[
          'flex-1 space-y-3 overflow-y-auto',
          'transition-[padding] duration-350 ease-out',
          collapsed ? 'p-2' : 'p-4',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {navigationSections.map((section, sectionIndex) => {
          const isOpen = openSectionIndex === sectionIndex;
          const Icon = section.icon;

          if (!section.title) {
            return (
              <div key={`section-${sectionIndex}`} className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={onNavigate}
                      title={collapsed ? item.title : undefined}
                      className={[
                        'flex items-center rounded-md text-sm',
                        'transition-[padding,gap,background-color,color] duration-350 ease-out',
                        'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
                        collapsed
                          ? 'justify-center px-2 py-2.5'
                          : 'gap-3 px-3 py-2',
                        isActive
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                      ].join(' ')}
                    >
                      <LayoutDashboard
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />

                      <span
                        className={[
                          'overflow-hidden whitespace-nowrap',
                          'transition-[max-width,opacity] duration-350 ease-out',
                          collapsed
                            ? 'max-w-0 opacity-0'
                            : 'max-w-48 opacity-100',
                        ].join(' ')}
                      >
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          }

          return (
            <div key={section.title} className="space-y-1">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-label={collapsed ? section.title : undefined}
                title={collapsed ? section.title : undefined}
                onClick={() => handleSectionClick(sectionIndex)}
                className={[
                  'flex rounded-md text-[11px] font-semibold uppercase tracking-wider',
                  'text-muted-foreground transition-[padding,gap,background-color,color] duration-350 ease-out',
                  'hover:bg-surface-muted hover:text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
                  collapsed
                    ? 'mx-auto h-10 w-10 items-center justify-center'
                    : 'w-full items-center justify-between px-3 py-2',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex min-w-0 items-center',
                    'transition-[gap] duration-350 ease-out',
                    collapsed ? 'gap-0' : 'gap-2',
                  ].join(' ')}
                >
                  {Icon && (
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}

                  <span
                    className={[
                      'overflow-hidden whitespace-nowrap',
                      'transition-[max-width,opacity] duration-350 ease-out',
                      collapsed ? 'max-w-0 opacity-0' : 'max-w-48 opacity-100',
                    ].join(' ')}
                  >
                    {section.title}
                  </span>
                </span>

                {!collapsed && (
                  <span
                    aria-hidden="true"
                    className={[
                      'text-sm transition-transform duration-200 ease-out',
                      isOpen ? 'rotate-90' : '',
                    ].join(' ')}
                  >
                    ›
                  </span>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="space-y-0.5 overflow-hidden">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={onNavigate}
                        className={[
                          'block rounded-md px-3 py-2 text-sm',
                          'transition-colors duration-200 ease-out',
                          'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
                          isActive
                            ? 'bg-primary/10 font-medium text-primary'
                            : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                        ].join(' ')}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
