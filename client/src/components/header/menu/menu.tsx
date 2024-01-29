import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

// Types
export interface DropDown {
  id: number;
  name: string;
  url: string;
  subMenu?: boolean;
  subMenuData?: string[];
}

interface Props {
  data: DropDown[];
}

const Menu = ({ data }: Props) => {
  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);

  return (
    <ul className="hidden md:flex items-center gap-8 font-bold text-white">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative hover:text-gray-300 py-4"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul className="bg-slate-600 absolute top-full left-0 min-w-[250px] rounded px-1 py-1 shadow-xl z-9999">
                    {item.subMenuData?.map((dropdown, idx) => {
                      return (
                        <Link
                          key={idx}
                          to={`${item.url}/${dropdown.trim().toLowerCase().replace(" ", "-")}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 text-white hover:bg-gray-200 hover:text-black rounded-md">
                            {dropdown}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer hover:text-gray-300 p-4">
                <Link to={item.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
