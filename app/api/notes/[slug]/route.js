import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import conn from "../../../../lib/db";

export async function GET(req, { params }) {
  const { slug } = params;
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.error();
  }

  const query = "SELECT * FROM notes WHERE note_id = $1 AND user_id = $2";
  const values = [slug, userId];
  const result = await conn.query(query, values);
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(req, { params }) {
  const { slug } = params;
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.error();
  }

  const query = "DELETE FROM notes WHERE note_id = $1 AND user_id = $2";
  const values = [slug, userId];
  await conn.query(query, values);
  return NextResponse.json({ status: "ok" });
}

export async function PATCH(req, { params }) {
  const { slug } = params;
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.error();
  }

  const json = await req.json();
  const query =
    "UPDATE notes SET note_text = $1 WHERE note_id = $2 AND user_id = $3";
  const values = [json.note, slug, userId];
  await conn.query(query, values);
  return NextResponse.json({ status: "ok" });
}
