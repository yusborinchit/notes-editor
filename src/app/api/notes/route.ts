import { eq } from "drizzle-orm";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

export async function PUT(req: Request) {
  const session = await getServerAuthSession();
  if (!session || !session.user) return Response.json({ success: false });

  const body = (await req.json()) as unknown;

  const { success, data } = z
    .object({
      id: z.number(),
      title: z.string(),
      content: z.string(),
    })
    .safeParse(body);

  if (!success) return Response.json({ success: false });

  await db
    .update(notes)
    .set({
      title: data.title === "" ? "New Note" : data.title,
      content: data.content,
    })
    .where(eq(notes.id, data.id));

  return Response.json({ success: true });
}
