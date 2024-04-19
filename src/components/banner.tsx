import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { orgBanners } from "../org";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";

const Banner: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="relative overflow-hidden border-2 border-white rounded-md shadow group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10">
      <Carousel ref={carouselRef} afterChange={onChange}>
        {orgBanners &&
          orgBanners.map((item, index) => (
            <Link
              to={item.link}
              className="relative inline-block overflow-hidden align-top rounded-[calc(0.375rem-0.125rem)] group/link"
              key={index}
            >
              <img
                src={item.img}
                alt={item.title}
                className="block object-cover object-center aspect-[5/3] sm:aspect-[7/4] md:aspect-[5/3] lg:aspect-[2/1] xl:aspect-[7/3] w-full h-full transition-opacity group-hover:opacity-90 duration-300"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 rounded-[calc(0.375rem-0.125rem)] duration-300 opacity-70 lg:opacity-60 bg-gradient-to-b from-black/5 to-black"
              ></div>
              {item.title && (
                <div className="absolute inset-0 z-20 grid p-10 sm:px-20 pb-14 sm:top-auto sm:p-20 place-content-center">
                  <div className="w-full mx-auto text-center max-w-prose">
                    <h2 className="flex items-center justify-center font-bold text-center text-white text-xl md:text-2xl xl:text-4xl xl:leading-[1.325] group-hover/link:underline underline-offset-4">
                      <div className="line-clamp-2">{item.title}</div>
                    </h2>
                    <p className="mt-1 text-base text-center md:text-xl md:mt-2 xl:mt-4 xl:text-xl text-white/95">
                      <span className="line-clamp-2 sm:line-clamp-4">
                        {item.description}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </Link>
          ))}
      </Carousel>
      <button
        onClick={handlePrev}
        type="button"
        className="absolute hidden sm:grid text-white transition-all bottom-0 rounded-md opacity-0 left-0 top-0 w-20 xl:w-24 place-content-center duration-300 group-hover:opacity-75 group/button hover:!opacity-100"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="w-8 h-8 transition-all duration-300 group-hover/button:-translate-x-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M10.25 6.75L4.75 12L10.25 17.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.25 12H5"
          ></path>
        </svg>
      </button>
      <button
        onClick={handleNext}
        type="button"
        className="absolute hidden sm:grid text-white transition-all bottom-0 rounded-md opacity-0 right-0 top-0 w-20 xl:w-24 place-content-center duration-300 group-hover:opacity-75 group/button hover:!opacity-100"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="w-8 h-8 transition-all duration-300 group-hover/button:translate-x-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13.75 6.75l5.5 5.25-5.5 5.25M19 12H4.75"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Banner;
