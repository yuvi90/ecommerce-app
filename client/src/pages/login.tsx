import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
// import { getUser } from "../features/users/userAPI";

import { setCredentials, useLoginMutation } from "../features/auth";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

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
      console.log(userData);

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
      <main>
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <div>
            <input
              type="text"
              id="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <label htmlFor="password">Password:</label>
          <div>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <button>Sign In</button>
        </form>
      </main>
    </div>
  );
};

export default Login;
