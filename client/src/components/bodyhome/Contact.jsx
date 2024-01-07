const Contact = ({ user }) => {
  return (
    <div>
      <div
        className="flex items-center space-x-2 p-2 xl:mr-3 xl:w-auto xl:h-auto bg-gray-300
                rounded-full hover:bg-gray-400 xl:bg-transparent xl:hover:bg-gray-300 transition-colors
                xl:rounded-lg cursor-pointer"
      >
        <img
          className="w-9 h-9 rounded-full shrink-0 object-cover"
          src={user?.userInfo?.picture}
          alt="ProfilePicture"
        />
        <span className="hidden xl:block text-md font-semibold">
          {user?.userInfo?.userName}
        </span>
      </div>
    </div>
  );
};

export default Contact;
