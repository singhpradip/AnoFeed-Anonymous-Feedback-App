export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  requiresAuth: boolean;
  children?: NavigationItem[];
  description?: string;
  order?: number;
}

export const navigationItems: NavigationItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    requiresAuth: true,
    description: 'Overview of your feedback and team statistics',
    order: 1,
  },
  {
    path: '/teams',
    label: 'Teams',
    icon: 'groups',
    requiresAuth: true,
    description: 'Manage your teams and team members',
    order: 2,
  },
  {
    path: '/feedback',
    label: 'Feedback',
    icon: 'feedback',
    requiresAuth: true,
    description: 'View and manage feedback submissions',
    order: 3,
  },
].sort((a, b) => (a.order || 0) - (b.order || 0));

export const publicRoutes: NavigationItem[] = [
  {
    path: '/login',
    label: 'Login',
    requiresAuth: false,
  },
];

// Helper functions
export const getNavigationByPath = (path: string): NavigationItem | undefined => {
  const allRoutes = [...navigationItems, ...publicRoutes];
  return allRoutes.find(item => item.path === path);
};

export const getNavigationLabel = (path: string): string => {
  const item = getNavigationByPath(path);
  return item?.label || 'Page';
};

export const getNavigationDescription = (path: string): string => {
  const item = getNavigationByPath(path);
  return item?.description || '';
};

export const getNavigationIcon = (path: string): string | undefined => {
  const item = getNavigationByPath(path);
  return item?.icon;
};

export const getProtectedRoutes = (): NavigationItem[] => {
  return navigationItems.filter(item => item.requiresAuth);
};

export const getPublicRoutesList = (): NavigationItem[] => {
  return publicRoutes.filter(item => !item.requiresAuth);
};

export const isProtectedRoute = (path: string): boolean => {
  const item = getNavigationByPath(path);
  return item?.requiresAuth || false;
}; 