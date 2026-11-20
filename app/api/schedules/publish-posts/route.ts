import { handleSchedule } from "@vercel/schedules";
import { revalidatePath } from "next/cache";
import { isPublished, postPath, posts } from "../../../data/blog";
import { LANGS, localePath } from "../../../lib/lang";
import { submitToIndexNow } from "../../../lib/indexnow";
import { absoluteUrl } from "../../../lib/seo";

const DAY = 24 * 60 * 60 * 1000;

export const POST = handleSchedule(async () => {
  revalidatePath("/", "layout");

  const now = new Date();
  const fresh = posts.filter((p) => isPublished(p, now) && !isPublished(p, new Date(now.getTime() - DAY)));
  const urls = fresh.flatMap((p) => LANGS.map((lang) => absoluteUrl(localePath(lang, postPath(p, lang)))));
  if (urls.length) {
    await submitToIndexNow([...urls, absoluteUrl("/blog"), absoluteUrl("/es/blog")]);
  }
});
