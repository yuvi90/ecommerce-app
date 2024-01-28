import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { RootState } from "./redux/store";

import Layout from "./layout/Layout";
import ProductDetail from "./features/products/ProductDetail";

const Home = lazy(() => import("./pages/Home"));
// const Search = lazy(() => import("./pages/search"));
// const Cart = lazy(() => import("./pages/cart"));
const Cart = lazy(() => import("./features/cart/Cart"));
// const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/Login"));
// const Orders = lazy(() => import("./pages/orders"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
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
                // <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
                // </ProtectedRoute>
              }
            />

            {/* Product Page */}
            <Route
              path="/product/:id"
              element={<ProductDetail />}
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
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
