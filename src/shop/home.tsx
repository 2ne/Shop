import { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { message } from "antd";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Tiles from "../components/tile";
import Footer from "../components/footer";
import Main from "../components/main";
import Banner from "../components/banner";
import About from "../components/about";

function Home(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const validated = params.get("validated");

    if (validated === "true") {
      setLoggedIn(true);
      message.success("Account setup successfully");
    }
  }, []);

  const onAnimationComplete = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("validated") === "true") {
      params.delete("validated");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.5,
      }}
      onAnimationComplete={onAnimationComplete}
    >
      {loggedIn && <Header loggedIn={true} />}
      {!loggedIn && <Header />}
      <Breadcrumb />
      <Main className="pb-20 space-y-6 sm:space-y-8">
        <Banner />
        <About />
        <Tiles />
      </Main>
      <Footer />
    </motion.div>
  );
}

export default Home;
