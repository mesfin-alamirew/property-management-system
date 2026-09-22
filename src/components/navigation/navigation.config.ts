import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Handshake,
  LayoutDashboard,
  Package,
  Settings,
} from 'lucide-react';

export type NavigationItem = {
  title: string;
  href: string;
};

export type NavigationSection = {
  title?: string;
  icon?: LucideIcon;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    icon: LayoutDashboard,
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
      },
    ],
  },

  {
    title: 'Administration',
    icon: Settings,
    items: [
      {
        title: 'Organization Units',
        href: '/organization-units',
      },
      {
        title: 'Employees',
        href: '/employees',
      },
      {
        title: 'Countries',
        href: '/countries',
      },
      {
        title: 'Regions',
        href: '/regions',
      },
      {
        title: 'Zones',
        href: '/zones',
      },
      {
        title: 'Woredas',
        href: '/woredas',
      },
      {
        title: 'Roles',
        href: '/administration/roles',
      },
      {
        title: 'System Administrators',
        href: '/administration/system-administration',
      },
    ],
  },

  {
    title: 'Properties',
    icon: Building2,
    items: [
      {
        title: 'Properties',
        href: '/properties',
      },
      {
        title: 'Property Types',
        href: '/property-types',
      },
      {
        title: 'Property Categories',
        href: '/property-categories',
      },
      {
        title: 'Property Statuses',
        href: '/property-statuses',
      },
      {
        title: 'Property Tenures',
        href: '/property-tenures',
      },
    ],
  },

  {
    title: 'Buildings',
    icon: Building2,
    items: [
      {
        title: 'Buildings',
        href: '/buildings',
      },
      {
        title: 'Building Types',
        href: '/building-types',
      },
      {
        title: 'Building Conditions',
        href: '/building-conditions',
      },
      {
        title: 'Building Space Types',
        href: '/building-space-types',
      },
      {
        title: 'Building Spaces',
        href: '/building-spaces',
      },
    ],
  },

  {
    title: 'Ownership',
    icon: Handshake,
    items: [
      {
        title: 'Ownerships',
        href: '/ownerships',
      },
      {
        title: 'Ownership Types',
        href: '/ownership-types',
      },
    ],
  },

  {
    title: 'Acquisition',
    icon: Package,
    items: [
      {
        title: 'Acquisitions',
        href: '/acquisitions',
      },
      {
        title: 'Acquisition Items',
        href: '/acquisition-items',
      },
      {
        title: 'Acquisition Methods',
        href: '/acquisition-methods',
      },
    ],
  },

  {
    title: 'Asset Management',
    icon: ClipboardCheck,
    items: [
      {
        title: 'Assets',
        href: '/assets',
      },
      {
        title: 'Asset Types',
        href: '/asset-types',
      },
      {
        title: 'Asset Categories',
        href: '/asset-categories',
      },
      {
        title: 'Asset Statuses',
        href: '/asset-statuses',
      },
      {
        title: 'Asset Conditions',
        href: '/asset-conditions',
      },
      {
        title: 'Asset Locations',
        href: '/asset-locations',
      },
      {
        title: 'Asset Movements',
        href: '/asset-movements',
      },
      {
        title: 'Asset Assignments',
        href: '/asset-assignments',
      },
      {
        title: 'Physical Verifications',
        href: '/physical-verifications',
      },
      {
        title: 'Maintenance',
        href: '/maintenances',
      },
      {
        title: 'Maintenance Services',
        href: '/assets/maintenance/services',
      },
      {
        title: 'Incidents',
        href: '/incidents',
      },
      {
        title: 'Retirements',
        href: '/retirements',
      },
      {
        title: 'Disposals',
        href: '/disposals',
      },
    ],
  },

  {
    title: 'Reports',
    icon: BarChart3,
    items: [
      {
        title: 'Dashboard',
        href: '/reports/dashboard',
      },
      {
        title: 'Assets',
        href: '/reports/assets',
      },
      {
        title: 'Acquisitions',
        href: '/reports/acquisitions',
      },
      {
        title: 'Assignments',
        href: '/reports/assignments',
      },
      {
        title: 'Movements',
        href: '/reports/movements',
      },
      {
        title: 'Maintenance',
        href: '/reports/maintenances',
      },
      {
        title: 'Incidents',
        href: '/reports/incidents',
      },
      {
        title: 'Verifications',
        href: '/reports/verifications',
      },
      {
        title: 'Retirements',
        href: '/reports/retirements',
      },
      {
        title: 'Disposals',
        href: '/reports/disposals',
      },
      {
        title: 'Accountability',
        href: '/reports/accountability',
      },
      {
        title: 'Audits',
        href: '/reports/audits',
      },
    ],
  },
];
