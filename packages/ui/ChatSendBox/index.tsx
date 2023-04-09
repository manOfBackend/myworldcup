import type { HTMLAttributes } from "react";
import React, { forwardRef } from "react";

import { IconButton } from "../IconButton";
import SendWhiteIcon from "../icons/send-white.svg";
import styles from "./index.module.scss";

interface ChatSendBoxProps extends Omit<HTMLAttributes<HTMLTextAreaElement>, "onInput"> {
  userInput: string;
  onInput: (text: string) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  autoFocus: boolean;
  onUserSubmit: () => void;
}
const ChatSendBox = forwardRef<HTMLTextAreaElement, ChatSendBoxProps>(
  ({ userInput, onInput, onInputKeyDown, onFocus, onBlur, autoFocus, onUserSubmit }, ref) => {
    return (
      <div className={styles["chat-input-panel"]}>
        <div className={styles["chat-input-panel-inner"]}>
          <textarea
            ref={ref}
            className={styles["chat-input"]}
            placeholder="한글로 질문하셔도 HGPT가 영어로 번역하여 전달합니다."
            rows={2}
            onInput={(e) => onInput(e.currentTarget.value)}
            value={userInput}
            onKeyDown={onInputKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
          />
          <IconButton
            icon={<SendWhiteIcon />}
            text="전송"
            className={styles["chat-input-send"]}
            noDark
            onClick={onUserSubmit}
          />
        </div>
      </div>
    );
  }
);

ChatSendBox.displayName = "ChatSendBox";

export default ChatSendBox;
