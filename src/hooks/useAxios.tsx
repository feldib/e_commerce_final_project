"use client";
import React from "react";
import { server_url } from "../utils/api_constants";
import axiosConfigured from "@/utils/axiosConfigured";

const useAxios = (url: string) => {
  const [data, setData] = React.useState<unknown>(undefined);
  React.useEffect(() => {
    (async () => {
      await axiosConfigured
        .get(`${server_url}${url}`)
        .then(function (results) {
          setData(results.data);
        })
        .catch(function (error) {
          setData(false);
          console.log(error);
        });
    })();
  }, []);

  return data;
};

export default useAxios;
