import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
// Types
// import { User } from "../types/types";
interface PropsType {
  user: string | null;
  // user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      console.log("Logout API");
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="header">
      <Link
        onClick={() => setIsOpen(false)}
        to={"/"}
      >
        HOME
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        to={"/search"}
      >
        <FaSearch />
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        to={"/cart"}
      >
        <FaShoppingBag />
      </Link>

      {user ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>

          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/admin/dashboard"
                >
                  Admin
                </Link>
              )}

              <Link
                onClick={() => setIsOpen(false)}
                to="/orders"
              >
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
