import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { ReactElement, useRef, useState } from "react";
import { PlayCircleFilled } from "@ant-design/icons";

type MediaItem = {
  url: string;
  type: string;
};

type MediaCarouselProps = {
  media?: MediaItem[];
  outOfStock?: boolean;
  limitedStock?: boolean;
};

const extractYouTubeID = (url: string): string | null => {
  const parsedUrl = new URL(url);
  const videoID = parsedUrl.searchParams.get("v");
  return videoID;
};

const MediaCarousel = ({
  media,
  outOfStock,
  limitedStock,
}: MediaCarouselProps): ReactElement => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    carouselRef.current?.goTo(index);
    setCurrentSlide(index);
  };

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  return (
    <div className="self-start overflow-hidden lg:sticky lg:top-5">
      <div>
        <div className="overflow-hidden rounded-md">
          {media && (
            <Carousel ref={carouselRef} afterChange={onChange} dots={false}>
              {media.map(({ url, type }, index) => {
                switch (type) {
                  case "youtube": {
                    const videoID = extractYouTubeID(url);
                    return (
                      <div key={index}>
                        <iframe
                          tabIndex={-1}
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoID}`}
                          title="YouTube video player"
                          className="aspect-[3/2] object-contain object-center w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    );
                  }
                  case "video":
                    return (
                      <div key={index}>
                        <video
                          className="bg-black aspect-[3/2] object-contain object-center w-full h-full"
                          controls
                          tabIndex={-1}
                        >
                          <source
                            src={url}
                            type={`video/${url.split(".").pop()}`}
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  case "image":
                  default:
                    return (
                      <div
                        key={index}
                        className={outOfStock ? "bg-rose-50" : "bg-neutral-100"}
                      >
                        <img
                          className="aspect-[3/2] mix-blend-multiply object-contain object-center w-full h-full"
                          src={url}
                          alt={`Product illustration ${index}`}
                        />
                      </div>
                    );
                }
              })}
            </Carousel>
          )}
        </div>
        {media && (
          <div className="grid grid-cols-6 gap-2 mt-3 mb-3 lg:mt-4 sm:mb-0 lg:gap-3">
            {media.length > 1 &&
              media.map(({ url, type }, index) => {
                const isActive = currentSlide === index;
                switch (type) {
                  case "youtube": {
                    const videoID = extractYouTubeID(url);
                    return (
                      <button
                        tabIndex={-1}
                        type="button"
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`relative inline-flex aspect-[3/2] object-contain object-center w-full h-full rounded transition-opacity ${
                          isActive ? "" : "opacity-50 hover:opacity-75"
                        }`}
                      >
                        <div className="bg-black select-none inline-flex aspect-[3/2] object-contain object-center w-full h-full transition-opacity rounded absolute inset-0 items-center justify-center">
                          <img
                            src={`https://img.youtube.com/vi/${videoID}/0.jpg`}
                            alt={`Thumbnail ${index}`}
                            className="select-none inline-flex aspect-[3/2] object-contain object-center w-full h-full transition-opacity rounded"
                          />
                          <PlayCircleFilled className="absolute inset-0 text-2xl text-white rounded bg-black/20 place-content-center" />
                        </div>
                      </button>
                    );
                  }
                  case "video":
                    return (
                      <button
                        tabIndex={-1}
                        type="button"
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`relative inline-flex aspect-[3/2] object-contain object-center w-full h-full rounded transition-opacity ${
                          isActive ? "" : "opacity-50 hover:opacity-75"
                        }`}
                      >
                        <video
                          tabIndex={-1}
                          className="bg-black aspect-[3/2] object-contain object-center w-full h-full rounded"
                          preload="metadata"
                          muted
                        >
                          <source
                            src={url}
                            type={`video/${url.split(".").pop()}`}
                          />
                        </video>
                        <PlayCircleFilled className="absolute inset-0 text-2xl text-white rounded bg-black/20 place-content-center" />
                      </button>
                    );
                  case "image":
                  default:
                    return (
                      <button
                        tabIndex={-1}
                        type="button"
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`relative inline-flex aspect-[3/2] object-contain object-center w-full h-full rounded transition-opacity ${
                          isActive ? "" : "opacity-50 hover:opacity-75"
                        }`}
                      >
                        <div
                          className={`rounded ${
                            outOfStock ? "bg-rose-50" : "bg-neutral-100"
                          }`}
                        >
                          <img
                            src={url}
                            alt={`Thumbnail ${index}`}
                            className="select-none mix-blend-multiply inline-flex aspect-[3/2] object-contain object-center w-full h-full transition-opacity rounded"
                          />
                        </div>
                      </button>
                    );
                }
              })}
          </div>
        )}
        {!media && (
          <div
            className={`bg-neutral-100 aspect-[3/2] object-contain object-center w-full rounded max-lg:hidden text-center grid place-content-center`}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="m-auto w-14 h-14 text-neutral-400"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.8"
                d="M4.75 16l2.746-3.493a2 2 0 013.09-.067L13 15.25m-2.085-2.427c1.037-1.32 2.482-3.188 2.576-3.31a2 2 0 013.094-.073L19 12.25m-12.25 7h10.5a2 2 0 002-2V6.75a2 2 0 00-2-2H6.75a2 2 0 00-2 2v10.5a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-sm font-medium text-neutral-400">
              No image added
            </span>
          </div>
        )}
      </div>
      {limitedStock && !outOfStock && (
        <div className="absolute z-10 px-1.5 py-0.5 text-xs font-medium text-white rounded top-2 left-2 bg-amber-500">
          Limited Stock
        </div>
      )}
      {outOfStock && (
        <div className="absolute z-10 px-1.5 py-0.5 text-xs font-medium text-white rounded top-2 left-2 bg-rose-500">
          Out of Stock
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
