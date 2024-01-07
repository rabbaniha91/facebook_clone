import {
  MagnifyingGlassIcon,
  VideoCameraIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import {useSelector} from 'react-redux';
import Contact from './Contact';

const RightSideBodyHome = () => {
  const user = useSelector(state => state.user)

  return <div>
    <div className="w-60 fixed right-0 top-12 hidden lg:block p-3">
        <p className="p-1 text-lg text-gray-700 font-semibold">Sponsered</p>
        <div className="devider bg-gray-400"></div>
        <div className="flex items-center justify-between p-1">
            <p className="text-gray-700 font-semibold grow">Contants</p>
            <div className="flex space-x-2">
                <VideoCameraIcon className="w-5 cursor-pointer"/>
                <MagnifyingGlassIcon className="w-5 cursor-pointer"/>
                <EllipsisHorizontalIcon className="w-5 cursor-pointer"/>
            </div>
        </div>
        <div className="p-1 space-y-1">
            <Contact user={user}/>
        </div>
    </div>
  </div>;
};

export default RightSideBodyHome;
