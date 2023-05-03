import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import conn from "../../../lib/db";

export async function GET(req, res) {
  try {
    const query = "SELECT * FROM notes WHERE user_id = $1";
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.error();
    }

    const values = [userId];
    const result = await conn.query(query, values);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ status: "error" });
  }
}

export async function POST(request) {
  const json = await request.json();
  const query = "INSERT INTO notes(user_id, note_text) VALUES ($1, $2)";
  const values = [json.user_id, json.note];
  await conn.query(query, values);
  return NextResponse.json({ status: "ok" });
}
