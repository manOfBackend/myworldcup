import { NextResponse } from "next/server";

import { adminAuth } from "../../../firebase/server";

export async function GET(req: Request) {
  const userToken = await req.text();

  if (!userToken) return NextResponse.json({ error: "error! " }, { status: 401 });
  try {
    const decodedToken = await adminAuth.verifyIdToken(userToken);
    return NextResponse.json({ decodedToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
