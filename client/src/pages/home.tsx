import toast from "react-hot-toast";
import { useAllProductsQuery } from "../features/products/productAPI";
import { Skeleton } from "../components/Loader";
import HeroSection from "../components/HeroSection";
import ProductCard from "../features/products/ProductCard";

import { products } from "../data";

const Home = () => {
  // const { data, isLoading, isError } = useAllProductsQuery();
  const data = products;
  const isLoading = false;
  const isError = false;

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      <main className="bg-gray-100 py-10">
        <div className="w-full max-w-[1280px] mx-auto">
          {/* Products Wrapper */}
          <div className="px-4">
            <h1 className="text-[24px] md:text-3xl uppercase mb-5">Latest Products</h1>
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
    </>
  );
};

export default Home;
