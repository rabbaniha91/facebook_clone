import { useDispatch } from "react-redux";
import axios from "../axios/axios";
import { REFRESH_ACCESSTOKEN } from "../redux/actions/type";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const { data } = await axios.get("/user/refresh", {
        withCredentials: true,
      });

      dispatch({
        type: REFRESH_ACCESSTOKEN,
        payload: {
          accessToken: data?.accessToken,
          userInfo: data?.userInfo,
        },
      });
      return data?.accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
