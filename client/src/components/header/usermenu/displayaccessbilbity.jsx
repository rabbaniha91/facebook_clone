import {
  MoonIcon,
  ArrowDownOnSquareIcon,
  ChevronRightIcon,
  CalculatorIcon,
  Cog8ToothIcon
} from "@heroicons/react/24/solid";

const DisplayAccessbilbity = () => {
  return (
    <div>
      <div className="space-x-3 flex">
        <div className="w-9 h-9 rounded-full bg-gray-200 p-2 shrink-0">
          <MoonIcon />
        </div>
        <div className="leading-4">
          <p className="text-gray-900 font-semibold">Dark Mode</p>
          <p className="text-gray-600 leading-4 text-sm">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </p>
          <div className="flex flex-col items-stretch mt-2 space-y-1">
            <label
              for="ondarkmode"
              className="flex items-center justify-between p-2 text-gray-900 text-lg font-bold
            cursor-pointer hover:bg-gray-300 rounded-lg transition-colors"
            >
              <span>On</span>
              <input type="radio" name="darkmode" id="ondarkmode" />
            </label>
            <label
              for="offdarkmode"
              className="flex items-center justify-between p-2 text-gray-900 text-lg font-bold
            cursor-pointer hover:bg-gray-300 rounded-lg transition-colors"
            >
              <span>Off</span>
              <input type="radio" name="darkmode" id="offdarkmode" />
            </label>
          </div>
        </div>
      </div>
      <div className="space-x-3 flex">
        <div className="w-9 h-9 rounded-full bg-gray-200 p-2 shrink-0">
          <ArrowDownOnSquareIcon />
        </div>
        <div className="leading-4">
          <p className="text-gray-900 font-semibold">Compact Mode</p>
          <p className="text-gray-600 leading-4 text-sm">
            Make your font size smaller so more content can fit on the screen.
          </p>
          <div className="flex flex-col items-stretch mt-2 space-y-1">
            <label
              for="oncompactmode"
              className="flex items-center justify-between p-2 text-gray-900 text-lg font-bold
            cursor-pointer hover:bg-gray-300 rounded-lg transition-colors"
            >
              <span>On</span>
              <input type="radio" name="compactmode" id="oncompactmode" />
            </label>
            <label
              for="offcompactmode"
              className="flex items-center justify-between p-2 text-gray-900 text-lg font-bold
            cursor-pointer hover:bg-gray-300 rounded-lg transition-colors"
            >
              <span>Off</span>
              <input type="radio" name="compactmode" id="offcompactmode" />
            </label>
          </div>
        </div>
      </div>
      <div
        className="flex justify-between items-center py-2 px-1 cursor-pointer rounded-lg hover:bg-gray-300
          transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 bg-gray-200 rounded-full p-2">
            <CalculatorIcon />
          </div>
          <p className="font-bold text-gray-800">Keyboard</p>
        </div>
        <div className="w-8 p-1 text-gray-500">
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default DisplayAccessbilbity;
