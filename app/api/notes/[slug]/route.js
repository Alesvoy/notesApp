import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "../../../../prisma/client";

export async function GET(req, { params }) {
  const slug = parseInt(params.slug);

  // const query = "SELECT * FROM notes WHERE note_id = $1 AND user_id = $2";
  // const values = [slug, userId];
  // const result = await conn.query(query, values);
  const note = await prisma.note.findUnique({
    where: {
      note_id: slug,
    },
  });

  return NextResponse.json(note);
}

export async function DELETE(req, { params }) {
  const slug = parseInt(params.slug);
  // const { userId } = getAuth(req);

  // if (!userId) {
  //   return NextResponse.error();
  // }

  // const query = "DELETE FROM notes WHERE note_id = $1 AND user_id = $2";
  // const values = [slug, userId];
  // await conn.query(query, values);
  await prisma.note.delete({
    where: {
      note_id: slug,
    },
  });
  return NextResponse.json({ status: "ok" });
}

export async function PATCH(req, { params }) {
  const slug = parseInt(params.slug);
  const { note_text } = await req.json();
  // const { userId } = getAuth(req);

  // if (!userId) {
  //   return NextResponse.error();
  // }

  // const query =
  //   "UPDATE notes SET note_text = $1 WHERE note_id = $2 AND user_id = $3";
  // const values = [json.note, slug, userId];
  // await conn.query(query, values);
  const updatedNote = await prisma.note.update({
    where: {
      note_id: slug,
    },
    data: {
      note_text,
    },
  });
  return NextResponse.json({ status: "ok" });
}
