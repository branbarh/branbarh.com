"use client";

// Implemented based on https://github.com/vercel/next.js/discussions/49465#discussioncomment-6966993

import { useEffect, useState } from "react";

const getFragmentID = () => (typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace("#", "")) : undefined);

const useFragmentID = () => {
  const [fragmentID, setFragmentID] = useState(getFragmentID());

  useEffect(() => {
    const handleFragmentIDChange = () => {
      setFragmentID(getFragmentID());
    };
    window.addEventListener("hashchange", handleFragmentIDChange);
    return () => {
      window.removeEventListener("hashchange", handleFragmentIDChange);
    };
  }, []);

  return fragmentID;
};

export default useFragmentID;
