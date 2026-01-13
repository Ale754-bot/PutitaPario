// src/components/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
  onClick={scrollToTop}
  className="fixed bottom-6 left-6 w-6 h-6 bg-black text-white rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
>
  ↑
</button>


    )
  );
};

export default ScrollToTopButton;
