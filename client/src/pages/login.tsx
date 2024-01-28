import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { setCredentials, useLoginMutation } from "../features/auth";
import { useAppDispatch } from "../redux/hooks";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();

      if (userData.status) {
        toast.success("Success");
        dispatch(setCredentials({ ...userData, user }));
        setUser("");
        setPwd("");
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
    <div className="login">
      <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="off"
            required
          />

          {/* Password */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          {/* Button */}
          <button>Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
