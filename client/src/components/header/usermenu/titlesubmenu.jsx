import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const TitleSubMenu = ({ name , setVisible}) => {
  return (
    <div className="flex items-center justify-start space-x-4">
      <div
        className="w-9 h-9 rounded-full p-2 hover:text-blue-500 transition-colors cursor-pointer
            hover:bg-gray-300"
            onClick={() => setVisible(0)}
      >
        <ArrowLeftIcon />
      </div>
      <div className="text-2xl text-gray-800 font-bold">{name}</div>
    </div>
  );
};

export default TitleSubMenu;
