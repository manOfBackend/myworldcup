"use client";

import { useDebouncedCallback } from "@hgpt/lib/use-debounce";
import { type Prompt, usePromptStore } from "@hgpt/store";
import { ChatItem, ChatSendBox } from "@hgpt/ui";
import { useLayoutEffect, useRef, useState } from "react";

const SEARCH_TEXT_LIMIT = 30;

export default function Page() {
  const promptStore = usePromptStore();
  const [promptHints, setPromptHints] = useState<Prompt[]>([]);
  const [userInput, setUserInput] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { scrollRef, setAutoScroll } = useScrollToBottom();

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
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onUserSubmit();
    e.preventDefault();
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

  return (
    <section className="flex flex-col">
      <ChatItem count={1} selected time="2023-05-07" title="test" />
      <ChatItem count={1} selected={false} time="2023-05-07" title="test" />
      <ChatSendBox
        ref={inputRef}
        autoFocus
        onInput={onInput}
        onInputKeyDown={onInputKeyDown}
        onUserSubmit={onUserSubmit}
        userInput={userInput}
      />
    </section>
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
