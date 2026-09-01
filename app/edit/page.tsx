import { notFound } from "next/navigation";
import { buildCopyIndex } from "@/lib/copy-index";
import { Editor } from "./editor";

/**
 * Dev-only copy editor. Every string in content/copy.ts, grouped by page and
 * section, editable in place. Saving writes content/copy-edits.json; it never
 * touches the source, so duplicate strings, the em dash rule and typographic
 * apostrophes are all still applied deliberately rather than by a textarea.
 *
 * Returns 404 in a production build.
 */
export const dynamic = "force-dynamic";

export default function EditPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Editor entries={buildCopyIndex()} />;
}
