import "@hgpt/styles/global.scss";
import type { PropsWithChildren } from "react";

import "./global.css";

export const metadata = {
  title: "HGPT CHAT",
  description: "2023 1st TOY PROJECT - HYUNBELL",
};

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
}
