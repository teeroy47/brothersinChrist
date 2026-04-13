"use client";

import { useDemoSession } from "@/components/session-provider";
import { getPostsForRole, getUserById } from "@/lib/mock-data";
import { formatDateLabel } from "@/lib/utils";

export default function CommunityPage() {
  const { session } = useDemoSession();
  if (!session) {
    return null;
  }
  const user = getUserById(session.id);

  if (!user) {
    return null;
  }

  const feed = getPostsForRole(session.role, user.levelId);

  return (
    <div className="stack">
      {feed.map((post) => (
        <article key={post.id} className={`card stack ${post.pinned ? "card-dark" : ""}`}>
          <div className="space-between">
            <span className={`pill ${post.pinned ? "pill-dark" : ""}`}>{post.type}</span>
            <span className={post.pinned ? "" : "muted"} style={{ fontSize: ".9rem" }}>
              {formatDateLabel(post.createdAt)}
            </span>
          </div>
          <div className="stack-sm">
            <h2 className="heading-md">{post.title}</h2>
            <p className={post.pinned ? "" : "muted"} style={{ margin: 0 }}>{post.body}</p>
          </div>
          <div className="row">
            {post.tags.map((tag) => (
              <span key={tag} className={`pill ${post.pinned ? "pill-dark" : ""}`}>#{tag}</span>
            ))}
          </div>
          <span className={post.pinned ? "" : "muted"}>{post.commentsCount} comments</span>
        </article>
      ))}
    </div>
  );
}
