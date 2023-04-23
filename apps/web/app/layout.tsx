// import "@hgpt/styles/global.scss";
import Head from "next/head";
import type { PropsWithChildren } from "react";

import { Providers } from "./Providers";

export const metadata = {
  title: "HGPT CHAT",
  description: "2023 1st TOY PROJECT - HYUNBELL",
};

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="kr">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta name="theme-color" content="#151515" media="(prefers-color-scheme: dark)" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
