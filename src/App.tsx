import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryProvider, ThemeProvider } from "./providers";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProtectedRoute } from "./components/molecules/ProtectedRoute";
import { Login } from "./pages/Login";
import { AppRoutes } from "./routes/AppRoutes";
import { appNavs } from "./routes/navs";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppRoutes />
                  </ProtectedRoute>
                }
              >
                {/* Dynamic routes from navigation config */}
                {appNavs.map((nav) => (
                  <Route
                    key={nav.path || "index"}
                    path={nav.path}
                    element={<nav.component />}
                  />
                ))}
              </Route>

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
