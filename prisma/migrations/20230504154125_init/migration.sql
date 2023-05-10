-- CreateTable
CREATE TABLE "Note" (
    "note_id" SERIAL NOT NULL,
    "note_text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("note_id")
);
