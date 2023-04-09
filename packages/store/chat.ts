import { sessionController } from "@hgpt/lib";
import { requestChatStream } from "@hgpt/lib/request";
import type { ChatConfig, ChatSession } from "@hgpt/lib/types/Chat";
import { SubmitKey, Theme } from "@hgpt/lib/types/Chat";
import type { Message } from "@hgpt/lib/types/Message";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "chat-next-web-store";

function createEmptySession(): ChatSession {
  const createDate = new Date().toLocaleString();

  return {
    id: Date.now(),
    messages: [],
    lastUpdate: createDate,
  };
}

const DEFAULT_CONFIG: ChatConfig = {
  historyMessageCount: 4,
  compressMessageLengthThreshold: 1000,
  sendBotMessages: true as boolean,
  submitKey: SubmitKey.CtrlEnter as SubmitKey,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto as Theme,
  tightBorder: false,
  sendPreviewBubble: true,

  disablePromptHint: false,

  modelConfig: {
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
  },
};

interface ChatStore {
  config: ChatConfig;
  session: ChatSession;
  newSession: () => void;
  onUserInput: (content: string) => Promise<void>;
}
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      session: {
        id: -1,
        messages: [],
        lastUpdate: "-1",
      },
      config: {
        ...DEFAULT_CONFIG,
      },

      newSession() {
        set(() => ({
          session: createEmptySession(),
        }));
      },
      async onUserInput(content) {
        const userMessage: Message = {
          role: "user",
          content,
          date: new Date().toLocaleString(),
        };

        const botMessage: Message = {
          content: "",
          role: "assistant",
          date: new Date().toLocaleString(),
          streaming: true,
        };

        // get recent messages
        const recentMessages = get().session.messages;
        const sendMessages = recentMessages.concat(userMessage);
        const messageIndex = get().session.messages.length + 1;
        const sessionIndex = 0;

        get().session.messages.push(userMessage);
        get().session.messages.push(botMessage);

        console.log("[User Input] ", sendMessages);
        requestChatStream(sendMessages, {
          onMessage(content, done) {
            // stream response
            if (done) {
              botMessage.streaming = false;
              botMessage.content = content;
              sessionController.remove(sessionIndex, messageIndex);
            } else {
              botMessage.content = content;
              set(() => ({}));
            }
          },
          onError(error, statusCode) {
            if (statusCode === 401) {
              botMessage.content = "Unauthorized";
            } else {
              botMessage.content += "\n\n" + "Error from chat store";
            }
            botMessage.streaming = false;
            userMessage.isError = true;
            botMessage.isError = true;
            set(() => ({}));
            sessionController.remove(sessionIndex, messageIndex);
          },
          onController(controller) {
            // collect controller for stop/retry
            sessionController.addController(sessionIndex, messageIndex, controller);
          },
          filterBot: !get().config.sendBotMessages,
          modelConfig: get().config.modelConfig,
        });
      },
    }),
    {
      name: LOCAL_KEY,
      version: 1,
    }
  )
);
