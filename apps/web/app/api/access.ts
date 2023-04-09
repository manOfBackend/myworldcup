import { md5 } from "@hgpt/lib/crypto";

export function getAccessCodes(): Set<string> {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const code = process.env.CODE;

  try {
    const codes = (code?.split(",") ?? []).filter((v) => !!v).map((v) => md5.hash(v.trim()));
    return new Set(codes);
  } catch (e) {
    return new Set();
  }
}

export const ACCESS_CODES = getAccessCodes();
