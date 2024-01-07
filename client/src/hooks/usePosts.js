import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
} from "../redux/actions/type";
import useAxiosPrivate from "./useaxiosprivate";

const usePosts = (pageNum = 1, pageLimit = 3) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch({ type: GET_POST_REQUEST });
    const cotroller = new AbortController();
    const { signal } = cotroller;
    axiosPrivate
      .get(`post/posts?pageNum=${pageNum}&pageLimit=${pageLimit}`, { signal })
      .then(({ data }) => {
        dispatch({
          type: GET_POST_SUCCESS,
          payload: {
            posts: data?.docs,
            hasNextPage: data?.hasNextPage,
            totalPage: data?.totalPage,
            nextPage: data?.nextPage,
          },
        });
      })
      .catch((error) => {
        if (signal.aborted) return;
        dispatch({
          type: GET_POST_FAIL,
          payload: { errorMessage: error.response?.data?.message },
        });
      });

    return () => {
      cotroller.abort();
    };
  }, [pageNum, pageLimit]);
};

export default usePosts;
