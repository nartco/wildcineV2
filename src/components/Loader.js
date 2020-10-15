import React from "react";
import Loader from "react-loader-spinner";

const LoaderCustom = () => {
  return (
    <div className="loaderContainer">
      <Loader type='TailSpin' color='#26c485' height={"80%"} width={"80%"} className='loader'/>
    </div>
  );
};

export default LoaderCustom;
