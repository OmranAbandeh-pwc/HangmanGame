import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";


function LoadingSpinner({ loading }: { loading:boolean }) {


  return (
    <div className="sweet-loading">
     
      <PulseLoader
        color="grey"
       loading={loading}
       
      />
    </div>
  );
}

export default LoadingSpinner;