import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryProvider, ThemeProvider } from "./providers";
import { ProtectedRoute } from "./components/molecules/ProtectedRoute";
import { Login } from "./pages/Login";
import { PageSkeleton } from "./components/skeletons";

// Lazy load protected pages
const Dashboard = React.lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const Teams = React.lazy(() =>
  import("./pages/Teams").then((module) => ({ default: module.Teams }))
);
const Feedback = React.lazy(() =>
  import("./pages/Feedback").then((module) => ({ default: module.Feedback }))
);

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes with lazy loading */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageSkeleton />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teams"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageSkeleton />}>
                    <Teams />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageSkeleton />}>
                    <Feedback />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
