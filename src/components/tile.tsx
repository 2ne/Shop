import React from "react";
import { Link } from "react-router-dom";
import { orgTiles } from "../org";

const Tiles: React.FC = () => {
  return (
    <>
      {orgTiles && (
        <>
          <div className="grid gap-3 sm:gap-4 2xl:gap-5 grid-cols-[repeat(auto-fit,_minmax(160px,_max-content))] sm:grid-cols-[repeat(auto-fit,_minmax(200px,_max-content))] lg:grid-cols-[repeat(auto-fit,_minmax(290px,_max-content))]">
            {orgTiles.map((item, index) => (
              <Link
                to={item.link}
                className="md:max-w-[33vw] border-2 border-white grid card"
                key={index}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={`block object-contain ${
                    item.title
                      ? "rounded-t-[calc(0.375rem-0.125rem)]"
                      : "rounded-[calc(0.375rem-0.125rem)]"
                  }`}
                  loading="lazy"
                />
                {item.title && (
                  <div className="relative px-2.5 sm:px-3 py-2 sm:py-2.5 bg-white">
                    <h2 className="text-sm font-semibold text-center sm:leading-5 sm:text-base line-clamp-2 text-neutral-800">
                      {item.title}
                    </h2>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Tiles;
