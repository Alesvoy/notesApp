import { NextRequest, NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function GET() {
  try {
    const query = "SELECT * FROM notes";
    const result = await conn.query(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ status: "error" });
  }
}

export async function POST(request: NextRequest) {
  const json = await request.json();
  const query = "INSERT INTO notes(note_text) VALUES ($1)";
  const values = [json.note];
  const result = await conn.query(query, values);
  return NextResponse.json({ status: "ok" });
}
