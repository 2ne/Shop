const FinderDecoration = () => {
  return (
    <div
      className="-mt-0.5 -ml-0.5 absolute pointer-events-none max-lg:hidden -left-40 -top-40"
      style={{
        maskImage: "radial-gradient(black, transparent)",
        WebkitMaskImage: "radial-gradient(black, transparent)",
      }}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <svg
          viewBox="0 0 558 558"
          width="558"
          height="558"
          fill="none"
          aria-hidden="true"
          className="animate-spin h-[95px] w-[95px]"
        >
          <defs>
            <linearGradient
              id=":Rddaqlla:"
              x1="79"
              y1="16"
              x2="105"
              y2="237"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#005da2"></stop>
              <stop offset="1" stop-color="#005da2" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <path
            opacity=".25"
            d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
            stroke="#005da2"
          ></path>
          <path
            d="M1 279C1 125.465 125.465 1 279 1"
            stroke="url(#:Rddaqlla:)"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="336"
        height="336"
        viewBox="0 0 336 336"
        fill="none"
      >
        <circle cx="168" cy="168" r="47.5" stroke="#f9f9f9" />
        <circle cx="168" cy="168" r="71.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="95.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="119.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="143.5" stroke="#EAECF0" />
        <circle cx="168" cy="168" r="167.5" stroke="#EAECF0" />
      </svg>
    </div>
  );
};

export default FinderDecoration;
