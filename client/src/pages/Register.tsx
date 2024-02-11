import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useRegisterMutation } from "../features/auth";

interface FormData {
  user: string;
  pwd: string;
  email: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const [registerForm] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { user, pwd, email } = data;
      const userData = await registerForm({ user, pwd, email }).unwrap();
      if (userData.status) {
        toast.success("Success");
        navigate("/login");
      } else {
        toast.error("Sign up fails.");
      }
    } catch (err) {
      toast.error("Sign up fails.");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center my-20 px-4">
      <section className="w-full max-w-[500px] mx-auto bg-gray-100 px-5 py-10 md:px-10 rounded-xl">
        <h1 className="text-4xl mb-10 text-center font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label
            htmlFor="email"
            className="block mt-4 text-sm font-medium text-gray-600"
          >
            Email:
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            className={`mt-1 p-2 w-full border rounded-md ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

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

          {/* Login Link */}
          <div className="mt-5 text-sm font-medium text-slate-900 ">
            <Link
              to="/login"
              className="hover:text-slate-500"
            >
              Already have an account ?
            </Link>
          </div>

          {/* Button */}
          <button className="w-full py-4 rounded-full bg-slate-900 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-4">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
