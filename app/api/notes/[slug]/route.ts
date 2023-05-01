import { NextRequest, NextResponse } from "next/server";
import conn from "../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const query = "SELECT * FROM notes WHERE note_id = $1";
  const values = [slug];
  const result = await conn.query(query, values);
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const query = "DELETE FROM notes WHERE note_id = $1";
  const values = [slug];
  await conn.query(query, values);
  return NextResponse.json({ status: "ok" });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const json = await request.json();
  const query = "UPDATE notes SET note_text = $1 WHERE note_id = $2";
  const values = [json.note, slug];
  await conn.query(query, values);
  return NextResponse.json({ status: "ok" });
}
