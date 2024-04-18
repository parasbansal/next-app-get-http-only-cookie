"use client";

import { useEffect } from "react";

const ClearLocalStorage = () => {
  useEffect(() => {
    localStorage.removeItem("requestData");
  }, []);

  return <span />;
};

export default ClearLocalStorage;
