import { Link } from "react-router-dom";

const LeftSideLinks = ({ img, text, notification = "" }) => {
  return (
    <Link to="/" className="p-2 w-12 h-12 rounded-full bg-gray-300 xl:w-auto xl:h-auto space-x-2 flex items-center
    hover:bg-gray-400 xl:hover:bg-gray-300 xl:rounded-lg xl:bg-transparent transition-colors">
      <img src={`./assets/left/${img}.png`} alt="icon" />
      <div className="leading-4 hidden xl:block">
        <p className="text-[15px] font-semibold">{text}</p>
        {notification && (
          <p className="text-blue-600 text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-1 inline-block"></span>
            {notification}
          </p>
        )}
      </div>
    </Link>
  );
};

export default LeftSideLinks;
