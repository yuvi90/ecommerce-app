import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { server } from "../redux/store";
import { useNewProfileMutation, useUserProfileQuery } from "../features/users/profileAPI";
import { selectCurrentUser } from "../features/auth";
import { Loader } from "../components";
import { saveShippingInfo } from "../features/cart/cartReducer";

interface ShippingFormInputs {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const Shipping: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, total } = useAppSelector((state) => state.cartReducer);

  const user = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  const { data, isLoading } = useUserProfileQuery(user!);
  const [newProfile] = useNewProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>();

  const onSubmit: SubmitHandler<ShippingFormInputs> = async (data) => {
    try {
      const response = await fetch(`${server}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        } as {
          amount: number;
        }),
      });

      const responseData: {
        clientSecret: string;
      } = await response.json();

      const profileData = {
        name: data.name,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          country: data.country,
          zipCode: data.zipCode,
        },
      };
      await newProfile({ username: user!, profileData: profileData });

      dispatch(saveShippingInfo(data));
      navigate("/pay", {
        state: { clientSecret: responseData.clientSecret },
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onPaymentHandler = async () => {
    try {
      const response = await fetch(`${server}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        } as {
          amount: number;
        }),
      });

      const responseData: {
        clientSecret: string;
      } = await response.json();

      if (!data) {
        return;
      }

      const shippingData = {
        name: data.userProfile.name,
        ...data.userProfile.address,
      };
      dispatch(saveShippingInfo(shippingData));

      navigate("/pay", {
        state: { clientSecret: responseData.clientSecret },
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                    {data?.status ? (
                      <div className="p-5 my-5 bg-black/[0.05] rounded-xl max-w-lg">
                        <p>{data.userProfile.name}</p>
                        <p>{data.userProfile.address.street}</p>
                        <p>
                          {data.userProfile.address.city}, {data.userProfile.address.state}
                        </p>
                        <p>
                          {data.userProfile.address.country}, {data.userProfile.address.zipCode}
                        </p>
                        <div className="underline mt-4">
                          <Link to={"/profile/edit"}>Change</Link>
                        </div>
                      </div>
                    ) : (
                      <form
                        id="addressForm"
                        className="flex flex-col gap-0"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            {...register("name", { required: "Name is required" })}
                            className={`mt-1 p-2 border rounded-md w-full ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Street
                          </label>
                          <input
                            type="text"
                            id="street"
                            {...register("street", { required: "Street is required" })}
                            className={`mt-1 p-2 border rounded-md w-full ${
                              errors.street ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.street && (
                            <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-600"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            {...register("city", { required: "City is required" })}
                            className={`mt-1 p-2 border rounded-md w-full ${
                              errors.city ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-600"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            {...register("state", { required: "State is required" })}
                            className={`mt-1 p-2 border rounded-md w-full ${
                              errors.state ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.state && (
                            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            {...register("country", { required: "Country is required" })}
                            className={`mt-1 p-2 border rounded-md w-full ${
                              errors.country ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.country && (
                            <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Zip Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            {...register("zipCode", { required: "Zip Code is required" })}
                            className={`mt-1 p-2 border rounded-md w-full ${
                              errors.zipCode ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
                          )}
                        </div>
                      </form>
                    )}
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
                          &#8377;{total}
                        </div>
                      </div>
                      <div className="text-sm md:text-md py-5 border-t mt-5">
                        The subtotal reflects the total price of your order, including all duties
                        and taxes. Free delivery orders above &#8377;1000.
                      </div>
                    </div>

                    {/* Place Order Button */}
                    {data?.status ? (
                      <button
                        className="w-full py-4 rounded-full bg-slate-900  text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                        onClick={onPaymentHandler}
                      >
                        Payment
                      </button>
                    ) : (
                      <button
                        type="submit"
                        form="addressForm"
                        className="w-full py-4 rounded-full bg-slate-900  text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                      >
                        Payment
                      </button>
                    )}
                  </div>
                </div>
                {/* Main Wrapper End */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Shipping;
