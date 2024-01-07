import React from "react";
const reactsIcons = [
  { name: "like", image: "/assets/reacts/like.gif" },
  { name: "love", image: "/assets/reacts/love.gif" },
  { name: "haha", image: "/assets/reacts/haha.gif" },
  { name: "wow", image: "/assets/reacts/wow.gif" },
  { name: "sad", image: "/assets/reacts/sad.gif" },
  { name: "angry", image: "/assets/reacts/angry.gif" },
];

const ReactsPopups = ({ reactVisible, setReactVisible }) => {
  return (
    <>
      {reactVisible && (
        <div className=" flex space-x-2 bg-white shadow-md p-2 rounded-full border border-gray-100">
          {reactsIcons.map((icon, i) => (
            <div key={i} className=" w-9 hover:scale-150 transition-transform">
              <img src={icon.image} alt={icon.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactsPopups;
