import { Buttons } from "@/components/Buttons/Buttons";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { OutputData } from "@editorjs/editorjs";
interface pageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });
  if (!subreddit) return notFound();
  return (
    <div className="slug-submit-page">
      <h3>Create a new Post</h3>
    </div>
  );
};

export default page;
