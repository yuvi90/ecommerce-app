import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { useAppSelector } from "./redux/hooks";
import { Loader, ProtectedRoute } from "./components";
import Layout from "./layout/Layout";
import RequireAuth from "./features/auth/RequireAuth";

// Pages Imports
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./features/cart/Cart"));
const ProductDetail = lazy(() => import("./features/products/ProductDetail"));
const AllProducts = lazy(() => import("./features/filters/AllProducts"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
// const Search = lazy(() => import("./pages/search"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Orders = lazy(() => import("./features/orders/Orders"));
const Dashboard = lazy(() => import("./features/admin/Dashboard"));

const App = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const isAdmin = useAppSelector((state) => state.authReducer.isAdmin);

  const loading = false;

  return loading ? (
    <Loader />
  ) : (
    <>
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

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Product Page */}
            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            {/* All Products Page */}
            <Route
              path="/product/all"
              element={<AllProducts />}
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
            {/* Login */}
            <Route
              path="/register"
              element={
                <ProtectedRoute isAuthenticated={user ? false : true}>
                  <Register />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={user ? true : false}
                  admin={isAdmin ? true : false}
                  adminOnly={true}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              {/* Orders */}
              <Route
                path="/orders"
                element={<Orders />}
              />

              {/* Shipping */}
              <Route
                path="/shipping"
                element={<Shipping />}
              />

              {/* Checkout */}
              <Route
                path="/pay"
                element={<Checkout />}
              />
            </Route>

            {/* Error */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </Suspense>

      {/* Toast Notification */}
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
