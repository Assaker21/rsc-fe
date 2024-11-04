import "./all-forums.page.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import Post from "@/components/Post/post.component";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor/rich-text-editor";
import NewPost from "@/components/NewPost/new-post.component";
import postService from "@/services/post.service";
import { useLocation, useNavigate } from "react-router-dom";

export default function AllForums({ type }) {
  const location = useLocation();
  const [posts, setPosts] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  function updatePost(index) {
    return (post) => {
      setPosts((curr) => {
        const newPosts = [...curr];
        newPosts[index] = post;
        return newPosts;
      });
    };
  }

  async function getPosts() {
    const [ok, data] = await postService.getPosts({
      event: type,
    });
    if (ok) {
      setPosts(data);
    }
  }

  async function createPost(post) {
    if (post.description.length > 1000) {
      return console.error("Description is too long.");
    }

    if (post.title.length > 300) {
      return console.error("Title is too long.");
    }

    const [ok, data] = await postService.createPost(post, {
      event: type === "event" ? true : false,
    });
    if (ok) {
      console.log("NEW POSTS: ", data);
      setPosts(data);
    }
  }

  useEffect(() => {
    console.log("Location: ", location, "\nType: ", type);
    getPosts();
  }, [location.pathname]);

  return (
    <section className="forums-section">
      <NewPost
        post={newPost}
        onChange={(value) => {
          setNewPost((curr) => ({ ...curr, ...value }));
        }}
        createPost={createPost}
      />
      {posts?.map((post, index) => {
        return (
          <Post
            key={"Post: " + post.id}
            type="all-posts"
            post={post}
            updatePost={updatePost(index)}
            onClick={() => {
              if (type === "event") navigate(`/events/${post.id}`);
              else navigate(`/forums/${post.id}`);
            }}
          />
        );
      })}
    </section>
  );
}
