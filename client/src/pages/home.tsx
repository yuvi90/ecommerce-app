import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { useAllProductsQuery } from "../features/products/productAPI";
import { addToCart } from "../features/cart/cartReducer";
import { Skeleton } from "../components/Loader";
import HeroSection from "../components/HeroSection";
import ProductCard from "../features/products/ProductCard";
import { CartItem } from "../types/types";
import { products } from "../data";

const Home = () => {
  // const { data, isLoading, isError } = useAllProductsQuery();
  const data = products;
  const isLoading = false;
  const isError = false;

  const dispatch = useAppDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <main className="md:py-10">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Hero Section */}
        <HeroSection />

        <div className="px-4 my-6">
          <h1 className="text-2xl uppercase my-2">Latest Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <Skeleton width="80vw" />
            ) : (
              data?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
