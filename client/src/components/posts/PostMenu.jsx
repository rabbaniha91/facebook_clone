import { useSelector } from "react-redux";
import {
  imagePostMenu,
  ownImagePostMenu,
  ownTextPostMenu,
  textPostmenu,
} from "../../data/postMenu";

import PostMenuItems from "./PostMenuItems";

const PostMenu = ({ post }) => {
  const user = useSelector((state) => state.user?.userInfo);
  const isUserPost =
    user?.userName === post?.user[0]?.userName || post?.user?.userName;
  console.log(post.images.length);

  return (
    <div className=" bg-white w-[300px] overflow-hidden p-1 rounded-lg shadow-xl">
      {isUserPost && post?.images?.length > 0 && (
        <div className="space-y-1">
          {ownImagePostMenu.slice(0, 2).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.description}
              key={index}
            />
          ))}
          <div className="devider"></div>
          {ownImagePostMenu.slice(2, 12).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.description}
              key={index}
            />
          ))}
        </div>
      )}
      {isUserPost && post?.images?.length === 0 && (
        <div className="space-y-1">
          {ownTextPostMenu.slice(0, 2).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.description}
              key={index}
            />
          ))}
          <div className="devider"></div>
          {ownTextPostMenu.slice(2, 12).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.description}
              key={index}
            />
          ))}
        </div>
      )}
      {!isUserPost && post?.images?.length === 0 && (
        <div className=" space-y-1 p-2">
          {textPostmenu.map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.decription}
              key={index}
            />
          ))}
        </div>
      )}
      {!isUserPost && post?.images?.length > 0 && (
        <div className=" space-y-1">
          {imagePostMenu.slice(0, 1).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.decription}
              key={index}
            />
          ))}
          <div className=" devider"></div>
          {imagePostMenu.slice(1, 4).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.decription}
              key={index}
            />
          ))}
          <div className="devider"></div>
          {imagePostMenu.slice(4, 5).map((item, index) => (
            <PostMenuItems
              name={item.name}
              icon={item.icon}
              decription={item.decription}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostMenu;
