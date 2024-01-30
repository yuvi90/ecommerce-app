import toast from "react-hot-toast";
import { useAllProductsQuery } from "../features/products/productAPI";
import { Skeleton } from "../components/Loader";
import HeroSection from "../components/HeroSection";
import ProductCard from "../features/products/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isError } = useAllProductsQuery();

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      <main className="bg-gray-100 py-10">
        <div className="w-full max-w-[1280px] mx-auto">
          {/* Products Wrapper */}
          <div className="px-4">
            <h1 className="text-[24px] md:text-3xl uppercase mb-5 flex justify-between items-center">
              Latest Products{" "}
              <Link
                to="/product/all"
                className="py-2 px-4 rounded-full bg-slate-900 text-white text-sm font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-4"
              >
                More
              </Link>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <Skeleton width="80vw" />
              ) : (
                data?.products.map((product) => (
                  <ProductCard
                    key={product._id}
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
