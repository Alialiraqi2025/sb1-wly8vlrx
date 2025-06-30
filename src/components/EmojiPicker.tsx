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
    <div className="glass rounded-2xl p-4 w-80 max-h-48 overflow-y-auto animate-slide-up">
      <div className="grid grid-cols-8 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="text-xl hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;