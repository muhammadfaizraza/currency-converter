import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const ConvertedResult = () => {
  const { data: conversionData, loading: conversionLoading } = useSelector(
    (state) => state.convertCurrency
  );
  return (
    <>
      {conversionLoading ? (
        <Loader />
      ) : (
        conversionData && (
          <div className="mt-4 text-center">
            <h4>Converted Amount:</h4>
            <p>{conversionData?.convertedAmount} </p>
          </div>
        )
      )}
    </>
  );
};

export default ConvertedResult;
