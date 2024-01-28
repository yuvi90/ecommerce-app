import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";

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

const MenuMobile = ({ data }: Props) => {
  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:hidden font-bold fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white border-t text-black z-9999">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item.subMenu ? (
              <div
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => {
                  setShowCatMenu(!showCatMenu);
                }}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <div className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {item.subMenuData?.map((sMenu) => {
                      return (
                        <Link
                          key={sMenu.id}
                          to=""
                          onClick={() => {
                            setShowCatMenu(false);
                            // setMobileMenu(false);
                          }}
                        >
                          <div className="py-4 px-8 border-t flex justify-between">
                            {sMenu.name}
                            <span className="opacity-50 text-sm">{`(${sMenu.doc_count})`}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 px-5 border-b">
                <Link
                  to={item.url}
                  // onClick={() => setMobileMenu(false)}
                >
                  {item.name}
                </Link>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MenuMobile;
