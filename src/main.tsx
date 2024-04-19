import React from "react";
import { createRoot } from "react-dom/client";

import { ConfigProvider } from "antd";
import "./App.css";
import App from "./App";
import { orgColours } from "./org";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: orgColours?.interactive ?? "#056eef",
        colorPrimaryBg: "#f5f5f5", // tw neutral 100
        colorTextHeading: "#262626", // tw neutral 800
        colorText: "#262626", // tw neutral 800
        colorTextDescription: "#737373", // tw neutral 500
        colorSuccess: "#10b981", // tw emerald 500
        colorWarning: "#f59e0b", // tw amber 500
        colorError: "#f43f5e", // tw rose 500
        colorInfo: orgColours?.interactive ?? "#056eef",
        fontFamily:
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
        borderRadius: 6,
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        boxShadowSecondary:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      components: {
        Slider: {
          controlSize: 12,
          handleSize: 12,
          handleSizeHover: 12,
          handleLineWidth: 2,
          handleLineWidthHover: 2,
          dotSize: 10,
          trackBg: orgColours?.interactive ?? "#056eef",
          trackHoverBg: orgColours?.interactive ?? "#056eef",
          handleColor: orgColours?.interactive ?? "#056eef",
          handleActiveColor: orgColours?.interactive ?? "#056eef",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
