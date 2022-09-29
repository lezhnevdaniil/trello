import { useEffect } from "react";

export const useClickOutside = (ref, optionRef, crossRef, index, callback) => {
  const handleClick = (e) => {
    if (
      (optionRef.current !== e.target &&
        !ref.current[index]?.contains(e.target)) ||
      crossRef.current === e.target
    ) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
