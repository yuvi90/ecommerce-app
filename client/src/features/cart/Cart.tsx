import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import CartItem from "./CartItem";

// Payments
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// import { makePaymentRequest } from "@/utils/api";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useAppSelector((state) => state.cartReducer);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        console.log("Placing  Order");
        console.log(cartItems);
        setLoading(false);
      }, 2000);
      // const stripe = await stripePromise;
      // const res = await makePaymentRequest("/api/orders", {
      //   products: cartItems,
      // });
      // await stripe.redirectToCheckout({
      //   sessionId: res.stripeSession.id,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:py-20">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        {cartItems.length > 0 && (
          <>
            {/* Heading */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>

            {/* Main Wrapper Start */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* Cart Items */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productId}
                    data={item}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377;{subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order, including all duties and
                    taxes. Free delivery orders above &#8377;1000.
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  className="w-full py-4 rounded-full bg-slate-900  text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={placeOrderHandler}
                >
                  Place Order
                  {loading && <img src="/spinner.svg" />}
                </button>
              </div>
            </div>
            {/* Main Wrapper End */}
          </>
        )}

        {/* If Cart is Empty */}
        {cartItems.length < 1 && (
          <div className="h-[70vh] flex-[2] flex flex-col justify-center items-center pb-[50px] md:-mt-14">
            <img
              src="/empty-cart.png"
              className="w-[250px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
            </span>
            <Link
              to="/"
              className="py-4 px-8 rounded-full bg-slate-900 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
