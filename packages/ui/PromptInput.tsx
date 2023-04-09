"use client";

import React from "react";
import type { FormEvent } from "react";
import { useState } from "react";

export const PromptInput = () => {
  const [input, setInput] = useState("");

  const submitPrompt = async (useSuggestion?: boolean) => {
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });

    const data = await res.json();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-md border shadow-md shadow-slate-400/10 lg:flex-row lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-md p-4 outline-none"
        />
        <button
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "cursor-not-allowed text-gray-300"
          } font-bold`}
          type="submit"
          disabled={!input}>
          생성
        </button>
      </form>
    </div>
  );
};
