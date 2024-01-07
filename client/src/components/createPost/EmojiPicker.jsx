import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import useClickOutSide from "../../hooks/useclickoutside";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPickerComponent = ({ text, setText, textRef }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursotPosition] = useState();
  const [position, setPosition] = useState("top");
  const emojiRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (emoji) => {
    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;

    const newText = text.slice(0, start) + emoji.native + text.slice(end);

    setText(newText);
    setCursotPosition(start + emoji.native.length);
  };

  useClickOutSide(emojiRef, () => {
    setShowEmojiPicker(false);
  });
  return (
    <div ref={emojiRef} className="relative inline-block">
      <div
        onClick={(e) => {
          e.clientY <= 346 ? setPosition("top") : setPosition("bottom");
          setShowEmojiPicker((prev) => !prev);
        }}
        className={`${
          showEmojiPicker ? "text-blue-500" : "text-gray-400"
        } w-7 hover:text-blue-600
      transition-colors cursor-pointer`}
      >
        <FaceSmileIcon />
      </div>
      <div
        className={`${
          position === "top"
            ? "absolute top-full -translate-y-11 -translate-x-[82%]"
            : "absolute bottom-full -translate-x-[83%] translate-y-11"
        } z-50 scale-75`}
      >
        {showEmojiPicker && (
          <Picker
            data={data}
            onEmojiSelect={handleEmoji}
            theme="light"
            navPosition="top"
          />
        )}
      </div>
    </div>
  );
};

export default EmojiPickerComponent;
