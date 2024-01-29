import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../cart/cartReducer";
import { useAppDispatch } from "../../redux/hooks";
import { CartItem } from "../../types/types";

interface Product {
  id: number;
  name: string;
  description: string;
  mrp?: number;
  price: number;
  stock: number;
  category: string;
  thumbnail?: string;
  photos?: string[];
}
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div className="flex w-full md:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-xl">
      {/* Product Image */}
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        to={`product/${product.id}`}
      >
        <img
          className="object-contain mx-auto"
          src={`/products/${product.thumbnail}`}
          alt="product image"
        />
      </Link>

      {/* Product Details */}
      <div className="mt-4 px-5 pb-5">
        <Link to={`product/${product.id}`}>
          <h5 className="text-xl tracking-tight text-slate-900 hover:text-gray-600">
            {product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">₹{product.price}</span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() =>
            addToCartHandler({
              productId: String(product.id),
              name: product.name,
              quantity: 1,
              stock: product.stock,
              category: product.category,
              price: product.price,
              thumbnail: product.thumbnail,
            })
          }
        >
          {/* Cart SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
