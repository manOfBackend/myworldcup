import { NextResponse } from "next/server";

import list from "../../../mock/games.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  return NextResponse.json(list);
}