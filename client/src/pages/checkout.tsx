import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNewOrderMutation } from "../features/orders/orderAPI";
import { resetCart } from "../features/cart/cartReducer";

import { NewOrderRequest } from "../types/api-types";
import { responseToast } from "../utils/features";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newOrder] = useNewOrderMutation();

  const { user } = useAppSelector((state) => state.authReducer);
  const { shippingInfo, cartItems, total } = useAppSelector((state) => state.cartReducer);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !user) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      customerName: shippingInfo.name,
      customerUserName: user,
      shippingInfo: {
        street: shippingInfo.street,
        city: shippingInfo.city,
        state: shippingInfo.state,
        country: shippingInfo.country,
        zipCode: shippingInfo.zipCode,
      },
      products: cartItems,
      totalAmount: total,
    };

    // const { paymentIntent, error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: { return_url: window.location.origin },
    //   redirect: "if_required",
    // });

    // if (error) {
    //   setIsProcessing(false);
    //   return toast.error(error.message || "Something Went Wrong");
    // }
    const res = await newOrder(orderData);
    dispatch(resetCart());
    responseToast(res, navigate, "/orders");

    // if (paymentIntent.status === "succeeded") {
    //   const res = await newOrder(orderData);
    //   dispatch(resetCart());
    //   responseToast(res, navigate, "/orders");
    // }
    setIsProcessing(false);
  };
  return (
    <div className="w-full md:py-20">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Payment</div>
        </div>

        {/* Main Wrapper Start */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* Payment Details */}
          <div className="flex-[2]">
            <div className="text-lg font-bold mb-5">Details</div>
            <form
              id="paymentForm"
              onSubmit={submitHandler}
            >
              <PaymentElement />
            </form>
          </div>
          {/* Order Summary */}
          <div className="flex-[1]">
            <div className="text-lg font-bold">Summary</div>
            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black">Subtotal</div>
                <div className="text-md md:text-lg font-medium text-black">&#8377;{total}</div>
              </div>
              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order, including all duties and taxes.
                Free delivery orders above &#8377;1000.
              </div>
            </div>
            {/* Place Order Button */}
            <button
              type="submit"
              form="paymentForm"
              className="w-full py-4 rounded-full bg-slate-900  text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
        {/* Main Wrapper Start */}
      </div>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state.clientSecret;
  if (!clientSecret) return <Navigate to={"/shipping"} />;

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
