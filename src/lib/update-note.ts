export async function updateNote(
  id: number,
  title: string,
  content: string | null,
) {
  try {
    const res = await fetch(`/api/notes/`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        title,
        content,
      }),
    });

    if (!res.ok) return { success: false };

    const data = (await res.json()) as { success: boolean };
    const { success } = data;

    return { success };
  } catch (error) {
    return { success: false };
  }
}
