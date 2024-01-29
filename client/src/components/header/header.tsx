import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Icons
import { SlLogin } from "react-icons/sl";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";

import toast from "react-hot-toast";

import Menu, { DropDown } from "./menu/Menu";
import { selectCurrentUser, useLazyLogoutQuery, logOut } from "../../features/auth";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import MenuMobile from "./menu/MobileMenu";

// TODO: Show Dynamic Categories
import { categories } from "../../data";

const data: DropDown[] = [
  { id: 1, name: "Home", url: "/" },
  {
    id: 2,
    name: "Category",
    url: "/category",
    subMenu: true,
    subMenuData: categories,
  },
  { id: 3, name: "Contact", url: "/contact" },
  { id: 4, name: "About", url: "/about" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const user = useAppSelector(selectCurrentUser);
  const [TriggerLogout] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();

  const setMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  // Login Handler
  const logoutHandler = async () => {
    try {
      const response = await TriggerLogout();
      if (response.isSuccess) {
        dispatch(logOut());
        toast.success("Sign Out Successfully");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <header className="bg-slate-900">
      <div className="w-full max-w-[1280px] mx-auto px-4 py-6 text-white">
        <div className="flex justify-between items-center">
          {/* Mobile Icons */}
          <div className="md:hidden">
            {!isMobileMenuOpen ? (
              <AiOutlineMenu
                size={25}
                onClick={setMobileMenu}
              />
            ) : (
              <RxCross1
                size={25}
                onClick={setMobileMenu}
              />
            )}
          </div>

          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl font-bold hover:text-gray-300">🛍️ ShopNest</h1>
          </Link>

          {/* Navigation Menu */}
          <Menu data={data} />
          {isMobileMenuOpen && (
            <MenuMobile
              data={data}
              setMobileMenu={setMobileMenu}
            />
          )}

          {/* Links */}
          <div className="flex items-center gap-6 font-bold text-white relative py-4">
            {/* Cart */}
            <Link
              onClick={() => setIsOpen(false)}
              to={"/cart"}
            >
              <HiOutlineShoppingBag
                size={25}
                className="hover:text-gray-300"
              />
            </Link>

            {/* If User then Display Dialog else Login Link */}
            {user ? (
              <>
                {/* User Account Icon */}
                <button onClick={() => setIsOpen((prev) => !prev)}>
                  <FaRegUser
                    size={20}
                    className="hover:text-gray-300"
                  />
                </button>

                {/* Dialog */}
                <dialog
                  open={isOpen}
                  className="bg-slate-600 absolute top-full left-[calc(100%-150px)] min-w-[150px] rounded px-1 py-1 text-white shadow-xl z-9999"
                >
                  <div className="flex flex-col">
                    {/* If Admin */}
                    {user === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center h-12 px-3 hover:bg-gray-200 hover:text-black rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin
                      </Link>
                    )}

                    {/* Order */}
                    <Link
                      to="/orders"
                      className="flex items-center h-12 px-3 hover:bg-gray-200 hover:text-black rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Orders
                    </Link>

                    {/* Logout */}
                    <button
                      className="flex items-center h-12 px-3 hover:bg-gray-200 hover:text-black rounded-md"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </div>
                </dialog>
              </>
            ) : (
              // Login Icon
              <Link to={"/login"}>
                <SlLogin
                  size={21}
                  className="hover:text-gray-300"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
