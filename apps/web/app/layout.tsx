import "@hgpt/styles/global.scss";
import { PropsWithChildren } from "react";

import "./global.css";

export const metadata = {
  title: "hyunBell 토이 프로젝트",
  description: "hyunBell",
};

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
