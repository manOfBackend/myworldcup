import { postSuggest } from "@hgpt/lib";
import { NextResponse } from "next/server";
import list from "../../../mock/games.json";
export async function GET(req: Request) {
  
  postSuggest('keyword')
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  return NextResponse.json(list);
}