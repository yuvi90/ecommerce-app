import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { useAppSelector } from "./redux/hooks";
import { Loader, ProtectedRoute } from "./components";
import Layout from "./layout/Layout";

// Pages Imports
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./features/cart/Cart"));
const ProductDetail = lazy(() => import("./features/products/ProductDetail"));
const AllProducts = lazy(() => import("./features/filters/AllProducts"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
// const Search = lazy(() => import("./pages/search"));
// const Cart = lazy(() => import("./pages/cart"));
// const Shipping = lazy(() => import("./pages/shipping"));
// const Orders = lazy(() => import("./pages/orders"));

const App = () => {
  const user = useAppSelector((state) => state.authReducer.user);
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

            {/* Cart */}
            <Route
              path="/cart"
              element={<Cart />}
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
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
