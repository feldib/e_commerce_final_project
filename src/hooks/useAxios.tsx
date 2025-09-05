"use client";
import React from "react";
import { server_url } from "../utils/api_constants";
import axios from "axios";
axios.defaults.withCredentials = true;

const useAxios = (url: string) => {
  const [data, setData] = React.useState<any>(undefined);
  React.useEffect(() => {
    (async () => {
      await axios
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
