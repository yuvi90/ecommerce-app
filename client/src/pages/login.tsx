import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { setCredentials, useLoginMutation } from "../features/auth";

interface FormData {
  user: string;
  pwd: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { user, pwd } = data;
      const userData = await login({ user, pwd }).unwrap();
      if (userData.status) {
        toast.success("Success");
        dispatch(setCredentials({ ...userData, user }));
        navigate("/");
      } else {
        toast.error("Sign In Fail");
      }
    } catch (err) {
      toast.error("Sign In Fail");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center my-20 px-4">
      <section className="w-full max-w-[500px] mx-auto bg-gray-100 px-5 py-10 md:px-10 rounded-xl">
        <h1 className="text-4xl mb-10 text-center font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username:
          </label>
          <input
            {...register("user", { required: "Username is required" })}
            type="text"
            id="username"
            className={`mt-1 p-2 w-full border rounded-md ${errors.user ? "border-red-500" : ""}`}
          />
          {errors.user?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>
          )}

          {/* Password */}
          <label
            htmlFor="password"
            className="block mt-4 text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            {...register("pwd", { required: "Password is required" })}
            type="password"
            id="password"
            className={`mt-1 p-2 w-full border rounded-md ${errors.pwd ? "border-red-500" : ""}`}
          />
          {errors.pwd?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">{errors.pwd.message}</p>
          )}

          {/* Register Link */}
          <div className="mt-5 text-sm font-medium text-slate-900 ">
            <Link
              to="/register"
              className="hover:text-slate-500"
            >
              Don't have an account ?
            </Link>
          </div>

          {/* Button */}
          <button className="w-full py-4 rounded-full bg-slate-900 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-4">
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
