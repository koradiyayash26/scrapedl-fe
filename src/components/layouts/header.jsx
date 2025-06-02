import React, { useState } from "react";
import { Rows3, X } from "lucide-react";
import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";
const Header = () => {
  const matches = useMediaQuery("only screen and (max-width: 400px)");
  const [isToggle, setIsToggle] = useState(false);
  const NavItems = [
    { itemName: "Home", url: "/" },
    { itemName: "Contact", url: "/contact" },
    { itemName: "Service", url: "/service" },
  ];
  return (
    <div className="w-full bg-purple-500 px-4">
      {matches ? (
        <div>
          {isToggle ? (
            <div className="w-full grid grid-cols-1 text-center gap-4 bg-purple-300 p-4">
              <div onClick={() => setIsToggle(false)}>
                <X />
              </div>
              {NavItems?.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className="text-white font-bold p-[10px_0] hover:bg-purple-300"
                >
                  {item.itemName}
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full flex h-[60px] items-center p-[16px_16px]">
              <div onClick={() => setIsToggle(true)}>
                <Rows3 className="text-white" />
              </div>
              <div className="w-full text-white flex justify-center">
                Think Movies Scraper
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-5 h-[50px] items-center p-4">
          {NavItems?.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className="text-white font-bold hover:underline"
            >
              {item.itemName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
