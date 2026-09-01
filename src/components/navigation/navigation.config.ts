export type NavigationItem = {
  title: string;
  href: string;
};

export type NavigationSection = {
  title?: string;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
      },
    ],
  },

  {
    title: 'Organization',
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
    ],
  },

  {
    title: 'Locations',
    items: [
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
    ],
  },

  {
    title: 'Properties',
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
    title: 'Ownership',
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
    title: 'Verification',
    items: [
      {
        title: 'Physical Verifications',
        href: '/physical-verifications',
      },
    ],
  },

  {
    title: 'Maintenance',
    items: [
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
    ],
  },
];
