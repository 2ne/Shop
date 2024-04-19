import React, { useEffect } from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

const Main: React.FC<MainProps> = ({ children, className }) => {
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const baseClassNames = "min-h-screen-custom w-full py-6 mx-auto container";
  const combinedClassNames = className
    ? `${baseClassNames} ${className}`
    : baseClassNames;

  return (
    <main className="relative bg-white overflow-clip">
      <div className={combinedClassNames}>{children}</div>
    </main>
  );
};

export default Main;
