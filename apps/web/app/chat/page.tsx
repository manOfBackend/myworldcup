import { ChatItem } from "@hgpt/ui";

export default function Page() {
  return (
    <section className="flex flex-col">
      <ChatItem count={1} selected time="2023-05-07" title="test" />
      <ChatItem count={1} selected={false} time="2023-05-07" title="test" />
    </section>
  );
}
