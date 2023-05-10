import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "../../../prisma/client";

export async function GET(req, res) {
  try {
    const { userId } = getAuth(req);
    // const query = "SELECT * FROM notes WHERE user_id = $1";

    // if (!userId) {
    //   return NextResponse.error();
    // }

    // const values = [userId];
    // const result = await conn.query(query, values);
    const notes = await prisma.note.findMany({
      where: {
        user_id: userId,
      },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ status: "error" });
  }
}

export async function POST(request) {
  const json = await request.json();
  // const query = "INSERT INTO notes(user_id, note_text) VALUES ($1, $2)";
  // const values = [json.user_id, json.note];
  // await conn.query(query, values);
  const createNote = await prisma.note.create({ data: json });
  return NextResponse.json({ status: "ok" });
}
