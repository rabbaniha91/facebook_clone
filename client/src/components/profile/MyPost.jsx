import React, { useEffect, useCallback, useRef, useState } from "react";
import usePosts from "../../hooks/usePosts";
import { useSelector, useDispatch } from "react-redux";
import Floader from "../ui/fadeloader";
import { GET_MYPOST_CLEAN } from "../../redux/actions/type";
import Post from "../posts/Post";
import useMyPosts from "../../hooks/useMyPosts";

const MyPosts = ({userName}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.myPosts);
  const [pageNum, setPageNum] = useState(1);
  useMyPosts(userName,pageNum);

  useEffect(() => {
    dispatch({type: GET_MYPOST_CLEAN})
    setPageNum(1)

  },[userName])

  const intObserver = useRef(null);
  const lastPostRef = useCallback(
    (post) => {
      if (posts?.isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((enries) => {
        if (enries[0].isIntersecting && posts?.hasNextPage) {
          setPageNum(posts?.nextPage);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [posts?.isLoading, posts?.hasNextPage, posts?.nextPage]
  );


  return (
    <div className=" mt-3 mb-3 space-y-3 w-full">
      {posts?.posts.map((post, i) => {
        if (posts?.posts?.length === i + 1) {
          return <Post key={i} ref={lastPostRef} post={post} />;
        } else {
          return <Post key={i} post={post} />;
        }
      })}
      {posts?.isLoading && (
        <div className="fixed left-[50%] bottom-6">
          <Floader isLoading={true} color="#1b74e4" />
        </div>
      )}
    </div>
  );
};

export default MyPosts;
