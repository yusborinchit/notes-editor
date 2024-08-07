import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { queryUpdateNoteById } from "~/server/queries";

export async function PUT(req: Request) {
  const session = await getServerAuthSession();
  if (!session || !session.user) return Response.json({ success: false });

  const body = (await req.json()) as unknown;

  const { success, data } = z
    .object({
      id: z.number(),
      title: z.string(),
      content: z.string().nullable(),
    })
    .safeParse(body);

  if (!success) return Response.json({ success: false });

  await queryUpdateNoteById(data.id, session.user.id, {
    title: data.title,
    content: data.content,
  }).execute();

  return Response.json({ success: true });
}
