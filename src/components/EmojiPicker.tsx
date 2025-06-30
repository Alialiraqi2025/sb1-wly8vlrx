import React from 'react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗',
    '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨',
    '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞',
    '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫',
    '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'
  ];

  return (
    <div className="element-card w-80 max-h-48 overflow-y-auto animate-slide-up">
      <div className="p-4">
        <div className="grid grid-cols-8 gap-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => onEmojiSelect(emoji)}
              className="text-lg hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;