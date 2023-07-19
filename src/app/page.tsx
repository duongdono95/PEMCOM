import { Buttons } from "@/components/Buttons/Buttons";
import CustomedFeed from "@/components/Feed/CustomedFeed";
import GeneralFeed from "@/components/Feed/GeneralFeed";
import { getAuthSession } from "@/lib/auth";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const session = await getAuthSession();
  return (
    <div className="home-page">
      <h1>New Feed</h1>
      <div className="home-page-content">
        <div className="left">
          {session?.user ? (
            // @ts-expect-error
            <CustomedFeed />
          ) : (
            <GeneralFeed />
          )}
        </div>
        <div className="right">
          <div className="top">
            <Home />
            <p>Home</p>
          </div>
          <div className="bottom">
            <p>
              Your personal Breadit frontpage. Come here to
              check in with your favorite communities.
            </p>
            <Link href="/r/create">
              <Buttons.general content="Create Community" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
