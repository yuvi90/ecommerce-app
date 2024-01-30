import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

// Types
export interface DropDownType {
  id: number;
  name: string;
  url: string;
  subMenu?: boolean;
  subMenuData?: string[];
}

interface Props {
  data: DropDownType[];
}

const Menu = ({ data }: Props) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-bold text-white">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu && item.subMenuData ? (
              <DropDown
                title={item.name}
                dropDownList={item.subMenuData}
              />
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

/* DropDown Component */
const DropDown = ({ title, dropDownList }: { title: string; dropDownList: string[] }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  return (
    <div
      className="relative cursor-pointer flex items-center gap-2 hover:text-gray-300 py-4"
      onMouseEnter={() => setIsDropDownOpen(true)}
      onMouseLeave={() => setIsDropDownOpen(false)}
    >
      {title}
      <BsChevronDown size={14} />
      {isDropDownOpen && (
        <ul className="absolute bg-slate-600 top-full left-0 min-w-[250px] rounded px-1 py-1 shadow-xl z-9999">
          {dropDownList?.map((dropdown, idx) => {
            return (
              <Link
                key={idx}
                to={`${title.toLowerCase()}/${dropdown.trim().toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsDropDownOpen(false)}
              >
                <li className="h-12 flex justify-between items-center px-3 text-white hover:bg-gray-200 hover:text-black rounded-md">
                  {dropdown}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};
