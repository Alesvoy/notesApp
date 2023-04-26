import { NextRequest, NextResponse } from "next/server";
import conn from "../../../../lib/db";

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
