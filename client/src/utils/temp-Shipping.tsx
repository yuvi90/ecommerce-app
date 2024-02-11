import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../features/auth";

// Payments
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// import { makePaymentRequest } from "@/utils/api";

const Shipping = () => {
  const [loading, setLoading] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const { cartItems } = useAppSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrderHandler = async () => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      navigate("/pay");
      // setLoading(true);
      // setTimeout(() => {
      //   console.log("Placing  Order");
      //   console.log(cartItems);
      //   setLoading(false);
      // }, 2000);
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
                Shipping
              </div>
            </div>

            {/* Main Wrapper Start */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* Shipping Address */}
              <div className="flex-[2]">
                <div className="text-lg font-bold mb-5">Address</div>
                <form className="flex flex-col gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Address"
                    name="address"
                    className="border rounded-md p-2 font-medium hover:border-black cursor-pointer"
                  />

                  <input
                    required
                    type="text"
                    placeholder="City"
                    name="city"
                    className="border rounded-md p-2 font-medium hover:border-black cursor-pointer"
                  />

                  <input
                    required
                    type="text"
                    placeholder="State"
                    name="state"
                    className="border rounded-md p-2 font-medium hover:border-black cursor-pointer"
                  />

                  <select
                    name="country"
                    required
                    className="border rounded-md p-2 font-medium hover:border-black cursor-pointer"
                  >
                    <option value="">Choose Country</option>
                    <option value="india">India</option>
                  </select>

                  <input
                    required
                    type="text"
                    placeholder="Pin Code"
                    name="pinCode"
                    className="border rounded-md p-2 font-medium hover:border-black cursor-pointer"
                  />
                </form>
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
                  Payment
                  {loading && <img src="/spinner.svg" />}
                </button>
              </div>
            </div>
            {/* Main Wrapper End */}
          </>
        )}
      </div>
    </div>
  );
};

export default Shipping;
