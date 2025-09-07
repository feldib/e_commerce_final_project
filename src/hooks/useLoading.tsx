"use client";
import React from "react";

const useLoading = <T,>(data: T, makeJSX: (data: T) => React.JSX.Element) => {
  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status" />
    </div>
  );

  const [result, setResult] = React.useState(spinner);
  React.useEffect(() => {
    if (data) {
      setResult(makeJSX(data));
    } else {
      setResult(spinner);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return result;
};

export default useLoading;
