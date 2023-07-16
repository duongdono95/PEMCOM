import { Buttons } from "@/components/Buttons/Buttons";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";
import "./styles.scss";
const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const subReddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });
  const authorName = await db.user.findFirst({
    where: { id: subReddit?.creatorId as string },
  });
  return (
    <div className="r-slug-layout">
      <Buttons.backToHome />
      <div className="r-slug-layout-content">
        <div className="left-container">
          <h1 className="title">r/{slug}</h1>
          {children}
        </div>
        <div className="right-container">
          <h3 className="container-header">
            About r/{slug}
          </h3>
          <div className="container-body">
            <div className="item">
              <p className="item-title">Created:</p>
              <p className="item-detail">July 16, 2023</p>
            </div>
            <div className="item">
              <p className="item-title">Members:</p>
              <p className="item-detail">1</p>
            </div>

            {session?.user.id === subReddit?.creatorId ? (
              <div className="item">
                <p>You created this community</p>
              </div>
            ) : (
              <div className="item">
                <p className="item-title">Created by:</p>
                <p className="item-detail">
                  {authorName?.username}
                </p>
              </div>
            )}

            <Link href={slug + "/submit"}>
              <Buttons.general
                isPrimary
                content="Create Post"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
