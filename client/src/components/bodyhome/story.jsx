const Story = ({ img, profimg, profname }) => {
  return (
    <div
      className="flex flex-col max-w-[125px] min-w-[80px] relative cursor-pointer shadow-sm rounded-xl
    overflow-hidden"
    >
      <img
        src={img}
        alt="stpry image"
        className="h-full object-cover hover:scale-110 transition-transform cursor-pointer"
      />
      <div className="absolute top-2 right-2 rounded-full overflow-hidden w-10 h-10 shrink-0 shadow-lg shadow-blue-600">
        <img src={profimg} alt="profile picture" className="object-cover h-full"/>
      </div>
      <p className="w-24 absolute bottom-3 left-0 overflow-hidden bg-gray-300 bg-opacity-60
      shadow-sm font-semibold text-gray-800 rounded-br-xl rounded-tr-xl p-1 pl-2 text-sm">{profname}</p>
    </div>
  );
};

export default Story;
