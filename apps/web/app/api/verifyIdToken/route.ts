import { NextResponse } from "next/server";

import { adminAuth } from "../../../firebase/server";

export async function POST(req: Request) {
  const json = await req.json();

  const { userToken } = json;

  if (!userToken) return NextResponse.json({ error: "error! " }, { status: 401 });
  try {
    const decodedToken = await adminAuth.verifyIdToken(userToken);
    console.log("decoded", decodedToken);
    return NextResponse.json({ decodedToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
