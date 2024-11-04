import "./post.component.scss";

import { useRef, useState } from "react";
import {
  Star,
  StarOff,
  MessageCircle,
  Eye,
  Share2,
  CalendarDays,
  Ellipsis,
  EllipsisVertical,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ToggleGroup } from "@/components/ui/toggle-group";

import { Badge } from "@/components/ui/badge";

export default function Post({ post, updatePost, onClick, type, level }) {
  if (!post) {
    return "";
  }

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({
    description: "",
  });

  async function toggleLike() {
    setLoading("like");
    const [ok, data] = await postService.addInteraction(post.id, "like", {
      like: !post.postInteractions.liked,
    });

    if (ok) {
      updatePost({
        ...post,
        postInteractions: {
          ...post.postInteractions,
          like: post.postInteractions.liked
            ? post.postInteractions.like - 1
            : post.postInteractions.like + 1,
          liked: !post.postInteractions.liked,
        },
      });
    }

    setLoading(false);
  }

  async function createPost(comment) {
    if (comment.description.length > 1000) {
      return console.error("Description is too long.");
    }

    comment.parentPostId = post.id;

    const [ok, data] = await postService.createPost(comment);
    if (ok) {
      updatePost(data);
    }
  }

  return (
    <>
      <Card
        className="sm:col-span-2 post"
        style={{
          border: null,
          cursor: type === "all-posts" ? "pointer" : null,
        }}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <CardHeader className="pb-3" style={{ marginTop: "-0.6rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <UserHoverCard user={post.user} createdAt={post.createdAt} />
            {post.event &&
              (post.event.status.id === 1 ? (
                <Button
                  onClick={() => {
                    navigate(`register`);
                  }}
                >
                  Register
                </Button>
              ) : (
                <Badge variant="outline">{post.event.status.description}</Badge>
              ))}

            {/* <Button variant="ghost" size="icon">
              <Ellipsis className="h-5 w-5" />
          </Button>*/}
          </div>
          {type !== "comment" && <CardTitle>{post.title}</CardTitle>}
        </CardHeader>
        <CardContent
          style={{
            maxHeight: type === "all-posts" ? "300px" : null,
            overflow: type === "all-posts" ? "hidden" : null,
            position: "relative",
            marginBottom: -10,
          }}
        >
          <RichTextEditor
            readOnly={true}
            content={post.description}
            onChange={() => {}}
          />
          {type === "all-posts" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: "linear-gradient(transparent, #020817)",
                position: "absolute",
                top: 0,
              }}
            ></div>
          )}
        </CardContent>
        <CardFooter>
          {post.postInteractions && (
            <ToggleGroup size="sm" type="multiple">
              {loading === "like" ? (
                <Loader2 className="m-2 h-4 w-4 animate-spin" />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike();
                  }}
                >
                  <Star
                    className="h-4 w-4"
                    color={post.postInteractions.liked ? "yellow" : "white"}
                  />

                  <p
                    style={{
                      marginLeft: "0.2rem",
                      color: post.postInteractions.liked ? "yellow" : null,
                    }}
                  >
                    {post.postInteractions.like}
                  </p>
                </Button>
              )}
              {type !== "comment" && (
                <>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                    <p style={{ marginLeft: "0.2rem" }}>
                      {console.log(post.posts) ||
                        post.posts.length ||
                        post.posts}
                    </p>
                  </Button>
                  <ShareDialog
                    button={
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    }
                    url={"https://localhost:3001/forums/" + post.id}
                  />
                </>
              )}
            </ToggleGroup>
          )}
        </CardFooter>
        {type === "single" && (
          <div
            className="sm:col-span-2 post mb-4 ml-4 mr-4"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {type !== "comment" && (
              <NewPost
                post={comment}
                onChange={(value) => {
                  setComment((curr) => ({ ...curr, ...value }));
                }}
                createPost={createPost}
                type="comment"
              />
            )}
            {post.posts?.map((childPost) => (
              <Post
                key={`Post: ${childPost.id}`}
                post={childPost}
                type="comment"
                level={level ? level + 1 : 1}
                updatePost={(newPost) => {
                  const posts = post.posts;
                  console.log("Post.posts: ", post);
                  const index = posts.findIndex(
                    (post) => post.id == newPost.id
                  );
                  posts[index] = newPost;
                  updatePost({
                    ...post,
                    posts: posts,
                  });
                }}
              />
            ))}
            {(!post.posts || post.posts.length === 0) && false
              ? "No comments yet."
              : ""}
          </div>
        )}
      </Card>
    </>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ShareDialog } from "../ShareDialog/share-dialog.component";
import RichTextEditor from "../RichTextEditor/rich-text-editor";
import useFormatDatetime from "@/utils/use-format-datetime";
import postService from "@/services/post.service";
import NewPost from "../NewPost/new-post.component";
import { useNavigate } from "react-router-dom";

function UserHoverCard({ user, createdAt }) {
  const { formatDate } = useFormatDatetime();
  return (
    <HoverCard>
      <HoverCardTrigger asChild style={{ maxWidth: "100px" }}>
        <span
          style={{ display: "flex", maxWidth: "100px", alignItems: "center" }}
        >
          <Avatar
            size="sm"
            style={{ cursor: "pointer", height: "1.5rem", width: "1.5rem" }}
          >
            <AvatarImage size="sm" src={user.profile} />
            <AvatarFallback size="sm">C</AvatarFallback>
          </Avatar>
          <Button style={{ marginLeft: "-0.2rem" }} size="sm" variant="link">
            {user.username}
          </Button>
          <p style={{ textWrap: "nowrap" }}>
            {formatDate(new Date(createdAt))}
          </p>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.profile} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{user.username}</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
