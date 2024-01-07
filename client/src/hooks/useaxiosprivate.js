import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../axios/axios";
import useRefreshToken from "./userefreshtoken";

const useAxiosPrivate = () => {
  const user = useSelector((state) => state.user);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },

      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 || !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
