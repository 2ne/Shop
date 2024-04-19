import { orgColours } from "./src/org";
module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    letterSpacing: {
      tight: "-0.011em",
      normal: "0",
      wide: "0.011em",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "728px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    transitionDuration: {
      DEFAULT: "200ms", // to match ant design defaults
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.645, 0.045, 0.355, 1)", // to match ant design defaults
    },
    extend: {
      colors: {
        primary: orgColours?.primary ?? "#056eef",
        primary_text: orgColours?.primary_text ?? "#fff",
        secondary: orgColours?.secondary ?? "#0b58c2",
        secondary_text: orgColours?.secondary_text ?? "#fff",
        interactive: orgColours?.interactive ?? "#056eef",

        success: "#10b981", // tw emerald 500
        warning: "#f59e0b", // tw amber 500
        error: "#f43f5e", // tw rose 500
        info: orgColours?.interactive ?? "#056eef",
      },
      fontFamily: {
        sans: [
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
        ],
      },
      boxShadow: {
        t: "0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)", // top shadow for footers
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("@tailwindcss/container-queries")],
};
