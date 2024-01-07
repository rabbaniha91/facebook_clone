const PostMenuItems = ({ name, decription, icon }) => {
  return (
    <div
      className="flex space-x-2 p-1 justify-start items-center cursor-pointer transition-colors hover:bg-gray-100
        h-[48px] pl-2 rounded-lg"
    >
      <span className="w-7 h-7 rounded-full p-1 bg-gray-300">{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm">{name}</span>
        <span className="text-gray-500 text-[0.7rem] overflow-hidden">
          {decription}
        </span>
      </div>
    </div>
  );
};

export default PostMenuItems;
