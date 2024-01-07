const SubUserMenu = ({ title, icon }) => {
  return (
    <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2 hover:bg-gray-300
    transition-colors rounded-lg cursor-pointer">
      <div className="w-9 h-9 rounded-full p-1 bg-gray-200">{icon}</div>
      <div className="text-lg">{title}</div>
    </div>
  );
};

export default SubUserMenu;
