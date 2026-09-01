import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Receives the edited strings from /edit and writes them to
 * content/copy-edits.json as a { path: newValue } map. Deliberately does not
 * write content/copy.ts: applying the change is a reviewed step.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }
  const body = (await request.json()) as { edits?: Record<string, string> };
  const edits = body.edits ?? {};
  const file = path.join(process.cwd(), "content", "copy-edits.json");
  await writeFile(
    file,
    JSON.stringify(
      { savedAt: new Date().toISOString(), count: Object.keys(edits).length, edits },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  return NextResponse.json({ ok: true, count: Object.keys(edits).length });
}
