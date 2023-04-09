"use client";

import type { Message } from "@hgpt/lib/types";
import { useDebouncedCallback } from "@hgpt/lib/use-debounce";
import { usePromptStore, type Prompt } from "@hgpt/store";
import { useChatStore } from "@hgpt/store/chat";
import { ChatSendBox, Markdown } from "@hgpt/ui";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./home.module.scss";

const SEARCH_TEXT_LIMIT = 30;
type RenderMessage = Message & { preview?: boolean };

export default function Chat() {
  const promptStore = usePromptStore();
  const [promptHints, setPromptHints] = useState<Prompt[]>([]);
  const [userInput, setUserInput] = useState("");

  const loading = !useHasHydrated();

  const chatStore = useChatStore();
  const session = chatStore.session;

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { scrollRef, setAutoScroll } = useScrollToBottom();

  const config = useChatStore((state) => state.config);

  const context: RenderMessage[] = session.messages.slice();

  const scrollInput = () => {
    const dom = inputRef.current;
    if (!dom) return;
    const paddingBottomNum: number = parseInt(window.getComputedStyle(dom).paddingBottom, 10);
    dom.scrollTop = dom.scrollHeight - dom.offsetHeight + paddingBottomNum;
  };

  const onUserSubmit = () => {
    if (userInput.length <= 0) return;
    setIsLoading(true);
    setUserInput("");
    setPromptHints([]);
    setAutoScroll(true);
    chatStore.onUserInput(userInput).then(() => {
      setIsLoading(false);
    });
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const shouldSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Enter") return false;
      if (e.key === "Enter" && e.nativeEvent.isComposing) return false;
      return !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey;
    };
    if (shouldSubmit(e)) {
      onUserSubmit();
      e.preventDefault();
    }
  };

  const onInput = (text: string) => {
    scrollInput();
    setUserInput(text);
    const n = text.trim().length;

    if (n === 0) {
      // setPromptHints([]);
    } else if (n < SEARCH_TEXT_LIMIT) {
      if (text.startsWith("/")) {
        let searchText = text.slice(1);
        if (searchText.length === 0) {
          searchText = " ";
        }
        onSearch(searchText);
      }
    }
  };

  const onSearch = useDebouncedCallback(
    (text: string) => {
      setPromptHints(promptStore.search(text));
    },
    100,
    { leading: true, trailing: true }
  );

  // preview messages
  const messages = context
    .concat(
      isLoading
        ? [
            {
              role: "assistant",
              content: "……",
              date: new Date().toLocaleString(),
              preview: true,
            },
          ]
        : []
    )
    .concat(
      userInput.length > 0 && config.sendPreviewBubble
        ? [
            {
              role: "user",
              content: userInput,
              date: new Date().toLocaleString(),
              preview: true,
            },
          ]
        : []
    );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container}`}>
      <div className={styles["window-content"]}>
        <div className={styles.chat}>
          <div className={styles["window-header"]}>
            <div className={styles["window-header-title"]}>
              <div className={`${styles["window-header-main-title"]} ${styles["chat-body-title"]}`}>
                HGPT CHAT
              </div>
              <div className={styles["window-header-sub-title"]}>무엇이든 질문하세요.</div>
            </div>
          </div>

          <div
            className={styles["chat-body"]}
            ref={scrollRef}
            onTouchStart={() => {
              inputRef.current?.blur();
              setAutoScroll(false);
            }}>
            {messages.map((message, i) => {
              const isUser = message.role === "user";

              return (
                <div key={i} className={isUser ? styles["chat-message-user"] : styles["chat-message"]}>
                  <div className={styles["chat-message-container"]}>
                    <div className={styles["chat-message-avatar"]}>
                      {/* <Avatar role={message.role} /> */}
                    </div>
                    {(message.isPreview || message.streaming) && (
                      <div className={styles["chat-message-status"]}>...</div>
                    )}
                    <div className={styles["chat-message-item"]}>
                      {!isUser && !(message.isPreview || message.content.length === 0) && (
                        <div className={styles["chat-message-top-actions"]}>
                          {message.streaming ? (
                            <div className={styles["chat-message-top-action"]}>중단</div>
                          ) : (
                            <div className={styles["chat-message-top-action"]}>재전송</div>
                          )}

                          <div className={styles["chat-message-top-action"]}>복사</div>
                        </div>
                      )}
                      {(message.isPreview || message.content.length === 0) && !isUser ? (
                        <>...</>
                      ) : (
                        <div className="markdown-body">
                          <Markdown content={message.content} />
                        </div>
                      )}
                    </div>
                    {!isUser && !message.isPreview && (
                      <div className={styles["chat-message-actions"]}>
                        <div className={styles["chat-message-action-date"]}>
                          {message.date.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <ChatSendBox
            ref={inputRef}
            autoFocus
            onInput={onInput}
            onInputKeyDown={onInputKeyDown}
            onUserSubmit={onUserSubmit}
            userInput={userInput}
          />
        </div>
      </div>
    </div>
  );
}

function useScrollToBottom() {
  // for auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // auto scroll
  useLayoutEffect(() => {
    const dom = scrollRef.current;
    if (dom && autoScroll) {
      setTimeout(() => (dom.scrollTop = dom.scrollHeight), 1);
    }
  });

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
  };
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
