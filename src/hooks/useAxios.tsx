"use client";
import React from "react";

import axiosConfigured from "@/utils/axiosConfigured";
import { SERVER_URL } from "@/utils/constants";

const useAxios = (url: string) => {
  const [data, setData] = React.useState<unknown>(undefined);
  React.useEffect(() => {
    (async () => {
      await axiosConfigured
        .get(`${SERVER_URL}${url}`)
        .then(function (results) {
          setData(results.data);
        })
        .catch(function (error) {
          setData(false);
          console.log(error);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};

export default useAxios;
