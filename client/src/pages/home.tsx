import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useAllProductsQuery } from "../features/products/productAPI";
import { addToCart } from "../features/cart/cartReducer";
import { CartItem } from "../types/types";
import Slides from "../components/common/slides";

const Home = () => {
  const { data, isLoading, isError } = useAllProductsQuery();
  // const isLoading = false;
  // const isError = false;
  // const data = {
  //   products: [
  //     {
  //       _id: "1",
  //       name: "MacBook",
  //       price: 78000,
  //       stock: 8,
  //       photo:
  //         "https://i.postimg.cc/rpzy8T5Q/0018116-apple-133-macbook-air-128gb-ssd-with-retina-display-2019-500.jpg",
  //     },
  //     {
  //       _id: "2",
  //       name: "MacBook",
  //       price: 78000,
  //       stock: 8,
  //       photo:
  //         "https://i.postimg.cc/rpzy8T5Q/0018116-apple-133-macbook-air-128gb-ssd-with-retina-display-2019-500.jpg",
  //     },
  //     {
  //       _id: "3",
  //       name: "MacBook",
  //       price: 78000,
  //       stock: 8,
  //       photo:
  //         "https://i.postimg.cc/rpzy8T5Q/0018116-apple-133-macbook-air-128gb-ssd-with-retina-display-2019-500.jpg",
  //     },
  //     {
  //       _id: "4",
  //       name: "MacBook",
  //       price: 78000,
  //       stock: 8,
  //       photo:
  //         "https://i.postimg.cc/rpzy8T5Q/0018116-apple-133-macbook-air-128gb-ssd-with-retina-display-2019-500.jpg",
  //     },
  //   ],
  // };

  const dispatch = useAppDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home container">
      <Slides />

      <h1>
        Latest Products
        <Link
          to="/search"
          className="findmore"
        >
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.map((i) => (
            // <ProductCard
            //   key={i._id}
            //   productId={i._id}
            //   name={i.name}
            //   price={i.price}
            //   stock={i.stock}
            //   handler={addToCartHandler}
            //   photo={i.photo}
            // />
            <ProductCard
              key={i.id}
              productId={i.id}
              name={i.title}
              price={i.price}
              stock={5}
              handler={addToCartHandler}
              photo={i.image}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
