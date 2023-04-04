import { NextResponse } from "next/server";

import list from "../../../mock/games.json";
import { postSuggest } from 'lib/src/api'
export async function GET(req: Request) {
  postSuggest('keyword')
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  return NextResponse.json(list);
}