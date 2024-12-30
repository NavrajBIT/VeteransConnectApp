import { useState } from "react";

const useCustomHook = () => {
  const [status, setStatus] = useState(1);

  const updateStatus = () => {
    setStatus((prev) => prev + 1);
  };

  return { status, updateStatus };
};

export default useCustomHook;
