const AllMenuItems = ({name, decription, icon}) => {
    return (
        <div className="flex space-x-2 p-1 cursor-pointer transition-colors hover:bg-gray-200
        h-[72px] rounded-lg">
            <img src={`./assets/left/${icon}.png`} alt={name}  className="object-contain w-9"/>
            <div className="flex flex-col">
                <span className="text-md">{name}</span>
                <span className="text-gray-500 text-[0.8rem] overflow-hidden">{decription}</span>
            </div>
        </div>
    )
}

export default AllMenuItems;