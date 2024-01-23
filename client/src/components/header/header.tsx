import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaSignInAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

import Menu, { Data } from "./menu/menu";
import { selectCurrentUser } from "../../features/auth";
import { useAppSelector } from "../../redux/hooks";

// TODO: Show Dynamic Categories
const data: Data[] = [
  { id: 1, name: "Home", url: "/" },
  {
    id: 2,
    name: "Categories",
    url: "/categories",
    subMenu: true,
    subMenuData: [
      { id: 1, name: "Jordan", doc_count: 11 },
      { id: 2, name: "Sneakers", doc_count: 8 },
      { id: 3, name: "Running shoes", doc_count: 64 },
      { id: 4, name: "Football shoes", doc_count: 107 },
    ],
  },
  { id: 3, name: "Contact", url: "/contact" },
  { id: 4, name: "About", url: "/about" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = useAppSelector(selectCurrentUser);

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
    <header className="container">
      <div className="header">
        {/* Logo */}
        <Link to="/">
          <h1>🛍️ Shop</h1>
        </Link>

        {/* Navigation */}
        <nav>
          <Menu data={data} />
        </nav>

        {/* Links */}
        <div className="other-links">
          {/* Cart */}
          <Link
            onClick={() => setIsOpen(false)}
            to={"/cart"}
          >
            <FaShoppingBag />
          </Link>

          {/* If User then Display Dialog else Login Link */}
          {user ? (
            <>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <FaUser />
              </button>

              <dialog open={isOpen}>
                <div>
                  {/* If Admin */}
                  {user === "admin" && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/admin/dashboard"
                    >
                      Admin
                    </Link>
                  )}

                  {/* Order */}
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/orders"
                  >
                    Orders
                  </Link>

                  {/* Logout */}
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </dialog>
            </>
          ) : (
            <Link to={"/login"}>
              <FaSignInAlt />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
