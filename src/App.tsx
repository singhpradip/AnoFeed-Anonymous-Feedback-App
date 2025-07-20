import { BrowserRouter as Router } from "react-router-dom";
import { QueryProvider, ThemeProvider } from "./providers";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./nav";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>

        <ToastContainer
          position="top-center"
          theme="colored"
          transition={Zoom}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
          style={{
            zIndex: 9999,
          }}
        />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
