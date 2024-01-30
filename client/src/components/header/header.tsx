import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// Components & Icons
import Menu, { DropDownType } from "./menu/Menu";
import MenuMobile from "./menu/MobileMenu";
import { SlLogin } from "react-icons/sl";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
// Utilities
import { selectCurrentUser, useLazyLogoutQuery, logOut } from "../../features/auth";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

// TODO: Show Dynamic Categories
import { categories } from "../../data";
const data: DropDownType[] = [
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

/* Header Component */
const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const setMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const accountDropDownList = ["Orders"];

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
          <div className="flex items-center gap-6 font-bold text-white relative">
            {/* Cart */}
            <Link
              to={"/cart"}
              className="flex justify-center items-center text-2xl hover:text-gray-300"
            >
              <HiOutlineShoppingBag />
            </Link>

            {/* If User then Display Dialog else Login Link */}
            {user ? (
              <AccountDropdown dropDownList={accountDropDownList} />
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

/* Account Dropdown Component */
const AccountDropdown = ({ dropDownList }: { dropDownList: string[] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [TriggerLogout] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  // Logout Handler
  const logoutHandler = async () => {
    try {
      const response = await TriggerLogout();
      if (response.isSuccess) {
        dispatch(logOut());
        toast.success("Success");
        setIsDropdownOpen(false);
      }
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <div
      className="relative flex items-center gap-2 py-4 cursor-pointer hover:text-gray-300 "
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      {/* User Account Icon */}
      <FaRegUser size={20} />

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute bg-slate-600 top-full left-[calc(100%-150px)] min-w-[150px] rounded px-1 py-1 shadow-xl z-9999">
          {/* If Admin */}
          {user === "admin" && (
            <Link
              to="/admin/dashboard"
              className="flex items-center h-12 px-3 text-white hover:bg-gray-200 hover:text-black rounded-md"
              onClick={() => setIsDropdownOpen(false)}
            >
              Admin
            </Link>
          )}
          {dropDownList?.map((links, idx) => {
            return (
              <Link
                key={idx}
                to={`/${links.trim().toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsDropdownOpen(false)}
                className="h-12 flex justify-between items-center px-3 text-white hover:bg-gray-200 hover:text-black rounded-md"
              >
                {links}
              </Link>
            );
          })}
          {/* Logout */}
          <div
            className="flex items-center h-12 px-3 text-white hover:bg-gray-200 hover:text-black rounded-md"
            onClick={logoutHandler}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};
