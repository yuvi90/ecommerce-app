import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks";
import { useProductDetailsQuery } from "./productAPI";
import { addToCart, calculatePrice } from "../../features/cart/cartReducer";
import ProductDetailsCarousel from "./ProductDetailsCarousel";
import { Loader } from "../../components";
import { CartItem } from "../../types/types";
import { capitalizeEveryFirstLetter } from "../../utils/features";

const getDiscountedPricePercentage = (originalPrice: number, discountedPrice: number) => {
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return discountPercentage.toFixed(2);
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading } = useProductDetailsQuery(id!);

  const dispatch = useAppDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    dispatch(calculatePrice());
    toast.success("Added to cart");
  };

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.product) {
    return null;
  }

  const product = data?.product;
  return (
    <div className="w-full py-10 md:py-20">
      <div className="w-full max-w-[1280px] px-4 mx-auto">
        {/* Main Content Wrapper Start */}
        <div className="flex flex-col lg:flex-row gap-[50px] md:px-10 lg:gap-[100px]">
          {/* Product Photos Start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel photos={product.photos!} />
          </div>
          {/* Product Photos End */}

          {/* Product Details Start */}
          <div className="flex-[1] py-3">
            {/* Product Name */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">{product.name}</div>

            {/* Product Category */}
            <div className="text-lg font-semibold mb-5">
              {capitalizeEveryFirstLetter(product.category)}
            </div>

            {/* Product Price */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">Price : &#8377;{product.price}</p>
              {/* If MRP Exits Product Discount % */}
              {product.mrp ? (
                <>
                  <p className="text-base  font-medium line-through">&#8377;{product.mrp}</p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(product.mrp, product.price)}% off
                  </p>
                </>
              ) : (
                <>
                  {product.stock < 30 ? (
                    <p className="ml-auto text-base font-medium text-red-500">Limited Stock</p>
                  ) : (
                    <p className="ml-auto text-base font-medium text-green-500">In Stock</p>
                  )}
                </>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-10">incl. of taxes</div>

            {/* Select Quantity */}
            <div className="mb-10">
              {/* Heading */}
              <div className="flex justify-between items-center mb-2">
                <div className="text-md font-semibold">Select Quantity:</div>

                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    // Selected Quantity should be in 1-5 only
                    if (parseInt(e.target.value) < 6) {
                      const newQuantity = Math.max(1, parseInt(e.target.value) || 0);
                      setQuantity(newQuantity);
                    }
                  }}
                  className="border rounded-md text-center py-2 font-medium hover:border-black cursor-pointer"
                />
              </div>
            </div>

            {/* Add To Cart Button */}
            <button
              className="w-full py-4 rounded-full bg-slate-900 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() =>
                addToCartHandler({
                  productId: product._id,
                  name: product.name,
                  quantity: quantity,
                  stock: product.stock,
                  category: product.category,
                  price: product.price,
                  thumbnail: product.thumbnail,
                })
              }
            >
              Add to Cart
            </button>

            {/* Product Description */}
            <div>
              <div className="text-lg font-bold mb-5">Product Description</div>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Product Details End */}
        </div>
        {/* Main Content Wrapper End */}
      </div>
    </div>
  );
};

export default ProductDetail;
