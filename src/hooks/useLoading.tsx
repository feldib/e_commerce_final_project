"use client";
import React from "react";

import LoadingSpinner from "@/components/LoadingSpinner";

const useLoading = <T,>(data: T, makeJSX: (data: T) => React.JSX.Element) => {
  const [result, setResult] = React.useState(<LoadingSpinner />);
  React.useEffect(() => {
    if (data) {
      setResult(makeJSX(data));
    } else {
      setResult(<LoadingSpinner />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return result;
};

export default useLoading;
