import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

// Types
export interface SubMenuData {
  id: number;
  name: string;
  slug?: string;
  doc_count?: number;
}

export interface Data {
  id: number;
  name: string;
  url: string;
  subMenu?: boolean;
  subMenuData?: SubMenuData[];
}

interface Props {
  data: Data[];
}

const Menu = ({ data }: Props) => {
  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);

  return (
    <ul className="menu-list">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu ? (
              <li
                className="menu-link submenu-link"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul className="submenu-list">
                    {item.subMenuData?.map((sMenu) => {
                      return (
                        <Link
                          key={sMenu.id}
                          to={`/${item.url}/${sMenu.slug}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="submenu-item">
                            {sMenu.name}
                            <span className="opacity-50 text-sm">{`(${sMenu.doc_count})`}</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="menu-link">
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
