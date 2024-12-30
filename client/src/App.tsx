import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { authContext } from "./context/AuthProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRouteProps";
import NotFound from "./components/NotFound";
import Loader from "./components/Loader.tsx";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Homepage = lazy(() => import("./page/Home/Homepage"));
const Health = lazy(() => import("./page/HealthCheck/Health"));
const Signup = lazy(() => import("./page/auth/Signup"));
const Signin = lazy(() => import("./page/auth/Signin"));
const Askme = lazy(() => import("./page/Home/Askme"));
const History = lazy(() => import("./page/historypage/History"));

function App() {
  const auth = useContext(authContext);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/health" element={<Health />} />

            <Route
              path="/ask"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <Askme />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <History />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />

            <Route
              path="/sign-up"
              element={auth?.isAuthenticated ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/sign-in"
              element={auth?.isAuthenticated ? <Navigate to="/" /> : <Signin />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
