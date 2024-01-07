import AllMenuItems from "./allmenuitems";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { menu, create } from "../../data/allMenu";

const AllMenu = () => {
  return (
    <div
      className="absolute right-0 md:right-5 top-[50px] p-3 bg-gray-100 rounded-lg h-[90vh]
        w-[320px] md:w-[580px] lg:w-[650] shadow-lg"
    >
      <h3 className="text-3xl mb-3 font-bold">Menu</h3>
      <div
        className="overflow-y-scroll scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-thumb-blue-300
            h-[92%] pr-6"
      >
        <div
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0
                md:space-x-6"
        >
          {/* Left Side */}
          <div className="lg:w-[400px] md:w-[330px] w-[270px] p-4 rounded-lg bg-white shadow-md">
            <div className="flex items-center px-2 rounded-full bg-gray-200 relative">
              <input
                type="text"
                placeholder="Search Menu"
                className="border-none text-gray-700
                          w-full focus:ring-0 placeholder:text-gray-600 bg-transparent pl-8"
              />
              <MagnifyingGlassIcon className="w-6 absolute text-gray-600" />
            </div>
            <div>
              <div className="font-bold text-lg my-2">Social</div>
              {menu.slice(0, 6).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
            <div className="devider mt-1"></div>
            <div>
              <div className="font-bold text-lg my-2">Entertainment</div>
              {menu.slice(6, 9).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
            <div className="devider mt-1"></div>
            <div>
              <div className="font-bold text-lg my-2">Shoping</div>
              {menu.slice(9, 11).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
            <div className="devider mt-1"></div>
            <div>
              <div className="font-bold text-lg my-2">Personal</div>
              {menu.slice(11, 15).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
            <div className="devider mt-1"></div>
            <div>
              <div className="font-bold text-lg my-2">Perfessional</div>
              {menu.slice(15, 17).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
            <div className="devider mt-1"></div>
            <div>
              <div className="font-bold text-lg my-2">Community Resources</div>
              {menu.slice(17, 21).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
            <div className="devider mt-1"></div>
            <div>
              <div className="font-bold text-lg my-2">More from meta</div>
              {menu.slice(21, 23).map((item, index) => (
                <AllMenuItems
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  decription={item.description}
                />
              ))}
            </div>
          </div>
          {/* Right side */}
          <div className="w-[270px] md:w-[300px]">
                <div className="md:fixed md:right-16 md:top-[110px] p-2 bg-white space-y-1 h-fit
                rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl ml-2">Create</h3>
                  {create.map((item, index) => (
                    <div key={index} className="flex md-w-[140px] hover:bg-gray-200 transition-colors cursor-pointer
                    items-center px-2 h-10 rounded-lg space-x-3">
                      <div className="w-7 h-7 p-2 bg-gray-100 rounded-full">
                        <img src={`./assets/icons/${item.icon}.png`} alt={item.name} className="object-cover"/>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                    </div>
                  ))}
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
