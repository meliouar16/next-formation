type Data = { name: string };

export async function GET() {
  return Response.json({ name: "John Doe" } satisfies Data);
}
