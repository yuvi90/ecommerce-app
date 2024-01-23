import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Loader from "./components/loader";
import ProtectedRoute from "./components/protected-route";
import { RootState } from "./redux/store";
import DefaultLayout from "./layout/DefaultLayout";
import Layout from "./layout/layout";

const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
// const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
// const Orders = lazy(() => import("./pages/orders"));
const NotFound = lazy(() => import("./pages/not-found"));

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = false;

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* Header */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Layout */}
          <Route
            path="/"
            element={<Layout />}
          >
            {/* Home */}
            <Route
              index
              element={<Home />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Login */}
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={user ? false : true}>
                  <Login />
                </ProtectedRoute>
              }
            />

            {/* Error */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </Suspense>

      {/* Toast Notification */}
      {/* <Toaster position="bottom-center" /> */}
    </>
  );
};

export default App;
