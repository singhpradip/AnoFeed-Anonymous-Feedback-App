import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/molecules/ProtectedRoute';
import { PageSkeleton } from '../components/skeletons';
import { navigationItems, publicRoutes } from './navigation';

// Dynamic page imports based on route paths
const pageComponents = {
  "/dashboard": React.lazy(() =>
    import("../pages/Dashboard").then((module) => ({
      default: module.Dashboard,
    }))
  ),
  "/teams": React.lazy(() =>
    import("../pages/Teams").then((module) => ({ default: module.Teams }))
  ),
  "/feedback": React.lazy(() =>
    import("../pages/Feedback").then((module) => ({ default: module.Feedback }))
  ),
  "/login": React.lazy(() =>
    import("../pages/Login").then((module) => ({ default: module.Login }))
  ),
  "/register": React.lazy(() =>
    import("../pages/Register").then((module) => ({ default: module.Register }))
  ),
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route) => {
        const Component = pageComponents[route.path as keyof typeof pageComponents];
        if (!Component) return null;
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Component />
              </Suspense>
            }
          />
        );
      })}

      {/* Protected routes */}
      {navigationItems.map((route) => {
        const Component = pageComponents[route.path as keyof typeof pageComponents];
        if (!Component) return null;
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageSkeleton />}>
                  <Component />
                </Suspense>
              </ProtectedRoute>
            }
          />
        );
      })}

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}; 