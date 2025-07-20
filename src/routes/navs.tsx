import React from 'react';
import { Loadable } from '../components/atoms/Loadable';
import { PageSkeleton } from '../components/skeletons';

// Lazy loaded components
const Dashboard = Loadable({
  loader: () =>
    import('../pages/Dashboard').then((module) => ({
      default: module.Dashboard,
    })),
  fallback: React.createElement(PageSkeleton),
});

const Teams = Loadable({
  loader: () =>
    import('../pages/Teams').then((module) => ({
      default: module.Teams,
    })),
  fallback: React.createElement(PageSkeleton),
});

const Feedback = Loadable({
  loader: () =>
    import('../pages/Feedback').then((module) => ({
      default: module.Feedback,
    })),
  fallback: React.createElement(PageSkeleton),
});

// Navigation configuration
export const appNavs = [
  {
    title: 'Dashboard',
    path: '',
    exact: true,
    trackEnabled: true,
    redirectTo: true,
    component: Dashboard,
  },
  {
    title: 'Teams',
    path: 'teams',
    exact: true,
    trackEnabled: true,
    component: Teams,
  },
  {
    title: 'Feedback',
    path: 'feedback',
    exact: true,
    trackEnabled: true,
    component: Feedback,
  },
]; 