import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_MYPOST_REQUEST,
  GET_MYPOST_SUCCESS,
  GET_MYPOST_FAIL,
} from "../redux/actions/type";
import useAxiosPrivate from "./useaxiosprivate";

const useMyPosts = (userName, pageNum = 1, pageLimit = 3) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch({ type: GET_MYPOST_REQUEST });
    const cotroller = new AbortController();
    const { signal } = cotroller;
    axiosPrivate
      .post(
        `post/myPosts?pageNum=${pageNum}&pageLimit=${pageLimit}`,
        { userName },
        { signal }
      )
      .then(({ data }) => {
        dispatch({
          type: GET_MYPOST_SUCCESS,
          payload: {
            posts: data?.docs,
            hasNextPage: data?.hasNextPage,
            totalPage: data?.totalPage,
            nextPage: data?.nextPage,
          },
        });
      })
      .catch((error) => {
        console.log("object: ", error);
        if (signal.aborted) return;
        dispatch({
          type: GET_MYPOST_FAIL,
          payload: { errorMessage: error.response?.data?.message },
        });
      });

    return () => {
      cotroller.abort();
    };
  }, [pageNum, pageLimit]);
};

export default useMyPosts;
