'use client';

import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { AppSidebar } from './app-sidebar';

type NavigationShellProps = {
  children: ReactNode;
  headerRight?: ReactNode;
};

export function NavigationShell({
  children,
  headerRight,
}: NavigationShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDesktopSidebar = () => {
    setSidebarCollapsed((current) => !current);
  };

  const openMobileSidebar = () => {
    setMobileOpen(true);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div
        className={[
          'hidden shrink-0 overflow-hidden border-r border-border bg-surface',
          'transition-[width] duration-350 ease-out',
          'md:block',
          sidebarCollapsed ? 'w-[72px]' : 'w-64',
        ].join(' ')}
      >
        <AppSidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-50 md:hidden',
          'transition-[visibility] duration-300',
          mobileOpen ? 'visible' : 'invisible',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileSidebar}
          className={[
            'absolute inset-0 bg-black/40',
            'transition-opacity duration-300 ease-in-out',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />

        <aside
          className={[
            'absolute inset-y-0 left-0 w-72 max-w-[85vw]',
            'overflow-y-auto bg-surface shadow-xl',
            'transition-transform duration-300 ease-in-out',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
          aria-label="Main navigation"
        >
          <div className="flex min-h-12 items-center justify-end border-b border-border px-3">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileSidebar}
              className={[
                'inline-flex h-9 w-9 items-center justify-center rounded-md',
                'text-muted-foreground',
                'transition-all duration-200 ease-in-out',
                'hover:bg-surface-muted hover:text-foreground',
                'hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
              ].join(' ')}
            >
              <X
                className="h-5 w-5 transition-transform duration-200 ease-in-out"
                aria-hidden="true"
              />
            </button>
          </div>

          <AppSidebar onNavigate={closeMobileSidebar} />
        </aside>
      </div>

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-border bg-surface">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
            {/* Mobile menu */}
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={openMobileSidebar}
              className={[
                'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                'text-muted-foreground',
                'transition-all duration-200 ease-in-out',
                'hover:bg-surface-muted hover:text-foreground',
                'hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
                'md:hidden',
              ].join(' ')}
            >
              <Menu
                className="h-5 w-5 transition-transform duration-200 ease-in-out"
                aria-hidden="true"
              />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              type="button"
              aria-label={
                sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
              }
              aria-expanded={!sidebarCollapsed}
              onClick={toggleDesktopSidebar}
              className={[
                'hidden h-9 w-9 shrink-0 items-center justify-center rounded-md',
                'text-muted-foreground',
                'transition-all duration-200 ease-in-out',
                'hover:bg-surface-muted hover:text-foreground',
                'hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
                'md:inline-flex',
              ].join(' ')}
            >
              {sidebarCollapsed ? (
                <Menu
                  className="h-5 w-5 transition-transform duration-200 ease-in-out"
                  aria-hidden="true"
                />
              ) : (
                <X
                  className="h-5 w-5 transition-transform duration-200 ease-in-out"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Header identity */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                Property Management System
              </p>

              <p className="hidden truncate text-xs text-muted-foreground sm:block">
                Enterprise property and asset management
              </p>
            </div>

            {headerRight}
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
