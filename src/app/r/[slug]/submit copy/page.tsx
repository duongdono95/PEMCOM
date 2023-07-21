import { Buttons } from "@/components/Buttons/Buttons";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { OutputData } from "@editorjs/editorjs";
import { Editor } from "@/components/Editor/Editor";
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
      <Editor subredditId={subreddit.id} />
      <Buttons.general
        type="submit"
        isPrimary
        content="Post"
      />
    </div>
  );
};

export default page;
