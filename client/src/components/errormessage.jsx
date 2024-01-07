const ErrorMessage = ({ message, arrowDir, position }) => {
  let arrowStyle = "";
  let locationStyle = "";

  switch (arrowDir) {
    case "down":
      arrowStyle = "top-full left-3";
      break;
    case "up":
      arrowStyle = "bottom-full left-3 rotate-180";
      break;
    case "left":
      arrowStyle = "-left-4 rotate-90 top-1/2 -translate-y-1/2";
      break;
    case "right":
      arrowStyle = "-right-4 -rotate-90 top-1/2 -translate-y-1/2";
      break;
    default:
      arrowStyle = "";
  }

  switch (position) {
    case "left":
      locationStyle = "right-full mr-4 absolute w-80 top-0";
      arrowStyle = "left-[98.5%] -rotate-90 top-3";
      break;
    case "right":
      locationStyle = "left-full ml-4 absolute w-80 top-0";
      arrowStyle = "right-[98%] rotate-90 top-3";
      break;
    default:
      locationStyle = "relative";
  }
  return (
    <div
      className={`${locationStyle} shadow-lg shadow-red-800/50 rounded-lg text-gray-50
  text-md lg:w-88 p-4 bg-red-800/75 mb-4`}
    >
      {message}
      <div
        className={`${arrowStyle} shadow-xl shadow-red-800/50 w-0 h-0 absolute border-l-[12px]
 border-l-trnasparent border-t-[14px] border-t-red-800/75 border-r-[12px] border-r-transparent`}
      ></div>
    </div>
  );
};

export default ErrorMessage;
