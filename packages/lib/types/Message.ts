import { type ChatCompletionResponseMessage } from "openai";

export type Message = ChatCompletionResponseMessage & {
  date: string;
  streaming?: boolean;
  isError?: boolean;
  isPreview?: boolean;
};
