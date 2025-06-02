import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <BeatLoader />
    </div>
  );
};

export default Loader;
